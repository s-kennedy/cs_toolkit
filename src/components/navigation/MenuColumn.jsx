import React from 'react';
import MenuItem from './MenuItem';

const MenuColumn = (props) => {
  return(
    <div className='menu-column'>
      { props.submenu &&
        <MenuItem handleClick={props.clearSubMenu}>
          <div className='close-submenu'>
            <i className="fa fa-caret-left"></i>
            <span className='back-btn'>Back</span>
          </div>
        </MenuItem>
      }

      { props.children }
    </div>
  )
}

export default MenuColumn;