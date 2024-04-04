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
  FormControl,
  Select,
  InputLabel,
  Dialog,
  FormControlLabel,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

// components
import Iconify from '../../../components/iconify';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';

// Mock data for sent invoices
const INVOICELIST = [
  { id: 1, invoiceNumber: 'INV-001', company: 'ABC Corp', amount: 100.0, status: 'Sent', date: '12/10/2023' },
  { id: 2, invoiceNumber: 'INV-002', company: 'XYZ Ltd', amount: 150.0, status: 'Overdue', date: '12/15/2023' },
  { id: 3, invoiceNumber: 'INV-003', company: '123 Inc', amount: 200.0, status: 'Paid', date: '12/20/2023' },
  { id: 4, invoiceNumber: 'INV-004', company: 'EFG Ltd', amount: 120.0, status: 'Sent', date: '12/25/2023' },
  { id: 5, invoiceNumber: 'INV-005', company: 'LMN Corp', amount: 180.0, status: 'Overdue', date: '12/30/2023' },
  { id: 6, invoiceNumber: 'INV-006', company: 'UVW Inc', amount: 250.0, status: 'Paid', date: '01/05/2024' },
  { id: 7, invoiceNumber: 'INV-007', company: 'PQR Ltd', amount: 300.0, status: 'Sent', date: '01/10/2024' },
  { id: 8, invoiceNumber: 'INV-008', company: 'XYZ Corp', amount: 175.0, status: 'Overdue', date: '01/15/2024' },
  // Add more invoice data as needed
];

// Mock data for upcoming invoices
const UPCOMING_INVOICELIST = [
  { id: 1, invoiceNumber: 'INV-009', company: 'Future Corp', amount: 130.0, status: 'Upcoming', date: '01/20/2024' },
  { id: 2, invoiceNumber: 'INV-010', company: 'Tomorrow Ltd', amount: 190.0, status: 'Upcoming', date: '01/25/2024' },
  { id: 3, invoiceNumber: 'INV-011', company: 'Next Week Inc', amount: 220.0, status: 'Upcoming', date: '01/30/2024' },
  {
    id: 4,
    invoiceNumber: 'INV-012',
    company: 'Forthcoming Corp',
    amount: 140.0,
    status: 'Upcoming',
    date: '02/05/2024',
  },
  { id: 5, invoiceNumber: 'INV-013', company: 'Imminent Ltd', amount: 200.0, status: 'Upcoming', date: '02/10/2024' },
  { id: 6, invoiceNumber: 'INV-014', company: 'Pending Inc', amount: 270.0, status: 'Upcoming', date: '02/15/2024' },
  {
    id: 7,
    invoiceNumber: 'INV-015',
    company: 'Approaching Ltd',
    amount: 320.0,
    status: 'Upcoming',
    date: '02/20/2024',
  },
  { id: 8, invoiceNumber: 'INV-016', company: 'Incoming Corp', amount: 185.0, status: 'Upcoming', date: '02/25/2024' },
  // Add more upcoming invoice data as needed
];

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Invoice Number', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
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
    return filter(array, (_invoice) => _invoice.invoiceNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Invoices() {
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(null);
  const [openCourse, setOpenCourse] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('invoiceNumber');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openView, setOpenView] = useState(null);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteData = () => {
    toast.success('Invoice Deleted Successfully');
    handleCloseDeleteDialog();
  };
  const filteredSentInvoices = applySortFilter(INVOICELIST, getComparator(order, orderBy), filterName);
  const filteredUpcomingInvoices = applySortFilter(UPCOMING_INVOICELIST, getComparator(order, orderBy), filterName);

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - (value === '1' ? filteredSentInvoices.length : filteredUpcomingInvoices.length)
        )
      : 0;

  const isNotFound = !filteredSentInvoices.length && !filteredUpcomingInvoices.length && !!filterName;

  return (
    <>
      <Confirm
        title="Are you sure you want to delete this invoice?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={deleteData}
      />

      <div className="row d-flex mt-5 mb-3 flex-wrap justify-items-between">
        <div className="col-md-5">
          <Typography variant="h4">Invoices </Typography>
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
              <Tab label="Upcoming" value="2" />
            </TabList>
          </Box>

          <TabPanel sx={{ padding: '0px' }} value="1">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredSentInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                    <TableRow key={invoice.id} hover tabIndex={-1} role="checkbox">
                      <TableCell className="first-cell" align="left">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell align="right">{invoice.company}</TableCell>
                      <TableCell align="right">{invoice.amount} €</TableCell>
                      <TableCell align="right">
                        <span
                          className={
                            (invoice.status === 'Overdue' && 'text-danger') ||
                            (invoice.status === 'Sent' ? 'text-muted' : 'text-success')
                          }
                        >
                          {invoice.status === 'Sent' ? (
                            <>
                              Sent
                              <Iconify icon="material-symbols:mail-outline" />
                            </>
                          ) : (
                            <>
                              {invoice.status}
                              <Iconify
                                className="ms-2"
                                icon={
                                  invoice.status === 'Overdue'
                                    ? 'carbon:close-outline'
                                    : 'teenyicons:tick-circle-outline'
                                }
                              />
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell align="right">{invoice.date}</TableCell>
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSentInvoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </TabPanel>

          <TabPanel sx={{ padding: '0px' }} value="2">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredUpcomingInvoices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((invoice) => (
                      <TableRow key={invoice.id} hover tabIndex={-1} role="checkbox">
                        <TableCell className="first-cell" align="left">
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell align="right">{invoice.company}</TableCell>
                        <TableCell align="right">{invoice.amount} €</TableCell>
                        <TableCell align="right">
                          <span className={(invoice.status === 'Overdue' && 'text-danger') || 'text-success'}>
                            {invoice.status === 'Upcoming' ? (
                              <>
                                Upcoming
                                <Iconify icon="carbon:arrow-up" />
                              </>
                            ) : (
                              <>
                                {invoice.status}
                                <Iconify
                                  className="ms-2"
                                  icon={
                                    invoice.status === 'Overdue'
                                      ? 'carbon:close-outline'
                                      : 'teenyicons:tick-circle-outline'
                                  }
                                />
                              </>
                            )}
                          </span>
                        </TableCell>
                        <TableCell align="right">{invoice.date}</TableCell>
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUpcomingInvoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </TabPanel>
        </TabContext>
      </Box>

      <FormControlLabel className="w-100" control={<Checkbox defaultChecked />} label="Send invoices automatically " />
      <FormControlLabel className="w-100" control={<Checkbox />} defaultChecked label="Send reminders automatically " />
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
        <MenuItem className="text-muted popover-item">
          <Iconify icon={'material-symbols:print'} sx={{ mr: 2 }} />
          Print
        </MenuItem>
        <MenuItem className="text-muted popover-item">
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
