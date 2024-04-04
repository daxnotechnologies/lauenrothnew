import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from 'src/firebase';
import { upperCase } from 'lodash';
import { toast } from 'react-toastify';

export default function Courses({ selectedCompany }) {
  console.log(selectedCompany);
  const [filterOption, setFilterOption] = useState('categories');
  const [courses, setcourses] = useState([]);
  const [showAllCatogories, setshowAllCatogories] = useState(false);

  const handleChangeFilter = (event) => {
    setFilterOption(event.target.value);
    if (event.target.value === 'allcourses') {
      const updatedCourses = courses.map((course, i) => {
        UPDATE_Categories_filter_Api({ ...course, show_team: true }, course.id, false);
      });
      return toast.success('Categories Updated.');
    }
  };

  const UPDATE_Categories_filter_Api = async (obj, id, once) => {
    try {
      const UsersRef = doc(db, 'categories', id);
      await updateDoc(UsersRef, obj);
      GET_Categories_Api();
      if (obj.show_team && once) {
        return toast.success('Categories Updated.');
      }
    } catch (e) {
      console.log(e);
      return toast.error('An error occurred while updating the categories.');
    }
  };

  const onHandleChange = (event, index) => {
    if (index === -1) {
      setshowAllCatogories(true);
      const updatedCourses = courses.map((course, i) => {
        UPDATE_Categories_filter_Api({ ...course, show_team: event.target.checked }, course.id, false);
      });
      return toast.success('Categories Updated.');
    } else {
      const showAllCatogoriesTemp = showAllCatogories;
      setshowAllCatogories(false);
      // Individual course checkbox is clicked
      const updatedCourses = courses.map((course, i) => {
        if (i === index) {
          UPDATE_Categories_filter_Api({ ...course, show_team: event.target.checked }, course.id, true);
        } else {
          if (showAllCatogoriesTemp) {
            UPDATE_Categories_filter_Api({ ...course, show_team: false }, course.id, false);
          }
        }
        return course;
      });
    }
  };
  const GET_Categories_Api = async () => {
    try {
      const companyDocRef = collection(db, 'categories');
      const querySnapshot = await getDocs(companyDocRef);
      const companyCourses = [];
      querySnapshot.forEach((doc) => {
        companyCourses.push({ ...doc.data(), id: doc.id });
      });
      const allShowTeamTrue = companyCourses.every((course) => course.show_team === true);
      console.log(allShowTeamTrue);
      if (allShowTeamTrue) {
        setshowAllCatogories(true);
      }
      console.log(companyCourses);
      setcourses(companyCourses);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GET_Categories_Api();
  }, []);
  console.log(courses);
  return (
    <>
      <div className="row d-flex mt-5 flex-wrap justify-items-between">
        <div className="col-md-5">
          <Typography variant="h4">Content: Courses</Typography>
        </div>
      </div>
      <div className="row mt-2 mb-3">
        <Typography className="text-muted">
          On this section you can choose, which courses {selectedCompany.Cname} can see on their team space.
        </Typography>
        <div className="my-3">
          <FormControl sx={{ width: 180, marginRight: '12px' }} size="small">
            <InputLabel id="demo-select-small-label">Filter</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={filterOption}
              label="Filter"
              onChange={handleChangeFilter}
            >
              <MenuItem value={'categories'}>Categories</MenuItem>
              <MenuItem value={'allcourses'}>All Courses</MenuItem>
            </Select>
          </FormControl>
        </div>
        {filterOption == 'categories' && courses.length > 0 ? (
          <FormGroup className="categories-list text-muted">
            <FormControlLabel
              control={<Checkbox checked={showAllCatogories} onChange={(event) => onHandleChange(event, -1)} />}
              label="All Courses"
            />
            {courses.map((val, ind) => (
              <FormControlLabel
                key={val.id}
                control={
                  <Checkbox
                    checked={showAllCatogories ? false : val.show_team}
                    onChange={(event) => onHandleChange(event, ind)}
                  />
                }
                label={val.title}
              />
            ))}
          </FormGroup>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
