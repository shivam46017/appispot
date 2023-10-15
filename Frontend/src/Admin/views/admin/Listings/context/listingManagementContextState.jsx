import { useContext, useState } from "react";
import ListingManagementContext from "./listingManagementContext";

const listingManagementContextState = ({ children }) => {

    const refresh = (callback) => {
        callback()
    }

    return (
        <ListingManagementContext.Provider value={{refresh}}>
            { children }
        </ListingManagementContext.Provider>
    )
}

export default listingManagementContextState