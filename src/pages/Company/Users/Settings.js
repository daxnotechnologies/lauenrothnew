import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container, Switch } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import UserAvatar from '../../AccountSettings/UserAvatar';
import { toast } from 'react-toastify';

import Menu from '../Menu';
import { HashLink as Link } from 'react-router-hash-link';
import { useAuth } from 'src/Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
import axios from 'axios';
const Settings = () => {
  const { state } = useLocation();
  const { SelectedUser, selectedCompany } = state || {};
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!['supervisor', 'superuser'].includes(currentUser.role)) {
      navigate('404');
    }
  });
  const [mainColor, setmainColor] = useState('#007BA4');
  const [bgColor, setbgColor] = useState('#EFF4FF');
  const [UserDeatils, setUserDeatils] = useState(SelectedUser);
  console.log(SelectedUser, selectedCompany);
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

  const DELETE_User_Api = async () => {
    try {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/deleteUser', {
        data: {
          uid: SelectedUser.id,
        },
      });
      await deleteDoc(doc(db, 'users', SelectedUser.id));
      toast.success('User Deleted Successfully');
    } catch (err) {
      console.log(err);
      toast.error('An error occurred while creating user.');
    }
  };

  const DE_ACTIVATE_User_Api = async () => {
    const updatedUserDetails = {
      ...SelectedUser,
      status: !UserDeatils.status,
    };
    setUserDeatils(updatedUserDetails);
    const CompanyRef = doc(db, 'users', SelectedUser.id);

    // Toggle the status
    const newStatus = updatedUserDetails.status;
    if (newStatus === true) {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/enableUser', {
        data: {
          uid: SelectedUser.id,
        },
      });
    } else {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/disableUser', {
        data: {
          uid: SelectedUser.id,
        },
      });
    }
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

  const OnClickDelete = () => {
    DELETE_User_Api();
    navigate(-1);
  };
  return (
    <div>
      <Helmet>
        <title> Company Details | Lauenroth</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            {selectedCompany.Cname}
          </Typography>
        </Stack>

        <Menu page="users" selectedCompany={selectedCompany} />
        <div className="row d-flex mt-5 mb-4 flex-wrap justify-items-between">
          <div className="col-md-5">
            <Typography variant="h4">User name</Typography>
          </div>
          <div className="col-md-7 d-flex align-items-ceenter justify-content-md-end">
            {!['admin'].includes(currentUser.role) && (
              <Typography className="text-muted fst-italic">
                Active account since {converttimestamp(SelectedUser?.lastActive?.seconds)}
                <Switch checked={UserDeatils.status} onChange={DE_ACTIVATE_User_Api} color="success" />
              </Typography>
            )}
            <Link to={`/dashboard/company/edit_company_user/${SelectedUser.id}`} state={{ SelectedUser }}>
              <Button variant="contained" className="mx-2">
                Edit
              </Button>
            </Link>
            <Button variant="contained" color="error" className="mx-2" onClick={OnClickDelete}>
              Delete
            </Button>
          </div>
        </div>
        {/* <UserAvatar
          currentImg={
            'https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/mascot-logo-design/mascot-logo-design_fb-img_1200x800.jpg'
          }
        /> */}

        <div className="row mb-5">
          <Typography variant="h5" className="text-muted my-3">
            User details
            <Link smooth to={`/dashboard/company/edit_company_user/${SelectedUser.id}`} state={{ SelectedUser }}>
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
            {SelectedUser.firstname}, {SelectedUser.surename}
          </Typography>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Password
            <Link
              smooth
              to={`/dashboard/company/edit_company_user/${SelectedUser.id}#password`}
              state={{ SelectedUser }}
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

          <Typography className="text-muted"> {SelectedUser.password}</Typography>
        </div>
        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            User role
            <Link smooth to={`/dashboard/company/edit_company_user/${SelectedUser.id}#role`} state={{ SelectedUser }}>
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

          <Typography className="text-muted">{SelectedUser.role}</Typography>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Languages
            <Link
              smooth
              to={`/dashboard/company/edit_company_user/${SelectedUser.id}#languages`}
              state={{ SelectedUser }}
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

          {SelectedUser?.languages?.map((val, ind) => {
            return (
              <Typography key={ind} className="text-muted">
                {val}
              </Typography>
            );
          })}
        </div>

        {/* <Notifications /> */}
      </Container>
    </div>
  );
};

export default Settings;
