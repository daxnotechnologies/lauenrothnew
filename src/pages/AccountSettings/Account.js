import React from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import UserAvatar from './UserAvatar';
import Notifications from './Notifications';
import { HashLink as Link } from 'react-router-hash-link';

const Account = () => {
  return (
    <div>
      <Helmet>
        <title> Account Details | Lauenroth</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            My profile
          </Typography>
        </Stack>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Account information</Typography>

            <Typography variant="h4">Lauenroth GmbH</Typography>
          </div>
          <div className="col-sm-2">
            <Link to="/dashboard/app/edit-account">
              <Button variant="contained" className="">
                Edit
              </Button>
            </Link>
          </div>
        </div>
        <UserAvatar currentImg={'/assets/images/avatars/avatar_default.jpg'} />

        <div className="row mb-5">
          <Typography variant="h5" className="text-muted mb-3">
            Supervisor account
            <Link smooth to="/dashboard/app/edit-account">
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
            <b>Full name:</b> Lauenroth GmbH
          </Typography>
          <Typography className="text-muted">
            <b>Email:</b> Lauenroth@gmail.com
          </Typography>
          <Typography className="text-muted">
            <b>Phone:</b> +1234567890
          </Typography>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Password
            <Link smooth to="/dashboard/app/edit-account#password">
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

          <Typography className="text-muted">********</Typography>
        </div>

        <div className="row my-5">
          <Typography variant="h5" className="text-muted my-3">
            Company details
            <Link smooth to="/dashboard/app/edit-account#companydetails">
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

          <Typography className="text-muted">Lauenroth GmbH</Typography>
          <Typography className="text-muted">Schnetzen 1/1</Typography>
          <Typography className="text-muted">Xxxx Berg</Typography>
          <Typography className="text-muted">Germany</Typography>
          <Typography className="text-muted mt-4">HRB</Typography>
          <Typography className="text-muted">St-Nr.</Typography>
          <Typography className="text-muted">Ust-IdNr</Typography>
        </div>

        <div className="row d-flex my-5 flex-wrap justify-items-between">
          <div className="col-sm-10 my-3">
            <Typography variant="h4">Billing information</Typography>
          </div>
          <div className="col-sm-2">
            <Link smooth to="/dashboard/app/edit-account#billing">
              <Button variant="contained" className="">
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="row mb-5 mt-3">
          <Typography variant="h5" className="text-muted mb-3">
            Billing information
            <Link smooth to="/dashboard/app/edit-account#billing">
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

          <Typography className="text-muted">Bank</Typography>
          <Typography className="text-muted">IBAN</Typography>
        </div>

        <Notifications />
      </Container>
    </div>
  );
};

export default Account;
