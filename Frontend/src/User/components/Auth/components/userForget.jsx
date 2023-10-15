import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { useState } from "react";

const UserForget = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{success ? "Success" : "Enter your email"}</DialogTitle>
      <DialogContent>
          {success ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <CheckCircleOutlineIcon
                style={{ fontSize: 60, color: green[500] }}
              />
              <Box>Email successfully sent!</Box>
            </Box>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              form="user-forget-password-dialog"
              required
              error={error}
              helperText={error ? 'Email is required' : ''}
            />
          )}
      </DialogContent>
      <DialogActions>
        {loading ? (
          <CircularProgress />
        ) : success ? (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        ) : (
          <>
            <Button  onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" form="user-forget-password-dialog" onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserForget;
