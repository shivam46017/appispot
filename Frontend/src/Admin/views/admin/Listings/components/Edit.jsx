import React, { useEffect, useState } from "react";

// css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  DialogContent,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  DialogActions,
  FormLabel,
} from "@mui/material";
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
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

// icons
import ApprovedIcon from "@mui/icons-material/Approval";
import RejectIcon from "@mui/icons-material/Block";
import RedirectIcon from "@mui/icons-material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

// hooks
import { Link, useNavigate } from "react-router-dom";

// utlis
import downloadImage from "../../../../../../utils/helpers/fileDownload";
import { TimePicker } from "@mui/x-date-pickers";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AmenitiesSelector = ({ open, selected, onClose, onChange }) => {
  const [amenities, setAmenities] = useState([]);
  const [addedAmenities, addAmenities] = useState([]);

  const fetchAmenities = async () => {
    const res = await axios.get(`http://localhost:5000/api/getAmenities`);
    const data = await res.data.amenities;
    setAmenities(data);
  };

  const isChecked = (id) => {
    if (addedAmenities?.includes(id)) return true;
    else return false;
  };

  useEffect(() => {
    fetchAmenities();
    console.log('line no.84')
  }, []);

  useEffect(() => {
    if (typeof onChange !== "function") return;
    onChange(addedAmenities);
    console.log('line no.90')
  }, [addedAmenities]);



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <FormGroup
          onClick={(e) =>
            addAmenities((prev) => {
              if (addedAmenities.includes(e.target.value)) {
                return addedAmenities.filter((val) => val !== e.target.value);
              } else {
                return [...prev, e.target.value];
              }
            })
          }
        >
          {amenities.map((data) => (
            <FormControlLabel
              value={data._id}
              control={<Checkbox checked={isChecked(data?._id)} />}
              label={
                <div className="flex gap-2 items-center">
                  <img
                    height={25}
                    width={25}
                    src={`${data.amenityIcon}`}
                  />{" "}
                  {data?.amenityName}
                </div>
              }
            ></FormControlLabel>
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CategorySelector = ({ open, selected, onClose, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [addedCategories, addCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get(`http://localhost:5000/api/getCategories`);
    const data = await res.data.category;
    setCategories(data);
    console.log('147')
  };

  const isChecked = (id) => {
    if (addedCategories?.includes(id)) return true;
    else return false;
  };

  useEffect(() => {
    fetchCategories();
    console.log('line no.157')
  }, []);

  useEffect(() => {
    if (typeof onChange !== "function") return;
    onChange(addedCategories);
    console.log('line no.163')
  }, [addedCategories]);

  useEffect(() => {
    addCategories(selected)
  }, [selected])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent dividers>
        <FormGroup
          onClick={(e) =>
            addCategories((prev) => {
              if (addedCategories.includes(e.target.value)) {
                return addedCategories.filter((val) => val !== e.target.value);
              } else {
                return [...prev, e.target.value];
              }
            })
          }
        >
          {categories?.map((data) => (
            <FormControlLabel
              value={data._id}
              control={<Checkbox checked={isChecked(data?._id)} />}
              label={
                <div className="flex gap-2 items-center">
                  <img
                    height={25}
                    width={25}
                    src={`${data?.categoryIcon}`}
                  />
                  {data?.categoryName}
                </div>
              }
            ></FormControlLabel>
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function Edit({ open, viewData, toggleEdit, refresh }) {
  const navigate = useNavigate();

  // Dialog States
  const [openAmenitiesSelectDialog, setOpenAmenitiesSelectDialog] =
    useState(false);
  const [openCategoriesSelectDialog, setOpenCategorySelectDialog] =
    useState(false);

  // Events & submission handling section
  const [files, setFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    Name: "",
    Description: "",
    type: "",
    Price: "",
    Timing: {
      Sunday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Monday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Tuesday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Wednesday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Thursday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Friday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
      Saturday: {
        open: "hh:mm",
        close: "hh:mm",
        holiday: false,
      },
    },
    SqFt: "",
    guests: "",
    Categories: [],
    Amenities: [],
    Location: {
      latitude: 0,
      longitude: 0,
      display_name: "",
      zipcode: null,
      roadName: "",
      city: "",
      state: "Connecticut",
      country: "US",
      address: "",
    },
    docs: files ? files : [],
    Images: files ? files : [],
    SpotRules: [""],
    CancelPolicy: "",
    lister: localStorage.getItem("userId"),
  });

  const handleApproval = async () => {
    const approval = await axios.put(
      `http://localhost:5000/api/admin/spot/${formValues?._id}`,
      {
        isApproved: !formValues?.isApproved,
      }
    );

    console.log(approval);

    if (approval.status === 200) {
      toast.success(
        `${
          approval.data.spot.isApproved ? "Approved" : "Rejected"
        } successfully`
      );
      setFormValues((prev) => ({
        ...prev,
        isApproved: approval.data.spot.isApproved,
      }));
    } else {
      toast.error(`Something went wrong`);
    }
    refresh();
  };

  useEffect(() => {
    setFormValues(viewData);
    console.log(viewData)
  }, [viewData]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = new FormData();
      form.append("Name", formValues.Name);
      form.append("Description", formValues.Description);
      form.append("type", formValues.type);
      form.append("Price", Number(formValues.Price));
      form.append("Categories", JSON.stringify(formValues.Categories));
      form.append("Amenities", JSON.stringify(formValues.Amenities));
      form.append("SpotRules", JSON.stringify(formValues.SpotRules));
      form.append("Location", JSON.stringify(formValues.Location));
      form.append("Timing", JSON.stringify(formValues.Timing));
      form.append("SqFt", Number(formValues.SqFt));
      form.append("guests", Number(formValues.guests));
      for (const X of formValues.Images) {
        if(typeof X === 'string') return
        form.append("spotImages", X);
      }
      for (const image of formValues.docs) {
        if(typeof image === 'string') return
        form.append("docImages", image);
      }
      
      const res = await axios.put(`http://localhost:5000/api/admin/spot/${formValues?._id}`)
      if(res.status === 200) {
        toast.success('successfully updated')
      } else {
        toast.error("Can't update this spot details")
      }

    } catch (err) {
      console.log(err);
    }
  };

  // when admin puts the open or the close time set the holiday to false
  useEffect(() => {
    console.log('running')
    for (const day in formValues?.Timing) {
      if (
        !formValues.Timing[day].open ||
        formValues.Timing[day].open !== "hh:mm" ||
        !formValues.Timing[day].close ||
        formValues.Timing[day].close !== "hh:mm"
      ) {
        setFormValues((prev) => ({
          ...prev,
          Timing: {
            ...prev.Timing,
            [day]: {
              holiday: false,
            },
          },
        }));
      }
    }
  }, [formValues?.Timing]);

  const handleImageDelete = async (imgPath) => {
    const res = await axios.delete(`http://localhost:5000/api/admin/image`, {
      data: {
        spotId: props.id,
        imagePath: imgPath
      },
    });

    if (res.status === 200) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    console.log(viewData)
    console.log(formValues)
  }, [viewData, formValues])

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={() => toggleEdit()}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Spot Edit
            </Typography>
            <Button variant="contained" onClick={handleSubmit}>
              Save <SaveIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid container>
            <Grid item xs={3}>
              <ListItem>
                <ListItemText
                  primary="Created At"
                  secondary={new Date(formValues?.createdAt).toLocaleString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Approval Status"
                  secondary={
                    <div className="flex flex-col gap-2 items-start">
                      {formValues?.isApproved ? (
                        <div className="flex gap-2 items-center">
                          <ApprovedIcon />
                          Approved
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <RejectIcon />
                          Not Approved
                        </div>
                      )}
                      <div>
                        {formValues?.isApproved ? (
                          <Button variant="contained" onClick={handleApproval}>
                            Reject
                          </Button>
                        ) : (
                          <Button variant="contained" onClick={handleApproval}>
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <Link to={`/admin/host-management/${formValues?.lister?._id}`}>
                <ListItem button>
                  <ListItemText
                    primary="Lister"
                    secondary={
                      <div className="flex justify-between items-center">
                        <div>
                          {formValues?.lister?.firstName +
                            " " +
                            formValues?.lister?.lastName}
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
              <ListItem>
                <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    placeholder="Name"
                    value={formValues?.Name}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        Name: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormGroup>
              </ListItem>
              <Divider />
              <ListItem>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    placeholder="Description"
                    value={formValues?.Description}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        Description: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormGroup>
              </ListItem>
              <Divider />
              <ListItem>
                <FormGroup>
                  <FormLabel>Guests</FormLabel>
                  <TextField
                    placeholder="Maximum Guests"
                    value={formValues?.guests}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        guests: e.target.value,
                      }))
                    }
                    fullWidth
                  />
                </FormGroup>
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
                        dots={true}
                        focusOnSelect={true}
                      >
                        {formValues?.docs?.map((data) => {
                          return (
                            <>
                              <img
                                src={`${data}`}
                                alt=""
                              />
                              <Button
                                variant="contained"
                                onClick={() => handleImageDelete()}
                              >
                                Delete <DeleteIcon className="mx-4" />
                              </Button>
                            </>
                          );
                        })}
                      </Slider>
                      <div className="flex justify-between">
                        <Button variant="contained">
                          upload <UploadIcon className="mx-4" />
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
                        {formValues?.Images?.map((data) => {
                          return (
                            <>
                              <img
                                src={`${data}`}
                                alt=""
                              />
                              <Button>Delete</Button>
                            </>
                          );
                        })}
                        <input
                          multiple
                          type="file"
                          id="file"
                          name="spotImages"
                          accept="image/*"
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              Images: e.target.value,
                            });
                          }}
                          onDrag={(e) => {
                            setFormValues({
                              ...formValues,
                              Images: e.target.files,
                            });
                          }}
                          onDragOver={(e) => {
                            setFormValues({
                              ...formValues,
                              Images: e.target.files,
                            });
                          }}
                          className={
                            "drop-shadow-md rounded-md border-none px-20 self-center !min-h-full"
                          }
                        />
                      </Slider>
                      <div className="flex justify-between">
                        <Button variant="contained" fullWidth>
                          upload <UploadIcon className="mx-4" />
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
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-6">
                        {formValues?.Amenities?.map((data) => {
                          return (
                            <div className="flex items-center gap-2 py-2">
                              <div>
                                <img
                                  height={25}
                                  width={25}
                                  src={`${data?.amenityIcon}`}
                                />
                              </div>
                              <div>{data?.amenityName}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => setOpenAmenitiesSelectDialog(true)}
                        >
                          <EditIcon /> Edit
                        </Button>
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <AmenitiesSelector
                open={openAmenitiesSelectDialog}
                onClose={() => setOpenAmenitiesSelectDialog(false)}
                selected={formValues?.Amenities?.map((val) => val._id)}
                onChange={(val) =>
                  setFormValues((pev) => ({
                    ...formValues,
                    Amenities: val,
                  }))
                }
              />
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Categories"
                  secondary={
                    <div className="flex flex-col">
                      <div className="grid grid-cols-4">
                        {formValues?.Categories?.map((data) => {
                          return (
                            <div className="flex items-center gap-2 py-2">
                              <div>
                                <img
                                  height={25}
                                  width={25}
                                  src={`${data?.categoryIcon}`}
                                />
                              </div>
                              <div>{data?.categoryName} </div>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => setOpenCategorySelectDialog(true)}
                        >
                          <EditIcon /> Edit
                        </Button>
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <CategorySelector
                open={openCategoriesSelectDialog}
                onClose={() => setOpenCategorySelectDialog(false)}
                selected={formValues?.Categories?.map((val) => val._id)}
              />
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
                          {Object.entries(formValues?.Timing ?? {})?.map(
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
                                  <TimePicker
                                    value={row?.[1]?.open}
                                    onChange={(value) =>
                                      setFormValues((prev) => ({
                                        ...prev,
                                        Timing: {
                                          ...prev.Timing,
                                          [row[0]]: {
                                            ...prev.Timing[row[0]],
                                            open: value,
                                          },
                                        },
                                      }))
                                    }
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <TimePicker
                                    value={row?.[1]?.close}
                                    onChange={(value) =>
                                      setFormValues((prev) => ({
                                        ...prev,
                                        Timing: {
                                          ...prev.Timing,
                                          [row[0]]: {
                                            ...prev.Timing[row[0]],
                                            close: value,
                                          },
                                        },
                                      }))
                                    }
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <FormGroup
                                    onClick={(e) =>
                                      setFormValues((prev) => ({
                                        ...formValues,
                                        Timing: {
                                          ...prev.Timing,
                                          [row[0]]: {
                                            open: "hh:mm",
                                            close: "hh:mm",
                                            holiday: !row[1].holiday,
                                          },
                                        },
                                      }))
                                    }
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={row?.[1]?.holiday === true}
                                        />
                                      }
                                    />
                                  </FormGroup>
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
                  <FormGroup>
                    <FormLabel>State</FormLabel>
                    <TextField
                      placeholder="State"
                      value={formValues?.Location?.state ?? "Connecticut"}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          Location: {
                            ...prev.Location,
                            state: e.target.value,
                          },
                        }))
                      }
                      fullWidth
                    />
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup>
                    <FormLabel>City</FormLabel>
                    <TextField
                      placeholder="City"
                      value={formValues?.Location?.city}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          Location: {
                            ...prev.Location,
                            city: e.target.value,
                          },
                        }))
                      }
                      fullWidth
                    />
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup>
                    <FormLabel>Road Name</FormLabel>
                    <TextField
                      placeholder="Road Name"
                      value={formValues?.Location?.roadName}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          Location: {
                            ...prev.Location,
                            roadName: e.target.value,
                          },
                        }))
                      }
                      fullWidth
                    />
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup>
                    <FormLabel>Address</FormLabel>
                    <TextField
                      placeholder="Address"
                      value={formValues?.Location?.address}
                      onChange={(e) =>
                        setFormValues((prev) => ({
                          ...prev,
                          Location: {
                            ...prev.Location,
                            address: e.target.value,
                          },
                        }))
                      }
                      fullWidth
                    />
                  </FormGroup>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}
