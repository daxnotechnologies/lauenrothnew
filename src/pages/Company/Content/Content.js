import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container, Switch } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import UserAvatar from '../../AccountSettings/UserAvatar';
import { Link, useLocation, useParams } from 'react-router-dom';

import Menu from '../Menu';
import Courses from './Courses';
import Posts from './Posts/Posts';
import Messages from './Messages/Messages';
import Survey from './Survey/Survey';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
const Settings = () => {
  const location = useLocation();
  const { id } = useParams();
  const { state } = location;
  const { selectedCompany } = state || {};
  const [mainColor, setmainColor] = useState('#007BA4');
  const [bgColor, setbgColor] = useState('#EFF4FF');

  return (
    <div>
      <Helmet>
        <title> Company Content | Lauenroth</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={5} mb={3}>
          <Typography variant="h3" gutterBottom>
            {selectedCompany.Cname}
          </Typography>
        </Stack>

        <Menu page="content" selectedCompany={selectedCompany} />
        <Courses selectedCompany={selectedCompany} />
        <Posts selectedCompany={selectedCompany} />
        <Messages selectedCompany={selectedCompany} />
        {/* <Survey /> */}
      </Container>
    </div>
  );
};

export default Settings;
