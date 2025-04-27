import React from 'react';
import Nav from './component/Nav/Nav';
import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './component/Landing/Landing';
import Home from './component/Home/Home';
import Register from './component/Signup/Register';
import Login from './component/Signup/Login';
import Dashboard from './component/Dashboard/Dashboard';
import Store from './component/Store/Store';
import Cart from './component/Cart/Cart';
import Shipping from './component/Shipping/Shipping';
import Footer from './component/Footer/Footer';
import About from './component/About/About';
import Contact from './component/Contact/Contact';
import WhyUs from './component/whyus/WhyUs';
import NotFound from './component/NotFound/NotFound';
import Services from './component/services-section/Services';

const WebApp = () => {

    const location = useLocation();

    // List of routes where the Footer should not be displayed
    const hideFooterRoutes = ['/shipping', '/dashboard', '/cart', '/login', '/register'];

    return (
        <div>
            <Nav />
            <Routes>
                <Route path='/' element={< Home />} />
                <Route path='/register' element={< Register />} />
                <Route path='/login' element={< Login />} />
                <Route path='/dashboard' element={< Dashboard />} />
                <Route path='/store' element={<Store />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/shipping' element={<Shipping />} />
                <Route path='/about' element={<><About /> <WhyUs /></>} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/services' element={<Services />} />
                <Route path='*' element={<NotFound />} /> {/* Catch-all route */}
            </Routes>
            {!hideFooterRoutes.includes(location.pathname) && <Footer />}
        </div>
    );
};

export default WebApp;