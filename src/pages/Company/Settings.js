import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container, Switch } from '@mui/material';
import Confirm from 'src/components/Confirmations/Confirm';

import { Helmet } from 'react-helmet-async';
import UserAvatar from '../AccountSettings/UserAvatar';
import { HashLink as Link } from 'react-router-hash-link';
import Menu from './Menu';
import { toast } from 'react-toastify';
import { useAuth } from 'src/Context/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from 'src/firebase';
const Settings = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  console.log(location);
  const { state } = location;

  const { selectedCompany, selectedSuperUser } = state || {};
  useEffect(() => {
    if (!['supervisor', 'superuser'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);
  const [mainColor, setmainColor] = useState(selectedCompany.main_color);
  const [bgColor, setbgColor] = useState(selectedCompany.bg_color);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(selectedCompany);
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const saveData = () => {
    handleCloseDeleteDialog();
    DELETE_Comany_Api();
    navigate('/dashboard/company/companies');
  };
  const converttimestamp = (timestampSeconds) => {
    if (timestampSeconds) {
      console.log(timestampSeconds);
      const timestampMilliseconds = timestampSeconds * 1000;

      // Create a new Date object using the timestamp
      const dateObject = new Date(timestampMilliseconds);

      // Extract the date part
      const dateOnly = dateObject.toISOString().split('T')[0];

      return dateOnly;
    }
    return true;
  };

  const DELETE_Comany_Api = async () => {
    const CompanyRef = doc(db, 'companies', selectedCompany.id);
    try {
      // Update the document in the database
      await deleteDoc(CompanyRef);

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      return toast.success('Company Deleted Successfully');
    } catch (error) {
      console.error('Error Deleting company status:', error);
      return toast.error('Error occured while Deleting Company');
    }
  };

  const DEACTIVATE_Comany_Api = async () => {
    const updatedCompanyDetails = {
      ...companyDetails,
      status: !companyDetails.status,
    };
    setCompanyDetails(updatedCompanyDetails);
    const CompanyRef = doc(db, 'companies', selectedCompany.id);

    // Toggle the status
    const newStatus = !companyDetails.status;

    try {
      // Update the document in the database
      await updateDoc(CompanyRef, { status: newStatus });

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      if (newStatus === true) {
        return toast.success('Company Activated Successfully');
      } else {
        return toast.success('Company Deactivated Successfully');
      }
    } catch (error) {
      console.error('Error Deactivating company status:', error);
      return toast.error('Error occured while Deactivating Company');
    }
  };

  return (
    <div>
      <Helmet>
        <title> Company Details | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to delete this account?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={saveData}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={5} mb={3}>
          <Typography variant="h3" gutterBottom>
            {selectedCompany.Cname}
          </Typography>
        </Stack>

        <Menu page="settings" selectedCompany={selectedCompany} />
        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-md-5">
            <Typography variant="h4">Account information</Typography>
          </div>
          <div className="col-md-7 d-flex align-items-ceenter justify-content-md-end">
            <Typography className="text-muted fst-italic">
              Active account since {converttimestamp(selectedCompany?.createdAt?.seconds)}
              <Switch checked={companyDetails.status} onChange={DEACTIVATE_Comany_Api} color="success" />
            </Typography>
            <Link
              smooth
              to={`/dashboard/company/editcompany/${selectedCompany.id}`}
              state={{ selectedCompany: selectedCompany, selectedSuperUser }}
            >
              <Button variant="contained" className="mx-2">
                Edit
              </Button>
            </Link>

            <Button onClick={() => handleOpenDeleteDialog()} variant="contained" color="error" className="mx-2">
              Delete
            </Button>
          </div>
        </div>
        <UserAvatar currentImg={selectedCompany?.logo_url || '/assets/images/avatars/logo.png'} />

        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Company colours
            <Link
              smooth
              to={`/dashboard/company/editcompany/${selectedCompany.id}#colours`}
              state={{ selectedCompany }}
            >
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>

          <Typography className="text-muted d-flex my-2">
            <div
              role="button"
              style={{ width: '25px', height: '25px', marginRight: '15px', overflow: 'hidden', borderRadius: '50%' }}
            >
              <input
                style={{ marginLeft: '-10px', marginTop: '-10px', height: '40px' }}
                type="color"
                value={mainColor}
                disabled
                onChange={(e) => setmainColor(e.target.value)}
                className="border-0"
              ></input>
            </div>
            Main colour: {selectedCompany.main_color}
          </Typography>
          <Typography className="text-muted d-flex my-2">
            <div
              role="button"
              style={{ width: '25px', height: '25px', marginRight: '15px', overflow: 'hidden', borderRadius: '50%' }}
            >
              <input
                style={{ marginLeft: '-10px', marginTop: '-10px', height: '40px' }}
                type="color"
                value={bgColor}
                disabled
                onChange={(e) => setbgColor(e.target.value)}
                className="border-0"
              ></input>
            </div>
            Background colour: {selectedCompany.bg_color}
          </Typography>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Contact person
            <Link smooth to={`/dashboard/company/editcompany/${selectedCompany.id}`} state={{ selectedCompany }}>
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>

          <Typography className="text-muted">
            {selectedSuperUser?.surename}&nbsp;
            {selectedSuperUser?.firstname}
          </Typography>
          <Typography className="text-muted">{selectedSuperUser?.email}</Typography>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Company details
            <Link
              smooth
              to={`/dashboard/company/editcompany/${selectedCompany.id}#companydetails`}
              state={{ selectedCompany }}
            >
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>

          <Typography className="text-muted">{selectedCompany.Cname}</Typography>
          <Typography className="text-muted">{selectedCompany.street}</Typography>
          <Typography className="text-muted">{selectedCompany.city}</Typography>
          <Typography className="text-muted">{selectedCompany.country}</Typography>
          <Typography className="text-muted mt-4">{selectedCompany.hrb}</Typography>
          <Typography className="text-muted">{selectedCompany.street_no}</Typography>
          <Typography className="text-muted">{selectedCompany.ust_idnr}</Typography>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Languages
            <Link to={`/dashboard/company/editcompany/${selectedCompany.id}#languages`} state={{ selectedCompany }}>
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>
          {selectedCompany?.languages?.map((val, ind) => (
            <Typography className="text-muted">{val}</Typography>
          ))}
        </div>
        <div className="row d-flex my-5 flex-wrap justify-items-between">
          <div className="col-sm-7">
            <Typography variant="h4">Billing information</Typography>
          </div>
          <div className="col-sm-5 text-end">
            <Link to={`/dashboard/company/editcompany/${selectedCompany.id}#billing`} state={{ selectedCompany }}>
              <Button variant="contained" className="mx-2">
                Edit
              </Button>
            </Link>
            <Link smooth to="/dashboard/billings">
              <Button variant="contained" className="mx-2">
                Invoices
              </Button>
            </Link>
          </div>
        </div>

        <div className="row mb-5 ">
          <Typography variant="h5" className="text-muted mb-3">
            Payment details
            <Link to={`/dashboard/company/editcompany/${selectedCompany.id}#billing`} state={{ selectedCompany }}>
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>

          <Typography className="text-muted">{selectedCompany.bank}</Typography>
          <Typography className="text-muted">{selectedCompany.iban}</Typography>
          <Typography className="text-muted">{selectedCompany.ust_idnr}</Typography>
          <Typography className="text-muted">Billing address:{selectedCompany.billing_address}</Typography>
          <Typography className="text-muted mt-4 fst-italic">
            Payment method: {selectedCompany.payment_method}
          </Typography>
        </div>
        <div className="row mb-5 mt-4">
          <Typography variant="h5" className="text-muted mb-3">
            Billing plan
            <Link to={`/dashboard/company/editcompany/${selectedCompany.id}#billingplan`} state={{ selectedCompany }}>
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>

          <Typography className="text-muted">{selectedCompany.billing_address}</Typography>
        </div>
        <div className="row mb-5 mt-4">
          <Typography variant="h5" className="text-muted mb-3">
            Inovices
            <Link to={`/dashboard/company/editcompany/${selectedCompany.id}#inovices`} state={{ selectedCompany }}>
              <Iconify
                className="ms-4 my-auto text-primary"
                width="30px"
                role="button"
                height="30px"
                icon="tabler:arrow-up"
                rotate="90deg"
              ></Iconify>
            </Link>
          </Typography>

          <Typography className="text-muted">{selectedCompany.inovices}</Typography>
        </div>

        {/* <Notifications /> */}
      </Container>
    </div>
  );
};

export default Settings;
