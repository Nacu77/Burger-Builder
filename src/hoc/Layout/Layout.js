import React, { useState } from "react";
import { connect } from "react-redux";

import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Auxiliary>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuthenticated} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated} />
            <main className={classes.Content}>{props.children}</main>
        </Auxiliary>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
