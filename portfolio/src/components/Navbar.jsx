import React from 'react';
import {FaBars, FaTimes } from "react-icons/fa";
import "../styles/main.css"
import { useRef } from 'react';


const Navbar = () => {
    
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        
    }
    
    return (
        <header>
            <h3 id='logo'>Logo</h3>
            <nav ref={navRef}>
                <a href="#About">About</a>
                <a href="/#">my Work</a>
                <a href="/#">Contact</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
            
        </header>
    )
}

export default Navbar