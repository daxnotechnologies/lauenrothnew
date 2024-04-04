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
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

// components
import Iconify from '../../../../components/iconify';
import Confirm from 'src/components/Confirmations/Confirm';

// Mock data for the survey
const SURVEY_DATA = [
  { id: 1, title: 'Survey 1', participants: 15, postedBy: 'Admin', date: '12,10,2023' },
  { id: 2, title: 'Survey 2', participants: 10, postedBy: 'Admin', date: '12,10,2023' },
  { id: 3, title: 'Survey 3', participants: 20, postedBy: 'Admin', date: '12,10,2023' },
  { id: 4, title: 'Survey 4', participants: 12, postedBy: 'Admin', date: '12,10,2023' },
  { id: 5, title: 'Survey 5', participants: 18, postedBy: 'Admin', date: '12,10,2023' },
];

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'participants', label: 'Participants', alignRight: false },
  { id: 'postedBy', label: 'Posted By', alignRight: false },
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
    return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Survey() {
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('title');
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

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SURVEY_DATA.length) : 0;

  const filteredSurveys = applySortFilter(SURVEY_DATA, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredSurveys.length && !!filterName;

  const deleteData = () => {
    // Mock function to handle survey deletion
    console.log('Survey Deleted Successfully');
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
        title="Are you sure you want to delete this survey?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={deleteData}
      />
      <div className="row d-flex mt-5 flex-wrap justify-items-between">
        <div className="col-md-5">
          <Typography variant="h4">Content: Survey </Typography>
        </div>
      </div>
      <div className="row my-3">
        <Typography>
          On this section, you can see existing and upload new content straight to the app/survey page.
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
                  <MenuItem value="Option1">Option 1</MenuItem>
                  <MenuItem value="Option2">Option 2</MenuItem>
                  <MenuItem value="Option3">Option 3</MenuItem>
                </Select>
              </FormControl>
              <Link to={'/dashboard/company/add_survey'} className=" ms-auto">
                <Button variant="contained" className="py-2" startIcon={<Iconify icon="mingcute:add-fill" />}>
                  New survey
                </Button>
              </Link>
            </div>
          </Box>
          <TabPanel sx={{ padding: '0px' }} value="1">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {filteredSurveys.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((survey) => (
                    <TableRow key={survey.id} tabIndex={-1} role="checkbox">
                      <TableCell className="first-cell" align="left">
                        {survey.title}
                      </TableCell>
                      <TableCell align="left">{survey.participants} participants</TableCell>
                      <TableCell align="right">{survey.postedBy}</TableCell>
                      <TableCell align="right">{survey.date}</TableCell>
                      <TableCell className="last-cell" align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredSurveys.length}
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
                  {/* Upcoming surveys */}
                  {SURVEY_DATA.slice(0, 2).map((survey) => (
                    <TableRow key={survey.id} tabIndex={-1} role="checkbox">
                      <TableCell className="first-cell" align="left">
                        {survey.title}
                      </TableCell>
                      <TableCell align="right">{survey.postedBy}</TableCell>
                      <TableCell align="right">{survey.date}</TableCell>
                      <TableCell className="last-cell" align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel sx={{ padding: '0px' }} value="3">
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ borderCollapse: 'separate', borderSpacing: '0px 20px' }}>
                <TableBody>
                  {/* Draft surveys */}
                  {SURVEY_DATA.slice(2, 3).map((survey) => (
                    <TableRow key={survey.id} tabIndex={-1} role="checkbox">
                      <TableCell className="first-cell" align="left">
                        {survey.title}
                      </TableCell>
                      <TableCell align="right">{survey.postedBy}</TableCell>
                      <TableCell align="right">{survey.date}</TableCell>
                      <TableCell className="last-cell" align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={4} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
        {/* The menu items remain the same */}
        <MenuItem className="popover-item" onClick={() => navigate('/dashboard/company/view_survey/1')}>
          <Iconify icon={'carbon:result'} sx={{ mr: 2 }} />
          Result
        </MenuItem>
        <MenuItem className="popover-item" onClick={() => navigate('/dashboard/company/submit_survey')}>
          <Iconify icon={'material-symbols:add'} sx={{ mr: 2 }} />
          Fill survey
        </MenuItem>
        <MenuItem className="popover-item" onClick={() => navigate('/dashboard/company/add_survey/1')}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleOpenDeleteDialog}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
