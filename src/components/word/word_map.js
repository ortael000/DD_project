import React, { useRef, useEffect } from 'react'
import * as PIXI from 'pixi.js'
import { Application, Assets, Sprite } from 'pixi.js';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {Create_clickable_area, Create_link_from_map, report_coordinate} from "./pixi_function.js"

import '../../Style/world/world_map.css';
import { ManOutlined } from '@mui/icons-material';

import {maps_array, maps_status_array, maps_data_array} from "./data/map_data.js";

export function Interactive_map () {

    const [current_map_code, set_current_map_code] = React.useState("world");
    const [filter, set_filter] = React.useState("normal");
    const [back_button_status,set_back_button_status] = React.useState(0);

    const handlefilterchange = (event) => {

        const filtervalue = event.target.value;
        // console.log("on active filter change")
        // console.log(filtervalue)
        set_filter(filtervalue)

    };

    return(

        <div className="interactive_map_component">

            <select
                className="map_filter"
                id="add_inventory_select_table"
                value={filter}
                label="Type d'objet"
                onChange={handlefilterchange}
                >
                <option value="normal" key = "normal_filter_map"> Normal </option>
                <option value="border" key = "border_filter_map"> Entité politique </option>
                <option value="race" key = "race_filter_map"> Race majoritaire </option>
            </select>
            <Back_to_world_Button back_button_status = {back_button_status} set_back_button_status = {set_back_button_status}  set_current_map_code ={set_current_map_code}/>

            <div className="Interactive_map_container0">
                <div className="Interactive_map_container1">
                    <div className="Interactive_map_container2">

                            <Canvas current_map_code = {current_map_code} filter = {filter} set_current_map_code={set_current_map_code} set_back_button_status = {set_back_button_status}/>

                    </div>
                </div>
            </div>
        </div>
    )
}
 
export  function Canvas({current_map_code,filter, set_current_map_code, set_back_button_status, back_button_status}) {
    
    const [load_status,set_load_status] = React.useState(maps_status_array);   // sers a garder en memoire quels groupes d'image on éte loadé
    const canvas_width = 5200;
    const canvas_height = 4000;

    // console.log("test filter: " , filter)

    
    React.useEffect(() => {     // UseEffect permet de definir une fonction qui se relance quand l'un des objets passée en deuxieme parametre est modifié
    
        console.log("on lance le use effect avec les codes " + current_map_code +" "+ filter)
        const div_for_canvas = document.getElementById("myCanvas")
        div_for_canvas.innerHTML = "";



        const imageCount = 3;
        const ratio = 1.95;
        

        let sprites_array = []
        let sprite_map = 0;

        if (current_map_code === "world") {

            const app = new PIXI.Application({
                width: canvas_width,
                height: canvas_height,
              });

            div_for_canvas.innerHTML ="";
            div_for_canvas.appendChild(app.view);

            console.log("on check la valeur de load_status")
            console.log(load_status)  

            if(filter === "normal") {

                console.log("on change les sprites pour les map normals")
                for (let i = 0; i<imageCount; i++ ) {
                    sprites_array[i] = PIXI.Sprite.from(maps_array[i].global);
                    console.log("on recupere la map" + maps_array[i].code)
                    
                }

            } else if (filter === "border") {

                console.log("on change les sprites pour les map border")
                for (let i = 0; i<imageCount; i++ ) {
                    sprites_array[i] = PIXI.Sprite.from(maps_array[i].border);
                    console.log("on recupere la map" + maps_array[i].code)
                }

            } else if (filter === "race") {

                console.log("on change les sprites pour les map race")
                for (let i = 0; i<imageCount; i++ ) {
                    sprites_array[i] = PIXI.Sprite.from(maps_array[i].race);
                    console.log("on recupere la map" + maps_array[i].code)
                }
            }
            
            for (let i in sprites_array) {
                app.stage.addChild(sprites_array[i])
                sprites_array[i].width = 2600;
                sprites_array[i].height = 2000;
            }

                sprites_array[0].x = 2600;
                sprites_array[1].y =2000;

            for (let i in sprites_array) {

                // console.log("On lance Create_Link_From_map pour " + i)  

                const ord = sprites_array[i].y;
                const abs = sprites_array[i].x;

                const largeur = sprites_array[i].width;
                const hauteur = sprites_array[i].height;  
                    
                Create_link_from_map(app,abs,ord,largeur,hauteur,set_current_map_code,maps_array[i].code)
            }            
        
        } 
        
        for (let i in maps_array) {
            if (current_map_code === maps_array[i].code) {

                const app = new PIXI.Application({
                    width: canvas_width,
                    height: canvas_height,
                  });
                div_for_canvas.innerHTML ="";
                div_for_canvas.appendChild(app.view);

                if(filter === "normal") {
                    sprite_map = PIXI.Sprite.from(maps_array[i].detail)
                } else if (filter === "border") {
                    sprite_map = PIXI.Sprite.from(maps_array[i].border)
                } else if (filter === "race") {       
                    sprite_map = PIXI.Sprite.from(maps_array[i].race)
                }
                app.stage.addChild(sprite_map);
                set_back_button_status(1);
                sprite_map.height = canvas_height;
                sprite_map.width = canvas_width;

                for (let j in maps_data_array[i]) {
                    const abs = maps_data_array[i][j].abs;
                    const ord = maps_data_array[i][j].ord;
                    const text = maps_data_array[i][j].text;
                    Create_clickable_area (abs,ord,40,text,app)
                }
                // report_coordinate(app) // une fonction qui permet d'afficher les coordonnées du click (par rapport au canvas)
            }
            
        }
        
        

    }, [filter,current_map_code,back_button_status]);

    
  
    return (
      <div>
        <div
          id="myCanvas"
          style={{ border: "1px solid #d3d3d3" }}
        >
        </div>
      </div>
    );
}



export function Back_to_world_Button ({back_button_status, set_back_button_status,set_current_map_code}) {
    
    if (back_button_status == 0) {
        return (<span></span>)
    } else if (back_button_status == 1) {
        return( 
            <span>
                <button onClick={async() => {
                    set_current_map_code("world")
                    set_back_button_status(0)
                    console.log("on retourne sur la world map",back_button_status)
                }}> Back to World map </button>
            </span>
        )
    }
}