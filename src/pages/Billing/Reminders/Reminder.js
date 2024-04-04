import React, { useState } from 'react';
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
  InputLabel,
  Select,
  FormControl,
  Dialog,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

// components
import Iconify from '../../../components/iconify';
// sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';
// mock
import USERLIST from '../../../_mock/user';
import { toast } from 'react-toastify';
import Confirm from 'src/components/Confirmations/Confirm';

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Invoice Number', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: true },
  { id: 'status', label: 'Status', alignRight: true },
  { id: 'date', label: 'Date', alignRight: true },
  { id: '' },
];

// ----------------------------------------------------------------------

const REMINDERLIST = [
  { id: 1, invoiceNumber: 'REM-001', company: 'Reminder Corp', amount: 100.0, status: 'Sent', date: '12/10/2023' },
  { id: 2, invoiceNumber: 'REM-002', company: 'Alert Ltd', amount: 150.0, status: 'Overdue', date: '12/15/2023' },
  { id: 3, invoiceNumber: 'REM-003', company: 'Notify Inc', amount: 200.0, status: 'Paid', date: '12/20/2023' },
  { id: 4, invoiceNumber: 'REM-004', company: 'Ping Ltd', amount: 120.0, status: 'Sent', date: '12/25/2023' },
  { id: 5, invoiceNumber: 'REM-005', company: 'Ping Corp', amount: 180.0, status: 'Overdue', date: '12/30/2023' },
  { id: 6, invoiceNumber: 'REM-006', company: 'Alert Inc', amount: 250.0, status: 'Paid', date: '01/05/2024' },
  { id: 7, invoiceNumber: 'REM-007', company: 'Notification Ltd', amount: 300.0, status: 'Sent', date: '01/10/2024' },
  { id: 8, invoiceNumber: 'REM-008', company: 'Remind Corp', amount: 175.0, status: 'Overdue', date: '01/15/2024' },
  // Add more reminder data as needed
];

// Mock data for past reminders
const PAST_REMINDERLIST = [
  { id: 1, invoiceNumber: 'REM-009', company: 'Past Corp', amount: 130.0, status: 'Past', date: '01/20/2024' },
  { id: 2, invoiceNumber: 'REM-010', company: 'History Ltd', amount: 190.0, status: 'Past', date: '01/25/2024' },
  { id: 3, invoiceNumber: 'REM-011', company: 'Yesterday Inc', amount: 220.0, status: 'Past', date: '01/30/2024' },
  { id: 4, invoiceNumber: 'REM-012', company: 'Former Corp', amount: 140.0, status: 'Past', date: '02/05/2024' },
  { id: 5, invoiceNumber: 'REM-013', company: 'Gone Ltd', amount: 200.0, status: 'Past', date: '02/10/2024' },
  { id: 6, invoiceNumber: 'REM-014', company: 'Bygone Inc', amount: 270.0, status: 'Past', date: '02/15/2024' },
  { id: 7, invoiceNumber: 'REM-015', company: 'Old Ltd', amount: 320.0, status: 'Past', date: '02/20/2024' },
  { id: 8, invoiceNumber: 'REM-016', company: 'Expired Corp', amount: 185.0, status: 'Past', date: '02/25/2024' },
  // Add more past reminder data as needed
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

export default function Reminder() {
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filterOption, setFilterOption] = React.useState('');

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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - REMINDERLIST.length) : 0;

  const filteredReminders = applySortFilter(
    value === '1' ? REMINDERLIST : PAST_REMINDERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredReminders.length && !!filterName;

  const deleteData = () => {
    toast.success('Reminder Deleted Successfully');
    handleCloseDeleteDialog();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Confirm
        title="Are you sure you want to delete this reminder?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={deleteData}
      />
      <div className="row d-flex mt-5 flex-wrap justify-items-between">
        <div className="col-md-5">
          <Typography variant="h4">Reminders </Typography>
        </div>
        <div className="col text-end">
          <FormControl sx={{ width: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Filter</InputLabel>
            <Select
              size="small"
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
        </div>
      </div>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="d-flex align-items-center">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Sent" value="1" />
              <Tab label="Past" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: '0px' }} value="1">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                {/* <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredReminders.length}
                  numSelected={selected.length}
                  onRequestSort={(event, property) => {
                    const isAsc = orderBy === property && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy(property);
                  }}
                  onSelectAllClick={() => {}}
                /> */}
                <TableBody>
                  {filteredReminders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reminder) => (
                    <TableRow hover key={reminder.id} tabIndex={-1} role="checkbox">
                      <TableCell align="left" className="first-cell">
                        {reminder.invoiceNumber}
                      </TableCell>
                      <TableCell align="right">{reminder.company}</TableCell>
                      <TableCell align="right">{reminder.amount.toFixed(2)} €</TableCell>
                      <TableCell align="right">
                        <span className={(reminder.status === 'Sent' && 'text-success') || 'text-danger'}>
                          {reminder.status === 'Sent' ? (
                            <>
                              Sent
                              <Iconify className="ms-2 " icon="material-symbols:mail-outline" />
                            </>
                          ) : (
                            <>
                              Overdue
                              <Iconify className="ms-2" icon="carbon:close-outline" />
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell align="right">{reminder.date}</TableCell>
                      <TableCell className="last-cell" align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
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
              count={filteredReminders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>
          <TabPanel sx={{ padding: '0px' }} value="2">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                {/* <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredReminders.length}
                  numSelected={selected.length}
                  onRequestSort={(event, property) => {
                    const isAsc = orderBy === property && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy(property);
                  }}
                  onSelectAllClick={() => {}}
                /> */}
                <TableBody>
                  {filteredReminders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reminder) => (
                    <TableRow hover key={reminder.id} tabIndex={-1} role="checkbox">
                      <TableCell align="left" className="first-cell">
                        {reminder.invoiceNumber}
                      </TableCell>
                      <TableCell align="right">{reminder.company}</TableCell>
                      <TableCell align="right">{reminder.amount.toFixed(2)} €</TableCell>
                      <TableCell align="right">
                        <span className={(reminder.id % 2 === 0 && 'text-danger') || 'text-success'}>
                          {reminder.status === 'Past' ? (
                            <>
                              Past
                              <Iconify className="ms-2" icon="fluent:clock-alarm-outline-16-filled" />
                            </>
                          ) : null}
                        </span>
                      </TableCell>
                      <TableCell align="right">{reminder.date}</TableCell>
                      <TableCell className="last-cell" align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
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
              count={filteredReminders.length}
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
        <MenuItem className="popover-item">
          <Iconify icon={'material-symbols:print'} sx={{ mr: 2 }} />
          Print
        </MenuItem>
        <MenuItem className="popover-item">
          <Iconify icon={'material-symbols:download'} sx={{ mr: 2 }} />
          Download
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteDialog()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
