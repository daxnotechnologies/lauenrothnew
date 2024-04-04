import React from 'react';
import { makeStyles } from '@mui/styles';
import Iconify from 'src/components/iconify/Iconify';

import {
  Divider,
  TextField,
  Grid,
  Paper,
  Typography,
  ListItem,
  Fab,
  ListItemText,
  List,
  Avatar,
  Input,
  Badge,
  Button,
  Stack,
  Checkbox,
  Container,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import UserChart from 'src/components/chart/UserChart';
import PostChart from 'src/components/chart/PostChart';
import { useAuth } from '../Context/AuthContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '70vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto',
  },
});

const HomePage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  return (
    <div style={{ overflow: 'hidden', minHeight: '90vh', position: 'relative' }} className="p-0 m-0">
      <Helmet>
        <title> Home | Lauenroth</title>
      </Helmet>
      {/* <div
        className="d-md-block d-none"
        style={{
          position: 'absolute',
          height: '700px',
          width: '700px',
          backgroundColor: '#EFF4FF',
          bottom: '-200px',
          right: '-200px',
          zIndex: '-2',
          borderRadius: '50%',
        }}
      ></div> */}
      <Container style={{ position: 'relative', zIndex: '2' }}>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={5} mb={2}>
          <Typography variant="h4" gutterBottom>
            Hi Joerg, welcome back!
          </Typography>
        </Stack>
        <p className="text-muted">This is the platform to manage all the content regarding the „Gute Ziele“ App.</p>

        <Link to="/dashboard/app/settings">
          <Button variant="contained" className="my-3 px-5">
            Manage profile
          </Button>
        </Link>

        {/* <div className=" d-flex col-12 flex-wrap my-5 py-4" style={{ backgroundColor: '#F5F5F5' }}>
          <UserChart className="col-md-6" />
          <PostChart className="col-md-6" />
        </div> */}
      </Container>
      <div className="gradiant-container container-fluid">
        <Container className="p-0 ">
          <div className="d-flex ms-0 flex-wrap p-4 ps-2 mt-5 col-xl-6  col-md-8 col-12">
            <Typography variant="h4" className="col-12 p-3 mb-3">
              At a glance
            </Typography>
            <div className="col-sm-6 p-3 d-flex">
              <Iconify icon="bi:person" className="me-3" />
              <Typography color="primary" fontWeight={'bold'}>
                7 company accounts
              </Typography>
            </div>
            {currentUser?.role === 'supervisor' ? (
              <div className="col-sm-6 p-3 d-flex">
                <Iconify icon="zondicons:play-outline" className="me-3" />
                <Typography color="primary" fontWeight={'bold'}>
                  16 courses
                </Typography>
              </div>
            ) : (
              ''
            )}
            <div className="col-sm-6 p-3 d-flex">
              <Iconify icon="wpf:group" hFlip={true} className="me-3" />
              <Typography color="primary" fontWeight={'bold'}>
                45 user accounts
              </Typography>
            </div>
            <div className="col-sm-6 p-3 d-flex">
              <span style={{ position: 'relative' }}>
                <div
                  className="bg-success rounded"
                  style={{ width: '7px', height: '7px', position: 'absolute', top: '1px', left: '15px' }}
                ></div>
                <Iconify icon="wpf:group" hFlip={true} className="me-3" />
              </span>
              <Typography color="primary" fontWeight={'bold'}>
                12 active users
              </Typography>
            </div>
          </div>
        </Container>
      </div>

      <div
        style={{
          width: '900px',
          height: '900px',
          backgroundColor: '#EFF4FF',
          position: 'absolute',
          right: '-500px',
          bottom: '-560px',
          borderRadius: '50%',
        }}
      ></div>
    </div>
  );
};

export default HomePage;
