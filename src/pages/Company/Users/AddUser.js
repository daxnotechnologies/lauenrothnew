import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify/Iconify';
import { Typography, Button, Stack, IconButton, InputAdornment, Container, TextField } from '@mui/material';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuth } from 'src/Context/AuthContext';
import { db } from 'src/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { TextNumCode } from 'src/components/Confirmations/CodeGenerator';
import axios from 'axios';

export default function AddUser() {
  const { companyId, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { SelectedUser } = state || {};
  const [showPassword, setShowPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    surename: id ? SelectedUser?.surename : '',
    firstname: id ? SelectedUser?.firstname : '',
    email: id ? SelectedUser?.email : '',
    ph_no: id ? SelectedUser?.ph_no : '',
    languages: id ? SelectedUser?.languages : [],
    role: id ? SelectedUser?.role : '',
    password: id ? SelectedUser?.password : '',
  });
  const [role, setRole] = React.useState('');
  const { currentUser, createUser } = useAuth();
  useEffect(() => {
    if (!['supervisor', 'superuser'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };
  const saveData = async () => {
    if (!id) {
      const Data = await POST_User_Api();
      handleCloseSaveDialog();
      if (Data === 'auth/email-already-in-use') {
        toast.error('Email address is already in use.');
      } else if (Data) {
        toast.success('User Created Successfully');
        navigate(-1);
      } else {
        console.error('Error creating user:', Data);
        toast.error('An error occurred while creating user.');
      }
    } else {
      const Data = await UPDATE_User_Api();
      console.log(Data);
      handleCloseSaveDialog();
      if (Data) {
        toast.success('User Updated Successfully');
        navigate(-1);
      } else {
        console.error('Error updateing user:', Data);
        toast.error('An error occurred while Updating user.');
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
    handleCancelDialogOpen();
    navigate(-1);
  };

  const GenerateCode = () => {
    const CODE = TextNumCode();
    console.log(CODE);
    setFieldValues({ ...fieldValues, password: CODE });
  };

  const OnHandleChange = (e, newValue, fieldname) => {
    console.log(newValue);
    const value = newValue !== null ? newValue : ''; // Handle null newValue for Autocomplete
    if (fieldname === 'languages') {
      setFieldValues((prevState) => ({
        ...prevState,
        [fieldname]: value,
      }));
    } else {
      const { name, value } = e.target;
      setFieldValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const POST_User_Api = async (e) => {
    try {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/addUser', {
        data: {
          email: fieldValues.email,
          password: fieldValues.password,
        },
      });
      fieldValues.uid = UserAuth.data.result.uid;
      fieldValues.createdAt = new Date();
      fieldValues.company_ref = doc(db, 'companies', companyId);
      fieldValues.user_ref = doc(db, 'users', UserAuth.data.result.uid);
      fieldValues.status = true;
      const responseFirestore = await setDoc(doc(db, 'users', UserAuth.data.result.uid), fieldValues);
      return UserAuth.data.result.uid;
    } catch (Error) {
      return await Error.code;
    }
  };

  const UPDATE_User_Api = async (e) => {
    try {
      // const responseCreateUser = await createUser(fieldValues.email, fieldValues.password);
      // fieldValues.uid = responseCreateUser.user.uid;
      if (SelectedUser.password !== fieldValues.password) {
        const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/changeUserPassword', {
          data: {
            uid: SelectedUser.id,
            newPassword: fieldValues.password,
          },
        });
      }
      const UsersRef = doc(db, 'users', id);

      const UpdatedUser = await updateDoc(UsersRef, fieldValues);
      return true;
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };

  console.log(fieldValues);

  return (
    <div>
      <Helmet>
        <title> User Account | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to save changes?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseSaveDialog}
        onConfirm={saveData}
      />
      <Confirm
        title="Are you sure you want to cancel?"
        subtitle={'Changes will be unsaved.'}
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onConfirm={cancelSave}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <div className="w-100">
            <Link onClick={() => navigate(-1)}>
              <Button>
                <Iconify className="me-1" icon="ion:caret-back-outline" />
                Back
              </Button>
            </Link>
          </div>
        </Stack>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">{id ? 'Edit' : 'Add new'} user</Typography>
            {/* <Typography className="mt-3" variant="h4">Company: company name</Typography> */}
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Personal information
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Full name:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                label="Surname"
                name="surename"
                variant="outlined"
                onChange={OnHandleChange}
                value={fieldValues.surename}
                fullWidth
              />
              <TextField
                className="my-2 col-md col-12 mx-1"
                label="First name"
                name="firstname"
                variant="outlined"
                onChange={OnHandleChange}
                value={fieldValues.firstname}
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>E-mail address:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                label="E-mail address"
                name="email"
                onChange={OnHandleChange}
                value={fieldValues.email}
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div id="password" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Phone number:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                label="Phone number"
                onChange={OnHandleChange}
                value={fieldValues.ph_no}
                name="ph_no"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Password
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Login code:</b>
            </div>
            <div id="languages" className="col-md-9 col-12 d-flex flex-wrap align-items-center">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues.password}
                name="password"
                label="Password"
                className="col-md col-12 mx-1 my-2"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" className="py-3" onClick={GenerateCode}>
                <Iconify className="me-1" icon="fa:repeat" />
                New Code
              </Button>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Languages
          </Typography>

          <div id="languages" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Languages:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <Autocomplete
                multiple
                // disabled={id ? true : false}
                id="tags-outlined"
                options={['English', 'Arabic', 'French', 'Italian', 'German', 'Hindi', 'Urdu', 'Spanish']}
                getOptionLabel={(option) => option}
                fullWidth
                onChange={(e, newValue) => OnHandleChange(e, newValue, 'languages')}
                value={fieldValues.languages}
                name="languages"
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} name="languages" label="Languages" placeholder="Languages" />
                )}
              />
            </div>
          </div>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Role
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Role:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
                  name="role"
                  onChange={OnHandleChange}
                  value={fieldValues.role}
                >
                  <MenuItem value={'User'}>User</MenuItem>
                  <MenuItem value={'ContentAdmin'}>Content Admin</MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'SuperAdmin'}>Super Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
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
