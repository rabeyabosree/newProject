import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import SkillPage from './../skill/SkillPage';
import Challengs from './../challenges/Challengs';
import AboutPage from './../about/AboutPage';
import Contact from './../contact/Contact';
import Footer from './Footer';

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <SkillPage />
            <Challengs />
            <AboutPage />
            <Contact />
            <Footer />
        </>
    )
}

export default Home