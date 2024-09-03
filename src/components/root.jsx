import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
// import '../assets/css/root.css'


export default function Root() {
    return (
        <>
            <div id="appContainer">
                <Outlet />
            </div>
        </>
    );
}