import React, { useState, useEffect } from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card, Dialog, DialogActions, Typography, Stack, Container, DialogTitle, Button, Modal } from '@mui/material';

import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  doc,
  where,
  query,
  orderBy,
  deleteDoc,
  limit,
  getDoc,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';

export default function Allposts() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = useState(false); ///To check if data if loaded or not from collection.
  const [deleteID, setdeleteID] = useState('');
  const [openView, setOpenView] = useState(false);
  const [rowId, setrowId] = useState(-1);

  useEffect(() => {
    let active = true;
    const getData = async () => {
      setLoading(true);
      /////Getting the latest document first.

      onSnapshot(query(collection(db, 'posts')), (data) => {
        setRows([]);
        setLoading(true);

        data.docs.map((docs) => {
          const postData = docs.data();

          const rowData = { ...postData, id: postData.id };
          setRows((rows) => [...rows, rowData]);
        });

        setLoading(false);
      });
    };
    getData();
  }, []);

  const handleClickOpen = (id) => {
    setdeleteID(id);
    setOpenDialog(true);
  };
  const handleOpenView = (id) => {
    setrowId(rows.findIndex((obj) => obj.id === id));
    setOpenView(true);
    // getDocData(id);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const approvepost = (id) => {
    updateDoc(doc(db, 'posts', id), { status: 'approved' }).then(() => {
      toast.info('post Approved');
    });
  };
  const deletepost = () => {
    deleteDoc(doc(db, 'posts', deleteID))
      .then(() => {
        toast.info('post deleted successfully!');
        setdeleteID('');
        handleCloseDialog();
      })
      .catch((error) => {
        toast.error('Error deleting post');
        console.error('Error deleting post: ', error);
        handleCloseDialog();
      });
  };
  const columns = [
    {
      field: 'postTitle',
      headerName: 'Title',
      flex: 2,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },

    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,

      editable: false,
      renderCell: ActionButton,
    },
  ];

  function ActionButton(params) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Iconify icon="mdi:pencil" />}
          onClick={() => navigate('/dashboard/addposts/' + params.row.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          size="small"
          className="mx-2 bg-danger text-white"
          startIcon={<Iconify icon="mdi:delete" />}
          onClick={() => handleClickOpen(params.row.id)}
        >
          Delete
        </Button>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure to delete the post permanently? '}</DialogTitle>

          <DialogActions>
            <Button onClick={() => deletepost()}>Yes</Button>
            <Button onClick={handleCloseDialog} autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  return (
    <>
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
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Link to="/dashboard/addposts">
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Add New post
            </Button>
          </Link>
        </Stack>
        <Card>
          <div>
            <DataGrid
              components={{
                Toolbar: GridToolbar,
              }}
              style={{ height: '65vh', width: '100%' }}
              columns={columns}
              rows={rows}
              // getRowId={(Rows) => Rows._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              loading={loading}
            />
          </div>
        </Card>
      </Container>
    </>
  );
}
