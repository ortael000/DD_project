import React from "react";
import '../Style/component.css';

import{Object_grid} from "../components/object/object_display.js"

export function Object() {

    return(
        <div className= "object_content"> 
                    <Object_grid />
        </div>
    )
}