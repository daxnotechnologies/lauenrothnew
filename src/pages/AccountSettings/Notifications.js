import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
const CustomSwitch = withStyles((theme) => ({
  switchBase: {
    '&$checked': {
      color: '#5FD65F', // Color when the switch is on
    },
    '&$checked + $track': {
      backgroundColor: '#5FD65F', // Background color of the track when the switch is on
    },
  },
  checked: {},
  track: {},
}))(Switch);
export default function Notifications() {
  const [invoicesPaid, setInvoicesPaid] = useState(false);
  const [invoicesOverdue, setInvoicesOverdue] = useState(false);

  const handlePaidChange = () => {
    setInvoicesPaid((prev) => !prev);
  };

  const handleOverdueChange = () => {
    setInvoicesOverdue((prev) => !prev);
  };
  return (
    <>
      <div className="row d-flex my-5 flex-wrap justify-items-between">
        <div className="col-sm-10">
          <Typography variant="h4" className='my-3'>Notifications</Typography>
        </div>
      </div>
      <FormControlLabel
        className="col-12 text-muted"
        control={
          <CustomSwitch
            checked={invoicesPaid}
            onChange={handlePaidChange}
            inputProps={{ 'aria-label': 'Invoices paid' }}
          />
        }
        label="Invoices paid"
      />
      <FormControlLabel
        className="col-12 text-muted"
        control={
          <CustomSwitch
            checked={invoicesOverdue}
            onChange={handleOverdueChange}
            inputProps={{ 'aria-label': 'Invoices overdue' }}
          />
        }
        label="Invoices overdue"
      />{' '}
    </>
  );
}
