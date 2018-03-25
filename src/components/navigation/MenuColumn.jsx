import React from 'react';
import MenuItem from './MenuItem';

const MenuColumn = (props) => {
  return(
    <div className='menu-column'>
      { props.submenu &&
        <MenuItem handleClick={props.clearSubMenu}>
          <span className='back-btn'>Back</span>
        </MenuItem>
      }

      { props.children }
    </div>
  )
}

export default MenuColumn;