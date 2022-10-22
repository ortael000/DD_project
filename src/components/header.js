import '../Style/component.css';
import banner_image from "../Assets/banner1.png";
import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";


export function Header () {
    return (
        <div>
            <Ruban_to_pages/>
            <Banner_home/>
        </div>
    )
}


export function Ruban_to_pages () {

    return (
        
        <div className='ruban_to_pages'>
            <Link className='link_to_page ' to="/homepage">Homepage</Link>
            <Link className='link_to_page ' to="/fight">Fight</Link>
            <Link className='link_to_page ' to="/character">Character</Link>
            <Link className='link_to_page ' to="/bestiary">Bestiary</Link>
            <Link className='link_to_page ' to="/skill">Skills</Link>
            <Link className='link_to_page ' to="/object">Objects</Link>
            <Link className='link_to_page ' to="/world">The World</Link>
            <Link className='link_to_page ' to="/admin">Admin</Link>
            
        </div>
    )

}


export function Banner_home () {

    return (
        <div className="ruban_home">
        <img src = {banner_image} className='ruban_home_image'/>
        <span className='page_title'>{"Donjon & Dragon Remastered"}</span>
            
        </div>
    )

}