import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './../pages/home/Home';
import Booking from '../pages/booking/Booking';
import PatientDashboard from '../pages/patientDashboard/PatientDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;