import React from 'react';
import Landing from '../Landing/Landing';
import Offers from '../Offers/Offers';
import WhyUs from '../whyus/WhyUs';
import Contact from '../Contact/Contact';
import ClientCounter from '../clientCounter/ClientCounter';
import About from '../About/About';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div>
            <Landing />
            <Offers />
            <ClientCounter />
            <WhyUs />
            <Contact />
            <About />
            {/* <Footer /> */}
        </div>
    );
};

export default Home;