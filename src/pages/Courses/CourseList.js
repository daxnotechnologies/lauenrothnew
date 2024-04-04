import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';
import { toast } from 'react-toastify';
import Confirm from 'src/components/Confirmations/Confirm';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from 'src/firebase';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CourseList({ courses, catId, GET_Courses_Api }) {
  const [open, setOpen] = useState(null);
  const [openCourse, setOpenCourse] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  const [selectedCourse, setselectedCourse] = useState({});
  const [selectedVideo, setselectedVideo] = useState({});

  const [filterName, setFilterName] = useState('');
  const [videos, setvideos] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openView, setOpenView] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogVideoOpen, setDeleteDialogVideoOpen] = useState(false);
  console.log(selectedVideo);
  const handleOpenDeleteVideoDialog = (videoObj) => {
    console.log(videoObj);
    setselectedVideo(videoObj);
    setDeleteDialogVideoOpen(true);
  };
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteVideoDialog = () => {
    setDeleteDialogVideoOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleOpenMenu = (event, selectedcourse) => {
    setOpen(event.currentTarget);
    setselectedCourse(selectedcourse);
    GET_Course_Video_Api(selectedcourse);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenCourseMenu = (event) => {
    setOpenCourse(event.currentTarget);
  };

  const handleCloseCourseMenu = () => {
    setOpen(null);
  };
  const handleCloseView = () => {
    setOpenView(null);
  };
  const handleOpenView = (event) => {
    setOpenView(true);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = courses.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courses.length) : 0;

  const filteredUsers = applySortFilter(courses, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const deleteData = () => {
    if (deleteDialogVideoOpen) {
      DELETE_Course_Video_Api();
      handleCloseDeleteVideoDialog();
    }
    if (deleteDialogOpen) {
      DELETE_Course_Api();
      handleCloseDeleteDialog();
    }
  };

  const navigate = useNavigate();

  const DELETE_Course_Video_Api = async () => {
    const categoriesRef = doc(db, 'categories', catId, 'courses', selectedCourse.id);
    const CoursesRef = doc(categoriesRef, 'videos', selectedVideo.id);
    try {
      // Update the document in the database
      await deleteDoc(CoursesRef);

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      await GET_Course_Video_Api(selectedCourse);
      return toast.success('Course Deleted Successfully');
    } catch (error) {
      console.error('Error Deleting company status:', error);
      return toast.error('Error occured while Deleting Company');
    }
  };
  const DELETE_Course_Api = async () => {
    const categoriesRef = doc(db, 'categories', catId);
    const CoursesRef = doc(categoriesRef, 'courses', selectedCourse.id);
    try {
      // Update the document in the database
      await deleteDoc(CoursesRef);

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      await GET_Courses_Api(catId);
      return toast.success('Course Deleted Successfully');
    } catch (error) {
      console.error('Error Deleting company status:', error);
      return toast.error('Error occured while Deleting Company');
    }
  };
  const GET_Course_Video_Api = async (course) => {
    try {
      const categoriesRef = doc(db, 'categories', catId, 'courses', course.id);
      const courses = collection(categoriesRef, 'videos'); // Changed to collection(categoriesRef, 'courses')
      const querySnapshot = await getDocs(courses);
      // Extract data from the querySnapshot
      const newData = querySnapshot.docs.map((doc) => {
        const { video_ref, ...rest } = doc.data(); // Destructuring to exclude categories_ref and courses_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields
        };
      });
      // Set the retrieved data in the state
      setvideos(newData); // Assuming setCourses is a function to update state
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  // const Get_videoDuration = async (URL) => {
  //   const videoElement = document.createElement('video');
  //   videoElement.src = URL;
  //   videoElement.preload = 'metadata';
  //   await videoElement.load();
  //   const durations = getFormattedDuration(videoElement.duration);

  //   return durations;
  // };

  // const getFormattedDuration = (duration) => {
  //   const totalSeconds = Math.round(duration);
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
  //     .toString()
  //     .padStart(2, '0')}`;
  // };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
        <Typography variant="h5">Courses:</Typography>
        {/* <div>
          <Button variant="contained" className="me-4">
            Edit
          </Button>
          <Link to="/dashboard/addcourse">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add New Course
            </Button>
          </Link>
        </div> */}
      </Stack>
      <Confirm
        title="Are you sure you want to delete this content?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={deleteData}
      />
      <Confirm
        title="Are you sure you want to delete this Video?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogVideoOpen}
        onClose={handleCloseDeleteVideoDialog}
        onConfirm={deleteData}
      />
      <Dialog open={Boolean(openView)} onClose={handleCloseView} fullWidth maxWidth="lg">
        <DialogTitle>
          Course <Iconify icon="icon-park-outline:right" /> {selectedCourse.category}{' '}
          <Iconify icon="icon-park-outline:right" /> {selectedCourse.headline}
          <Typography mt={1}>{videos.length} Videos</Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
              {/* <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            /> */}
              <TableBody>
                {videos.map((val, ind) => {
                  return (
                    <TableRow hover key={val.id} tabIndex={-1} role="checkbox">
                      {/* <TableCell padding="checkbox">
                      <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                    </TableCell> */}

                      <TableCell className="first-cell" component="th" scope="row" padding="none">
                        <Stack>
                          <Link to={`/dashboard/view_courses/${val.id}`} state={{ selectedVideo: val }}>
                            <div
                              className="rounded"
                              role="button"
                              style={{
                                width: '170px',
                                maxHeight: '100px',
                                marginLeft: '-8px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <img src={val.prev_img_url} alt={val.headline} />
                              <Iconify
                                icon="octicon:play-24"
                                style={{ position: 'absolute' }}
                                className="text-white"
                                width="40px"
                                height="40px"
                              />
                            </div>
                          </Link>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{selectedCourse.headline}</TableCell>
                      <TableCell align="left">
                        <Iconify icon="ri:time-line" style={{ marginBottom: '4px' }} />
                        {/* {Get_videoDuration(val.video_url)} */}
                      </TableCell>
                      <TableCell align="left">{val.video_name}</TableCell>
                      <TableCell align="left">{selectedCourse.category}</TableCell>
                      <TableCell align="left">{converttimestamp(val.created_at?.seconds)}</TableCell>

                      {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                      <TableCell className="last-cell" align="right">
                        <Link to={`/dashboard/courses/view_courses/${val.id}`} state={{ selectedVideo: val }}>
                          <Iconify role="button" className="mx-2 text-primary" icon="carbon:view-filled" />
                        </Link>
                        <Link to="/dashboard/courses/add_course/1">
                          <Iconify role="button" className="mx-2 text-primary" icon="bxs:edit" />
                        </Link>
                        <Iconify
                          role="button"
                          className="mx-2 text-danger"
                          onClick={() => handleOpenDeleteVideoDialog(val)}
                          icon="material-symbols:delete"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">
            Close
          </Button>
        </DialogActions>
        {/* <Popover
          open={Boolean(openCourse)}
          anchorEl={openCourse}
          onClose={handleCloseCourseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem>
            <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
            View
          </MenuItem>
          {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

          <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteDialog()}>
            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover> */}
      </Dialog>

      {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
            {/* <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            /> */}
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, description, category, headline, status, company, avatarUrl } = row;
                const selectedUser = selected.indexOf(id) !== -1;

                return (
                  <TableRow
                    style={{ border: '1px solid black' }}
                    hover
                    key={id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={selectedUser}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                    </TableCell> */}

                    <TableCell className="first-cell" component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{ height: '22px', width: '22px', marginLeft: '24px' }}
                          alt={headline}
                          src={avatarUrl}
                        />
                        <Typography variant="subtitle2" noWrap>
                          {headline}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{headline}</TableCell>
                    <TableCell align="right">{category}</TableCell>

                    {/* <TableCell align="right">{role}</TableCell> */}

                    {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                    <TableCell className="last-cell" align="right">
                      <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                        <Iconify icon={'eva:more-vertical-fill'} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem className="popover-item" onClick={() => handleOpenView()}>
          <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
          View
        </MenuItem>
        <MenuItem onClick={() => navigate('/dashboard/courses/add_course/1')} className="popover-item">
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteDialog()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
