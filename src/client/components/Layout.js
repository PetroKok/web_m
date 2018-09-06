import React from 'react'

const Layout = (props) => {
   return(
       <div className="container pt-2 mb-5 pb-5">
           {props.children}
           <div className="pb-5"/>
       </div>
   )
};
export default Layout;