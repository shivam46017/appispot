import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MdInfo, MdLocationOn } from "react-icons/md";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import ChangeView from "../../../map/ChangeView";
import { debounce } from "@mui/material";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import MapEvent from "../../../map/MapEvents";
import { toast } from "react-toastify";

const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
  provider: provider,
});

function SpotDetails({
  handleChange,
  handleCheckboxChange,
  categories,
  amenities,
  cities,
  handleLocationChange,
  formValues,
  setFormValues,
  handleAddressChange,
}) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleLocationChange({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }, // on success callback
        (err) => {
          toast.error("Can't get Your current location");
        }
      );
    }
  };

  const handleSearch = debounce(async () => {
    setLoading(true);
    const results = await provider.search({ query });
    setLoading(false);
    console.log(results, "$$$results");
    setResults(results);
  }, 50);

  useEffect(() => getLocation(), []);
  return (
    <React.Fragment>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <span className="font-semibold text-xl">
            What are the events your spot would be a great fit for?
          </span>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {categories.map((item) => (
              <Grid item xs={2}>
                <div key={item._id} className={"max-w-26 max-h-26"}>
                  <input
                    type="checkbox"
                    value={item._id}
                    className={"mr-2 p-2 drop-shadow-md rounded-md hidden"}
                    checked={formValues.Amenities.includes(item._id)}
                    onClick={() =>
                      handleCheckboxChange("categories", item._id)
                    }
                    name="Categories"
                    id={item._id}
                  />
                  {/* <img src={item.icon} alt={"icon"} width={20} height={20} /> */}
                  <label
                    htmlFor={item._id}
                  >
                    <div
                      key={item._id}
                      className={`flex flex-col h-56 gap-3 items-center justify-center bg-light-blue rounded-2xl cursor-pointer duration-100 ${
                        formValues.Categories.includes(item._id)
                          && "bg-light-blue-100"
                      }`}
                    >
                      <img
                        src={`https://many-aerial-innovation-programming.trycloudflare.com${item.categoryIcon}`}
                        alt={"icon"}
                        width={30}
                        height={30}
                      />
                      <label>{item.categoryName}</label>
                    </div>
                  </label>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <span className="font-semibold text-xl">What do you provide?</span>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {amenities.map((item) => (
              <Grid item xs={3}>
                <div key={item._id} className={`w-full h-full`}>
                  <input
                    type="checkbox"
                    value={item._id}
                    className={"mr-2 p-2 drop-shadow-md rounded-md hidden"}
                    checked={formValues.Amenities.includes(item._id)}
                    onClick={() => {
                      handleCheckboxChange("amenities", item._id);
                    }}
                    id={item._id}
                  />
                  {/* <img src={item.icon} alt={"icon"} width={20} height={20} /> */}
                  <label htmlFor={item._id} className={"w-full h-full"}>
                    <li
                      key={item._id}
                      className={`flex flex-col gap-3 items-center checked:bg-blue-300 justify-center bg-light-blue rounded-2xl h-56 ${formValues.Amenities.includes(item._id) && "bg-light-blue-100"} cursor-pointer duration-100`}
                    >
                      <img
                        src={`https://many-aerial-innovation-programming.trycloudflare.com${item.amenityIcon}`}
                        alt={"icon"}
                        width={30}
                        height={30}
                      />
                      <label>{item.amenityName}</label>
                    </li>
                  </label>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <span className={"w-full ml-auto text-blue-600 text-sm"}>
            *add multiple amenities for better reach
          </span>
        </Grid>
        {/* <input type="text" placeholder={"Location"}
                                   className={"drop-shadow-md rounded-xl border-0"} required/> */}
        <Grid item xs={12}>
          <LeafletMap
            center={[
              formValues.Location.latitude,
              formValues.Location.longitude,
            ]}
            zoom={6}
            attributionControl={true}
            zoomControl={true}
            className="h-full min-w-full"
          >
            <MapEvent onChange={handleLocationChange} />
            <ChangeView
              center={[
                formValues.Location.latitude,
                formValues.Location.longitude,
              ]}
              zoom={8}
            />
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                formValues.Location.latitude,
                formValues.Location.longitude,
              ]}
            >
              <Popup>Popup for any custom information.</Popup>
            </Marker>
          </LeafletMap>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={results}
            getOptionLabel={(option) => option.raw.display_name}
            value={selectedValue}
            onChange={(event, value) => {
              if (value) {
                setSelectedValue(value);
                handleLocationChange({ lat: value.y, lng: value.x });
                console.log(value, "$select working");
                setResults([]);
              }
            }}
            loading={loading}
            renderInput={(params) => (
              <TextField
                className="!drop-shadow-md"
                {...params}
                label="Search"
                onChange={(event) => {
                  handleSearch();
                  setQuery(event.target.value);
                }}
                value={query}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
          <Button variant="contained" onClick={getLocation}>
            <MdLocationOn className="h-6 w-6 mx-4" />
            Use Current Location
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowAddressDialog(true)}
          >
            Fill Custom Address
          </Button>
        </Grid>
      </Grid>
      <React.Fragment>
        <Dialog
          open={showAddressDialog}
          onClose={() => setShowAddressDialog(false)}
        >
          <DialogTitle>Enter Your Address</DialogTitle>
          <DialogContent>
            <form className="flex flex-col gap-4 h-fit w-96">
              <input
                label={"Country"}
                value={"US"}
                disabled
                className={
                  " w-full h-full drop-shadow-md p-4 rounded-xl border-0"
                }
                name="Location.country"
                onChange={(e) => handleChange({ Location })}
                helperText={"We are only serving in Usa"}
              />
              <input
                label={"State"}
                value={"Connecticut"}
                disabled
                className={
                  " w-full h-full drop-shadow-md p-4 rounded-xl border-0"
                }
                name="Location.city"
                onChange={handleChange}
                helperText={"We are only serving in Connecticut"}
              />
              <input
                type="text"
                placeholder={"City"}
                className={
                  " w-full h-full drop-shadow-md p-4 rounded-xl border-0"
                }
                value={formValues.Location.city}
                onChange={handleAddressChange}
                name="city"
              />
              <input
                type="text"
                placeholder={"Road Name"}
                className={
                  " w-full h-full drop-shadow-md p-4 rounded-xl border-0"
                }
                value={formValues.Location.roadName}
                onChange={handleAddressChange}
                name="roadName"
              />
              <input
                type="number"
                placeholder={"Zip Code"}
                className={
                  " w-full h-full drop-shadow-md p-4 rounded-xl border-0"
                }
                value={formValues.Location.zipcode}
                onChange={handleAddressChange}
                name="zipcode"
              />
              <textarea
                placeholder={"Address"}
                className={
                  " w-full h-full drop-shadow-md p-4 rounded-xl border-0"
                }
                value={formValues.Location.address}
                onChange={handleAddressChange}
                name="address"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddressDialog(false)}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
}

export default SpotDetails;
