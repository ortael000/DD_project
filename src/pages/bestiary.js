import React from "react";
import '../Style/bestiary.css';
import { useState } from 'react'

import {bestiare} from "../data/bestaire.js"

import {Opponent_display} from "../components/bestiary/opponent_display.js"
import {trier_par_race,list_type} from "../components/bestiary/function_bestiary.js"



export function Bestiary() {

    const [bestiary_filter, setBestiaryFiler] = useState("Gothir")
    
    const first_list =trier_par_race (bestiare, "Gothir")
    const [bestiare_table, setBestiaryTable] = useState(first_list)

    const type_list = list_type(bestiare)

    const handlechange = (event) => {

        setBestiaryFiler(event.target.value)
        console.log("on trie sur " + bestiary_filter)
        let new_table = trier_par_race (bestiare,event.target.value)
        setBestiaryTable(new_table)
    };

    return(
        <div className= "page_content"> 
            <div className="bestiary_content2">
                <div className="bestiary_content1">
                        <div className="bestiary_filter"> 
                            <div>Selectionner une race ou une faction:  </div>
                            <select
                                id="select type filter"
                                className="opponent_filter_input"
                                value={bestiary_filter}
                                label="type"
                                onChange={handlechange}
                                >
                                {type_list.map((ligne) => (<option value={ligne}  key = {ligne} > {ligne} </option>))}
                            </select>
                        </div>

                        {bestiare_table.map((ligne) => (<Opponent_display key = {ligne.nom} opponent_value = {ligne}/> ))}
                </div>
            </div>
        </div>
    )
}