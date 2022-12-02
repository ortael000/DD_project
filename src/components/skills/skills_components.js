import React from "react";
import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Input } from '@mui/material';

import '../../Style/skill/skill_grid.css'
import '../../Style/skill/skill_display.css'

import {competencelist} from '../../data/competence.js';
import {passiflist } from "../../data/passifs";
import {find_passive_bonus } from "../../function/function";

export function Competence_display () {

    console.log("On rendere Competence_display");

    const [full_competecence_table, set_full_competecence_table] = React.useState(competencelist);  // correspond toujours a l'un des trois arrays objet, arme ou equipement complet
    const [sorted_competence_table, set_sorted_competence_table] = React.useState(competencelist);  // correspond toujours a l'un des trois arrays objet, arme ou equipement possiblement filtré
    const [type_filter, set_type_filter] = React.useState("active");
    const [text_filter, set_text_filter] = React.useState("");

    

    const HandleFilterTextChange = (event) => {
        const filtervalue = event.target.value;
        set_text_filter(filtervalue);

        let new_table = structuredClone(full_competecence_table);

        if (type_filter === "active") {
            new_table = filter_by_text_active(full_competecence_table,filtervalue);
        } else if (type_filter === "passive") {
            new_table = filter_by_text_passive(full_competecence_table,filtervalue);
        }
        

        console.log("on check new_table")
        console.log(new_table)

        set_sorted_competence_table(new_table);
    };

    const HandleClick_Active = () => {
        set_full_competecence_table(competencelist);
        set_sorted_competence_table(competencelist);
        set_text_filter("");
        set_type_filter("active");
    }

    const HandleClick_Passive = () => {
        set_full_competecence_table(passiflist);
        set_sorted_competence_table(passiflist);
        set_text_filter("");
        set_type_filter("passive");
    }


    console.log("on check la liste full_competecence_table");
    console.log(full_competecence_table)
    console.log("on check la liste des competence a afficher")
    console.log(sorted_competence_table)

    return (
        <div className="skillcontent">
            <div className='competency_filter'>
                <div className='competency_filter1'>   

                    Selectionner le type de competence a afficher:

                        <span className="Button_group">
                            <Button
                                className="filter_button"
                                onClick={HandleClick_Active}
                                variant="contained"
                                color={(type_filter == "active") ? "success" : "primary"}
                                size ="small"
                                >
                            Active
                            </Button>

                            <Button
                                className="filter_button"
                                onClick={HandleClick_Passive}
                                variant="contained"
                                color={(type_filter == "passive") ? "success" : "primary"}
                                size ="small"
                                >
                            Passive
                            </Button>
                        </span>
                </div>

                <div className='competency_filter1'>   
                    Entrer un texte pour filtrer plus precisement:
                    <input
                        className="input_filter"
                        variant="outlined"
                        id="inventory_item_filter"
                        value={text_filter}
                        label="Filtrer"
                        onChange={HandleFilterTextChange}
                        > 
                    </input>
                    Filtre sur nom et effet
                </div>
            </div>
            <Competence_grid table = {sorted_competence_table} type_filter = {type_filter} />

        </div>
    )
}

function filter_by_text_passive(table,filtertext) {   // une fonction qui prend en parametre la liste de tous les objets et renvoie la table filtre avec le filtre text

    let new_table = []

    for (let i in table) {  // dans le cas ou il n'y a qu'un filtre text

        filtertext = filtertext.toLowerCase();
        const text_bonus = find_passive_bonus(table[i]).toLocaleLowerCase();
        const nom = table[i].nom.toLowerCase();

        if (nom.includes(filtertext) || text_bonus.includes(filtertext)){
            new_table.push(table[i])
        }
    }
    return(new_table);
}

function filter_by_text_active(table,filtertext) {   // une fonction qui prend en parametre la liste de tous les objets et renvoie la table filtre avec le filtre text

    let new_table = []

    for (let i in table) {  // dans le cas ou il n'y a qu'un filtre text

        filtertext = filtertext.toLowerCase();
        const nom = table[i].nom.toLowerCase();
        const description = table[i].Description.toLowerCase();
        const element = table[i].Element.toLowerCase();

        if (nom.includes(filtertext) || description.includes(filtertext) || element.includes(filtertext) ){
            new_table.push(table[i])
        }
    }
    return(new_table);
}


function Competence_grid ({table,type_filter}){
    
    console.log("on check type_filter");
    console.log(type_filter);

    if (type_filter == "active") {

        return(
        <table className='active_competence_display_table'>
            <caption className="active_competence_display_table_title"> Competences actives </caption>
            <tbody>
                    <tr> 
                        <th> Nom </th>
                        <th> ID </th>
                        <th> Element </th>
                        <th> Portée </th>
                        <th> Degat de base </th>
                        <th> Caract de dégats</th>
                        <th> Modif min </th>
                        <th> Modif max </th>
                        <th> Caract de toucher </th>
                        <th> Modificateur de toucher </th>
                        <th> Mana base </th>
                        <th> Modificateur de cout </th>
                        <th> Description </th>
                    </tr>

                    {table.map((ligne) => (<Competence_active_line value={ligne.ID} key = {ligne.ID +"/"+ ligne.nom} ligne = {ligne} />))}

            </tbody>
        </table>
        )
    } else if (type_filter == "passive") {
        return (
            <table className='passive_competence_display_table'>
            <caption className="passive_competence_display_table_title">Competence passives</caption>
            <tbody>
                    <tr> 
                        <th> Nom </th>
                        <th> ID </th>
                        <th> niveau </th>
                        <th> Effet </th>
                        <th> description </th>
                    </tr>

                    {table.map((ligne) => (<Competence_passive_line value={ligne.ID} key = {ligne.ID +"/"+ ligne.nom} ligne = {ligne} />))}

            </tbody>
        </table>
        )
    }

}

export function Competence_active_line ({ligne}) {
    return (
        <tr> 
            <td> {ligne.nom} </td>
            <td> {ligne.ID} </td>
            <td> {ligne.Element}  </td>
            <td> {ligne.portée}  </td>
            <td> {ligne.min_deg} a {ligne.max_deg}  </td>
            <td> {ligne.deg_carac1} et {ligne.deg_carac2} </td>
            <td> {ligne.min_modifier}  </td>
            <td> {ligne.max_modifier}  </td>
            <td> {ligne.touch_carac} </td>
            <td> {ligne.touch_modifier} </td>
            <td> {ligne.mana_cost}  </td>
            <td> {ligne.mana_cost_modifier}  </td>
            <td> {ligne.Description} </td>
        </tr>
    )
}

export function Competence_passive_line ({ligne}) {

    console.log("on render Competence_passive pour");
    console.log(ligne)

    const text = find_passive_bonus(ligne)

    return (
        <tr> 
            <td> {ligne.nom} </td>
            <td> {ligne.ID} </td>
            <td> {ligne.niveau}  </td>
            <td> {text}    </td>
            <td> {ligne.autres_effets} </td>
        </tr>
    )
}