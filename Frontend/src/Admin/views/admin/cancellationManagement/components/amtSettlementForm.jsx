import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types'
import { DialogActions } from '@mui/material';

export default function AmtSettlementForm({ open, onClose }) {
  const [value, setValue] = React.useState('50-50');


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Refund Options</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a refund option.
          </DialogContentText>
          <RadioGroup
            aria-label="refund"
            name="refund-options"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="50-50" control={<Radio />} label="50% refund to user, 50% refund to host" />
            <FormControlLabel value="100-customer" control={<Radio />} label="100% refund to customer" />
            <FormControlLabel value="100-host" control={<Radio />} label="100% payout to host" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
        <Button>Approve</Button>
        <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AmtSettlementForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
}