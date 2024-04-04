import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify/Iconify';
import {
  Typography,
  Button,
  Stack,
  IconButton,
  FormControl,
  InputAdornment,
  Container,
  TextField,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import { useAuth } from 'src/Context/AuthContext';
import { db, storage } from 'src/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function AddCourse() {
  const [category, setCategory] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');
  const fileInputTumbnailRef = useRef(null);
  const [fileTumbnail, setFileTumbnail] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    headline: '',
    description: '',
    category: '',
    video_name: '',
  });
  const location = useLocation();
  const { state } = location;
  const { categories } = state || {};

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!['supervisor'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);

  useEffect(() => {
    if (id) {
      setFile('ht');
      setFileTumbnail('ht');
    }
  }, []);

  const { id } = useParams();
  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleThumbnailFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileTumbnail(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const saveData = () => {
    handleCloseSaveDialog();
    if (id) {
      // const data = POST_course_Api();
      // if (data) {
      //   navigate(-1);
      //   return toast.success('New Course Added successfully');
      // } else {
      //   navigate(-1);
      //   return toast.error('Error adding new course');
      // }
    } else {
      const data = POST_course_Api();
      if (data) {
        navigate(-1);
        return toast.success('New Course Added successfully');
      } else {
        navigate(-1);
        return toast.error('Error adding new course');
      }
    }
  };
  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  const cancelSave = () => {
    handleCloseCancelDialog();
    setFile(null);
    navigate(-1);
  };

  const OnHandleChange = (e) => {
    const { name, value } = e.target;

    setFieldValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const fileTypes = ['mp4'];

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
      setFileName(file.name); // Set the file name in state
    };
    reader.readAsDataURL(file);
  };
  console.log(file);
  const uploadNewfile = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Get the file name
      const fileName = selectedFile.name;

      // Use FileReader to read the file and get a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the preview image URL to the result of FileReader
        setFile(reader.result);

        // Use the fileName variable as needed, for example, store it in state
        setFileName(fileName);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const POST_Img_Api = async (Datafile, type) => {
    const timestampInMilliseconds = Date.now();
    const storageRef = ref(
      storage,
      type === 'video'
        ? `categories/${selectedCategory}/courses/video/${fieldValues.headline}_${timestampInMilliseconds}`
        : `categories/${selectedCategory}/courses/thumbnail/${fieldValues.headline}_${timestampInMilliseconds}`
    );
    console.log(storageRef);
    const uploadTask = await uploadString(storageRef, Datafile, 'data_url');
    console.log(uploadTask);
    const downloadVideoURL = await getDownloadURL(storageRef);
    console.log(downloadVideoURL);
    return downloadVideoURL;
  };

  const POST_course_Api = async () => {
    let videoUrl = '';
    let imgUrl = '';
    if (!/^https:\/\/\S+$/.test(file)) {
      videoUrl = await POST_Img_Api(file, 'video');
    }
    if (!/^https:\/\/\S+$/.test(fileTumbnail)) {
      imgUrl = await POST_Img_Api(fileTumbnail, 'img');
    }
    try {
      // Ensure proper initialization of db, selectedCategory, categories, fieldValues variables
      const CatRef = doc(db, 'categories', selectedCategory);
      const courses = collection(CatRef, 'courses');

      // Assuming 'categories' is properly defined
      const Cat = categories.filter((val, ind) => val.id === selectedCategory);
      if (Cat.length > 0) {
        fieldValues.category = Cat[0].title;
      } else {
        throw new Error('Selected category not found');
      }
      fieldValues.created_at = new Date();
      const responseFirestoreCourse = await addDoc(courses, {
        headline: fieldValues.headline,
        description: fieldValues.description,
        category: fieldValues.category,
      });
      console.log(responseFirestoreCourse);

      const courseRef = doc(db, 'categories', selectedCategory, 'courses', responseFirestoreCourse.id);
      await updateDoc(courseRef, { courses_ref: courseRef });

      const coursesRef = doc(db, 'categories', selectedCategory, 'courses', responseFirestoreCourse.id);
      const Video = collection(coursesRef, 'videos');
      fieldValues.created_at = new Date();
      const responseFirestoreVideo = await addDoc(Video, {
        created_at: fieldValues.created_at,
        headline: fieldValues.headline,
        prev_img_url: imgUrl,
        video_name: fieldValues.video_name,
        video_url: videoUrl,
      });

      const VideoRef = doc(
        db,
        'categories',
        selectedCategory,
        'courses',
        responseFirestoreCourse.id,
        'videos',
        responseFirestoreVideo.id
      );
      await updateDoc(VideoRef, { video_ref: VideoRef });

      return responseFirestoreVideo.id;
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      throw error; // Rethrow the error or handle it appropriately based on your application's requirements
    }
  };

  console.log(fieldValues, location);
  return (
    <div>
      <Helmet>
        <title> {id ? 'Edit' : 'Add new'} course Details | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to save changes?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseSaveDialog}
        onConfirm={saveData}
      />
      <Confirm
        title="Are you sure you want to cancel changes?"
        subtitle={'Cannot be undo.'}
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onConfirm={cancelSave}
      />
      <Container>
        <div className="row my-4 text-start">
          <div>
            <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
              Back
            </Button>
          </div>
        </div>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Content</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            {id ? 'Edit' : 'Add new'} course
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Headline:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                label="Headline video"
                variant="outlined"
                fullWidth
                name="headline"
                onChange={OnHandleChange}
                value={fieldValues.headline}
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>
                Description:
                <br />
                (Optional)
              </b>
            </div>
            <TextField
              multiline
              rows={4}
              className="my-2 col-md col-12 mx-1"
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              onChange={OnHandleChange}
              value={fieldValues.description}
            />
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Category:</b>
            </div>
            <FormControl className="col mx-1 my-2">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                label="Category"
                name="category"
                onChange={(e) => setselectedCategory(e.target.value)}
                value={selectedCategory}
              >
                {categories?.map((val, ind) => (
                  <MenuItem key={val.id} value={val.id}>
                    {val.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Video Name:</b>
            </div>
            <TextField
              className="my-2 col-md col-12 mx-1"
              label="Video Name"
              variant="outlined"
              fullWidth
              name="video_name"
              onChange={OnHandleChange}
              value={fieldValues.video_name}
            />
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Preview image:</b>
            </div>

            <input
              className="col-md mx-1 col-12 form-control"
              type="file"
              onChange={handleThumbnailFile}
              ref={fileInputTumbnailRef}
              accept="image/*"
            />
          </div>
        </div>

        <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
          <div className="col-md-3 col-12 text-muted">
            <b>Video:</b>
          </div>
          <div className="col d-flex flex-wrap align-items-center">
            {(id && file) || file ? (
              <>
                <Typography>{fileName}</Typography>
                <Button
                  className="mx-2"
                  onClick={handleButtonClick}
                  startIcon={<Iconify icon="material-symbols:upload" />}
                >
                  Upload New File
                </Button>
                <Button
                  className="mx-2"
                  onClick={() => handleCancelDialogOpen()}
                  color="error"
                  startIcon={<Iconify icon="material-symbols:delete" />}
                >
                  Delete
                </Button>
                {/* Hidden file input element */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*"
                  style={{ display: 'none' }}
                  onChange={(file) => uploadNewfile(file)}
                />
              </>
            ) : (
              <div className="uploader-wrapper text-muted w-100">
                <FileUploader
                  className="col-12"
                  handleChange={(file) => handleFileChange(file)}
                  name="file"
                  types={fileTypes}
                >
                  <div
                    className="rounded-3 w-100 d-flex flex-wrap align-items-center justify-content-center  p-5"
                    style={{ borderStyle: 'dotted', borderWidth: '2px', borderColor: '#797979' }}
                    role="button"
                  >
                    <div className="w-100 text-center">
                      <Iconify style={{ opacity: '0.3' }} icon="material-symbols:upload" width="50px" height="50px" />
                    </div>
                    <Typography className="text-center w-100">Drag & drop your file here</Typography>
                    <b className="w-100 text-center">
                      Or browse files <Iconify className="text-primary" icon="ep:right" />
                    </b>
                  </div>
                </FileUploader>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="d-flex justify-content-end">
            <Button variant="outlined" onClick={() => handleCancelDialogOpen()} className="me-3">
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleOpenSaveDialog()}>
              Save changes
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
