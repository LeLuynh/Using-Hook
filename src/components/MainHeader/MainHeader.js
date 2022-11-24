import React from "react";
import classes from "./MainHeader.module.css";
import Navigator from "./Navigation";

const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>A typical Page</h1>
      <Navigator />
    </header>
  );
};
export default MainHeader;
