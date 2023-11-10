import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Divider } from '@mui/material';

function AcknowledgementConfirmationDialog({ open, agreeOrDisagree, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Policies</DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Booking Issues:</Typography>
        <List>
          <ListItem>Difficulty finding the right type of Spot.</ListItem>
          <ListItem>Spot availability doesn't match the guest's preferred date and time.</ListItem>
          <ListItem>Questions about Spot amenities and features.</ListItem>
          <ListItem>Concerns about the accuracy of Spot descriptions.</ListItem>
        </List>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Payment and Refunds:</Typography>
        <List>
          <ListItem>Issues with payment processing or billing inquiries.</ListItem>
          <ListItem>Requesting refunds or clarification on refund policies.</ListItem>
          <ListItem>Problems with redeeming vouchers or promo codes.</ListItem>
        </List>

        <DialogTitle sx={{ fontWeight: 'bold' }}>Terms</DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Hosts:</Typography>
        <List>
          <ListItem>Assistance with setting up or modifying listings.</ListItem>
          <ListItem>Managing booking requests and inquiries.</ListItem>
          <ListItem>Help with adjusting availability calendars.</ListItem>
        </List>
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => agreeOrDisagree(true)}>Agree</Button>
        <Button variant="outlined" color="secondary" onClick={() => agreeOrDisagree(false)}>Disagree</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AcknowledgementConfirmationDialog;
