import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// @mui
import {
  Card,
  Table,
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
  Select,
  Stack,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';
// mock
import USERLIST from '../../../_mock/accounts';
import Menu from '../Menu';
import { Helmet } from 'react-helmet-async';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { useAuth } from 'src/Context/AuthContext';
import { db } from 'src/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { TextNumCode } from 'src/components/Confirmations/CodeGenerator';
import axios from 'axios';

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

export default function Settings() {
  const navigate = useNavigate();

  const { currentUser, ResetPassword } = useAuth();
  const location = useLocation();
  const { state } = location;
  const { selectedCompany } = state || {};
  const { id } = useParams();
  useEffect(() => {
    if (!['supervisor', 'superuser'].includes(currentUser.role)) {
      navigate('404');
    }
  }, []);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [generateCode, setgenerateCode] = useState(false);
  const [newCode, setNewCode] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [Newcode, setNewcode] = useState('');
  const [UsersData, setUsersData] = useState([]);
  const [SelectedUser, setSelectedUser] = useState({});

  const [filterOption, setFilterOption] = React.useState('');

  const handleChangeFilter = (event) => {
    setFilterOption(event.target.value);
  };
  const handleOpenMenu = (event, row) => {
    setSelectedUser(row);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setSelectedUser({});
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = UsersData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - UsersData.length) : 0;

  const filteredUsers = applySortFilter(UsersData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleOpenDeactivateDialog = () => {
    setDeactivateDialogOpen(true);
  };

  const handleCloseDeactivateDialog = () => {
    setDeactivateDialogOpen(false);
  };

  const handleOpenSaveDialog = () => {
    setgenerateCode(true);
    GenerateCode();
    Update_UserCode_Api();
  };

  const handleCloseSaveDialog = () => {
    setgenerateCode(false);
  };

  const saveData = (type) => {
    handleCloseDeleteDialog();
    handleCloseDeactivateDialog();
    handleCloseSaveDialog();
    if (type === 'deactivate') {
      DE_ACTIVATE_User_Api();
    } else if (type === 'delete') {
      DELETE_User_Api();
    } else if (type === 'newcode') {
      UPDATE_Password_Api();
    }
  };

  const GenerateCode = () => {
    const CODE = TextNumCode();
    console.log(CODE);
    setNewcode(`${CODE}`);
  };

  const Update_UserCode_Api = async () => {
    // const data = await ResetPassword('moizkaleem2000@hotmail.com');
    // console.log(data)
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
  const DELETE_User_Api = async () => {
    try {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/deleteUser', {
        data: {
          uid: SelectedUser.id,
        },
      });
      await deleteDoc(doc(db, 'users', SelectedUser.id));
      toast.success('User Deleted Successfully');
      GET_User_Api();
    } catch (err) {
      console.log(err);
      toast.error('An error occurred while creating user.');
    }
  };

  const DE_ACTIVATE_User_Api = async () => {
    const updatedUserDetails = {
      ...SelectedUser,
      status: !SelectedUser.status,
    };
    setSelectedUser(updatedUserDetails);
    const CompanyRef = doc(db, 'users', SelectedUser.id);

    // Toggle the status
    const newStatus = updatedUserDetails.status;
    if (newStatus === true) {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/enableUser', {
        data: {
          uid: SelectedUser.id,
        },
      });
    } else {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/disableUser', {
        data: {
          uid: SelectedUser.id,
        },
      });
    }
    try {
      // Update the document in the database
      await updateDoc(CompanyRef, { status: newStatus });

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      GET_User_Api();

      if (newStatus === true) {
        return toast.success('Company Activated Successfully');
      } else {
        return toast.success('Company Deactivated Successfully');
      }
    } catch (error) {
      console.error('Error Deactivating company status:', error);
      return toast.error('Error occured while Deactivating user');
    }
  };

  const UPDATE_Password_Api = async () => {
    try {
      const UserAuth = await axios.post('https://us-central1-lauenroth-15969.cloudfunctions.net/changeUserPassword', {
        data: {
          uid: SelectedUser.id,
          newPassword: Newcode,
        },
      });
      const UsersRef = doc(db, 'users', SelectedUser.id);

      const UpdatedUser = await updateDoc(UsersRef, { password: Newcode });
      GET_User_Api();
      return toast.success('Password Changed  Successfully');
    } catch (err) {
      console.log(err);
      return toast.error('Error occured while Changing Password ');
    }
  };

  const GET_User_Api = async () => {
    try {
      const usersRef = collection(db, 'users');
      // Add a where clause to filter documents by company_ref
      const comppanyRef = doc(db, 'companies', id);
      const querySnapshot = await getDocs(query(usersRef, where('company_ref', '==', comppanyRef)));

      // Extract data from the querySnapshot
      const newData = querySnapshot.docs.map((doc) => {
        const { company_ref, user_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields except company_ref
        };
      });
      // Set the retrieved data in the state
      setUsersData(newData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };
  useEffect(() => {
    GET_User_Api();
  }, []);

  return (
    <div>
      <Helmet>
        <title> Company Details | Lauenroth</title>
      </Helmet>
      <Confirm
        title={`New Code ${Newcode} generated for this account.`}
        subtitle={'Click on confirm to save this new code.'}
        open={generateCode}
        onClose={handleCloseSaveDialog}
        onConfirm={() => saveData('newcode')}
      />

      <Confirm
        title="Are you sure you want to delete the user?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={() => saveData('delete')}
      />
      <Confirm
        title={`Are you sure you want to ${SelectedUser.status ? 'deactivate' : 'activate'} the user?`}
        subtitle={'Changes will be permanent.'}
        open={deactivateDialogOpen}
        onClose={handleCloseDeactivateDialog}
        onConfirm={() => saveData('deactivate')}
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="start" mt={5} mb={3}>
          <Typography variant="h3" gutterBottom>
            {selectedCompany.Cname}
          </Typography>
        </Stack>

        <Menu page="users" selectedCompany={selectedCompany} />

        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
          <Typography variant="h5" gutterBottom>
            Users
          </Typography>
          {['supervisor', 'superuser'].includes(currentUser.role) && (
            <div>
              <div>
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
                <Link to={`/dashboard/company/add_company_user/${id}`}>
                  <Button variant="contained" className="py-2" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Add new user
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Stack>

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
                  const { id, uid, role, firstname, email, surename, ph_no, password, languages, createdAt, status } =
                    row;
                  const selectedUser = selected.indexOf(firstname) !== -1;

                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                      {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell> */}

                      <TableCell className="first-cell" align="left">
                        {surename} {firstname}
                      </TableCell>

                      {/* <TableCell className='border-0' align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                      <TableCell align="right">{role}</TableCell>
                      <TableCell align="right">
                        <span className={!status ? 'text-muted' : 'text-success'}>
                          {!status ? sentenceCase('Inactive') : sentenceCase('Active')}
                          {!status ? (
                            <Iconify icon="carbon:close-outline" />
                          ) : (
                            <Iconify icon="teenyicons:tick-circle-outline" />
                          )}
                        </span>
                      </TableCell>
                      <TableCell align="right">{converttimestamp(createdAt?.seconds)}</TableCell>

                      <TableCell className="last-cell" align="right">
                        <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
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
          count={filteredUsers.length}
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
          {['admin'].includes(currentUser.role) && (
            <Link
              to={`/dashboard/company/comapny_user_settings/${SelectedUser.id}`}
              state={{ SelectedUser }}
              className="text-decoration-none text-muted"
            >
              <MenuItem>
                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                Edit
              </MenuItem>
            </Link>
          )}
          {['supervisor', 'superuser'].includes(currentUser.role) && (
            <>
              <Link
                to={`/dashboard/company/comapny_user_settings/${SelectedUser.id}`}
                state={{ SelectedUser, selectedCompany }}
                className="text-decoration-none text-muted"
              >
                <MenuItem>
                  <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                  Edit
                </MenuItem>
              </Link>
              <MenuItem className="popover-item" onClick={() => handleOpenSaveDialog()}>
                <Iconify icon={'ci:undo'} sx={{ mr: 2 }} />
                New Code.
              </MenuItem>
              <MenuItem className="popover-item" onClick={() => handleOpenDeactivateDialog()}>
                <Iconify icon={'fa6-solid:ban'} sx={{ mr: 2 }} />
                {SelectedUser.status ? 'Deactivate' : 'Activate'}
              </MenuItem>
              <MenuItem onClick={() => handleOpenDeleteDialog()} sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                Delete
              </MenuItem>
            </>
          )}
        </Popover>
      </Container>
    </div>
  );
}
