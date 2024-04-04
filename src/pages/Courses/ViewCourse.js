import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Account = () => {
  const [duration, setDuration] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { selectedVideo } = state || {};
  console.log(selectedVideo);
  useEffect(() => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
      const totalSeconds = Math.round(video.duration);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setDuration(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
    };
    video.src = selectedVideo.video_url;
  }, [selectedVideo.video_url]);
  return (
    <div>
      <Helmet>
        <title> View Course | Lauenroth</title>
      </Helmet>

      <Container>
        <div className="row my-4 text-start">
          <div>
            <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
              Back
            </Button>
          </div>
        </div>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            Workouts
          </Typography>
        </Stack>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Headline ({selectedVideo.headline})</Typography>
          </div>
          <div className="col-sm-2">
            <Link to="/dashboard/courses/add_course/1">
              <Button variant="contained" className="">
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="row my-5">
          <Typography className="text-muted my-3">
            Description / Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod. Ispsum lorem
            sit dolor conseteutur, amet sadipscing elitr, sed diam. <Link to="/dashboard/app/edit-account"></Link>
          </Typography>
          {duration ? (
            <video className="col-md-7" controls>
              <source src={selectedVideo.video_url} type="video/mp4" />
              Your browser does not support video player.
            </video>
          ) : (
            <div class="loader-container">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <Typography className="text-muted my-2"> Minutes: {duration}</Typography>
        </div>
      </Container>
    </div>
  );
};

export default Account;
