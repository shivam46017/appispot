import React, { useState } from "react";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function View({ open, viewData, toggleView }) {
  const navigate = useNavigate();

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
              Spot Preview
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container>
            <Grid item xs={3}>
              <ListItem button>
                <ListItemText
                  primary="Created At"
                  secondary={new Date(viewData?.createdAt).toLocaleString()}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Approval Status"
                  secondary={
                    <div className="flex gap-2 items-center">
                      {viewData?.isApproved === true ? (
                        <>
                          <ApprovedIcon /> Approved
                        </>
                      ) : (
                        <>
                          <RejectIcon />
                          Not Approved
                        </>
                      )}
                    </div>
                  }
                />
              </ListItem>
              <Link to={`/admin/host-management/${viewData?.lister?._id}`}>
                <ListItem button>
                  <ListItemText
                    primary="Lister"
                    secondary={
                      <div className="flex justify-between items-center">
                        <div>
                          {viewData?.lister?.firstName +
                            " " +
                            viewData?.lister?.lastName}
                        </div>
                        <div>
                          <RedirectIcon />
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              </Link>
              <ListItem>
                <ListItemText primary="Bookings" secondary={`0 Bookings`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Ratings"
                  secondary={
                    <div className="flex flex-col">
                      <Rating name="read-only" value={0} readOnly />
                      <span>0 out of 0 users</span>
                    </div>
                  }
                />
              </ListItem>
            </Grid>
            <Grid item xs={9}>
              <ListItem button>
                <ListItemText primary="Name" secondary={viewData?.Name} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Description"
                  secondary={viewData?.Description}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Maximum Guests"
                  secondary={viewData?.guests}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Documents"
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
                        {viewData?.docs?.map((data) => {
                          return (
                            <img src={`http://192.168.1.104:5000${data}`} alt="" />
                          );
                        })}
                      </Slider>
                      <div className="">
                        <Button
                          onClick={() =>
                            downloadImage(
                              viewData?.Docs?.map(
                                (val) => `http://192.168.1.104:5000${val}`
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
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Spot Images"
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
                        {viewData?.Images?.map((data) => {
                          return (
                            <img src={`http://192.168.1.104:5000${data}`} alt="" />
                          );
                        })}
                      </Slider>
                      <div className="">
                        <Button
                          onClick={() =>
                            downloadImage(
                              viewData?.Images?.map(
                                (val) => `http://192.168.1.104:5000${val}`
                              ),
                              viewData?._id
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
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Ameities"
                  secondary={
                    <div className="grid grid-cols-6">
                      {viewData?.Amenities?.map((data) => {
                        return (
                          <div className="flex items-center gap-2 py-2">
                            <div>
                              <img
                                height={25}
                                width={25}
                                src={`http://192.168.1.104:5000${data?.amenityIcon}`}
                              />
                            </div>
                            <div>{data?.amenityName}</div>
                          </div>
                        );
                      })}
                    </div>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Categories"
                  secondary={
                    <div className="grid grid-cols-4">
                      {viewData?.Categories?.map((data) => {
                        return (
                          <div className="flex items-center gap-2 py-2">
                            <div>
                              <img
                                height={25}
                                width={25}
                                src={`http://192.168.1.104:5000${data?.categoryIcon}`}
                              />
                            </div>
                            <div>{data?.categoryName}</div>
                          </div>
                        );
                      })}
                    </div>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Timing"
                  secondary={
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Day</TableCell>
                            <TableCell align="left">Opening Time</TableCell>
                            <TableCell align="left">Closing Time</TableCell>
                            <TableCell align="left">Holiday</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(viewData?.Timing ?? {})?.map(
                            (row) => (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">{row?.[0]}</TableCell>
                                <TableCell align="left">
                                  {row?.[1]?.open !== "hh:mm"
                                    ? new Date(
                                        row?.[1]?.open
                                      ).toLocaleTimeString()
                                    : ""}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.[1]?.open !== "hh:mm"
                                    ? new Date(
                                        row?.[1]?.open
                                      ).toLocaleTimeString()
                                    : ""}
                                </TableCell>
                                <TableCell align="left">
                                  {row?.[1]?.holiday ? "Holiday" : ""}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  }
                />
              </ListItem>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemText primary="Location" />
                  <ListItemSecondaryAction>
                    <RedirectIcon />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="State"
                    secondary={viewData?.Location?.state ?? "Connecticut"}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="City"
                    secondary={viewData?.Location?.city}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Road Name"
                    secondary={viewData?.Location?.roadName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Address"
                    secondary={viewData?.Location?.address}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}
