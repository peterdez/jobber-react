import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './AppAdmin.css';
import './App.css';
import Layout from './components/Layout';
import AddJob from "./components/AddJob";
import JobsList from "./components/JobsList";
import { SingleJobPage } from './components/SingleJobPage';
import EditJob from './components/EditJob';
import AuthLayout from './components/AuthLayout';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import Home from './components/Home';

function App() {
    
  return (
    <Router>                  
                    <Routes>
                     <Route path="/" element={<Home />}>
                     <Route index element={<Home />} />
                     </Route>
                     <Route path="/profile" element={<Layout />}>
                     <Route index element={
                          <ProtectedRoute>
                          <Profile/>
                          </ProtectedRoute>
                        } />
                     </Route>
                     <Route path="/" element={<AuthLayout />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                     </Route>
                      <Route path="/jobs" element={<Layout />}>
                        <Route index element={
                        <ProtectedRoute>
                        <JobsList />
                        </ProtectedRoute>
                        } />
                        <Route path="add" element={
                        <AdminProtectedRoute> 
                        <AddJob/>
                        </AdminProtectedRoute>
                        } />
                        <Route path=":id" element={
                        <ProtectedRoute>
                        <SingleJobPage/>
                        </ProtectedRoute>
                        } />
                        <Route path="editJob/:id" element={<EditJob/>} />
                        <Route path="profile" element={
                          <ProtectedRoute>
                          <Profile/>
                          </ProtectedRoute>
                        } />
                     </Route>
                    </Routes>

                
    </Router>
  );
}

export default App;
