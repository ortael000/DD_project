import * as React from 'react';
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

import {change_perso} from '../../function/function_db.js'

export function Change_Character_Dialog({base_data,code,table,setcharactValue,setInputValue}) {    // number est le numero de la competence qu'on met a jour ("competence1", "competence2") parmi les 5 slots possibles, code est l'ID de la competence qu'on veut assigner
  const [open, setOpen] = React.useState(false);
  const [value, SetValue] = React.useState("comp0");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    SetValue(event.target.value);
  };

    return (
      <React.Fragment>
        <button className='change_character_button' variant="outlined" onClick={handleClickOpen}>
           {code}
        </button>
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
                width: 200,
              }}
            >   
              <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Value"
                    onChange={handleChange}
                  >
                    {table.map((ligne) => (<MenuItem value={ligne.ID} key = {ligne.ID} >{ligne.nom}</MenuItem>))}
              </Select>
                
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={async() => {
              
              if (value == "null") {} else {
                await change_perso (base_data.char_id, code, value,setcharactValue,setInputValue)
              }
              setOpen(false);
              
              }}> Change </Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog> 
      </React.Fragment>
    );
}