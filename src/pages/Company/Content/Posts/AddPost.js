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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage } from 'src/firebase';
import { ref, getDownloadURL, uploadBytesResumable, uploadString } from 'firebase/storage';
import { useAuth } from 'src/Context/AuthContext';

export default function AddPost() {
  const navigate = useNavigate();
  const { companyid, id } = useParams();
  const location = useLocation();
  console.log(location);
  const { state } = location;
  const { currentUser } = useAuth();

  const { selectedPost } = state || {};
  const [category, setCategory] = useState(false);
  console.log(selectedPost);
  const milliseconds = selectedPost?.release_date?.seconds * 1000 + selectedPost?.release_date?.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [saveDraftDialogOpen, setSaveDraftDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(id ? dayjs(date) : dayjs());
  const [selectedTime, setSelectedTime] = useState(id ? dayjs(date) : dayjs());
  const [categories, setcategories] = useState([]);
  const [postNow, setPostNow] = useState(false);
  const [file, setFile] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    headline: id ? selectedPost?.headline : '',
    category: id ? selectedPost?.category : '',
    body: id ? selectedPost?.body : '',
    content_url: id ? selectedPost?.content_url : '',
    release_date: id ? selectedPost?.release_date : '',
    status: id ? selectedPost?.status : '',
    posted_by: id ? selectedPost?.posted_by : currentUser.role,
  });

  useEffect(() => {
    if (id) {
      setFile(selectedPost.content_url);
    }
  }, []);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  const handlePostNowChange = (event) => {
    const isChecked = event.target.checked;
    setPostNow(isChecked);
    if (isChecked) {
      setSelectedTime(dayjs());
      setSelectedDate(dayjs());
    } else {
      setSelectedDate(id ? dayjs(date) : dayjs());
      setSelectedTime(id ? dayjs(date) : dayjs());
    }
  };

  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };

  const saveData = () => {
    handleCloseSaveDialog();
    return toast.success('Changes saved successfully');
  };
  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  const cancelSave = () => {
    handleCancelDialogOpen();
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const uploadNewfile = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Use FileReader to read the file and get a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the preview image URL to the result of FileReader
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const fileTypes = ['jpeg', 'jpg', 'png', 'gif'];

  const handleChange = (file) => {
    setFile(file);
  };
  const handleOpenSaveDraftDialog = () => {
    setSaveDraftDialogOpen(true);
  };

  const handleCloseSaveDraftDialog = () => {
    setSaveDraftDialogOpen(false);
  };

  const handleOpenPostDialog = () => {
    setPostDialogOpen(true);
  };

  const handleClosePostDialog = () => {
    setPostDialogOpen(false);
  };

  // ... (existing code)

  const saveDraft = () => {
    handleCloseSaveDraftDialog();
    const data = POST_Img_Api('draft');

    if (data) {
      navigate(-1);
      return toast.success('Draft saved successfully');
    } else {
      navigate(-1);
      return toast.error('Error Occuerd While saving Post Draft');
    }
  };

  const post = () => {
    handleClosePostDialog();
    let data;
    if (postNow) {
      data = POST_Img_Api('online');
    } else {
      data = POST_Img_Api('upcoming');
    }
    if (data) {
      navigate(-1);

      return toast.success('Post published successfully');
    } else {
      navigate(-1);

      return toast.error('Error Occuerd While saving Posting the Post');
    }
  };
  // const deleteFile = () => {
  //   setFile(null);
  //   toast.success('File Deleted Successfully');
  //   handleCloseCancelDialog();
  // };
  const POST_Img_Api = async (status) => {
    if (!/^https:\/\/\S+$/.test(file)) {
      const timestampInMilliseconds = Date.now();
      const storageRef = ref(storage, `categories/${companyid}/${fieldValues.headline}_${timestampInMilliseconds}`);
      console.log(storageRef);
      const uploadTask = await uploadString(storageRef, file, 'data_url');
      console.log(uploadTask);
      const downloadURL = await getDownloadURL(storageRef);

      // Call POST_Posts_Api with the obtained image URL
      if (id) {
        return await UPDATE_Posts_Api(downloadURL, status);
      } else {
        return await POST_Posts_Api(downloadURL, status);
      }
    } else {
      if (id) {
        return await UPDATE_Posts_Api('', status);
      } else {
        return await POST_Posts_Api('', status);
      }
    }
  };
  const UPDATE_Posts_Api = async (imageUrl, status) => {
    try {
      const dateTimeTimestamp = selectedDate
        .set('hour', selectedTime.hour())
        .set('minute', selectedTime.minute())
        .set('second', selectedTime.second())
        .valueOf();

      console.log(dateTimeTimestamp);
      try {
        fieldValues.createdAt = new Date();
        fieldValues.status = status;
        fieldValues.release_date = new Date(dateTimeTimestamp);
        fieldValues.content_url = imageUrl || fieldValues.content_url;
        const PostsRef = doc(db, 'posts', id);
        await updateDoc(PostsRef, fieldValues);
        return true;
      } catch (Error) {
        console.log(Error);
        return Error;
      }
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };
  const POST_Posts_Api = async (imageUrl, status) => {
    const dateTimeTimestamp = selectedDate
      .set('hour', selectedTime.hour())
      .set('minute', selectedTime.minute())
      .set('second', selectedTime.second())
      .valueOf();

    console.log(dateTimeTimestamp);
    try {
      fieldValues.createdAt = new Date();
      fieldValues.status = status;
      fieldValues.release_date = new Date(dateTimeTimestamp);
      fieldValues.content_url = imageUrl; // Use the provided image URL
      fieldValues.company_ref = doc(db, 'companies', companyid);
      const PostsRef = collection(db, 'posts');
      const responseFirestore = await addDoc(PostsRef, fieldValues);
      const postRef = doc(db, 'posts', responseFirestore.id);
      await updateDoc(postRef, { post_ref: postRef });
      return responseFirestore.id;
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };

  const OnHandleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // const UPDATE_User_Api = async (e) => {
  //   try {
  //     // const responseCreateUser = await createUser(fieldValues.email, fieldValues.password);
  //     // fieldValues.uid = responseCreateUser.user.uid;
  //     const UsersRef = doc(db, 'users', id);

  //     const UpdatedUser = await updateDoc(UsersRef, fieldValues);
  //     return true;
  //   } catch (Error) {
  //     console.log(Error);
  //     return Error;
  //   }
  // };
  const GET_Categories_Api = async () => {
    try {
      const categoriesRef = collection(db, 'categories');
      const querySnapshot = await getDocs(categoriesRef);
      const companycategories = [];
      querySnapshot.forEach((doc) => {
        companycategories.push({ ...doc.data(), id: doc.id });
      });
      setcategories(companycategories);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GET_Categories_Api();
  }, []);
  return (
    <div>
      <Helmet>
        <title> {id ? 'Edit' : 'Add'} Post Details | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to save changes as draft?"
        subtitle={'Changes will be saved as draft.'}
        open={saveDraftDialogOpen}
        onClose={handleCloseSaveDraftDialog}
        onConfirm={saveDraft}
      />
      <Confirm
        title="Are you sure you want to publish this post?"
        subtitle={'The post will be published.'}
        open={postDialogOpen}
        onClose={handleClosePostDialog}
        onConfirm={post}
      />
      <Confirm
        title="Are you sure you want to cancel?"
        subtitle={'Changes will not be saved.'}
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onConfirm={() => navigate(-1)}
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
            <Typography variant="h4">Posts</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            {id ? 'Edit' : 'Add new'} post
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Headline:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                value={fieldValues.headline}
                name="headline"
                onChange={OnHandleChange}
                className="my-2 col-md col-12 mx-1"
                label="Headline Post"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Category:</b>
            </div>
            <FormControl className="my-2 col mx-1">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                label="Category"
                value={fieldValues.category}
                name="category"
                onChange={OnHandleChange}
              >
                {categories.map((val, ind) => {
                  return <MenuItem value={val.title}>{val.title}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Body copy:</b>
            </div>
            <TextField
              multiline
              rows={4}
              className="my-2 col-md col-12 mx-1"
              label="Add copy here"
              variant="outlined"
              fullWidth
              value={fieldValues.body}
              name="body"
              onChange={OnHandleChange}
            />
          </div>

          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Image:</b>
            </div>
            <div className="col d-flex flex-wrap align-items-center">
              {(id && file) || file ? (
                <>
                  <img src={file} width={'55px'} />
                  <Button
                    className="mx-2"
                    onClick={handleButtonClick}
                    startIcon={<Iconify icon="material-symbols:upload" />}
                  >
                    Upload new file
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
                    accept="image/*"
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

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Release date:</b>
            </div>
            <div className="col d-flex flex-wrap align-items-center justify-content-between">
              <LocalizationProvider className="col-md col-12 my-2 mx-3" dateAdapter={AdapterDayjs}>
                <DatePicker label="Date" value={selectedDate} onChange={handleDateChange} disabled={postNow} />
              </LocalizationProvider>
              <LocalizationProvider className="col-md col-12 my-2 mx-3" dateAdapter={AdapterDayjs}>
                <MobileTimePicker label="Time" value={selectedTime} onChange={handleTimeChange} disabled={postNow} />
              </LocalizationProvider>
            </div>
          </div>

          <div className="row my-2">
            <div>
              <FormControlLabel control={<Checkbox onChange={handlePostNowChange} />} label="Post now" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-end">
            <Button variant="outlined" onClick={() => handleCancelDialogOpen()} className="me-3">
              Cancel
            </Button>
            <Button variant="contained" onClick={() => handleOpenSaveDraftDialog()} className="me-3">
              Save draft
            </Button>
            <Button variant="contained" onClick={() => handleOpenPostDialog()}>
              Post
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
