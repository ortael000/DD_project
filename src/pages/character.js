import React from "react";
import '../Style/character/character.css'
import '../Style/character/character_small.css'
import '../Style/character/character_medium.css'
import '../Style/character/character_large.css'

import { useState } from 'react'

import {get_charact,get_inventory } from "../function/function_db.js";
import {calculate_character_values} from "../function/function.js"
import {Change_competence, Change_weapon, Change_equipment, Change_passive, Remove_temps, Add_temps} from '../components/character_component/change_button.js'
import {Perso_title, Image_Perso, Caracteristic_grid, Weapon_grid, Competence_grid, General_values1, General_values2 ,Equipment_grid, Passif_grid, Competence_Pratique_grid, Point_a_attribuer } from "../components/character_component/comp_character.js";
import {Inventory_table, Add_inventory_button, Money_display, Change_money_Button} from "../components/character_component/inventory.js"

export function Character() {   // le composant REACT qu'on envoie a APP

    const [charact_data, setInputValue] = useState(null)  // permet de déclarer l'état initial pour  inputValue   et la fonction correspondante pour la modifier
    const [character_final_values, setcharactValue] = useState(null)  // permet de déclarer l'état initial pour  inputValue   et la fonction correspondante pour la modifier
    const [inventory_table, SetInventoryTable] = useState(null)  // permet de déclarer l'état initial pour inventory_table et la fonction correspondante pour la modifier

    return(
        <div className= "page_content"> 

            <div className="character_selection" >
                <select id="character_input" >
                    <option value="7">Kokoro</option>
                    <option value="8">Nemeia</option>
                    <option value="10">Jean-Claude</option>
                    <option value="9">Azaram</option>
                    <option value="13">Viktor</option>
                </select>  

                <button type='submit' id = "display_character_button" onClick={async() => {

                    const charac_id = document.getElementById("character_input").value;
                    // console.log("id " + charac_id);
                    const data = await get_charact (charac_id); // le fetch get
                    const inventory_response = await get_inventory(charac_id);

                    console.log("on a lance get_carac")
                    console.log(data);

                    setInputValue(data);
                    SetInventoryTable(inventory_response);
                    // console.log(charact_data);

                    const table = calculate_character_values(data);
                    setcharactValue(table);
                    // console.log(table_caract)

                }}> Display table</button> 
            </div>              
                
                <div className="presentation_general_perso_1">
                    <div className="presentation_general_perso_1_1">
                        <Perso_title data ={character_final_values}/>
                        <div className="general_value"> 
                            <div className="general_value0">
                                <General_values1 data ={character_final_values} charact_data={charact_data} setInputValue={setInputValue} setcharactValue={setcharactValue}/>
                                <General_values2 data ={character_final_values}/>
                            </div>
                            <div className="caracteristic_grid1"> 
                                <Caracteristic_grid data = {character_final_values}/> 
                                <div className="caracteristic_grid2"> 
                                    <Remove_temps base_data = {charact_data} setInputValue = {setInputValue} setcharactValue = {setcharactValue} />
                                    <Add_temps base_data = {charact_data} setInputValue = {setInputValue} setcharactValue = {setcharactValue} />
                                </div>
                            </div>
                            <Point_a_attribuer base_data = {charact_data} setInputValue = {setInputValue} calculate_character_values ={calculate_character_values} setcharactValue = {setcharactValue} />
                        </div>
                    </div >
                    
                    <div className="image_perso_div ">
                    <Image_Perso data ={character_final_values}/>
                    </div>
                </div>
                
                <br/>

                <br/>
                <div className="grid_button_display">
                    <Weapon_grid data = {character_final_values}/>
                    <Change_weapon base_data ={charact_data} setInputValue = {setInputValue} setcharactValue = {setcharactValue}/>
                </div>
                <br/>
                <div className="grid_button_display">
                    <Competence_grid data = {character_final_values}/> 
                    <Change_competence base_data ={charact_data} setInputValue = {setInputValue} setcharactValue = {setcharactValue}/>
                </div>
                <br/>
                <div className="grid_button_display">
                    <Equipment_grid data = {character_final_values}/>
                    <Change_equipment base_data ={charact_data} setInputValue = {setInputValue} setcharactValue = {setcharactValue}/>
                </div>
                <br/>
                <div className="grid_button_display">
                    <Passif_grid data = {character_final_values}/>
                    <Change_passive base_data ={charact_data} setInputValue = {setInputValue} setcharactValue = {setcharactValue}/>
                </div>
                <br/>
                <div className="grid_button_display">
                    <Competence_Pratique_grid data = {character_final_values}/>
                </div>
                <br/>
                <div className="grid_button_display">
                    <Money_display inventory_table = {inventory_table} SetInventoryTable={SetInventoryTable}/>
                    <Change_money_Button inventory_table = {inventory_table} SetInventoryTable={SetInventoryTable} charact_data = {charact_data}/>
                </div>
                <div className="grid_button_display">
                    <Inventory_table inventory_table = {inventory_table} SetInventoryTable={SetInventoryTable}/>
                    <div> 
                        <Add_inventory_button inventory_table = {inventory_table} SetInventoryTable={SetInventoryTable} charact_data = {charact_data}/>
                    </div>
                </div>
                
        </div>
    )

}




