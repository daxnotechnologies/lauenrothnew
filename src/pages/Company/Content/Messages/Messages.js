import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { Link, useNavigate, useParams } from 'react-router-dom';

// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/firebase';
const MessageList = [
  { id: 1, name: 'Message 1', postedBy: 'Admin', date: ' 12-10-2023', status: 'Online' },
  { id: 2, name: 'Message 2', postedBy: 'Admin', date: ' 12-10-2023', status: 'Online' },
  { id: 3, name: 'Message 3', postedBy: 'Admin', date: ' 12-10-2023', status: 'Online' },
  { id: 4, name: 'Message 4', postedBy: 'Admin', date: ' 12-10-2023', status: 'Draft' },
  { id: 5, name: 'Message 5', postedBy: 'Admin', date: ' 12-10-2023', status: 'Upcoming' },
  { id: 6, name: 'Message 6', postedBy: 'Admin', date: ' 12-10-2023', status: 'Upcoming' },
  { id: 7, name: 'Message 7', postedBy: 'Admin', date: ' 12-10-2023', status: 'Online' },
  { id: 8, name: 'Message 8', postedBy: 'Admin', date: ' 12-10-2023', status: 'Draft' },
  { id: 9, name: 'Message 9', postedBy: 'Admin', date: ' 12-10-2023', status: 'Online' },
  { id: 10, name: 'Message 10', postedBy: 'Admin', date: ' 12-10-2023', status: 'Online' },
  { id: 11, name: 'Message 11', postedBy: 'Admin', date: ' 12-10-2023', status: 'Draft' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

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

export default function Messages() {
  const { id } = useParams();
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(null);
  const [openCourse, setOpenCourse] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openView, setOpenView] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messages, setmessages] = useState([]);
  const [filterOption, setFilterOption] = React.useState('');

  const [selectedMsg, setselectedMsg] = useState({});
  const [PollingOptions, setPollingOptions] = useState([]);

  const handleChangeFilter = (event) => {
    setFilterOption(event.target.value);
  };
  const navigate = useNavigate();
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenMenu = (event, msgObj) => {
    setselectedMsg(msgObj);
    if (msgObj.is_polling) {
      GET_Poll_Api(msgObj.id);
    }
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MessageList.length) : 0;

  const filteredMessages = applySortFilter(messages, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredMessages.length && !!filterName;

  const deleteData = () => {
    handleCloseDeleteDialog();
    DELETE_Poll_Api();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  const GET_Messages_Api = async () => {
    try {
      const companyDocRef = doc(db, 'companies', id);
      const usersRef = collection(companyDocRef, 'messages');
      const querySnapshot = await getDocs(usersRef);
      const newData = querySnapshot.docs.map((doc) => {
        const { company_ref, msg_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields except company_ref
        };
      });
      console.log(newData);
      setmessages(newData);
    } catch (e) {
      console.log(e);
    }
  };
  const GET_Poll_Api = async (msgid) => {
    try {
      const companyDocRef = await doc(db, 'companies', id, 'messages', msgid);
      const optionsRef = await collection(companyDocRef, 'polling_option');
      const querySnapshot = await getDocs(optionsRef);
      const newData = querySnapshot.docs.map((doc) => {
        const { option_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields except company_ref
        };
      });
      console.log(newData);
      setPollingOptions(newData);
    } catch (e) {
      console.log(e);
    }
  };
  const DELETE_Poll_Api = async () => {
    try {
      const companyDocRef = doc(db, 'companies', id);
      const pollRef = doc(companyDocRef, 'messages', selectedMsg.id);
      await deleteDoc(pollRef);
      console.log(`Poll with ID deleted successfully.`);
      GET_Messages_Api();
      return toast.success('Draft saved successfully');
    } catch (error) {
      console.log('Error deleting poll:', error);
      return toast.error('Error Occuerd While saving Post Draft');
    }
  };

  useEffect(() => {
    GET_Messages_Api();
  }, []);
  return (
    <>
      <Confirm
        title="Are you sure you want to delete this message?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={deleteData}
      />
      <div className="row d-flex mt-5 flex-wrap justify-items-between">
        <div className="col-md-5">
          <Typography variant="h4">Content: Messages </Typography>
        </div>
      </div>
      <div className="row my-3 text-muted">
        <Typography>
          On this section, you can see existing and upload new content straight to the app / messages page.{' '}
        </Typography>
      </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="d-flex align-items-center">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Online" value="1" />
              <Tab label="Upcoming" value="2" />
              <Tab label="Drafts" value="3" />
            </TabList>
            <div className="ms-auto">
              <FormControl sx={{ width: 120, marginRight: '12px' }} size="small">
                <InputLabel id="demo-select-small-label">Filter</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={filterOption}
                  label="Filter"
                  onChange={handleChangeFilter}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Option1</MenuItem>
                  <MenuItem value={20}>Option2</MenuItem>
                  <MenuItem value={30}>Option3</MenuItem>
                </Select>
              </FormControl>
              <Link to={`/dashboard/company/add_message/${id}`} className=" ms-auto">
                <Button className="py-2" variant="contained" startIcon={<Iconify icon="mingcute:add-fill" />}>
                  New message
                </Button>
              </Link>
            </div>
          </Box>
          <TabPanel sx={{ padding: '0px' }} value="1">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredMessages
                    .filter((message) => message.status === 'online')
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((message) => (
                      <TableRow key={message.id} hover tabIndex={-1} role="checkbox">
                        <TableCell className="first-cell" align="left">
                          {message.name}
                        </TableCell>
                        <TableCell align="right">Posted By {message.posted_by}</TableCell>
                        <TableCell align="right">{converttimestamp(message.release_date.seconds)}</TableCell>
                        <TableCell className="last-cell" align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, message)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredMessages.filter((message) => message.status === 'online').length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>
          <TabPanel sx={{ padding: '0px' }} value="2">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredMessages
                    .filter((message) => message.status === 'upcoming')
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((message) => (
                      <TableRow key={message.id} hover tabIndex={-1} role="checkbox">
                        <TableCell className="first-cell" align="left">
                          {message.name}
                        </TableCell>
                        <TableCell align="right">Posted By {message.posted_by}</TableCell>
                        <TableCell align="right">{converttimestamp(message.release_date.seconds)}</TableCell>
                        <TableCell className="last-cell" align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, message)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredMessages.filter((message) => message.status === 'upcoming').length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>
          <TabPanel sx={{ padding: '0px' }} value="3">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredMessages
                    .filter((message) => message.status === 'draft')
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((message) => (
                      <TableRow key={message.id} hover tabIndex={-1} role="checkbox">
                        <TableCell className="first-cell" align="left">
                          {message.name}
                        </TableCell>
                        <TableCell align="right">Posted By {message.posted_by}</TableCell>
                        <TableCell align="right">{converttimestamp(message.release_date.seconds)}</TableCell>
                        <TableCell className="last-cell" align="right">
                          <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, message)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredMessages.filter((message) => message.status === 'draft').length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>
        </TabContext>
      </Box>
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
        <MenuItem
          className="popover-item"
          onClick={() =>
            navigate(`/dashboard/company/view_message/${id}/${selectedMsg.id}`, {
              state: { selectedMsg, PollingOptions },
            })
          }
        >
          <Iconify icon={'carbon:view'} sx={{ mr: 2 }} />
          View
        </MenuItem>
        <MenuItem
          className="popover-item"
          onClick={() =>
            navigate(`/dashboard/company/add_message/${id}/${selectedMsg.id}`, {
              state: { selectedMsg, PollingOptions },
            })
          }
        >
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
