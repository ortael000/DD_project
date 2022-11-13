import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { SignalCellularNullOutlined } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';

import pv_icone from "../../Assets/pv_icone.png"
import mana_icone from "../../Assets/mana_icone.png"
import ca_cac_icone from "../../Assets/CA_cac_icone.png"
import ca_distance_icone from  "../../Assets/CA_distance_icone.png"
import physical_res_icone from "../../Assets/phy_res_icone.png"
import magic_res_icone from "../../Assets/magic_res_icone.png"
import init_icone from "../../Assets/Init_icone.png"
import perception_icone from "../../Assets/perception_icone.png"

import copper_coin_icone from "../../Assets/copper_coin_icone.png"
import silver_coin_icone from "../../Assets/silver_coin_icone.png"
import gold_coin_icone from "../../Assets/gold_coin_icone.png"

import {trier_par_race,list_type} from "../bestiary/function_bestiary.js"
import {bestiare} from "../../data/bestaire.js"
import {get_charact } from "../../function/function_db.js";
import {calculate_character_values,trier_sur_initiative} from "../../function/function.js"
import {persolist} from "../../data/perso.js"
import {armelist } from '../../data/armes.js';
import {equipementlist } from '../../data/equipements.js';
import {objectlist} from '../../data/objet.js'

import {add_item_to_character} from "../../function/function_db.js"
import {find_object} from "../../components/character_component/inventory.js"
 
export function Generate_loot({fighter_list, setFighterList}) {

    const [open, setOpen] = React.useState(false);
    const [XpReward, setXpReward] = React.useState(0);
    const [LootList, setLootList] = React.useState([]);
    const [MoneyLoot, setMoneyLoot] = React.useState(0);     

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    const generate_loot_start = () => {

        setOpen(true);
        let new_table = [];
        let index = 0;
        let total_xp =0;
        let total_money =0;

        for (let i in fighter_list) {
            if ( fighter_list[i].type == "player"){} else{
                const opponent_loot_table0 = [
                    Loot_Random (fighter_list[i].loot1,fighter_list[i].loot1_code,fighter_list[i].proba_loot1),
                    Loot_Random (fighter_list[i].loot2,fighter_list[i].loot2_code,fighter_list[i].proba_loot2),
                    Loot_Random (fighter_list[i].loot3,fighter_list[i].loot3_code,fighter_list[i].proba_loot3),
                    Loot_Random (fighter_list[i].loot4,fighter_list[i].loot4_code,fighter_list[i].proba_loot4)
                ]
                total_xp = total_xp + fighter_list[i].xp;
                total_money = total_money + Math.floor(Math.random()*(fighter_list[i].pc_max - fighter_list[i].pc_min+1)) + fighter_list[i].pc_min;
                

                for (let i in opponent_loot_table0) {
                    
                    if(opponent_loot_table0[i].nom == "rien") {} else {
                        new_table.push({index:index, nom:opponent_loot_table0[i].nom, code : opponent_loot_table0[i].code })
                        index = index+1;
                    }
                    
                }
            }
        }
         console.log("on check l'array des loots")
         console.log(new_table);

        setLootList(new_table)
        setXpReward(total_xp)
        setMoneyLoot(total_money)

    };

    return (
        <div className='generate_loot_button' >
        <React.Fragment>
        <Button size="medium" variant="contained" onClick={generate_loot_start}>
            Generate_loot
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Du butin!</DialogTitle>
            <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <Box
                noValidate
                component="form"
                sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: 500,
                }}
            >
            <div className='loot_dialog'> 
                <div className='"money_display'>  <Money_display money_value ={MoneyLoot} fighter_list = {fighter_list}/> </div>
                {LootList.map((ligne) => (<Loot_line ligne={ligne}/>) )}
            </div>  

            </Box>
            </DialogContent>
            <DialogActions>

            <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog> 
        </React.Fragment>
        </div>
    )

}

function Loot_Random (loot_nom,loot_code,loot_proba) {    // Une fonction qui prend en input ----a completer----  et qui renvoie soit un code (si on a dropé le loot) soit "null".
    let loot = {nom:"rien" , code: "rien"}   
    const test = Math.random();

    if(test<loot_proba){
        loot = {nom:loot_nom , code: loot_code}       
    }
    return(loot)
}

export function Loot_line ({ligne}) {

    const [character_choice, setCharacterChoice] = React.useState({char_id: 7, nom: "Kokoro"});
    const [item_status, setItemStatus] = React.useState(1);

    //console.log("check ligne");
    //console.log(ligne);


    const handlechange = (event) => {
        setCharacterChoice(event.target.value)
    };
    if (item_status == 1 ){
        return (
            <div className='loot_line_display'>
                <span className='distribute_loot_index'>
                    {ligne.index}
                </span>
                <span className='distribute_loot_nom'>
                    {ligne.nom}
                </span>

                <Select
                    className='select_player_to_add_item'
                    id="select_new_opponent"
                    value={character_choice}
                    label="opponent_choice"
                    onChange={handlechange}
                    >
                    {persolist.map((ligne) => (<MenuItem value={ligne} key = {("choice_" +ligne.char_id)}> {ligne.nom} </MenuItem>))}

                </Select>

                <Button className='button_add_item_to_player' onClick={async() => {

                            add_item_to_character (1,ligne.code,character_choice.char_id,setItemStatus)

                }}> Add to player </Button>

            </div>
        )
    } else { return <div>{ligne.index} {ligne.nom} has been distributed</div>}
}

function Money_display ({money_value,fighter_list}) {

    if (money_value == 0 ){
        return (<div></div>)

    } else {

        // console.log("on check inventory_table")
        // console.log(inventory_table);

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

                <Button onClick={async() => {

                    let player_table = [];
                    for (let i in fighter_list) {
                        if (fighter_list[i].type == "player") {
                            player_table.push(fighter_list[i])
                        }
                    }
                    console.log("on partage l'argent entre les joueurs presents")
                    console.log(player_table)

                    const chared_money = Math.floor(money_value/(player_table.length))

                    for (let i in player_table){
                        add_item_to_character (chared_money,"money",player_table[i].ID)
                    }

                }}> Share to all player </Button>

            </div>
        )
    }

} 


