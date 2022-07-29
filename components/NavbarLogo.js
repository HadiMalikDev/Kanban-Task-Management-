import React from "react";
import Logo from '../public/logo-light.svg'
export default function NavBarLogo() {
  return (
    <div className="logoSection flex">
      <Logo width="30px" style={{alignSelf:"center"}}/>
      <h1>kanban</h1>
    </div>
  );
}
