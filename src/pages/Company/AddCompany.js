import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify/Iconify';
import {
  Typography,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  TextField,
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth } from 'src/Context/AuthContext';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from 'src/firebase';
import { TextNumCode } from 'src/components/Confirmations/CodeGenerator';
import axios from 'axios';

export default function EditAccount() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = location;
  const { selectedCompany, selectedSuperUser } = state || {};
  const { currentUser, createUser } = useAuth();
  useEffect(() => {
    if (!['supervisor', 'superuser'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [mainColor, setmainColor] = useState('#007BA4');
  const [bgColor, setbgColor] = useState('#EFF4FF');

  const [fieldValues, setFieldValues] = useState({
    Cname: id ? selectedCompany?.Cname : '',
    bank: id ? selectedCompany?.bank : '',
    bg_color: id ? selectedCompany?.bg_color : '',
    billing_address: id ? selectedCompany?.billing_address : '',
    billing_plan: id ? selectedCompany?.billing_plan : '',
    city: id ? selectedCompany?.city : '',
    country: id ? selectedCompany?.country : '',
    hrb: id ? selectedCompany?.hrb : '',
    iban: id ? selectedCompany?.iban : '',
    main_color: id ? selectedCompany?.main_color : '',
    payment_method: id ? selectedCompany?.payment_method : '',
    postalCode: id ? selectedCompany?.postalCode : '',
    street: id ? selectedCompany?.street : '',
    street_no: id ? selectedCompany?.street_no : '',
    surename: id ? selectedSuperUser?.surename : '',
    firstname: id ? selectedSuperUser?.firstname : '',
    ph_no: id ? selectedSuperUser?.ph_no : '',
    role: 'superuser',
    email: id ? selectedSuperUser?.email : '',
    password: id ? selectedSuperUser?.password : '',
    tax_no: id ? selectedCompany?.tax_no : '',
    ust_idnr: id ? selectedCompany?.ust_idnr : '',
    inovices: id ? selectedCompany?.inovices : '',
    languages: id ? selectedCompany?.languages : [],
  });

  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };

  const GenerateCode = () => {
    const CODE = TextNumCode();
    console.log(CODE);
    setFieldValues({ ...fieldValues, password: CODE });
  };

  const saveData = async () => {
    handleCloseSaveDialog();
    if (id) {
      const data = UPDATE_Company_Api();
      if (data) {
        // navigate(-1);
        return toast.success('Company Updated Successfully');
      } else {
        return toast.error('An error occurred while updating the company.');
      }
    } else {
      const data = POST_Company_Api();
      // POST_User_Api(data);

      if (data) {
        navigate(-1);
        return toast.success('Company Created Successfully');
      } else {
        return toast.error('An error occurred while creating the company.');
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
  console.log(fieldValues);

  const POST_User_Api = async (CId) => {
    const fieldsToRemove = ['password', 'firstname', 'email', 'role', 'surename', 'ph_no', 'languages'];

    let filteredFieldValues = {};

    Object.keys(fieldValues).forEach((key) => {
      if (fieldsToRemove.includes(key)) {
        filteredFieldValues[key] = fieldValues[key];
      }
    });

    try {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/addUser', {
        data: {
          email: fieldValues.email,
          password: fieldValues.password,
        },
      });
      filteredFieldValues.uid = UserAuth.data.result.uid;
      filteredFieldValues.status = true;
      filteredFieldValues.company_ref = doc(db, 'companies', CId);
      const responseFirestore = await setDoc(doc(db, 'users', UserAuth.data.result.uid), filteredFieldValues);
      return responseFirestore.uid;
    } catch (Error) {
      return await Error.code;
    }
  };

  const UPDATE_User_Api = async (e) => {
    const fieldsToRemove = ['password', 'firstname', 'email', 'role', 'surename', 'ph_no', 'languages'];

    let filteredFieldValues = {};

    Object.keys(fieldValues).forEach((key) => {
      if (fieldsToRemove.includes(key)) {
        filteredFieldValues[key] = fieldValues[key];
      }
    });
    try {
      if (selectedSuperUser.password !== filteredFieldValues.password) {
        const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/changeUserPassword', {
          data: {
            // uid: SelectedUser.id,
            newPassword: filteredFieldValues.password,
          },
        });
      }
      const UsersRef = doc(db, 'users', selectedSuperUser.id);

      const UpdatedUser = await updateDoc(UsersRef, filteredFieldValues);
      return true;
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };

  const POST_Company_Api = async (e) => {
    fieldValues.createdAt = new Date();
    fieldValues.status = true;

    const fieldsToRemove = [
      'bank',
      'bg_color',
      'billing_address',
      'billing_plan',
      'city',
      'country',
      'hrb',
      'iban',
      'invoices',
      'languages',
      'main_color',
      'payment_method',
      'ph_no',
      'postalCode',
      'street',
      'street_no',
      'surename',
      'tax_no',
      'ust_idnr',
      'Cname',
      'status',
      'createdAt',
      'inovices'
    ];

    const filteredFieldValues = {};

    Object.keys(fieldValues).forEach((key) => {
      if (fieldsToRemove.includes(key)) {
        filteredFieldValues[key] = fieldValues[key];
      }
    });
    try {
      console.log(filteredFieldValues);
      const CompanyRef = collection(db, 'companies');
      const responseFirestore = await addDoc(CompanyRef, filteredFieldValues);
      console.log(responseFirestore);
      POST_User_Api(responseFirestore.id);
      return responseFirestore.id;
    } catch (Error) {
      return await Error.code;
    }
  };

  const UPDATE_Company_Api = async (e) => {
    try {
      // const responseCreateUser = await createUser(fieldValues?.email, fieldValues?.password);
      // fieldValues?.uid = responseCreateUser.user.uid;
      const fieldsToRemove = [
        'bank',
        'bg_color',
        'billing_address',
        'billing_plan',
        'city',
        'country',
        'hrb',
        'iban',
        'inovices',
        'languages',
        'main_color',
        'payment_method',
        'postalCode',
        'street',
        'street_no',
        'tax_no',
        'ust_idnr',
        'Cname',
        'status',
        'createdAt',
      ];

      const filteredFieldValues = {};

      Object.keys(fieldValues).forEach((key) => {
        if (fieldsToRemove.includes(key)) {
          filteredFieldValues[key] = fieldValues[key];
        }
      });
      console.log(filteredFieldValues);
      const CompanyRef = doc(db, 'companies', id);
      updateDoc(CompanyRef, filteredFieldValues);

      UPDATE_User_Api();
      return true;
    } catch (Error) {
      console.log(Error);
      return Error;
    }
  };

  return (
    <div>
      <Helmet>
        <title> Company Account | Lauenroth</title>
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
            <Typography variant="h4">{id ? 'Edit' : 'Add new'} company</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Contact person
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Full name:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.surename}
                name="surename"
                className="my-2 col-md col-12 mx-1"
                label="Surname"
                variant="outlined"
                fullWidth
              />
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.firstname}
                name="firstname"
                className="my-2 col-md col-12 mx-1"
                label="First name"
                variant="outlined"
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
                onChange={OnHandleChange}
                value={fieldValues?.email}
                name="email"
                className="my-2 col-md col-12 mx-1"
                label="E-mail address"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Phone number:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.ph_no}
                name="ph_no"
                className="my-2 col-md col-12 mx-1"
                label="Phone number"
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

          <div id="companydetails" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Login code:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap align-items-center">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.password}
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
                New code
              </Button>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Company details
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Company name:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.Cname}
                name="Cname"
                className="my-2 col-md col-12 mx-1"
                label="Company name"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Street, street-no.:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.street}
                name="street"
                className="my-2 col mx-1"
                label="Street"
                variant="outlined"
                fullWidth
              />
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.street_no}
                name="street_no"
                className="my-2 col-3 mx-1"
                label="street-no"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Post code, city:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.postalCode}
                name="postalCode"
                className="my-2 col-4 mx-1"
                label="Post code"
                variant="outlined"
                fullWidth
              />
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.city}
                name="city"
                className="my-2 col mx-1"
                label="city"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Country:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.country}
                name="country"
                className="my-2 col-md col-12 mx-1"
                label="Country"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>HRB:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.hrb}
                name="hrb"
                className="my-2 col-md col-12 mx-1"
                label="HRB"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div id="colours" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Tax number:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.tax_no}
                name="tax_no"
                className="my-2 col-md col-12 mx-1"
                label="Tax number"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Ust-idNr.:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.ust_idnr}
                name="ust_idnr"
                className="my-2 col-md col-12 mx-1"
                label="Ust-idNr"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Company colours
          </Typography>

          <Typography id="languages" className="text-muted d-flex my-2">
            <div className="color-input">
              <div role="button" style={{ width: '25px', height: '25px', overflow: 'hidden', borderRadius: '50%' }}>
                <input
                  style={{ marginLeft: '-10px', borderRadius: '50%', marginTop: '-10px', height: '40px' }}
                  type="color"
                  onChange={OnHandleChange}
                  value={fieldValues?.main_color}
                  name="main_color"
                  className="border-0"
                ></input>
              </div>
            </div>
            Main colour: {fieldValues?.main_color}
          </Typography>
          <Typography className="text-muted d-flex my-2">
            <div className="color-input">
              <div role="button" style={{ width: '25px', height: '25px', overflow: 'hidden', borderRadius: '50%' }}>
                <input
                  style={{ marginLeft: '-10px', borderRadius: '50%', marginTop: '-10px', height: '40px' }}
                  type="color"
                  onChange={OnHandleChange}
                  value={fieldValues?.bg_color}
                  name="bg_color"
                  className="border-0"
                ></input>
              </div>
            </div>
            Background colour: {fieldValues?.bg_color}
          </Typography>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Languages
          </Typography>

          <div id="billing" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Languages:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={['English', 'Arabic', 'French', 'Italian', 'German', 'Hindi', 'Urdu', 'Spanish']}
                getOptionLabel={(option) => option}
                fullWidth
                onChange={(e, newValue) => OnHandleChange(e, newValue, 'languages')}
                value={fieldValues?.languages}
                name="languages"
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Languages" placeholder="Languages" />}
              />
            </div>
          </div>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Billing information
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Bank:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.bank}
                name="bank"
                className="my-2 col-md col-12 mx-1"
                label="Bank"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>IBAN:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.iban}
                name="iban"
                className="my-2 col-md col-12 mx-1"
                label="IBAN"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div id="billingplan" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Billing address:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                onChange={OnHandleChange}
                value={fieldValues?.billing_address}
                name="billing_address"
                className="my-2 col-md col-12 mx-1"
                label="Billing address"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Payment method:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <FormControl className="col-md col-12 mx-1">
                <InputLabel id="demo-select-small-label">Payment method</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Payment method"
                  name="payment_method"
                  onChange={OnHandleChange}
                  value={fieldValues?.payment_method}
                >
                  <MenuItem value={'Credit card'}>Credit card</MenuItem>
                  <MenuItem value={'Bank transfer'}>Bank transfer</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Billing plan
          </Typography>
          <div id="inovices" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Billing plan:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <FormControl className="col-md col-12 mx-1">
                <InputLabel id="demo-select-small-label">Billing plan</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Billing plan"
                  name="billing_plan"
                  onChange={OnHandleChange}
                  value={fieldValues?.billing_plan}
                >
                  <MenuItem value={'Starter'}>Starter</MenuItem>
                  <MenuItem value={'Professional'}>Professional</MenuItem>
                  <MenuItem value={'Premium'}>Premium</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Invoices
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Invoices:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <FormControl className="col-md col-12 mx-1">
                <InputLabel id="demo-select-small-label">Inovices</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  label="Inovices"
                  name="inovices"
                  onChange={OnHandleChange}
                  value={fieldValues?.inovices}
                >
                  <MenuItem value={'Monthly'}>Monthly</MenuItem>
                  <MenuItem value={'Yearly'}>Yearly</MenuItem>
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
