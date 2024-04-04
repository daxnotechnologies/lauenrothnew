import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Iconify from 'src/components/iconify/Iconify';
import { Typography, Button, Stack, IconButton, InputAdornment, Container, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
export default function EditAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const navigate = useNavigate();
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
    navigate('/dashboard/app/settings');
  };
  return (
    <div>
      <Helmet>
        <title> Edit Account Details | Lauenroth</title>
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
            <Typography variant="h3">Edit my account</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            Supervisor account
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Full name:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="Surname" variant="outlined" fullWidth />{' '}
              <TextField className="my-2 col-md col-12 mx-1" label="First name" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>E-mail address:</b>
            </div>
            <div id="password" className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="E-mail address" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Phone number:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="Phone number" variant="outlined" fullWidth />{' '}
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
            <div id="companydetails" className="col-md-9 col-12 d-flex flex-wrap align-items-center">
              <TextField
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
              />{' '}
              <Button variant="contained" className="py-3">
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
              <TextField className="my-2 col-md col-12 mx-1" label="Company name" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Street, street-no.:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col mx-1" label="Street" variant="outlined" fullWidth />{' '}
              <TextField className="my-2 col-3 mx-1" label="Street-no" variant="outlined" fullWidth />{' '}
            </div>
          </div>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Post code, city:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-4 mx-1" label="Post code" variant="outlined" fullWidth />{' '}
              <TextField className="my-2 col mx-1" label="City" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Country:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="Country" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>HRB:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="HRB" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Tax number:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="Tax number" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div id="billing" className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Ust-idNr.:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="Ust-idNr" variant="outlined" fullWidth />{' '}
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
              <TextField className="my-2 col-md col-12 mx-1" label="Bank" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>IBAN:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-23 mx-1" label="IBAN" variant="outlined" fullWidth />{' '}
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
