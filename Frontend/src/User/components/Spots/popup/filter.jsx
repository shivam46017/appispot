import React from 'react'
import { Dialog } from '@mui/material'
import CrossIcon from '@mui/icons-material/Cancel'

function FilterPopup() {
  return (
    <Dialog open={true}>
        <div className='flex justify-between'>
            <CrossIcon/>
            filter
        </div>
        
    </Dialog>
  )
}

export default FilterPopup