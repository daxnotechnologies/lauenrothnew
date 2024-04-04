import React from 'react';
import Iconify from 'src/components/iconify/Iconify';

import { Typography, Button, Stack, Container } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function ViewMessage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyid, id } = useParams();
  console.log(location);
  const { state } = location;
  const { selectedMsg, PollingOptions } = state || {};
  console.log(PollingOptions);
  const convertTimes = (timestampSeconds) => {
    if (timestampSeconds) {
      const timestampMilliseconds = timestampSeconds * 1000;

      // Create a new Date object using the timestamp
      const dateObject = new Date(timestampMilliseconds);

      // Extract hours and minutes
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();

      // Determine if it's AM or PM
      const period = hours >= 12 ? 'pm' : 'am';

      // Convert hours to 12-hour format
      const hours12 = hours % 12 || 12; // Handle midnight (0) as 12

      // Format the time
      const time = `${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;

      return time;
    }
    return true;
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

  function renderContent(url) {
    if (selectedMsg.isFile) {
      return (
        <div className="col-sm-5">
          <Button variant="contained" component="a" href={url} download target="_blank">
            Download File
          </Button>
        </div>
      );
    } else if (selectedMsg.isVideo) {
      // Render video player
      return (
        <video className="col-xl-5 col-lg-6 col-md-7 my-4" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // Render image
      return (
        <div>
          <img className="col-xl-5 col-lg-6 col-md-7 my-4" src={url} alt={selectedMsg.name || ''} />
        </div>
      );
    }
  }

  return (
    <div>
      <Helmet>
        <title> View Message | Lauenroth</title>
      </Helmet>

      <Container>
        <Button onClick={() => navigate(-1)} startIcon={<Iconify icon="mingcute:left-fill" />}>
          Back
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={2} mb={2}>
          <Typography variant="h3" gutterBottom>
            Message
          </Typography>
        </Stack>

        <div className="row d-flex mt-4 flex-wrap justify-items-between">
          <div className="col-sm-10">
            <Typography variant="h4">Sent</Typography>
          </div>
          <div className="col-sm-2">
            <Link to={`/dashboard/company/add_message/${companyid}/${id}`} state={{ selectedMsg, PollingOptions }}>
              <Button variant="contained" className="">
                Edit
              </Button>
            </Link>
          </div>
        </div>
        {selectedMsg.content_url && renderContent(selectedMsg.content_url)}
        <div className="d-flex flex-wrap flex-col  ">
          <div
            className="text-muted my-3 p-4 rounded-pill text-wrap"
            style={{ backgroundColor: '#EFF4FF', minWidth: '280px' }}
          >
            <Typography className="w-100 ">{selectedMsg.msg || selectedMsg.poll_question}</Typography>
            {PollingOptions &&
              PollingOptions.map((val, ind) => (
                <Typography className="w-100 ms-3" key={val.id}>
                  {val.option}
                </Typography>
              ))}
            <small className="w-100 d-flex align-items-center justify-content-between mt-2">
              <span>{selectedMsg.posted_by_name} </span>
              <span>
                {/* <Iconify icon="solar:check-read-outline" /> */}
                {convertTimes(selectedMsg.release_date.seconds)}
              </span>
            </small>
          </div>

          <div className="w-100 mt-5">
            <Typography className="text-muted my-2"> Posted by {selectedMsg.posted_by}</Typography>
            <Typography className="text-muted"> Date: {converttimestamp(selectedMsg.release_date.seconds)}</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
