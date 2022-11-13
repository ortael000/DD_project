import React from "react";
import '../Style/fight/figther_display.css'

import {Fighter_display,Add_fighter_button, Add_character_button,Sort_by_initiative} from "../components/fight/fight_component.js"
import {Generate_loot}from "../components/fight/Generate_loot_xp.js"

export function Fight() {

    const [fighter_list, setFighterList] = React.useState(null)  // permet de déclarer l'état initial pour  inputValue   et la fonction correspondante pour la modifier
    console.log("on lance fight")
    console.log(fighter_list);

    return(
        <div className= "fight_content"> 
            <div className="Add_buttons">
                <Add_fighter_button fighter_list = {fighter_list} setFighterList={setFighterList} />
                <Add_character_button fighter_list = {fighter_list} setFighterList={setFighterList} />
                <Sort_by_initiative fighter_list = {fighter_list} setFighterList={setFighterList} />
                <Generate_loot fighter_list = {fighter_list} setFighterList={setFighterList} />
            </div>

                <Fighter_display fighter_list = {fighter_list} setFighterList={setFighterList} />
        </div>
    )
}