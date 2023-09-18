import * as React from "react";

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
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/material";
import Slider from "react-slick";

// icons
import ApprovedIcon from "@mui/icons-material/Approval";
import RejectIcon from "@mui/icons-material/Block";
import RedirectIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

// hooks
import { Link, useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, viewData, toggleView }) {
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
              Sound
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
                      <RejectIcon />
                      Not Approved
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
              <Button variant="outlined" sx={{ margin: 1 }}>
                Edit <EditIcon className="mx-4" />
              </Button>
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
                            <img src={`http://localhost:5000${data}`} alt="" />
                          );
                        })}
                      </Slider>
                      <div className="">
                        <Button variant="contained" fullWidth>
                          Download <DownloadIcon className="mx-4"/>
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
                            <img src={`http://localhost:5000${data}`} alt="" />
                          );
                        })}
                      </Slider>
                      <div className="">
                        <Button variant="contained" fullWidth>
                          Download <DownloadIcon className="mx-4"/>
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
