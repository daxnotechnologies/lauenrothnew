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
import { db, storage } from 'src/firebase';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function AddCategory() {
  const [category, setCategory] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [categories, setcategories] = useState([]);
  const [selectedCatgory, setselectedCatgory] = useState({});
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState(' ');
  const [fieldValues, setFieldValues] = useState({
    title: '',
    description: '',
    icon_url: '',
    show_team: true,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };

  const saveData = () => {
    handleCloseSaveDialog();
    const data = POST_Img_Api();
    console.log(data);
    if (data) {
      navigate(-1);
      return toast.success('Category Added Successfully');
    } else {
      navigate(-1);
      return toast.error('Error Occured while adding category');
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

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleCategoryChange = (e) => {
    setselectedCatgory(e.target.value);
  };

  const OnHandleChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(file);

  const POST_Img_Api = async (status) => {
    if (!/^https:\/\/\S+$/.test(file)) {
      const timestampInMilliseconds = Date.now();
      const storageRef = ref(storage, `categories/${fieldValues.title}_${timestampInMilliseconds}`);
      console.log(storageRef);
      const uploadTask = await uploadString(storageRef, file, 'data_url');
      console.log(uploadTask);
      const downloadURL = await getDownloadURL(storageRef);

      // Call POST_Posts_Api with the obtained image URL
      if (id) {
        return await UPDATE_Catgories_Api(downloadURL);
      } else {
        return await POST_Catgories_Api(downloadURL);
      }
    } else {
      if (id) {
        return await UPDATE_Catgories_Api();
      } else {
        return await POST_Catgories_Api('');
      }
    }
  };

  const UPDATE_Catgories_Api = async () => {
    console.log(selectedCatgory.id);
    try {
      const categoriesRef = doc(db, 'categories', selectedCatgory.id);
      await updateDoc(categoriesRef, fieldValues);
      return true;
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };

  const POST_Catgories_Api = async (img) => {
    try {
      fieldValues.icon_url = img;
      const categoriesRef = collection(db, 'categories');
      const responseFirestore = await addDoc(categoriesRef, fieldValues);
      console.log(responseFirestore);
      const SelectedcategoriesRef = doc(db, 'categories', responseFirestore.id);
      await updateDoc(SelectedcategoriesRef, { categories_ref: SelectedcategoriesRef });
      return responseFirestore.id;
    } catch (Error) {
      return await Error.code;
    }
  };

  useEffect(() => {
    if (id) {
      setFile(selectedCatgory.icon_url);
      setFieldValues({
        title: selectedCatgory.title,
        description: selectedCatgory.description,
        icon_url: selectedCatgory.icon_url,
        show_team: selectedCatgory.show_team,
      });
    }
  }, [selectedCatgory, id]);

  useEffect(() => {
    const GET_Categories_Api = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const querySnapshot = await getDocs(categoriesRef);
        // Extract data from the querySnapshot
        const newData = querySnapshot.docs.map((doc) => {
          const { categories_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
          return {
            id: doc.id,
            ...rest, // Spread the rest of the fields except company_ref
          };
        });
        console.log(newData);
        // Set the retrieved data in the state
        setcategories(newData);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };
    if (id) {
      GET_Categories_Api();
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title> {id ? 'Edit' : 'Add new'} Category Details | Lauenroth</title>
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
            <Typography variant="h4">Categories</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            {id ? 'Edit' : 'Add new'} category
          </Typography>
          {id && (
            <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
              <div className="col-md-3 col-12 text-muted">
                <b>Select category to edit:</b>
              </div>
              <FormControl className="col mx-1 my-2">
                <InputLabel id="demo-simple-select-label">Select category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCatgory.title}
                  fullWidth
                  label="Select category"
                  onChange={handleCategoryChange}
                >
                  {categories?.map((val, ind) => (
                    <MenuItem value={val} key={val.id}>
                      {val.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Title:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                label="Category title"
                variant="outlined"
                fullWidth
                name="title"
                value={fieldValues.title}
                onChange={OnHandleChange}
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
              value={fieldValues.description}
              onChange={OnHandleChange}
            />
          </div>

          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Icon image:</b>
            </div>

            <input
              className="col-md mx-1 col-12 form-control"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="image/*"
            />
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
