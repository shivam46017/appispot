import { Fab } from "@mui/material"
import FavIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types'

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };

const fab = {
    color: 'secondary',
    sx: fabStyle,
    icon: <FavIcon />,
    label: 'Favourite',
  }

const FavouriteButton = ({
    onClick,
    disabled
}) => {

    return (
        <Fab disabled={disabled} onClick={onClick} sx={fab.sx} aria-label={fab.label} color={fab.color}>
        {fab.icon}
      </Fab>
    )
}

FavouriteButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

export default FavouriteButton