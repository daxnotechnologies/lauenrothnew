import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton, Badge, styled, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Iconify from 'src/components/iconify/Iconify';

import { alpha } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from 'src/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  padding: '5px',
  height: 30,
  // border: `2px solid ${theme.palette.background.paper}`,
  backgroundColor: alpha(theme.palette.logo[0], 1),
}));

const useStyles = makeStyles((theme) => ({
  hover: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));
export default function UserAvatar({ currentImg }) {
  const [img, setImg] = React.useState(null);
  const imgRef = useRef();
  const { id } = useParams();
  const classes = useStyles();
  const [compnayData, setcompnayData] = useState({});

  const updateProfile = () => {
    setImg();
    const data = POST_Img_Api();
    if (data) {
      return toast.success('Profile Image Changed.');
    } else {
      return toast.error('Error Creating Profile Image.');
    }
  };
  console.log(img);
  const POST_Img_Api = async (status) => {
    const timestampInMilliseconds = Date.now();
    const storageRef = ref(storage, `company/${id}/${id}_${timestampInMilliseconds}`);
    console.log(storageRef);
    const uploadTask = await uploadString(storageRef, img, 'data_url');
    console.log(uploadTask);
    const downloadURL = await getDownloadURL(storageRef);
    UPDATE_Company_Api(downloadURL);
  };
  const UPDATE_Company_Api = async (logoUrl) => {
    try {
      const CompanyRef = doc(db, 'companies', id);
      updateDoc(CompanyRef, { logo_url: logoUrl });
      GET_COMPANY_Api();

      return true;
    } catch (error) {
      console.log(Error);
      return Error;
    }
  };

  const handleLogoFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const GET_COMPANY_Api = async () => {
    try {
      const companyDocRef = doc(db, 'companies', id);
      const docSnapshot = await getDoc(companyDocRef); // Change getDocs to getDoc
      if (docSnapshot.exists()) {
        const companyData = docSnapshot.data();
        console.log(companyData);
        setcompnayData({ ...companyData, id: docSnapshot.id });
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error fetching document:', e);
    }
  };
  useEffect(() => {
    GET_COMPANY_Api();
  }, []);

  console.log(compnayData);

  return (
    <div className="row my-5">
      <div>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={
            <SmallAvatar>
              <IconButton color="primary" className={classes.hover} aria-label="upload picture" component="label">
                <Iconify className="text-white" icon="pepicons-pop:pen" />
                <input
                  name="image"
                  accept="image/*"
                  type="file"
                  ref={imgRef}
                  onChange={handleLogoFile}
                  style={{ display: 'none' }}
                />
              </IconButton>
            </SmallAvatar>
          }
        >
          <Avatar
            sx={{ width: 125, height: 125, objectFit: 'cover', border: '2px solid gray' }}
            alt="Upload"
            src={img ? img : compnayData?.logo_url === currentImg ? currentImg : compnayData?.logo_url}
          />
        </Badge>
        {img ? (
          <Button onClick={() => updateProfile()} variant="outlined" className="ms-4" color="primary">
            Save Changes
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
