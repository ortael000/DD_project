import React from "react";
import '../Style/component.css';
import '../Style/character.css'
import { useState } from 'react'
import { armelist } from '../data/armes.js';
import { find_weapon } from "../components/function.js";
import{calculate_character_values} from "../components/function.js"
import {Caracteristic_grid, Weapon_grid, Competence_grid, General_values } from "../components/comp_character";

export function Character() {   // le composant REACT qu'on envoie a APP

    const [charact_data, setInputValue] = useState(null)  // permet de déclarer l'état initial pour  inputValue   et la fonction correspondante pour la modifier
    const [character_final_values, setcharactValue] = useState(null)  // permet de déclarer l'état initial pour  inputValue   et la fonction correspondante pour la modifier

    return(
        <div className= "character_content"> 
                <select id="character_input" >
                    <option value="2">Kokoro</option>
                    <option value="3">Nemeia</option>
                    <option value="4">Jean-Claude</option>
                    <option value="1">Azaram</option>
                </select>  

                <button type='submit' id = "display_character_button" onClick={async() => {

                    const charac_id = document.getElementById("character_input").value;
                    // console.log("id " + charac_id);
                    const data = await get_charact (charac_id);

                    setInputValue(data);
                    // console.log(charact_data);
                    //console.log("le type est "+ typeof charact_data);
                    const table = calculate_character_values(charact_data);
                    setcharactValue(table);
                    // console.log(table_caract)

                }}> Display table</button>               

                <br/>
                <General_values data ={character_final_values}/>
                <br/>
                <Weapon_grid data = {character_final_values}/>
                <br/>
                <Competence_grid data = {character_final_values}/>
                <br/>
                

        </div>
    )

}



async function get_charact(charac_id) {  // La fonction qui appelle l'API en fonction de l'ID du perso et qui renvoie un objet avec les caracteristiques du perso


    try {
        const reponse = await fetch('http://localhost:3001/character/'+charac_id, {
        method: 'GET',
        dataType: 'json',
        headers: {'Accept': 'application/json',
                 'Content-Type': 'application/json'},  // A comprendre pourquoi il a fallu mettre ca
        mode: 'cors'
    });

    const data = await reponse.json();
    return (data[0]);

    } catch (err) {
        console.log(err);
      }
}

function Display_character ({data},{caract_table}) {   // La fonction sous-composant react qui definit ce qu'on affiche du perso en fonction 

    if (data == null) {return (
        <div> Pas encore de perso selectionné1</div>
    )}else{

        return (
            <div>
                <div key = "list_nom"> nom : {data.nom}</div>
                <Caracteristic_grid data ={caract_table}/>
            </div>
        )
    }
}