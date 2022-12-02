import React from "react";
import '../Style/world/world_map.css';
import { Interactive_map } from "../components/word/word_map";

export function World() {

    return(
        <div className= "page_content">
            <div className= "world_content"> 
                        <Interactive_map/>
            </div>
        </div>
    )
}