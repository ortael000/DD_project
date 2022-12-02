
import '../../Style/character/character.css'
import '../../Style/character/grids.css'
import '../../Style/character/character_title.css'

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

import copper_coin_icone from "../../Assets/copper_coin_icone.png"
import silver_coin_icone from "../../Assets/silver_coin_icone.png"
import gold_coin_icone from "../../Assets/gold_coin_icone.png"

import {armelist } from '../../data/armes.js';
import {equipementlist } from '../../data/equipements.js';
import {objectlist} from '../../data/objet.js'
import {trier_sur_nom} from '../../function/function.js'

import {modify_database, get_charact, change_perso, get_inventory} from '../../function/function_db.js'


export function Inventory_table ({inventory_table,SetInventoryTable}) {

    if (inventory_table == null){
        return (<div></div>)

    } else {

        const inventory_table_sorted = trier_sur_nom(inventory_table);

        // // console.log("On check inventory table")
        // // console.log(inventory_table);
        // console.log("on check inventory table");
        let keys ={};

        if (inventory_table_sorted.length > 0) {
            keys = Object.keys(inventory_table_sorted[0]);
        }

        return (
            <table className='Inventory_table'>
                <caption className="inventory_title">Inventaire</caption>
                <tbody>
                    <tr>
                        <th>nom</th>
                        <th>quantite</th>
                        <th>description</th>
                        <th>valeur</th>
                        <th>Remove 1</th>
                        <th>Remove all</th>
                        
                    </tr>
                    {inventory_table_sorted.map((ligne,index) => (<Inventory_line ligne ={ligne} key = {ligne.nom + "/"+ ligne.ID + "/" + index} SetInventoryTable={SetInventoryTable}/>))}
                </tbody>
            </table>
        )
    }
} 

export function Money_display ({inventory_table,SetInventoryTable}) {

    if (inventory_table == null || inventory_table.length == 0){
        return (<div></div>)

    } else {

        // console.log("on check inventory_table")
        // console.log(inventory_table);

        let money_value = 0;
        for (let i = 0; i <inventory_table.length; i++ ){
            if(inventory_table[i].object_id == "money") {money_value = inventory_table[i].quantite}
        }

        // console.log("on check money_value")
        // console.log(money_value);
        

        const gold_value = Math.floor(money_value/400);
        const silver_value = Math.floor(money_value/20) - gold_value*20 ;
        const copper_value = money_value - gold_value*400 - silver_value*20 ;

        return (
            <div className='money_display'>
                <span className='money_display_1'>
                    <span className='money_number'> {gold_value} </span> 
                    <img src = {gold_coin_icone} className='money_icone'/>
                </span>

                <span className='money_display_1'>
                    <span className='money_number'> {silver_value} </span>  
                    <img src = {silver_coin_icone} className='money_icone'/>
                </span>

                <span className='money_display_1'>
                    <span className='money_number'> {copper_value} </span> 
                    <img src = {copper_coin_icone} className='money_icone'/>
                </span>

            </div>
        )
    }

} 

//Le composant React qui renvoie une ligne de la table d'inventaire
export function Inventory_line({ligne,SetInventoryTable}) {

    if (ligne == null || ligne.object_id == "money") {
        } else{

            if (ligne.quantite < 1) {
            }else{ 

                return (
                    <tr key = {ligne.char_id + "_"+ ligne.object_id}>
                            <td>{ligne.nom}</td>
                            <td>{ligne.quantite}</td>
                            <td>{ligne.description}</td>
                            <td>{ligne.valeur}</td>
                            <td> <button onClick={async() => {
                                Remove_1(ligne.quantite, ligne.char_id, ligne.object_id, SetInventoryTable)
                            }}>Remove 1</button></td>
                                                        <td> <button onClick={async() => {
                                Remove_all(ligne.char_id, ligne.object_id, SetInventoryTable)
                            }}>Remove all</button></td>
                    </tr>
                )}
    }

}

// La fonction qui reduit de 1 la quantite d'un objet dans la db et met a jour les etats
async function Remove_1(old_quantite,char_id,object_id, SetInventoryTable) {

    const new_quantite = old_quantite -1;
    const sql = ("UPDATE inventory SET quantite = " + new_quantite+" WHERE char_id = "+char_id+" AND object_id = \"" + object_id + "\";");


    await modify_database(sql);

    // console.log(SetInventoryTable);
    const inventory_response = await get_inventory(char_id);
    await SetInventoryTable(inventory_response);
}

async function Remove_all(char_id,object_id, SetInventoryTable) {

    const new_quantite = 0;
    const sql = ("UPDATE inventory SET quantite = " + new_quantite+" WHERE char_id = "+char_id+" AND object_id = \"" + object_id + "\";");


    await modify_database(sql);

    // console.log(SetInventoryTable);
    const inventory_response = await get_inventory(char_id);
    await SetInventoryTable(inventory_response);
}

async function Add_item(old_quantite, added_quantity, object, char_id, already_exist, SetInventoryTable) {

    const new_quantite = Number(old_quantite) + Number(added_quantity);
    let sql = ("")


    if (already_exist) {
        sql = ("UPDATE inventory SET quantite = " + new_quantite+" WHERE char_id = "+char_id+" AND object_id = \"" + object.ID + "\";");
    } else if (old_quantite < 1) {
        sql = ("INSERT INTO inventory VALUES ("+ char_id +", \" " +object.nom + "\", \""+object.ID + "\",\""+object.description + "\", "+ new_quantite+","+object.valeur+");");
    }

    await modify_database(sql);

    // console.log(SetInventoryTable);
    const inventory_response = await get_inventory(char_id);
    const inventory_table_sorted = trier_sur_nom(inventory_response);
    await SetInventoryTable(inventory_table_sorted);
}

export function find_object (object_id) {   // une fonction qui prend en parametre l'id d'un objet et qui retourne un objet pour la table d'inventaire

    let object_result = {object_id: object_id, nom:"",description:"",valeur:0}
    let table =[];
    let object_data = {};

    const test = object_id.slice(0, 4)

    if (test == "cons") {
        table = objectlist;
        for (let i=0; i< table.length; i++) {
            if(object_id == table[i].ID) {
                object_data = table[i]
            }
        }
        object_result.nom = object_data.nom;
        object_result.description = object_data.description;
        object_result.valeur = object_data.valeur;
        

    } else if (test == "ingr"){
        table = objectlist;
        for (let i=0; i< table.length; i++) {
            if(object_id == table[i].ID) {
                object_data = table[i]
            }
        }
        object_result.nom = object_data.nom;
        object_result.description = object_data.description;
        object_result.valeur = object_data.valeur;

    } else if (test == "weap"){
        table = armelist;
        for (let i=0; i< table.length; i++) {
            if(object_id == table[i].ID) {
                object_data = table[i]
            }
        }
        object_result.nom = object_data.nom;
        object_result.description = "Voir la liste des armes";
        object_result.valeur = object_data.valeur;

    } else if (test == "equip"){
        table = equipementlist;
        for (let i=0; i< table.length; i++) {
            if(object_id == table[i].ID) {
                object_data = table[i]
            }
        }
        object_result.nom = object_data.nom;
        object_result.description = "Voir la liste des equipements";
        object_result.valeur = object_data.valeur;
    } 

    return (object_result)
    
}


export function Add_inventory_button ({inventory_table,SetInventoryTable,charact_data}) {
       
    const [open, setOpen] = React.useState(false);
    const [table_data, SetTableData] = React.useState(trier_sur_nom(objectlist));
    const [origin_table_data, SetOriginTableData] = React.useState(trier_sur_nom(objectlist));
    const [table_name, SetTablename] = React.useState("object")
    const [object, SetObject] = React.useState( {nom:"poudre de calcin",ID:"ingr1",description:"La poudre d'une plante des montagnes.",valeur:4,}); 
    const [object_id, SetObjectID] = React.useState("ingr1");
    const [quantite, setQuantite] = React.useState(1);
    const [Filter, setFilter] = React.useState("");   //L'input sur le choix d'item que le joueur est en train d'entré dans le input autofill
    
    if (inventory_table == null || charact_data == null ) {return (<div></div>)} else{

        const char_id = charact_data.char_id;

        const handleClickOpen = () => {
        setOpen(true);
        };
    
        const handleClose = () => {
        setOpen(false);
        };

        const equipementlist2 = trier_sur_nom(equipementlist);
        const armelist2 = trier_sur_nom(armelist);
        const objectlist2 = trier_sur_nom(objectlist);
    
        const handleChange_Table = (event) => {

            // console.log("on lance handleChange_table")
            const test = event.target.value;

            if (test == "object") {  
                SetTableData(objectlist2);
                SetTablename("object");
                SetOriginTableData(objectlist2);

            }else if (test == "arme") {
                SetTableData(armelist2);
                SetTablename("arme");
                SetOriginTableData(armelist2);

            }else if (test == "equipement"){
                SetTableData(equipementlist2);
                SetTablename("equipement");
                SetOriginTableData(equipementlist2);
            }
            
        };

        const handlefilterchange = (event) => {
            
            const filtervalue = event.target.value;
            setFilter(filtervalue);
            let new_table = structuredClone(origin_table_data)
            let new_table2 = []

            for (let i in new_table) {
                if (new_table[i].nom.includes(filtervalue)){
                    new_table2.push(new_table[i])
                }
            }
            console.log("On check la valeur du filtre")
            console.log(filtervalue);
            console.log("on check la table filtrer")
            console.log(new_table2)

            SetTableData(new_table2)
        };

        const handleChange_Object = (event) => {

            // console.log("on lance handleChange_object")
            const test = event.target.value;
            // console.log(table_data);
            // console.log("on check le test dans change_object");
            // console.log(test);
            SetObjectID(test);

            for (let i = 0; i < table_data.length ; i++) {
                if (test == table_data[i].ID){ 

                    // console.log("on check change_object");
                    // console.log(table_data[i]);

                    SetObject(table_data[i])
                    // console.log("on a trouve le bon item et on change de nom")
                }
            }
        };

        const handleChange_quantite = (event) => {
            setQuantite(event.target.value);
        }; 
    
        return (
            <React.Fragment>
            <Button size="medium" className='add_inventory_button' variant="contained" onClick={handleClickOpen}>
                Add item
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Choose wisely</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    or regret it
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 350,
                    }}

                >   <br/>
                    <span>Item type</span>
                    <Select
                        id="add_inventory_select_table"
                        value={table_name}
                        label="Type d'objet"
                        onChange={handleChange_Table}
                        >
                        <MenuItem value="object" key = "objectlist_key"> Objets </MenuItem>
                        <MenuItem value="arme" key = "armelist_key"> Armes </MenuItem>
                        <MenuItem value="equipement" key = "equipmentlist_key"> Equipement </MenuItem>

                    </Select>
                    <br/>
                    <span>filter by name</span>
                    <Input
                        id="inventory_item_filter"
                        value={Filter}
                        label="Filtrer"
                        onChange={handlefilterchange}
                        > 
                    </Input>
                    
                    <br/>
                    <span>Item choice</span>
                    <Select
                        id="add_inventory_select_item"
                        value={object_id}
                        label="potion"
                        onChange={handleChange_Object}
                        >
                        {table_data.map((ligne) => (<MenuItem value={ligne.ID} key = {ligne.ID +"/"+ ligne.nom + "/" + charact_data.char_id}> {ligne.nom} </MenuItem>))}
                    </Select>

                    <br/>
                    <span>Quantity</span>
                    <Input
                    id="add_inventory_select_quantity"
                    value={quantite}
                    label="Item"
                    onChange={handleChange_quantite}
                    > 
                    </Input>
                    
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={async() => { 
                // console.log(table_data);
                 }}> test</Button>
                <Button onClick={async() => {

                        let old_quantite = 0;
                        let already_exist = false;

                        for (let i = 0; i<inventory_table.length; i++ ) {
                            if (object_id == inventory_table[i].object_id) {
                                old_quantite = inventory_table[i].quantite;
                                already_exist = true;
                            }
                        }

                        Add_item(old_quantite, quantite, object,char_id, already_exist, SetInventoryTable) 
                        // console.log("on check les valeurs entre dans add_item")
                        // console.log(object)
                        // console.log(char_id)
                        handleClose();
                    
                    }}> Add </Button>
                <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog> 
            </React.Fragment>
        );
    }
}

export function Change_money_Button ({inventory_table,SetInventoryTable,charact_data}) {

    const [open, setOpen] = React.useState(false);           
    const [value_change, setValueAdded] = React.useState(0);

    if (inventory_table == null || charact_data == null ) {
        // console.log("on ne lance pas Change_money_Button");
        return (<div></div>)
    }else{

        // console.log("on lance Change_money_Button");
        const char_id = charact_data.char_id;

        let original_value = 0;
        for (let i = 0; i <inventory_table.length; i++ ){
            if(inventory_table[i].object_id == "money") {original_value = inventory_table[i].quantite}
        }    
    
        const handleClickOpen = () => {
            setOpen(true);
        };
        
        const handleClose = () => {
            setOpen(false);
        };

        const handlechange = (event) => {
            setValueAdded(event.target.value);
        };
        return (
            <React.Fragment>
            <Button size="small" className='add_money_button' variant="contained" onClick={handleClickOpen}>
                Change money
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Don't cheat!</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    i m looking at you (-)|(-)
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 300,
                    }}
                >   

                    <Input
                    id="add_inventory_select_quantity"
                    type = "number"
                    value={value_change}
                    label="money_change"
                    onChange={handlechange}
                    > 
                    </Input>
                    
                </Box>
                </DialogContent>
                <DialogActions>

                <Button onClick={async() => {

                    const new_value = Number(value_change) + Number(original_value);
                    const sql = ("UPDATE inventory SET quantite = " + new_value+" WHERE char_id = "+char_id+" AND object_id = \"money\";");

                    await modify_database(sql);

                    // console.log(SetInventoryTable);
                    const inventory_response = await get_inventory(char_id);
                    const inventory_table_sorted = trier_sur_nom(inventory_response);
                    await SetInventoryTable(inventory_table_sorted);
                    handleClose();
                    
                }}> Add </Button>

                <Button onClick={async() => {

                    const new_value = Number(original_value) - Number(value_change);
                    // console.log("on check new new value")
                    // console.log(new_value);
                    const sql = ("UPDATE inventory SET quantite = " + new_value+" WHERE char_id = "+char_id+" AND object_id = \"money\";");
                            
                    await modify_database(sql);

                    // console.log(SetInventoryTable);
                    const inventory_response = await get_inventory(char_id);
                    const inventory_table_sorted = trier_sur_nom(inventory_response);
                    await SetInventoryTable(inventory_table_sorted);

                    handleClose();

                    }}> Remove </Button>

                <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog> 
            </React.Fragment>
        )
        
       
    }
}
