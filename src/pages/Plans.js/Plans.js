import { Button, Container, Popover, MenuItem, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from 'src/Context/AuthContext';
import Confirm from 'src/components/Confirmations/Confirm';
import Iconify from 'src/components/iconify/Iconify';

export default function Plans() {
  const [open, setOpen] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [planData, setPlanData] = useState([false, false, false]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!['supervisor'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleOpenActivateDialog = () => {
    setActivateDialogOpen(true);
  };

  const handleCloseActivateDialog = () => {
    setActivateDialogOpen(false);
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteData = () => {
    toast.success('Plan deleted successfully');
    handleCloseDeleteDialog();
  };
  const activatePlan = () => {
    var plans = planData;
    plans[selectedPlan] = !plans[selectedPlan];
    setPlanData(plans);
    toast.success(plans[selectedPlan] == false ? 'Plan activated successfully' : 'Plan deactivate successfully');
    handleCloseMenu();
    handleCloseActivateDialog();
  };
  return (
    <>
      <Helmet>
        <title> Plans | Lauenroth </title>
      </Helmet>
      <Confirm
        title="Are you sure you want to delete this plan?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={deleteData}
      />
      <Confirm
        title={
          planData[selectedPlan] == true
            ? 'Are you sure you want to activate this plan?'
            : 'Are you sure you want to deactivate this plan?'
        }
        subtitle={'Changes will be permanent.'}
        open={activateDialogOpen}
        onClose={handleCloseActivateDialog}
        onConfirm={activatePlan}
      />
      <Container>
        <Typography variant="h3" mt={5} sx={{ mb: 5 }}>
          Plans
        </Typography>
        <Typography className="text-muted my-2">
          This page shows the current and active pricing plans. You can edit and add plans here.
        </Typography>
        <div className="row d-flex my-4 text-justify flex-wrap justify-items-between">
          <div className="col">
            <Typography variant="h4">3 active plans</Typography>
          </div>
          <div className="col d-flex justify-content-end flex-wrap">
            <Link to="/dashboard/plans/add_plan">
              <Button variant="contained" className="">
                <Iconify icon="mdi:add-bold" className="me-1" /> Add new plan
              </Button>
            </Link>
          </div>
        </div>

        <div className="row d-flex flex-wrap justify-content-between">
          <div className="col-lg-4 col-md-6 col-12 text-start my-2 d-flex justify-content-md-start justify-content-center">
            <div
              className="col-10 p-4 rounded"
              style={{ height: '100%', backgroundColor: planData[0] ? '#ccccc8' : '#EFF4FF' }}
            >
              <div className="d-flex align-items-start mb-4">
                <div className="col text-center">
                  <Typography variant="h3" className="text-center">
                    Starter
                  </Typography>
                  <Typography color="primary" className="text-center" variant="h5">
                    Free of charge
                    <br />
                    <br />
                  </Typography>
                </div>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(event) => {
                    handleOpenMenu(event);
                    setSelectedPlan(0);
                  }}
                >
                  <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                2 languages: English, German
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                2 levels: content admin, user
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Courses: 1 video per category
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                How-to videos upon request
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 text-start my-2 d-flex justify-content-md-center justify-content-center">
            <div
              className="col-10 p-4 rounded"
              style={{ height: '100%', backgroundColor: planData[1] ? '#ccccc8' : '#EFF4FF' }}
            >
              <div className="d-flex align-items-start mb-4">
                <div className="col ">
                  <Typography variant="h3" className="text-center">
                    Professional
                  </Typography>
                  <Typography color="primary" className="text-center" variant="h5">
                    xx € monthly
                    <br />
                    +xx € license per user
                  </Typography>
                </div>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(event) => {
                    handleOpenMenu(event);
                    setSelectedPlan(1);
                  }}
                >
                  <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                3 languages
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                2 levels: content admin, user
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Courses: 1 video per category
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                How-to videos upon request
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Optional: videos for selected category (extra charge)
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Access up to 100 employees
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 text-start my-2 d-flex justify-content-md-end justify-content-center">
            <div
              className="col-10 p-4 rounded"
              style={{ height: '100%', backgroundColor: planData[2] ? '#ccccc8' : '#EFF4FF' }}
            >
              <div className="d-flex align-items-start mb-4">
                <div className="col ">
                  <Typography variant="h3" className="text-center">
                    Premium
                  </Typography>
                  <Typography color="primary" className="text-center" variant="h5">
                    xx € monthly
                    <br />
                    <br />
                  </Typography>
                </div>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={(event) => {
                    handleOpenMenu(event);
                    setSelectedPlan(2);
                  }}
                >
                  <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                3 languages
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                2 levels: content admin, user
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Courses: 1 video per category
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                How-to videos upon request
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Optional: videos for selected category (extra charge)
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Access up to 100 employees
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                Workshops
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                2 x per year live-tour
              </div>
              <div className="d-flex my-4 text-justify">
                <div>
                  <Iconify icon="mdi:tick" className="me-2 text-secondary" width="30px" height="30px" />
                </div>
                2 x per year Flat rate in the first year: Licenses for app use per employee and month
              </div>
            </div>
          </div>
        </div>
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem className="popover-item" onClick={() => navigate('/dashboard/plans/add_plan/1')}>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          {planData[selectedPlan] === false ? (
            <MenuItem className="popover-item" onClick={() => handleOpenActivateDialog()}>
              <Iconify icon={'tabler:ban'} sx={{ mr: 2 }} />
              Deactivate
            </MenuItem>
          ) : (
            <MenuItem onClick={() => handleOpenActivateDialog()}>
              <Iconify icon={'gg:check-o'} sx={{ mr: 2 }} />
              Activate
            </MenuItem>
          )}

          <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteDialog()}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </Container>
    </>
  );
}
