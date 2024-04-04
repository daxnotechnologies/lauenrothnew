import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Button, Container } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Confirm from 'src/components/Confirmations/Confirm';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';

const roles = ['User', 'Admin', 'Super Admin', 'Content Admin'];
const modules = ['Courses', 'Accounts', 'Posts', 'Messages', 'Invoices'];
const permissions = ['View', 'Create', 'Update', 'Delete'];

export default function SetRolePermissions() {
  const [accessMatrix, setAccessMatrix] = useState(
    roles.reduce((acc, role) => {
      acc[role] = modules.reduce((moduleAcc, module) => {
        moduleAcc[module] = permissions.map(() => false);
        return moduleAcc;
      }, {});
      return acc;
    }, {})
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleCheckboxChange = (role, module, permissionIndex) => {
    setAccessMatrix((prevMatrix) => ({
      ...prevMatrix,
      [role]: {
        ...prevMatrix[role],
        [module]: prevMatrix[role][module].map((checked, index) => (index === permissionIndex ? !checked : checked)),
      },
    }));
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const handleOpenSaveDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setDeleteDialogOpen(false);
  };

  const saveData = () => {
    handleCloseSaveDialog();
    return toast.success('Changes Saved Successfully');
  };
  const handleCancelDialogOpen = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  const cancelSave = () => {
    handleCancelDialogOpen();
    navigate('/dashboard/app/settings');
  };

  return (
    <div>
      <Helmet>
        <title> Role Permissions | Lauenroth</title>
      </Helmet>
      <Confirm
        title="Are you sure you want to save Changes?"
        subtitle={'Changes will be permanent.'}
        open={deleteDialogOpen}
        onClose={handleCloseSaveDialog}
        onConfirm={saveData}
      />
      <Confirm
        title="Are you sure you want to cancel?"
        subtitle={'Changes will be unsaved.'}
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onConfirm={cancelSave}
      />
      <Container>
        {/* <Link onClick={() => navigate(-1)}>
          <Button>
            <Iconify className="me-1" icon="ion:caret-back-outline" />
            Back
          </Button>
        </Link> */}

        <Typography variant="h4" className="my-4">
          Roles Access and Permissions
        </Typography>

        <div className="row my-5">
          <TableContainer className="border p-0 rounded">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>
                  {modules.map((module) => (
                    <TableCell className="text-center" key={module}>
                      {module}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  {modules.map((module) => (
                    <TableCell key={module}>
                      {permissions.map((permission, index) => (
                        <span className="mx-1" key={permission}>
                          {permission}
                        </span>
                      ))}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role}>
                    <TableCell>{role}</TableCell>
                    {modules.map((module) => (
                      <TableCell key={module}>
                        {permissions.map((permission, index) => (
                          <Checkbox
                            className="mx-1"
                            key={permission}
                            checked={accessMatrix[role][module][index]}
                            onChange={() => handleCheckboxChange(role, module, index)}
                          />
                        ))}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="d-flex justify-content-end my-3">
          <Button variant="outlined" onClick={cancelSave} className="me-3">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleOpenSaveDialog}>
            Save Changes
          </Button>
        </div>
      </Container>
    </div>
  );
}
