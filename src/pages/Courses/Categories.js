import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/Context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/firebase';
export default function Categories({ categories }) {
  const { currentUser } = useAuth();
  const customIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 31.093 31.093">
  <g id="Group_119" data-name="Group 119" transform="translate(1 -3)">
    <g id="Group_68" data-name="Group 68" transform="translate(0 0)">
      <path id="Path_34" data-name="Path 34" d="M13.166,26.332h-9.4V5.642H5.642A3.773,3.773,0,0,0,9.4,9.4h7.523a3.773,3.773,0,0,0,3.762-3.762H22.57v7.523a1.881,1.881,0,0,0,3.762,0V5.642A3.773,3.773,0,0,0,22.57,1.881H20.181A3.754,3.754,0,0,0,16.927,0H9.4A3.754,3.754,0,0,0,6.15,1.881H3.762A3.773,3.773,0,0,0,0,5.642V26.332a3.773,3.773,0,0,0,3.762,3.762h9.4a1.881,1.881,0,0,0,0-3.762M9.4,3.762h7.523V5.642H9.4Zm7.523,9.4H9.4a1.881,1.881,0,0,0,0,3.762h7.523a1.881,1.881,0,0,0,0-3.762m-3.762,5.642H9.4a1.881,1.881,0,0,0,0,3.762h3.762a1.881,1.881,0,0,0,0-3.762M28.212,22.57H26.332V20.689a1.881,1.881,0,0,0-3.762,0V22.57H20.689a1.881,1.881,0,0,0,0,3.762H22.57v1.881a1.881,1.881,0,1,0,3.762,0V26.332h1.881a1.881,1.881,0,1,0,0-3.762" transform="translate(-0.5 3.5)" fill="#fff" stroke="#e8d24a" stroke-width="1" fill-rule="evenodd"/>
    </g>
  </g>
</svg>
`;
  function getBgColor(index) {
    const colors = ['rgb(83,178,228)', 'rgb(150,231,246)', 'rgb(255,159,192)', 'rgb(179,238,217)', 'rgb(255,241,140)'];
    return colors[index % 5];
  }

  function getBgGradient(index) {
    const gradients = [
      'linear-gradient(135deg, rgba(83,178,228,1) 0%, rgba(8,100,148,1) 61%)',
      'linear-gradient(135deg, rgba(150,231,246,1) 0%, rgba(0,164,219,1) 61%)',
      'linear-gradient(135deg, rgba(255,159,192,1) 0%, rgba(184,92,124,1) 61%)',
      'linear-gradient(135deg, rgba(179,238,217,1) 0%, rgba(136,180,164,1) 61%)',
      'linear-gradient(135deg, rgba(255,241,140,1) 0%, rgba(232,212,68,1) 61%)',
    ];
    return gradients[index % 5];
  }
  return (
    <>
      <div className="row d-flex my-4 flex-wrap justify-items-between">
        <div className="col">
          <Typography variant="h4">Categories</Typography>
        </div>
        {['supervisor'].includes(currentUser.role) && (
          <div className="col d-flex justify-content-end flex-wrap">
            <Link to="/dashboard/courses/addcateroy/edit" state={{ categories }}>
              <Button variant="contained" className="mx-3">
                Edit
              </Button>
            </Link>
            <Link to="/dashboard/courses/addcateroy">
              <Button variant="contained" className="">
                <Iconify icon="mdi:add-bold" className="me-1" /> Add new category
              </Button>
            </Link>
          </div>
        )}
        <Typography className="text-muted my-2">
          On this section you can create and change course categories, that will be shown on the app.
        </Typography>
      </div>
      <Grid container spacing={3}>
        {categories.map((val, ind) => (
          <Grid item xs={6} sm={6} md={4} lg={2}>
            <AppWidgetSummary
              bgColor={getBgColor(ind)}
              bgColorgradiant={getBgGradient(ind)}
              title={val.title}
              total={28}
              imageUrl={val.icon_url}
            />
          </Grid>
        ))}

        {/* <Grid item xs={6} sm={6} md={4} lg={2}>
          <AppWidgetSummary
            title="Movement"
            bgColor={'rgb(150,231,246)'}
            bgColorgradiant={'linear-gradient(135deg, rgba(150,231,246,1) 0%, rgba(0,164,219,1) 61%)'}
            total={1352831}
            color="info"
            icon={'maki:bicycle-share'}
          />
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={2}>
          <AppWidgetSummary
            title="Relaxation"
            bgColor={'rgb(255,159,192)'}
            bgColorgradiant={'linear-gradient(135deg, rgba(255,159,192,1) 0%, rgba(184,92,124,1) 61%)'}
            total={15}
            color="warning"
            icon={'uil:smile'}
          />
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={2}>
          <AppWidgetSummary
            title="Nutrition"
            bgColor={'rgb(179,238,217)'}
            bgColorgradiant={'linear-gradient(135deg, rgba(179,238,217,1) 0%, rgba(136,180,164,1) 61%)'}
            total={4}
            color="error"
            icon={'lucide:grape'}
            rotate={3}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <AppWidgetSummary
            title="Miscellaneous"
            bgColor={'rgb(255,241,140)'}
            bgColorgradiant={'linear-gradient(135deg, rgba(255,241,140,1) 0%, rgba(232,212,68,1) 61%);'}
            total={4}
            color="error"
            svg={customIcon}
            icon={''}
          />
        </Grid> */}
      </Grid>
    </>
  );
}
