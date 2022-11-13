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

import '../../Style/object/item_grid.css'

import {armelist } from '../../data/armes.js';
import {equipementlist } from '../../data/equipements.js';
import {objectlist} from '../../data/objet.js'
import {trier_sur_nom} from '../../function/function.js'
import {find_equipment} from "../../function/function.js"  // une fonction qui prend en parametre un ID (ex: equip15) retourne un objet de la liste d'equipement  dans ../data/equipement.js
import {find_equipment_bonus} from "../../function/function.js"    // take the equipment object as input and return a strin with the list of bonus different from 0
let type_table =["objet","arme","equipement"]

export function Object_grid () {

    const [full_display_table, set_full_display_table] = React.useState(objectlist);  // correspond toujours a l'un des trois arrays objet, arme ou equipement complet
    const [item_display_table, set_item_display_table] = React.useState(objectlist);  // correspond toujours a l'un des trois arrays objet, arme ou equipement possiblement filtré
    const [type_filter, set_type_filter] = React.useState("objet");
    const [text_filter, set_text_filter] = React.useState("");

    const HandleFilterTextChange = (event) => {
        const filtervalue = event.target.value;
        set_text_filter(filtervalue);

        let new_table = structuredClone(full_display_table);
        new_table = filter_by_text(full_display_table,filtervalue);

        console.log("on check new_table")
        console.log(new_table)

        set_item_display_table(new_table);
    };

    const HandleFilterTypeChange = (event) => {
        const filtervalue = event.target.value;

        if(filtervalue == "objet"){
            set_full_display_table(objectlist);
            set_item_display_table(objectlist);
            set_text_filter("");
            set_type_filter(filtervalue);
            
        } else if (filtervalue == "arme"){
            set_full_display_table(armelist);
            set_item_display_table(armelist);
            set_text_filter("");
            set_type_filter(filtervalue);

        } else if (filtervalue == "equipement"){
            set_full_display_table(equipementlist);
            set_item_display_table(equipementlist);
            set_text_filter("");
            set_type_filter(filtervalue);
        } 
        
    };
    console.log("on check la liste full_display_table");
    console.log(full_display_table)
    console.log("on check la liste des objets a afficher")
    console.log(item_display_table)

    return (
        <div>

            <div className='Object_filter'>
                <div className='Object_filter1'>   
                    Selectionner le type d'item a afficher:                 
                    <select
                        className="input_filter"
                        id="add_inventory_select_item"
                        value={type_filter}
                        label="type_filter"
                        onChange={HandleFilterTypeChange}
                        >
                        {type_table.map((ligne) => (<option value={ligne} key = {ligne +"/filtertype"}> {ligne} </option>))}
                    </select>
                </div>

                <div className='Object_filter1'>   
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
                    Filtre sur nom et type
                </div>
            </div>
            <Item_grid table = {item_display_table} type_filter = {type_filter} />

        </div>
    )



}

function Item_grid ({table,type_filter}){
    
    console.log("on check type_filter");
    console.log(type_filter);

    if (type_filter == "objet") {

        return(
        <table className='object_display_table'>
            <caption className="object_display_table_title">Listes des objets</caption>
            <tbody>
                    <tr> 
                        <th> Nom</th>
                        <th> ID</th>
                        <th> type</th>
                        <th> Description</th>
                    </tr>

                    {table.map((ligne) => (<Object_line value={ligne.ID} key = {ligne.ID +"/"+ ligne.nom} ligne = {ligne} />))}

            </tbody>
        </table>
        )
    }

    if (type_filter == "arme") {

        return(
            <table className='arme_display_table'>
                <caption className="arme_display_table_title">Listes des armes</caption>
                <tbody>
                        <tr> 
                            <th>nom</th>
                            <th>ID</th>
                            <th>type</th>
                            <th>type2</th>
                            <th>min_deg</th>
                            <th>max_deg</th>
                            <th>deg_carac1</th>
                            <th>deg_car2</th>
                            <th>touch_carac1</th>
                            <th>touch_carac2</th>
                            <th>min_modifier</th>
                            <th>max_modifier</th>
                            <th>touch_modifier</th>
                            <th>min_critique</th>
                            <th>Tier</th>
                            <th>valeur</th>
                        </tr>
    
                        {table.map((ligne) => (<Weapon_line value={ligne.ID} key = {ligne.ID +"/"+ ligne.nom} ligne = {ligne} />))}
    
                </tbody>
            </table>
        )
    }

    if (type_filter == "equipement") {
        
        return(
            <table className='equipement_display_table'>
                <caption className="equipement_display_table_title">Listes des equipements</caption>
                <tbody>
                        <tr> 
                            <th> Nom</th>
                            <th> ID</th>
                            <th> type</th>
                            <th> Bonus</th>
                        </tr>
    
                        {table.map((ligne) => (<Equipement_line value={ligne.ID} key = {ligne.ID +"/"+ ligne.nom} ligne = {ligne} />))}
    
                </tbody>
            </table>
            )
    }

}

export function Object_line ({ligne}) {

    // console.log("on veut afficher l'objet suivant")
    // console.log(ligne)


    return(
        <tr> 
            <td> {ligne.nom} </td>
            <td> {ligne.ID} </td>
            <td> {ligne.type}  </td>
            <td> {ligne.description}  </td>
        </tr>
    )
}

export function Weapon_line({ligne}) {

    // console.log("on veut afficher l'objet suivant")
    // console.log(ligne)

    return(
        <tr> 
            <td> {ligne.nom} </td>
            <td> {ligne.ID} </td>
            <td> {ligne.type} </td>
            <td> {ligne.type2} </td>
            <td> {ligne.min_deg} </td>
            <td> {ligne.max_deg} </td>
            <td> {ligne.deg_carac1} </td>
            <td> {ligne.deg_car2} </td>
            <td> {ligne.touch_carac1} </td>
            <td> {ligne.touch_carac2} </td>
            <td> {ligne.min_modifier} </td>
            <td> {ligne.max_modifier} </td>
            <td> {ligne.touch_modifier} </td>
            <td> {ligne.min_critique} </td>
            <td> {ligne.Tier} </td>
            <td> {ligne.valeur} </td>
        </tr>
    )

}

export function Equipement_line({ligne}) {

    // console.log("on veut afficher l'objet suivant")
    // console.log(ligne)
    const equipement_object = find_equipment(ligne.ID);
    const bonus = find_equipment_bonus(equipement_object)

    const ligne2 = {
        nom: ligne.nom,
        ID: ligne.ID,
        type: ligne.type,
        bonus: bonus
    }

    return(
        <tr> 
            <td> {ligne2.nom} </td>
            <td> {ligne2.ID} </td>
            <td> {ligne2.type}  </td>
            <td> {ligne2.bonus}  </td>
        </tr>
    )
}


function filter_by_text(table,filtertext) {   // une fonction qui prend en parametre la liste de tous les objets et renvoie la table filtre avec le filtre text

    let new_table = []

    for (let i in table) {  // dans le cas ou il n'y a qu'un filtre text
        if (table[i].nom.includes(filtertext) || table[i].type.includes(filtertext)){
            new_table.push(table[i])
        }
    }
    return(new_table);
}

