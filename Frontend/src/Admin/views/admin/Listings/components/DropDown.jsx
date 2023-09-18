import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListIcon from "@mui/icons-material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import ApproveIcon from "@mui/icons-material/Approval";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function DropDownMenuForActions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApproval = async () => {
    setAnchorEl(null);
    const approval = await axios.put(
      `https://many-aerial-innovation-programming.trycloudflare.com/api/admin/spot/${props.id}`,
      {
        isApproved: !props.isApproved,
      }
    );

    console.log(approval);

    if (approval.status === 200) {
      toast.success(
        `${
          approval.data.spot.isApproved ? "Approved" : "Rejected"
        } successfully`
      );
    } else {
      toast.error(`Something went wrong`);
    }
    props.refresh();
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    const res = await axios.delete(
      `https://many-aerial-innovation-programming.trycloudflare.com/api/spot/admin/${props.id}`
    );
    if (res.status === 200) toast.success(res.data.message);
    if (res.status > 200) toast.error(res.data.message);
    props.refresh();
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Actions
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            props.toggleView(props.id);
          }}
          disableRipple
        >
          <VisibilityIcon />
          View
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        {props.isApproved ? (
          <MenuItem onClick={handleApproval}>
            <BlockIcon />
            Reject
          </MenuItem>
        ) : (
          <MenuItem onClick={handleApproval}>
            <ApproveIcon />
            Approve
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
