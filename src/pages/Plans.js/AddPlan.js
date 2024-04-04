import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { FileUploader } from 'react-drag-drop-files';
import { useAuth } from 'src/Context/AuthContext';

export default function AddPlan() {
  const [category, setCategory] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [planData, setPlanData] = useState([{ minUsers: 1, maxUsers: 10, price: 5 }]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!['supervisor'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setPlanData([
        { minUsers: 1, maxUsers: 10, price: 5 },
        { minUsers: 11, maxUsers: 20, price: 10 },
        { minUsers: 21, maxUsers: 30, price: 15 },
      ]);
    }
  }, [id]);

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
    handleCloseCancelDialog();
    navigate(-1);
  };

  const handleMaxUsersChange = (index, newValue) => {
    const updatedPlanData = [...planData];
    updatedPlanData[index].maxUsers = parseInt(newValue, 10);

    // If there's a next object, update its minUsers
    if (index < updatedPlanData.length - 1) {
      updatedPlanData[index + 1].minUsers = updatedPlanData[index].maxUsers + 1;
    }

    setPlanData(updatedPlanData);
  };

  const handlePriceChange = (index, newValue) => {
    const updatedPlanData = [...planData];
    updatedPlanData[index].price = newValue;
    setPlanData(updatedPlanData);
  };

  const onAddnewPrice = () => {
    const updatedPlanData = [...planData];

    const preMaxUser = (updatedPlanData[updatedPlanData.length - 1]?.maxUsers || 0) + 1;
    const maxUser = (updatedPlanData[updatedPlanData.length - 1]?.maxUsers || 0) + 10;
    updatedPlanData.push({ minUsers: preMaxUser, maxUsers: maxUser, price: '' });
    setPlanData(updatedPlanData);
  };
  const handleDeletePlan = (index) => {
    const updatedPlanData = [...planData];
    updatedPlanData.splice(index, 1); // Remove the plan at the specified index
    setPlanData(updatedPlanData);
  };
  return (
    <div>
      <Helmet>
        <title> {id ? 'Edit' : 'Add new'} plan details | Lauenroth</title>
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
            <Typography variant="h4">Plans</Typography>
          </div>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className=" my-3">
            {id ? 'Edit' : 'Add new'} plan
          </Typography>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Plan name:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField className="my-2 col-md col-12 mx-1" label="Plan name" variant="outlined" fullWidth />{' '}
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>Plan price:</b>
            </div>
            <div className="col-md-9 col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                type="number"
                label="Plan price"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify className="text-muted" icon="material-symbols:euro" />
                    </InputAdornment>
                  ),
                }}
              />{' '}
            </div>
          </div>

          {planData?.map((plan, index) => {
            return (
              <div className="d-flex align-items-center flex-wrap">
                <div key={index} className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
                  <div className="col-md-3 col-12 text-muted">
                    <b>User licence:</b>
                  </div>
                  <div className="me-2">
                    <p className="my-2 col-md col-12">{plan.minUsers} Users - </p>
                  </div>
                  <div className="col-md col-12 d-flex flex-wrap">
                    <TextField
                      className="my-2 col-md col-12 mx-1"
                      type="number"
                      label="Max users"
                      onChange={(e) => handleMaxUsersChange(index, e.target.value)}
                      variant="outlined"
                      value={plan.maxUsers}
                      fullWidth
                    />{' '}
                  </div>
                  <div className="col-md col-12 d-flex flex-wrap">
                    <TextField
                      className="my-2 col-md col-12 mx-1 me-3"
                      type="number"
                      label="Price"
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      value={plan.price}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Iconify className="text-muted" icon="material-symbols:euro" />
                          </InputAdornment>
                        ),
                      }}
                    />{' '}
                  </div>
                </div>
                <div className="me-2">
                  {index > 0 ? (
                    <Button
                      color="error"
                      startIcon={<Iconify icon="ic:baseline-delete" />}
                      onClick={() => handleDeletePlan(index)}
                    >
                      Delete
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          })}

          <div className=" my-2 col-md-8 d-flex align-items-center justify-content-end flex-wrap">
            <div className="col-md-6 text-end mx-1">
              <Button variant="contained" onClick={() => onAddnewPrice()} startIcon={<Iconify icon="mdi:add-bold" />}>
                New price range
              </Button>
            </div>
          </div>

          <div className=" my-2 col-md-8 d-flex align-items-center flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>User licence:</b>
            </div>
            <div className="me-2">
              <p className="my-2 col-md col-12">
                {' '}
                {'>'} {planData && planData[planData?.length - 1]?.maxUsers} Users{' '}
              </p>
            </div>
            <div className="col-md col-12 d-flex flex-wrap"></div>
            <div className="col-md col-12 d-flex flex-wrap">
              <TextField
                className="my-2 col-md col-12 mx-1"
                type="number"
                label="Price"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify className="text-muted" icon="material-symbols:euro" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className=" my-2 col-md-8 d-flex align-items-start flex-wrap">
            <div className="col-md-3 col-12 text-muted">
              <b>
                Description:
                <br />
                (Bullet points)
              </b>
            </div>
            <TextField
              multiline
              rows={6}
              className="my-2 col-md col-12 mx-1"
              label="Add copy here"
              variant="outlined"
              fullWidth
            />{' '}
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
