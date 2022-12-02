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

import pv_icone from "../../Assets/pv_icone.png"
import mana_icone from "../../Assets/mana_icone.png"
import ca_cac_icone from "../../Assets/CA_cac_icone.png"
import ca_distance_icone from  "../../Assets/CA_distance_icone.png"
import physical_res_icone from "../../Assets/phy_res_icone.png"
import magic_res_icone from "../../Assets/magic_res_icone.png"
import init_icone from "../../Assets/Init_icone.png"
import perception_icone from "../../Assets/perception_icone.png"
import copper_coin_icone from "../../Assets/copper_coin_icone2.png"

import {trier_par_race,list_type} from "../bestiary/function_bestiary.js"
import {bestiare} from "../../data/bestaire.js"
import {get_charact } from "../../function/function_db.js";
import {calculate_character_values,trier_sur_initiative} from "../../function/function.js"
import {persolist} from "../../data/perso.js"




export function Add_fighter_button ({fighter_list, setFighterList}) {

    const [bestiary_filter, setBestiaryFilter] = React.useState("Gothir");
    const [bestiare_table, setBestiaryTable] = React.useState(bestiare);
    const [opponent_choice, setOpponentChoice] = React.useState(bestiare[0]);
    const [open, setOpen] = React.useState(false);        

    const type_list = list_type(bestiare)

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handlefilterchange = (event) => {
        // console.log(event.target.value)
        setBestiaryFilter(event.target.value);
        let new_table = trier_par_race (bestiare,event.target.value);
        setBestiaryTable(new_table);
    };

    const handleOpponentchange = (event) => {
        const selection_id = event.target.value;

            for (let i = 0; i < bestiare_table.length; i++){
                if (selection_id == bestiare_table[i].ID) {
                    let new_opponent = {...bestiare_table[i]}
                    //console.log("on utilise setOpponentChoice")
                    setOpponentChoice(new_opponent);
                }
            }
    };

    const handlefinalclick = () => {

        let new_table = []

        if (fighter_list == null) {
            new_table = []
        } else {
            new_table = structuredClone(fighter_list)
        }

        let opponent_choice2 = structuredClone(opponent_choice)

        opponent_choice2.nom = (opponent_choice.nom + "-" + (new_table.length + 1))

        new_table.push(opponent_choice2);
        setFighterList(new_table);

    };

    return (
        <div className='add_figther_button' >
        <React.Fragment>
        <Button color="error" size="medium" variant="contained" onClick={handleClickOpen}>
            Add opponent
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
                width: 300,
                }}
            >   
                <Select
                    id="selecter_race_faction_opponent"
                    value={bestiary_filter}
                    label="Race ou faction"
                    onChange={handlefilterchange}
                    >
                    {type_list.map((ligne) => (<MenuItem value={ligne}  key = {ligne} > {ligne} </MenuItem>))}

                </Select>

                <Select
                    id="select_new_opponent"
                    value={opponent_choice.ID}
                    label="opponent_choice"
                    onChange={handleOpponentchange}
                    >
                    {bestiare_table.map((ligne) => (<MenuItem value={ligne.ID} key = {"opponent_choice" + ligne.nom + ligne.ID}> {ligne.nom} </MenuItem>))}
                </Select>


                
            </Box>
            </DialogContent>
            <DialogActions>

            <Button onClick={handlefinalclick}> Add </Button>
            <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog> 
        </React.Fragment>
        </div>
    );

}

export function Add_character_button ({fighter_list, setFighterList}) {

    const [open, setOpen] = React.useState(false);

    const character_object0 = {
        nom: "ortael",
        type:"player",
        pv: 150,
        class_armure_cac: 30,
        class_armure_distance: 30,
        physical_res: 20,
        magical_res: 20,
        initiative: 20,
    }
    
    const [character_choice, setCharacterChoice] = React.useState({char_id: 7, nom: "Kokoro"});
    const [base_character_data_state, setCharacterBaseData] = React.useState(character_object0);
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const  handlechange = (event) => {
        const new_choice = event.target.value
        setCharacterChoice(new_choice)
    };

    return (
        <div className='add_character_button' >
        <React.Fragment>
        <Button color="error" size="medium" variant="contained" onClick={handleClickOpen}>
            Add player
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
            >   

            <Select
                id="select_new_opponent"
                value={character_choice}
                label="opponent_choice"
                onChange={handlechange}
                >
                {persolist.map((ligne) => (<MenuItem value={ligne} key = {("choice_" +ligne.char_id)}> {ligne.nom} </MenuItem>))}

            </Select>

                
            </Box>
            </DialogContent>
            <DialogActions>

            <Button onClick={async() => {

                 const base_data = await get_charact (character_choice.char_id);
                 console.log("on recupere les données de base du perso")
                 setCharacterBaseData(base_data)

                 const character_final_data = calculate_character_values(base_data)
         
                 const character_object = {
                     nom: character_final_data.character_general_values.nom,
                     ID: character_final_data.ID,
                     type:"player",
                     pv: character_final_data.character_general_values.current_pv,
                     class_armure_cac: character_final_data.character_general_values.class_armure_cac,
                     class_armure_distance: character_final_data.character_general_values.class_armure_distance,
                     physical_res: character_final_data.character_general_values.physical_res,
                     magical_res: character_final_data.character_general_values.magical_res,
                     initiative: character_final_data.character_general_values.initiative,
                 }
         
                 let new_table = []
         
                 if (fighter_list == null) {
                         new_table = []
                     } else {
                         new_table = structuredClone(fighter_list)
                     }
         
                 new_table.push(character_object);
                 setFighterList(new_table);
            }}
            > Add </Button>
            <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog> 
        </React.Fragment>
        </div>
    );

}

export function Fighter_display ({fighter_list, setFighterList}) {
    

    if (fighter_list == null) {return <div></div>} else {

       //  console.log("on check fighter_list");
       //  console.log(fighter_list);

        return (
            <div className='figter_line_display'>
                {fighter_list.map((ligne, index) => (<One_fighter_display index ={index} key = {index} fighter_list_object = {ligne} setFighterList={setFighterList} fighter_list={fighter_list}/>))}
            </div>
        )
    }
}

export function One_fighter_display ({index,fighter_list_object,setFighterList,fighter_list}) {


    if (fighter_list_object.pv < 1) {
        return(
            <div className='figther_display_dead'>
                <div className='figther_ID'> 
                        {index+1}
                </div>

                <div className='figther_name'> 
                    {fighter_list_object.nom} 
                </div>

                <div className='figther_display_box'> 
                    <img src = {pv_icone} className='fighter_values_icone'/>
                    <span className="other_values_text"> {fighter_list_object.pv}  </span>
                </div>

                <div className='figther_display_box'>
                <img src = {ca_cac_icone} className='fighter_values_icone'/>
                <span className="other_values_text"> {fighter_list_object.class_armure_cac} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {ca_distance_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.class_armure_distance} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {physical_res_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.physical_res} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {magic_res_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.magical_res} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {init_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.initiative} </span>
                </div>

                <div className='attack_button'>
                    <Opponent_attack_button name = {fighter_list_object.competence1} min = {fighter_list_object.degat_min_c1} max= {fighter_list_object.degat_max_c1} toucher= {fighter_list_object.toucher_c1} effet = {fighter_list_object.effet_c1} />
                </div>

                <div className='attack_button'>
                    <Opponent_attack_button name = {fighter_list_object.competence2} min = {fighter_list_object.degat_min_c2} max= {fighter_list_object.degat_max_c2} toucher= {fighter_list_object.toucher_c2} effet = {fighter_list_object.effet_c2} />
                    
                </div>

                <div className='attack_button'>
                    <Opponent_attack_button name = {fighter_list_object.competence3} min =  {fighter_list_object.degat_min_c3} max= {fighter_list_object.degat_max_c3} toucher= {fighter_list_object.toucher_c3} effet = {fighter_list_object.effet_c3} />
                </div>

                <Change_PV_button  index ={index}  setFighterList = {setFighterList}  fighter_list = {fighter_list} />
            </div>
            )} else{

        return(
            <div className='figther_display'>
                <div className='figther_ID'> 
                        {index+1}
                </div>

                <div className='figther_name'> 
                    {fighter_list_object.nom} 
                </div>

                <div className='figther_display_box'> 
                    <img src = {pv_icone} className='fighter_values_icone'/>
                    <span className="other_values_text"> {fighter_list_object.pv}  </span>
                </div>

                <div className='figther_display_box'>
                <img src = {ca_cac_icone} className='fighter_values_icone'/>
                <span className="other_values_text"> {fighter_list_object.class_armure_cac} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {ca_distance_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.class_armure_distance} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {physical_res_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.physical_res} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {magic_res_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.magical_res} </span>
                </div>

                <div className='figther_display_box'>
                    <img src = {init_icone} className='fighter_values_icone'/>
                    <span className='other_values_text'> {fighter_list_object.initiative} </span>
                </div>

                <div className='attack_button'>
                    <Opponent_attack_button name = {fighter_list_object.competence1} min = {fighter_list_object.degat_min_c1} max= {fighter_list_object.degat_max_c1} toucher= {fighter_list_object.toucher_c1} effet = {fighter_list_object.effet_c1} />
                </div>

                <div className='attack_button'>
                    <Opponent_attack_button name = {fighter_list_object.competence2} min = {fighter_list_object.degat_min_c2} max= {fighter_list_object.degat_max_c2} toucher= {fighter_list_object.toucher_c2} effet = {fighter_list_object.effet_c2} />
                    
                </div>

                <div className='attack_button'>
                    <Opponent_attack_button name = {fighter_list_object.competence3} min =  {fighter_list_object.degat_min_c3} max= {fighter_list_object.degat_max_c3} toucher= {fighter_list_object.toucher_c3} effet = {fighter_list_object.effet_c3} />
                </div>

                <Change_PV_button  index ={index}  setFighterList = {setFighterList}  fighter_list = {fighter_list} />
            </div>
    )}

}

export function Opponent_attack_button ({name,min,max,toucher, effet}) {


    if (name == "0") {return(<div></div>)} else {

    return(
        <button className='fight_attack_button' onClick={() => {

                const degat = Number(Math.floor(Math.random()*((max)-(min)+1))+(min));
                
                const touch = Math.floor(Math.random()*(21))+toucher
                const message = (name + " avec " + degat +" de degats et " + touch + " de score de toucher  /// " + effet ) ;
                window.alert(message)

        }}>
            {name}
        </button>
    )}


}

export function Change_PV_button({index,setFighterList,fighter_list}) {

    const [pv_change, setCurrentPV] = React.useState(fighter_list[index].pv);


    const handleChange = (event) => {
        setCurrentPV(event.target.value);
    };

    const handleAdd = () => {
        
        let new_table = [...fighter_list];

        let old_pv = new_table[index].pv
        let new_pv = old_pv + Number(pv_change);
        new_table[index].pv = new_pv;

        setFighterList(new_table);
        window.alert("on passe a " + new_pv + " PV");
    };

    const handleRemove = () => {
        let new_table = [...fighter_list];
        let old_pv = fighter_list[index].pv
        let new_pv = old_pv - pv_change;
        new_table[index].pv = new_pv;
        setFighterList(new_table);
        const message = ("on passe a " + new_pv + " PV");
        window.alert(message);
    };

    return(
        <div className='pv_change_buttons'> 

            <div className='pv_change_input'>
                <input 
                className='pv_change_buttons_2'
                value={pv_change}
                label="Race ou faction"
                type ="number"
                onChange={handleChange}>
                </input>
            </div>
            
            <button className='pv_change_buttons_3' onClick={handleAdd}>
            add pv
            </button>

            <button className='pv_change_buttons_3' onClick={handleRemove}>
            remove pv
            </button>

        </div>
    )
    

}
export function Sort_by_initiative({fighter_list, setFighterList}) {

    return(
        <div className='run_initiative_button'>
            <Button color="error" size="medium" variant="contained" onClick={() => {
                
                console.log("On lance let jes d'initiatives et on check Figther list avant")
                console.log(fighter_list)

                let new_table = structuredClone(fighter_list);

                for (let i = 0; i<new_table.length; i++) {
                    console.log(new_table[i].nom + " a une initiative de base de " + new_table[i].initiative)
                    new_table[i].initiative = Number(new_table[i].initiative) + (Math.floor(Math.random()*20+1))
                    console.log(new_table[i].nom + " réalise un jet de " + new_table[i].initiative)
                }

                new_table = trier_sur_initiative (new_table)

                console.log("on check la nouvelle table des combattants une fois sortée")
                console.log(new_table);

                setFighterList(new_table)

            }}>
            Throw initiative dices
            </Button>
        </div>
    )

}




