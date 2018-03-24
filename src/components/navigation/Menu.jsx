import React from 'react';


const Menu = (props) => {
  return (
    <div id="full-page-menu" className={`full-page-menu ${props.open ? 'open' : 'collapsed'}`} aria-hidden={!props.open}>
      <div className="content-container">
      <button id="close-menu" onClick={props.close} ><i className="fa fa-times"></i></button>
      {
        props.columns.map((column, index) => {
          return (
            <div key={index} className={`column column-${index}`}>
            {
              column.map((group, index) => {
                return (
                  <div key={index} className={`menu-section`}>
                      <h2>{group.title}</h2>
                      {
                        group.pages.map((page, index) => {
                          return (
                            <div key={index} className="menu-item">
                              <a tabIndex={props.open ? '0' : '-1'} href={`/${page.node.slug}`} className="dark">{page.node.navigation.displayTitle ? page.node.navigation.displayTitle : page.node.title}</a>
                            </div>
                          )
                        })
                      }
                  </div>
                )
              })
            }
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default Menu;
