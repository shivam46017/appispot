import React, { useReducer, useState } from "react";

// css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid, ListItemSecondaryAction, ListSubheader } from "@mui/material";
import Slider from "react-slick";
import { Rating } from "@mui/material";

// icons
import ApprovedIcon from "@mui/icons-material/Approval";
import RejectIcon from "@mui/icons-material/Block";
import RedirectIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

// hooks
import { Link, useNavigate } from "react-router-dom";

// utlis
import downloadImage from "../../../../../../utils/helpers/fileDownload";
import axios from 'axios'
import { toast } from 'react-toastify'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function View({ open, viewData, toggleView, refresh }) {
  const navigate = useNavigate();

  const handleResolution = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/support/${viewData._id}`, {
        resolved: true
      })
      if (res.data.success === true) {
        toast.success('Successfully resolved the issue')
      }
      refresh()
    } catch (err) {
      toast.error('Something went wrong while resolving')
    }
  }

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={() => toggleView()}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Support
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container>
            <Grid item xs={3}>
              <ListItem button>
                <ListItemText
                  primary="Raised At"
                  secondary={new Date(viewData?.createdAt).toLocaleString()}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="From"
                  secondary={`${viewData?.from?.firstName} ${viewData?.from?.lastName} ( ${viewData?.from?.role} )`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Resolution"
                  secondary={
                    <div className="flex flex-col gap-2 items-start">
                      {viewData?.resolved ? (
                        <div className="flex gap-2 items-center">
                          <ApprovedIcon />
                          Resolved
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <RejectIcon />
                          Not Resolved
                        </div>
                      )}
                      <div>
                        {viewData?.resolved === false && (
                          <Button variant="contained" onClick={handleResolution}>
                            Resolved
                          </Button>
                        )}
                      </div>
                    </div>}
                />
              </ListItem>
            </Grid>
            <Grid item xs={9}>
              <ListItem button>
                <ListItemText primary="Service Number" secondary={viewData?.srno} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Issue" secondary={viewData?.issue} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Note" secondary={viewData?.note} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Screenshots"
                  secondary={
                    <div className="flex flex-col justify-center m-3 gap-2">
                      <Slider
                        slidesPerRow={1}
                        slidesToScroll={1}
                        centerMode={true}
                        autoplay={true}
                        autoplaySpeed={2000}
                        dots={true}
                      >
                        {viewData?.screenshots?.map((data) => {
                          return (
                            <img src={`http://localhost:5000${data}`} className="max-w-[50vw]" alt="" />
                          );
                        })}
                      </Slider>
                      <div className="">
                        <Button
                          onClick={() =>
                            downloadImage(
                              viewData?.screenshots?.map(
                                (val) => `${val}`
                              ),
                              viewData?._id + "-Docs"
                            )
                          }
                          variant="contained"
                          fullWidth
                        >
                          Download <DownloadIcon className="mx-4" />
                        </Button>
                      </div>
                    </div>
                  }
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}
