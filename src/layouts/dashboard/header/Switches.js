import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels() {
  return (
    <>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Anonymous"
        sx={{ color: 'black' }} // Add this line to set the label text color
      />
      <FormControlLabel
        required
        control={<Switch />}
        label="Notification"
        sx={{ color: 'black' }} // Add this line to set the label text color
      />
    </>
  );
}
