import { armelist } from '../../data/armes.js';
import { equipementlist } from '../../data/equipements.js';
import { passiflist } from '../../data/passifs.js';
import { competencelist } from '../../data/competence.js';
import {Change_Character_Dialog} from './multiple_select_mui.js'
import {modify_database,get_charact, change_perso} from '../../function/function_db.js'
import { calculate_character_values } from '../../function/function.js';
import {trier_sur_nom} from '../../function/function.js'

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

import '../../Style/character/change_button.css'

export function Change_competence ({base_data,setInputValue,setcharactValue}) {

    const table = ["competence1","competence2","competence3","competence4","competence5"]
    const competencelist2 = trier_sur_nom(competencelist);

    if (base_data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div> </div>
        )
    } else{

        return (
            <div className='change_competence_buttons'>
                {table.map((code) => <Change_Character_Dialog base_data ={base_data} key={code} code={code} table = {competencelist2} setcharactValue={setcharactValue} setInputValue={setInputValue} />)}
            </div>
        )
    }
}

export function Change_weapon ({base_data,setInputValue,setcharactValue}) {

    const table = ["arme1","arme2","arme3"]
    const armelist2 = trier_sur_nom(armelist);

    if (base_data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div> </div>
        )
    } else{

        return (
            <div className='change_weapon_buttons'>
                {table.map((code) => <Change_Character_Dialog base_data ={base_data} key={code} code={code} table = {armelist2} setcharactValue={setcharactValue} setInputValue={setInputValue} />)}
            </div>
        )
    }
}

export function Change_equipment ({base_data,setInputValue,setcharactValue}) {

    const table = ["armure_torse","armure_jambe","casque","brassard","botte","anneau1","anneau2","amulette","botte"]
    const equipementlist2 = trier_sur_nom(equipementlist);
    

    if (base_data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div> </div>
        )
    } else{

        return (
            <div className='change_equipment_buttons'>
                {table.map((code) => (<Change_Character_Dialog base_data ={base_data} key={code} code={code} table = {filter_equipment(code, equipementlist2)} setcharactValue={setcharactValue} setInputValue={setInputValue} />))}
            </div>
        )
    }
}

function filter_equipment (type, equipementlist) {

    let equipment_filtered_table = [equipementlist[0]];

    if (type == "anneau1") {type = "anneau"}
    if (type == "anneau2") {type = "anneau"}

    for (let i = 1; i < equipementlist.length; i++) {

        if (equipementlist[i].type == type) {
            equipment_filtered_table.push(equipementlist[i])
        }
    }
    return (equipment_filtered_table);
} 

export function Change_passive ({base_data,setInputValue,setcharactValue}) {

    let passiflist2 = trier_sur_nom(passiflist);

    const table = ["passif1", "passif2", "passif3", "passif4"]

    if (base_data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div> </div>
        )
    } else{

        return (
            <div className='change_passif_buttons'>
                {table.map((code) => (<Change_Character_Dialog base_data ={base_data} key={code} code={code} table = {passiflist2} setcharactValue={setcharactValue} setInputValue={setInputValue} />))}
            </div>
        )
    }
}

export function Remove_temps ({base_data,setInputValue,setcharactValue}) {

    if (base_data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div> </div>
        )
    } else{
        
        const char_id = base_data.char_id;

        return (
            <div> 
                <Button variant="contained" size="small" onClick={async() => {
                    
                    const sql = ("UPDATE character SET temp_force = 0, temp_dexterite = 0, temp_intelligence = 0, temp_constitution = 0, temp_puissance = 0, temp_charisme = 0 WHERE char_id = " +char_id +";")
                    await modify_database(sql);
                    
                    const new_base_data= await get_charact(char_id);
                    setInputValue(new_base_data);
                    const new_character_final_values = calculate_character_values(new_base_data)
                    setcharactValue(new_character_final_values)
                
                }}
                > Remove Temp </Button>
            </div>
        )

    }
}

export function Add_temps ({base_data,setInputValue,setcharactValue}) {

    const [open, setOpen] = React.useState(false);
    const [code, Setcode] = React.useState("force");
    const [value, SetValue] = React.useState(0);

    if (base_data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div> </div>
        )
    } else{
        
        
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
        const handleChange_code = (event) => {
            Setcode(event.target.value);
        };

        const handleChange_value = (event) => {
            SetValue(event.target.value);
          };
        
        const number_table = [-7,-8,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,12,14,16,18,20] ;
      
          return (
            <React.Fragment>
              <Button variant="contained" size="small" onClick={handleClickOpen}>
                 + Temporary
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
              >
                <DialogTitle>Choose the caracteristic and the value</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    then click on change
                  </DialogContentText>
                  <Box
                    noValidate
                    component="form"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      m: 'auto',
                      width: 200,
                    }}
                  >   
                    <Select
                          labelId="Input_carac_temporary-bonus"
                          id="Input_carac_temporary-bonus"
                          value={code}
                          label="Value"
                          onChange={handleChange_code}
                        >
                          <MenuItem value="temp_force" key = "temp_force" >force </MenuItem>
                          <MenuItem value="temp_dexterite" key = "temp_dexterite" >dexterite </MenuItem>
                          <MenuItem value="temp_intelligence" key = "temp_intelligence" >intelligence </MenuItem>
                          <MenuItem value="temp_constitution" key = "temp_constitution" >constitution </MenuItem>
                          <MenuItem value="temp_puissance" key = "temp_puissance" >puissance </MenuItem>
                          <MenuItem value="temp_charisme" key = "temp_charisme" >charisme </MenuItem>
                    </Select>

                    <Select
                          labelId="Input_value_temporary-bonus"
                          id="Input_value_temporary-bonus"
                          value={value}
                          label="Value"
                          onChange={handleChange_value}
                        >
                          {number_table.map((ligne) => (<MenuItem value={ligne} key = {ligne} >{ligne}</MenuItem>))}

                    </Select>
                      
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={async() => {

                    let new_value = base_data[code] + value;
                    
                    if (value == "null") {} else {
                      await change_perso (base_data.char_id, code, new_value,setcharactValue,setInputValue)
                    }
                    setOpen(false);
                    
                    }}> Change </Button>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog> 
            </React.Fragment>
          );
}}

export function Change_HP_Button ({charact_data,setInputValue,setcharactValue}) {

  const [open, setOpen] = React.useState(false);           
  const [value_added, setValueAdded] = React.useState(0);

  if (charact_data == null ) {
      return (<div></div>)
  }else{

      const charac_id = charact_data.char_id;

      let original_value = charact_data.current_pv;
  
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
          <button size="medium" className='change_hp_mana' variant="contained" onClick={handleClickOpen}>
              Change HP
          </button>
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
                  value={value_added}
                  label="money_change"
                  onChange={handlechange}
                  > 
                  </Input>
                  
              </Box>
              </DialogContent>
              <DialogActions>

              <Button onClick={async() => {

                  const new_value = Number(value_added) + Number(original_value);
                  await change_perso (charac_id, "current_pv", new_value, setcharactValue, setInputValue)
                  
              }}> Add </Button>

              <Button onClick={async() => {

                  const new_value = Number(original_value) - Number(value_added);
                  await change_perso (charac_id, "current_pv", new_value, setcharactValue, setInputValue)

                  }}> Remove </Button>

              <Button onClick={handleClose}>Close</Button>

              </DialogActions>
          </Dialog> 
          </React.Fragment>
      )
  }
}

export function Change_mana_Button ({charact_data,setInputValue,setcharactValue}) {

  const [open, setOpen] = React.useState(false);           
  const [value_added, setValueAdded] = React.useState(0);

  if (charact_data == null ) {
      return (<div></div>)
  }else{
    
      const charac_id = charact_data.char_id;

      let original_value = charact_data.current_mana;
  
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
          <button size="medium" className='change_hp_mana' variant="contained" onClick={handleClickOpen}>
              Change mana
          </button>
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
                  value={value_added}
                  label="money_change"
                  onChange={handlechange}
                  > 
                  </Input>
                  
              </Box>
              </DialogContent>
              <DialogActions>

              <Button onClick={async() => {

                  const new_value = Number(value_added) + Number(original_value);
                  await change_perso (charac_id, "current_mana", new_value, setcharactValue, setInputValue)
                  
              }}> Add </Button>

              <Button onClick={async() => {

                  const new_value = Number(original_value) - Number(value_added);
                  await change_perso (charac_id, "current_mana", new_value, setcharactValue, setInputValue)

                  }}> Remove </Button>

              <Button onClick={handleClose}>Close</Button>

              </DialogActions>
          </Dialog> 
          </React.Fragment>
      )
     
  }

}