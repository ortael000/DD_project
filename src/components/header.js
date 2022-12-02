import '../Style/global/global_main.css';
import '../Style/global/global_large.css';
import '../Style/global/global_medium.css';
import '../Style/global/global_small.css';

import banner_image from "../Assets/banner1.png";
import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export function Header () {
    return (
        <div className='header0'>
            <div className='header1'>
                <Ruban_to_pages/>
                <Banner_home/>
            </div>
        </div>
    )
}


export function Ruban_to_pages () {

    return (
        <div class ="border_ruban_link1">
            <div class ="border_ruban_link2">
                <div class ="border_ruban_link3">
                    <div className='ruban_to_pages'>
                        <Link className='link_to_page ' to="/homepage">Homepage</Link>
                        <Link className='link_to_page ' to="/fight">Fight</Link>
                        <Link className='link_to_page ' to="/character">Character</Link>
                        <Link className='link_to_page ' to="/bestiary">Bestiary</Link>
                        <Link className='link_to_page ' to="/skill">Skills</Link>
                        <Link className='link_to_page ' to="/object">Objects</Link>
                        <Link className='link_to_page ' to="/world">The World</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}


export function Banner_home () {

    return (
        <div class ="border_ruban_home1">
            <div class ="border_ruban_home2">
                <div class ="border_ruban_home3">
                    <div className="ruban_home">
                        <span className='page_title'>Donjon & Dragon Remastered</span>
                    </div>
                </div>   
           </div>
        </div> 
    )

}