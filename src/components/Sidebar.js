import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import logo from '../logo.png';


const DashMenuList = ({theButToggled}) => {
    const refDash = useRef(null);
    let dashDivShow = "";

    // 👇️ check if element contains class on mount
    useEffect(() => {
        if (refDash.current.classList.contains('show') && theButToggled == true) {
            dashDivShow = "";
        }
    }, []);
    return (
        <li className="nav-item">
        <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
            aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Dashboard</span>
        </Link>
        {/*<a className="nav-link" href="#" data-toggle="collapse" data-target="#collapseTwo"
            aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog"></i>
            <span>Dashboard</span>
    </a>*/}
        <div ref={refDash} id="collapseTwo" className={`collapse ${dashDivShow}`} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Menu</h6>
                <Link to="/jobs" className="collapse-item">Jobs</Link>
                <Link to="/" className="collapse-item">Applications</Link>
                <Link to="/profile" className="collapse-item">Profile</Link>
                <Link to="/" className="collapse-item">Companies</Link>
            </div>
        </div>
    </li>
    );
}
const JobMenuList = () => {
    const ref = useRef(null);
    let divShow = "";

    // 👇️ check if element contains class on mount
    useEffect(() => {
        if (ref.current.classList.contains('show')) {
            divShow = "";
        }
    }, []);
    return (
        <li className="nav-item">
            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-briefcase"></i>
                <span>Jobs</span>
            </Link>
            <div ref={ref} id="collapseUtilities" className={`collapse ${divShow}`} aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Job Menu:</h6>
                    <Link to="/jobs/add" className="collapse-item">New Job</Link>
                    <Link to="/jobs" className="collapse-item">Job List</Link>
                    <Link className="collapse-item">Job View</Link>
                </div>
            </div>
        </li>
    );
}

export default function Sidebar({butToggled, onToggleClick}) {

    const sidebarRef = useRef();
    useEffect(() => {
        if(butToggled == false && window.innerWidth < 480){
            sidebarRef.className = "toggled";
        }
    }, [])
    

    return (
        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${butToggled ? "toggled" : ""}`} id="accordionSidebar"> 
            <Link to="/jobs" className="sidebar-brand d-flex align-items-center justify-content-center">
            <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Jobber</div>
            </Link>
            <hr className="sidebar-divider my-0"/>
            {/*<li className="nav-item">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>
            <hr className="sidebar-divider"/>
            <div className="sidebar-heading">
                Interface
             </div>*/}
            
            
            <DashMenuList theButToggled={butToggled}/>
            
            <JobMenuList/>

            
            {/*<hr className="sidebar-divider"/>

            
            <div className="sidebar-heading">
                Addons
            </div>*/}

            
            {/*<li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true"
                    aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">Login</a>
                        <a className="collapse-item" href="register.html">Register</a>
                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">404 Page</a>
                        <a className="collapse-item active" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li>*/}

            
            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li>

            
            {/*<li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li>*/}

            
            <hr className="sidebar-divider d-none d-md-block"/>

            
            <div className="text-center d-none d-md-inline">
                <button onClick={onToggleClick} className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    );
}