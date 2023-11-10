import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, DialogActions } from "@mui/material";
import AcknowledgementConfirmationDialog from "./components/acknowledgement";

function CancellationForm() {
  const [bookingId, setBookingId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [acknowledgement, setAcknowledgement] = useState(false);
  const [showAcknowledgementDialog, setShowAcknowledgementDialog] =
    useState(false);
  const [
    onAcknowledgementUserAgreeOrDisagree,
    setOnAcknowledgementUserAgreeOrDisagree,
  ] = useState();

  // Fetch the booking details when the component mounts
  useEffect(() => {}, []);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "bookingId":
        setBookingId(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "reason":
        setReason(e.target.value);
        break;
      case "other-reason":
        setOtherReason(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        bookingId,
        name,
        email,
        reason: reason === "Other reasons" ? otherReason : reason,
      };
      const res = await axios.post(
        `http://localhost:5000/api/cancellations/${localStorage.getItem(
          "userId"
        )}`,
        data
      );
      toast.success("Cancellation request has been raised successfully");
      console.log(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="pt-28 p-12 grid ">
      <div className="mb-4">
        <h1 className="font-bold text-3xl text-black">
          Request Booked Spot Cancellation
        </h1>
      </div>

      <form onSubmit={handleSubmit} method="post">
        {/* Booking ID */}
        <div className="mb-3">
          <label htmlFor="bookingId" className="block text-sm font-medium ">
            Booking ID
          </label>
          <input
            onChange={handleChange}
            value={bookingId}
            type="text"
            name="bookingId"
            id="bookingId"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          />
        </div>

        {/* Reservation dates */}
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium ">
            Name
          </label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium ">
            Email
          </label>
          <input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          />
        </div>
        {/* Reasons for Cancellation */}
        <div className="mb-3">
          <label htmlFor="reason" className="block text-sm font-medium ">
            Reason for Cancellation
          </label>
          <select
            onChange={handleChange}
            value={reason}
            name="reason"
            id="reason"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          >
            <option value="Change in plans">Change in plans</option>
            <option value="Sudden travel restrictions">
              Sudden travel restrictions
            </option>
            <option value="Booking error">Booking error</option>
            <option value="Unforeseen circumstances">
              Unforeseen circumstances
            </option>
            <option value="Health concerns">Health concerns</option>
            <option value="Weather-related issues">
              Weather-related issues
            </option>
            <option value="Venue availability changed">
              Venue availability changed
            </option>
            <option value="Event cancellation">Event cancellation</option>
            <option value="Personal emergencies">Personal emergencies</option>
            <option value="Found a better option">Found a better option</option>
            <option value="Other reasons">Other reasons</option>
          </select>
        </div>
        {reason === "Other reasons" && (
          <div className="mb-3">
            <label
              htmlFor="other-reason"
              className="block text-sm font-medium "
            >
              briefly describe your reason
            </label>
            <textarea
              onChange={handleChange}
              value={otherReason}
              name="other-reason"
              id="other-reason"
              className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              required
            />
          </div>
        )}
        <div>
          <label>
            <input
              type="checkbox"
              checked={acknowledgement}
              {...(!acknowledgement ? {
                onClick: () => setShowAcknowledgementDialog(true),
              } : 
              {
                onClick: () => setAcknowledgement(false)
              } )}
              className="border border-gray-300 text-black rounded-sm focus:ring-blue-600 focus:border-blue-600 mx-3"
            />
            I acknowledge the cancellation policy
          </label>
        </div>
        <button
          type="submit"
          className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Request
        </button>
      </form>
      <AcknowledgementConfirmationDialog
        open={showAcknowledgementDialog}
        agreeOrDisagree={(agreement) => {
          setAcknowledgement(agreement);
          setShowAcknowledgementDialog(false);
        }}
        onClose={() => setShowAcknowledgementDialog(false)}
      />
    </div>
  );
}

export default CancellationForm;
