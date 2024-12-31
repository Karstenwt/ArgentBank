import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import User from './pages/User/User';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route 
          path="/user" 
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
