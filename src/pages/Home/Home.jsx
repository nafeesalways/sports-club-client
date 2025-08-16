import React from 'react';
import Banner from './Banner/Banner';
import AboutClub from './AboutClub/AboutClub';
import Location from './Location/Location';
import Promotions from './Promotions/Promotions';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import Reviews from './Reviews/Reviews';
import Faq from './FAQ/Faq';
import Newsletter from './NewsLetter/NewsLetter';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <AboutClub></AboutClub>
        <Location></Location>
        <Promotions></Promotions>
        <KeyFeatures></KeyFeatures>
        <Faq></Faq>
        <Newsletter></Newsletter>
        <Reviews></Reviews>
        </div>
    );
};

export default Home;