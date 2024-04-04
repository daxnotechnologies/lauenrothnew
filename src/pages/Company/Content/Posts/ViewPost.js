import React, { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Popover, Tooltip, IconButton, Button, Stack, Container } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactionBarSelector } from '@charkour/react-reactions';

export default function ViewPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log(location);
  const { selectedPost } = state || {};
  console.log(selectedPost);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const converttimestamp = (timestampSeconds) => {
    if (timestampSeconds) {
      const timestampMilliseconds = timestampSeconds * 1000;

      // Create a new Date object using the timestamp
      const dateObject = new Date(timestampMilliseconds);

      // Extract the date part
      const dateOnly = dateObject.toISOString().split('T')[0];

      return dateOnly;
    }
    return true;
  };
  const open = Boolean(anchorEl);
  return (
    <div>
      <Helmet>
        <title> View Post | Lauenroth</title>
      </Helmet>

      <Container>
        <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
          Back
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            Posts
          </Typography>
        </Stack>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Headline ({selectedPost.headline})</Typography>
          </div>
          <div className="col-sm-2">
            <Link
              to={`/dashboard/company/edit_post/${selectedPost.company_id}/${selectedPost.id}`}
              state={{ selectedPost }}
            >
              <Button variant="contained" className="">
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="row my-5">
          <Typography className="text-muted my-4">
            {selectedPost.body}
            <Link to="/dashboard/app/edit-account"></Link>
          </Typography>
          <img
            className="col-xl-5 col-lg-6 col-md-7 my-4"
            src={selectedPost.content_url || ''}
            alt={selectedPost.headline || ''}
          />
          <div>
            <Typography className="my-4">
              <span className="border rounded-pill p-2 mt-4">
                50 <Iconify icon="mdi:heart" className="text-danger" />
                <Iconify icon="fluent-emoji-flat:thumbs-up-light" className="text-danger" />
              </span>
              <IconButton onClick={handleClick}>
                <Iconify icon="ic:baseline-add-reaction" />
              </IconButton>
            </Typography>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <div style={{ padding: '50px' }}>
                <ReactionBarSelector />
              </div>
            </Popover>
          </div>

          <Typography className="text-muted my-2"> Posted by {selectedPost.posted_by}</Typography>
          <Typography className="text-muted"> Date:{converttimestamp(selectedPost.release_date.seconds)}</Typography>
        </div>
      </Container>
    </div>
  );
}
