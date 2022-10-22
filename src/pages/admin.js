import React from "react";
import { useState } from 'react'
import '../Style/component.css';
import '../Style/admin.css';
import {get_table,modify_database} from '../function/function_db.js'
import {Table_display} from '../components/comp_admin.js'

export function Admin() {

    const [table, SetTableValue] = useState(null)

    return(
        <div className= "admin_content"> 
                    
            <div className='sql_input_div'>
                
                <div className="sql_input_div_1">
                    <input type="text" className="sql_input" id ="sql_input"/>
                    <button type="submit/>" onClick={async() => {
                        
                        const sql_input = document.getElementById("sql_input").value;

                        modify_database(sql_input);

                    }}> modifier la table</button>

                     <select id="table_choice" className="table_choice">
                        <option value="character">character</option>
                        <option value="inventory">inventory</option>
                    </select>  
                    
                    <button type="submit/>" onClick={async() => {
                        const table_choice = document.getElementById("table_choice").value

                        const response = await get_table(table_choice);
                        SetTableValue(response);
                        console.log(response);
                        console.log(table);   //Daniel il a dit "c'est normal frerot tkt" "ce truc la va pas se reevaluer a ce moment la mais quand tu refais le usestate"

                    }}> afficher la table</button>

                </div>
                <br/>
                
                <div className="sql_input_div_1_1">
                   
                </div>
            </div> 
            <br/>

            <div className="table_display">
                <table className="table_display2">  
                        <Table_display table = {table}/>
                </table>

            </div>

        </div>
    )
}

