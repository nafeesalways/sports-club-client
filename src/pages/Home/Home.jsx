import React from 'react';
import Banner from './Banner/Banner';
import AboutClub from './AboutClub/AboutClub';
import Location from './Location/Location';
import Promotions from './Promotions/Promotions';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import Reviews from './Reviews/Reviews';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <AboutClub></AboutClub>
        <Location></Location>
        <Promotions></Promotions>
        <KeyFeatures></KeyFeatures>
        <Reviews></Reviews>
        </div>
    );
};

export default Home;