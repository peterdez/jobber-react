import React from "react"
import { Outlet, Link } from "react-router-dom";

export default function AuthLayout () {
    return(
        <div className="container">

        {/* Outer Row */}
        <div className="row justify-content-center">

            <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <Outlet />
                        
                    </div>
                </div>

            </div>

        </div>

    </div>
    );
}