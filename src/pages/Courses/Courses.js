import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../sections/@dashboard/app';
import Categories from './Categories';
import CoursesContent from './CoursesContent';
import { useAuth } from 'src/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';

// ----------------------------------------------------------------------

export default function Courses() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!['supervisor'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);
  const [categories, setcategories] = useState([]);

  const GET_Categories_Api = async () => {
    try {
      const categoriesRef = collection(db, 'categories');
      const querySnapshot = await getDocs(categoriesRef);
      // Extract data from the querySnapshot
      const newData = querySnapshot.docs.map((doc) => {
        const { categories_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields except company_ref
        };
      });
      console.log(newData);
      // Set the retrieved data in the state
      setcategories(newData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };
  useEffect(() => {
    GET_Categories_Api();
  }, []);
  console.log(categories)
  return (
    <div>
      <Helmet>
        <title> Dashboard | Lauenroth </title>
      </Helmet>

      <Container>
        <Typography variant="h3" mt={5} sx={{ mb: 5 }}>
          Courses
        </Typography>
        <Categories categories={categories} />
        <CoursesContent categories={categories} />
      </Container>
    </div>
  );
}
