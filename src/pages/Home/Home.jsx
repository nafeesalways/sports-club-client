import React from 'react';
import Banner from './Banner/Banner';
import AboutClub from './AboutClub/AboutClub';
import Location from './Location/Location';
import Promotions from './Promotions/Promotions';
import KeyFeatures from './KeyFeatures/KeyFeatures';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <AboutClub></AboutClub>
        <Location></Location>
        <Promotions></Promotions>
        <KeyFeatures></KeyFeatures>
        </div>
    );
};

export default Home;