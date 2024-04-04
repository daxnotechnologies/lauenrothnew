import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { Link, useNavigate, useParams } from 'react-router-dom';

// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/accounts';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import UserChart from 'src/components/chart/UserChart';
import PostChart from 'src/components/chart/PostChart';
import { useAuth } from 'src/Context/AuthContext';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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

function applySortFilter(array, comparator, query, currentUserCompany) {
  // If currentUserCompany is 'All', return the original array
  if (currentUserCompany === 'All' || !currentUserCompany) {
    return array;
  }

  // Filter array based on currentUserCompany
  const filteredArray = array.filter((user) => user.company === currentUserCompany);

  // Sort the filtered array
  const stabilizedThis = filteredArray.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  // Apply query filter if provided
  if (query) {
    return filter(
      stabilizedThis.map((el) => el[0]),
      (user) => user.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Companies() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  console.log(currentUser);
  // currentUser.role = 'supervisor';
  // currentUser.company = 'Kihn, Schuppe and Greenfelder';
  useEffect(() => {
    if (!['supervisor', 'superuser', 'admin'].includes(currentUser.role)) {
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [companiesData, setcompaniesData] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedSuperUser, setselectedSuperUser] = useState({});

  const handleChangeFilter = (event) => {
    setFilterOption(event.target.value);
  };

  const handleOpenMenu = (event, company) => {
    setOpen(event.currentTarget);
    setSelectedCompany(company); // Set the selected company
    GET_Company_Superuser(company.id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    // setSelectedCompany(null); // Clear the selected company when the menu is closed
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = companiesData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
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

  const saveData = (popUptype) => {
    if (popUptype === 'deactive') {
      DEACTIVATE_Comany_Api();
      handleCloseDeactivateDialog();
    } else {
      DELETE_Comany_Api();
      handleCloseDeleteDialog();
    }
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

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companiesData.length) : 0;

  const filteredUsers = applySortFilter(companiesData, getComparator(order, orderBy), filterName, currentUser.company);
  console.log(filteredUsers);
  const isNotFound = !filteredUsers.length && !!filterName;

  const DELETE_Comany_Api = async () => {
    const CompanyRef = doc(db, 'companies', selectedCompany.id);
    try {
      // Update the document in the database
      await deleteDoc(CompanyRef);

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      await GET_Companies_Api();
      return toast.success('Company Deleted Successfully');
    } catch (error) {
      console.error('Error Deleting company status:', error);
      return toast.error('Error occured while Deleting Company');
    }
  };

  const DEACTIVATE_Comany_Api = async () => {
    const CompanyRef = doc(db, 'companies', selectedCompany.id);

    // Toggle the status
    const newStatus = !selectedCompany?.status;

    try {
      // Update the document in the database
      await updateDoc(CompanyRef, { status: newStatus });

      // After updating the status, you may want to retrieve the updated list of companies.
      // Assuming GET_Companies_Api() fetches the updated list of companies, you can await it too.
      await GET_Companies_Api();
      return toast.success('Company Deactivated Successfully');
    } catch (error) {
      console.error('Error Deactivating company status:', error);
      return toast.error('Error occured while Deactivating Company');
    }
  };

  const GET_Companies_Api = async () => {
    try {
      const usersRef = collection(db, 'companies');
      const querySnapshot = await getDocs(usersRef);
      // Extract data from the querySnapshot
      const newData = querySnapshot.docs.map((doc) => {
        const { company_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields except company_ref
        };
      });

      // Set the retrieved data in the state
      setcompaniesData(newData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  const GET_Company_Superuser = async (Cid) => {
    try {
      console.log(Cid);
      const usersRef = collection(db, 'users');
      const comppanyRef = doc(db, 'companies', Cid);
      const querySnapshot = await getDocs(
        query(usersRef, where('company_ref', '==', comppanyRef), where('role', '==', 'superuser'))
      );
      const newData = querySnapshot.docs.map((doc) => {
        const { company_ref, ...rest } = doc.data(); // Destructuring to exclude company_ref
        return {
          id: doc.id,
          ...rest, // Spread the rest of the fields except company_ref
        };
      });
      // Set the retrieved data in the state
      console.log(newData);
      setselectedSuperUser(newData[0]);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  useEffect(() => {
    GET_Companies_Api();
  }, []);
  return (
    <>
      <Helmet>
        <title>Accounts | Lauernoth </title>
      </Helmet>
      <Confirm
        title="Are you sure you want to delete this account?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={saveData}
      />
      <Confirm
        title="Are you sure you want to deactivate this account?"
        subtitle={'Changes will be permanent.'}
        open={deactivateDialogOpen}
        onClose={handleCloseDeactivateDialog}
        onConfirm={() => saveData('deactive')}
      />
      <Container>
        <Typography className="w-100" variant="h3" mt={5} mb={3}>
          Accounts
        </Typography>
        <Typography className="w-100" mb={5}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            All accounts
          </Typography>
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
            </FormControl>{' '}
            <Link to="/dashboard/company/addcompany">
              <Button variant="contained" className="py-2" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add new account
              </Button>
            </Link>
          </div>
        </Stack>

        <>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, ind) => {
                    const company = selected.indexOf(val.id) !== -1;

                    return (
                      <TableRow key={val.id} hover tabIndex={-1} role="checkbox" selected={Boolean(company)}>
                        <TableCell className="first-cell" align="left">
                          {val.Cname}
                        </TableCell>

                        <TableCell align="right">
                          <span className={!val.status ? 'text-muted' : 'text-success'}>
                            {!val.status ? sentenceCase('Inactive') : sentenceCase('Active')}
                            {!val.status ? (
                              <Iconify icon="carbon:close-outline" />
                            ) : (
                              <Iconify icon="teenyicons:tick-circle-outline" />
                            )}
                          </span>
                        </TableCell>
                        <TableCell align="right">{converttimestamp(val.createdAt?.seconds)}</TableCell>

                        <TableCell className="last-cell" align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, val)}>
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
                      <TableCell className="border-0" align="center" colSpan={6} sx={{ py: 3 }}>
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
        </>
      </Container>

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
        <Link
          to={`/dashboard/company/${
            !['admin'].includes(currentUser.role)
              ? `company_settings/${selectedCompany.id}`
              : `comapny_users/${selectedCompany.id}`
          }`}
          state={{ selectedCompany,selectedSuperUser }}
          className="text-muted text-decoration-none"
        >
          <MenuItem>
            <Iconify icon={'eva:eye-fill'} sx={{ mr: 2 }} />
            View
          </MenuItem>
        </Link>
        <MenuItem className="popover-item" onClick={() => handleOpenDeactivateDialog()}>
          <Iconify icon={'fa6-solid:ban'} sx={{ mr: 2 }} />
          Deactivate
        </MenuItem>

        <MenuItem onClick={() => handleOpenDeleteDialog()} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
