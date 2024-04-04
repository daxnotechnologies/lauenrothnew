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
  Button,
  Stack,
  Checkbox,
  Container,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
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

const Chat = () => {
  const classes = useStyles();

  return (
    <div>
      <Helmet>
        <title> Chats | Lauenroth</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mb={5}>
          <Typography variant="h4" gutterBottom>
            Messages
          </Typography>
        </Stack>

        <Grid container component={Paper} className={classes.chatSection + ' rounded shadow'}>
          <Grid item xs={3} className={classes.borderRight500}>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <Divider />
            <List>
              <ListItem button key="RemySharp">
                <Checkbox />
                <Avatar className="me-3" alt="Company 1" src="" />

                <ListItemText primary="Company 1">Company 1</ListItemText>
                {/* <ListItemText secondary="online" align="right"></ListItemText> */}
              </ListItem>
              <ListItem button key="Company 2">
                <Checkbox />
                <Avatar className="me-3" alt="Company 2" src="" />

                <ListItemText primary="Company 2">Company 2</ListItemText>
              </ListItem>
              <ListItem button key="Company 4">
                <Checkbox />
                <Avatar className="me-3" alt="Company 4" src="" />

                <ListItemText primary="Company 4">Company 4</ListItemText>
              </ListItem>
              <ListItem button key="Company 5">
                <Checkbox />
                <Avatar className="me-3" alt="Company 5" src="" />

                <ListItemText primary="Company 5">Company 5</ListItemText>
              </ListItem>
              <ListItem button key="Company 6">
                <Checkbox />
                <Avatar className="me-3" alt="Company 6" src="" />

                <ListItemText primary="Company 6">Company 6</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              <ListItem key="1">
                <Grid className="ms-auto mt-2 bg-dark p-3 rounded text-white">
                  <Grid item xs={12}>
                    <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary="Sent by Syed Mushahid at 10:15"></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
              {/* <ListItem key="2">
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="left" secondary="09:31"></ListItemText>
                  </Grid>
                </Grid>
              </ListItem> */}
              <ListItem key="3">
                <Grid className="ms-auto mt-2 bg-dark p-3 rounded text-white">
                  <Grid item xs={12}>
                    <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText align="right" secondary="Sent by Syed Mushahid at 10:30"></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={2}>
                <Input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  // Add onChange handler to handle image selection
                />
                <label htmlFor="image-input">
                  <Button variant="outlined" className="py-3" component="span">
                    Upload Image
                  </Button>
                </label>
              </Grid>
              <Grid item xs={9}>
                <TextField id="outlined-basic-email" label="Type Something" fullWidth />
              </Grid>
              <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add">
                  <Iconify icon="mdi:send" />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Chat;
