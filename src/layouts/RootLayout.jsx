import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/Footer/Footer';
import Container from '../pages/shared/container/Container';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Container><Outlet></Outlet></Container>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;