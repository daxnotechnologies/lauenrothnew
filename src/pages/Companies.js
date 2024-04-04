import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import {
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Stack,
  Container,
  Button,
  TextField,
  FormControl,
  Box,
  Modal,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import { collection, getDocs, setDoc, updateDoc, doc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { db } from '../firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#fff',
  p: 4,
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
};

export default function Company() {
  const [rows, setRows] = useState([]);
  const [isupdate, setisupdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setisProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [Name, setName] = useState('');
  const [DocId, setDocId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    const getData = async () => {
      setLoading(true);
      // Getting the latest document first.
      const data = await getDocs(query(collection(db, 'Company'), orderBy('name', 'asc')));
      // Mapping Through App Documents And Then Saving them in rows useState.
      data.docs.map((document) => {
        setRows((row) => [
          ...row,
          {
            ...document.data(),
          },
        ]);
      });

      if (!active) {
        return;
      }

      setLoading(false);
      return () => {
        active = false;
      };
    };
    getData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setName('');
  };
  const handleOpenUpdate = (name = '', id = '') => {
    setisupdate(true);
    setName(name);
    setDocId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setName('');
    setisupdate(false);
    setisProcessing(false);
  };

  const handleClickOpen = (id) => {
    setOpenDialog(true);
    setDocId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDocId('');
    setisProcessing(false);
  };

  const deleteCompany = () => {
    setisProcessing(true);
    deleteDoc(doc(db, 'Company', DocId))
      .then(() => {
        toast.info('Company Deleted');
        handleCloseDialog();
        setRows(rows.filter((row) => row.id !== DocId));
      })
      .catch((error) => {
        handleCloseDialog();
        toast.error('Error! Unable to Delete Company');
        console.log(error);
      });
  };

  const addCompany = () => {
    if (!Name) {
      toast.error('Company Cant be Empty');
      return;
    }
    setisProcessing(true);

    if (isupdate) {
      updateDoc(doc(db, 'Company', DocId), { name: Name })
        .then(() => {
          handleClose();
          toast.success('Company Updated');
          setRows(
            rows.map((item) => {
              if (item.id === DocId) {
                return {
                  ...item,
                  name: Name,
                };
              }
              return item;
            })
          );
        })
        .catch((error) => {
          handleClose();
          toast.error('Error! unable to Update Company');
          console.log(error);
        });
    } else {
      const newDoc = doc(collection(db, 'Company'));
      const docId = newDoc.id;
      setDoc(newDoc, { name: Name, id: docId })
        .then(() => {
          handleClose();
          toast.success('Company Added');
          setRows((rows) => [{ name: Name, id: docId }, ...rows]);
        })
        .catch((error) => {
          handleClose();
          toast.error('Error! unable to Add Company');
          console.log(error);
        });
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Company',
      headerClassName: 'bg-light',
      flex: 1, // Distribute available space evenly
    },
    {
      field: 'Action',
      headerClassName: 'bg-light',
      flex: 1, // Distribute available space evenly
      editable: false,
      renderCell: ActionButton,
      align: 'right',
    },
  ];

  function ActionButton(params) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          className="mx-2"
          size="small"
          startIcon={<Iconify icon="mdi:pencil" />}
          onClick={() => {
            handleOpenUpdate(params.row.name, params.row.id);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="bg-danger mx-2"
          onClick={() => handleClickOpen(params.row.id)}
          startIcon={<Iconify icon="mdi:delete" />}
        >
          Delete
        </Button>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure to Delete the Company?'}</DialogTitle>

          {isProcessing ? (
            <LinearProgress />
          ) : (
            <DialogActions>
              <Button onClick={() => deleteCompany()}>Yes</Button>
              <Button onClick={handleCloseDialog} autoFocus>
                No
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Box style={{ display: 'flex', justifyContent: 'end' }}>
              <Iconify icon="mdi:close-circle" onClick={handleClose} style={{ cursor: 'pointer', color: 'gray' }} />
            </Box>
            <h2 className="mb-4" mb={3}>
              {!isupdate ? 'Add New Company' : 'Update Company'}
            </h2>

            <FormControl fullWidth size="small">
              <TextField
                className="mb-4"
                id="outlined-basic"
                label="Enter Name"
                variant="outlined"
                size="small"
                fullWidth
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <Button
              fullWidth
              className="mt-2 muibtn"
              variant="contained"
              color="primary"
              disabled={isProcessing}
              onClick={() => addCompany()}
            >
              {isProcessing ? (
                <CircularProgress sx={{ color: 'white' }} size={27} />
              ) : (
                <>
                  <Iconify icon={'mdi:plus-thick'} style={{ marginRight: 10 }} />
                  {!isupdate ? 'Add Company' : 'Update Company'}
                </>
              )}
            </Button>
          </div>
        </Box>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            All Companies
          </Typography>
          <Button onClick={() => handleOpen()} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add New Company
          </Button>
        </Stack>

        <Card>
          <DataGrid
            style={{ height: '65vh', width: '100%' }}
            columns={columns}
            rows={rows}
            // getRowId={(Rows) => Rows._id}
            pageSize={6}
            rowsPerPageOptions={[5]}
            loading={loading}
            disableSelectionOnClick
          />
        </Card>
      </Container>
    </div>
  );
}
