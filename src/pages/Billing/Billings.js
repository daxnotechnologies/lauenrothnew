import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container, Switch } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import Inovices from './Inovices/Invices';
import Reminder from './Reminders/Reminder';
import { useAuth } from 'src/Context/AuthContext';
const Billings = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!['supervisor'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);
  const [mainColor, setmainColor] = useState('#007BA4');
  const [bgColor, setbgColor] = useState('#EFF4FF');
  return (
    <div>
      <Helmet>
        <title> Billings | Lauenroth</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={5} mb={3}>
          <Typography variant="h3" gutterBottom>
            Billing
          </Typography>
        </Stack>

        <div className="row my-3 text-muted">
          <Typography>On this page you will find an overview of sent invoices, reminders and payments.</Typography>
        </div>

        <Inovices />
        <Reminder />
      </Container>
    </div>
  );
};

export default Billings;
