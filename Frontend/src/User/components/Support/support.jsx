import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useUserAuth } from "../../../context/userAuthContext/UserAuthContext";
import NotFound from "../NotFound";
import { Chip } from "@mui/material";
import axios from "axios";
import { debounce } from "@mui/material";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";

function SupportForm() {
  const { user } = useUserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [issueType, setIssueType] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [screenshot, dispatchScreenshot] = useReducer(screenshotReducer, []);
  const [preview, dispatchPreview] = useReducer(previewReducer, []);
  const [uploadProgress, setUploadProgress] = useState(undefined);
  const [note, setNote] = useState("");

  function previewReducer(state, action) {
    switch (action.type) {
      case "ADD-PREVIEW":
        console.log("chal rha hai add wala");
        return [...state, action.image];

      case "REMOVE-PREVIEW":
        return state.filter((value, i) => action.removeFromIndex !== i);

      default:
        throw new Error();
    }
  }

  function screenshotReducer(state, action) {
    switch (action.type) {
      case "ADD-SINGLE-SCREENSHOT":
        return [...state, action.screenshot];
      case "ADD-ARRAY-OF-SCREENSHOTS":
        return [...state, ...action.screenshots];
      case "REMOVE-SCREENSHOT":
        return [...state.filter((value, i) => i !== action.removeIndex)];
    }
  }

  const handleChange = (e) => {
    if (e.target.name === "issue") {
      setIssueType(e.target.value);
    }
    if (e.target.name === "Other issue") {
      setOtherIssue(e.target.value);
    }
    if (e.target.name === "note") setNote(e.target.value);
    if (e.target.name === "bookingId") setBookingId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let form = new FormData();
      form.append("issue", issueType === "other-type" ? otherIssue : issueType);
      form.append("note", note);
      form.append('bookingId', bookingId)
      screenshot.forEach((value) => form.append("screenshots", value));
      const res = await axios.post(
        `http://localhost:5000/api/support/${localStorage.getItem(
          "userId"
        )}?role=${localStorage.getItem("userRole")}`,
        form,
        {
          onUploadProgress: (ProgressEvent) => {
            let percentCompleted = Math.round(
              (ProgressEvent.loaded * 100) / ProgressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      toast.success(`${res.data.srno} issue raised`);
    } catch (err) {
      toast.error(err.res.message);
    } finally {
      setUploadProgress(undefined);
    }
  };

  useEffect(() => {
    screenshot.map((value) => {
      let reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onloadend = () => {
        if (preview.includes(reader.result)) return;
        dispatchPreview({ type: "ADD-PREVIEW", image: reader.result });
      };
    });
  }, [screenshot]);

  return (
    <div className="min-h-screen grid grid-cols-2 p-28">
      <div className="col-span-2 py-12">
        <h1 className="font-bold text-3xl">Support</h1>
      </div>
      <div className="flex flex-col justify-start">
        <span className="font-bold text-xl"></span>
      </div>
      <form onSubmit={handleSubmit} className="w-full p-4">
        <div className="mb-3">
          <label className="block text-sm font-medium ">
            Spot - booking id (optional)
          </label>
          <input
            id="bookingId"
            name="bookingId"
            type="text"
            value={bookingId}
            onChange={handleChange}
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issue-type" className="block text-sm font-medium ">
            Issue Type
          </label>
          <select
            onChange={handleChange}
            value={issueType}
            type="text"
            name="issue"
            id="issue-type"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          >
            <option value="" selected disabled>
              select issue
            </option>
            <option value="Booking issue">booking issue</option>
            <option value="Cancellation issue">cancellation issue</option>
            <option value="Technical issue">technical issue</option>
            <option value="Spot issue">spot issue</option>
            <option value="Billing issue">billing issue</option>
            <option value="Billing issue">pricing issue</option>
            <option value="Other issue">other issue</option>
          </select>
        </div>
        {issueType === "Other issue" && (
          <div className="mb-3">
            <label htmlFor="Other issue" className="block text-sm font-medium ">
              What's issue you are facing
            </label>
            <input
              onChange={handleChange}
              value={otherIssue}
              type="text"
              name="Other issue"
              id="Other issue"
              className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="note" className="block text-sm font-medium ">
            Note
          </label>
          <textarea
            name="note"
            id="note"
            value={note}
            onChange={handleChange}
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="screenshots" className="block text-sm font-medium ">
            Screenshots
          </label>
          <input
            multiple
            name="screenshots"
            id="screenshots"
            type="file"
            className="border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required
            accept="image/*"
            onChange={(e) =>
              dispatchScreenshot({
                type: "ADD-ARRAY-OF-SCREENSHOTS",
                screenshots: e.target.files,
              })
            }
            onDrag={(e) =>
              dispatchScreenshot({
                type: "ADD-ARRAY-OF-SCREENSHOTS",
                screenshots: e.target.files,
              })
            }
          />
        </div>
        <div className="mb-3 flex gap-3">
          {preview.map((value, i) => {
            return (
              <Chip
                key={`preview-${i}`}
                sx={{ height: "100%", padding: 1 }}
                label={
                  <img width={120} className="rounded-xl" src={preview[i]} />
                }
                onDelete={() => {
                  dispatchPreview({
                    type: "REMOVE-PREVIEW",
                    removeFromIndex: i,
                  });
                  dispatchScreenshot({
                    type: "REMOVE-SCREENSHOT",
                    removeIndex: i,
                  });
                }}
              />
            );
          })}
        </div>
        <button
          type="submit"
          className="w-full mt-3 uppercase text-black bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
      {uploadProgress && (
        <Dialog open={uploadProgress ? true : false}>
          <div className="font-bold text-xl p-4">Wait while we upload</div>
          <DialogContent>
            <div className="relative p-6">
              <CircularProgress
                size="12rem"
                value={uploadProgress}
                variant="determinate"
              />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl font-bold">
              {uploadProgress}%
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default SupportForm;
