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
            <img id="logo" src="src/assets/Logo.png" style={{width:"200px"}} alt="" />
            <nav ref={navRef}>
                <a href="#About">About</a>
                <a href="/#Works">my Work</a>
                <a href="#Contact">Contact</a>
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