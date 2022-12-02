import pv_icone from "../../Assets/pv_icone.png"
import mana_icone from "../../Assets/mana_icone.png"
import ca_cac_icone from "../../Assets/CA_cac_icone.png"
import ca_distance_icone from  "../../Assets/CA_distance_icone.png"
import physical_res_icone from "../../Assets/phy_res_icone.png"
import magic_res_icone from "../../Assets/magic_res_icone.png"
import init_icone from "../../Assets/Init_icone.png"
import perception_icone from "../../Assets/perception_icone.png"
import copper_coin_icone from "../../Assets/copper_coin_icone2.png"

import '../../Style/bestiary.css';

import {trier_par_race,list_type} from "./function_bestiary.js"

export function Opponent_display ({opponent_value}) {

    return (
            <div className="opponent_display">


                <div className="opponent_display2">
                    <div className="Opponent_general_value_border2">
                        <div className="Opponent_general_value_border1">
                            <Opponent_general_value opponent_value = {opponent_value}/>
                        </div>
                    </div>

                    <div className="opponent_description3"> 
                        <div className="opponent_name3">
                            <div className="opponent_name2" >
                                <div className="opponent_name1">
                                {opponent_value.nom}
                                </div>
                            </div>
                        </div>
                        <div className="opponent_description2"> 
                            <div className="opponent_description1">
                            {opponent_value.description}
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="opponent_image2">
                        <Oponent_image opponent_value = {opponent_value}/>
                    </div>
                </div>

                <div className="opponent_detail">
                    <div className="opponent_attacks">
                        <Opponent_attacks opponent_value = {opponent_value}/>
                    </div>
                    <div className="opponent_loot">
                        <Opponent_loot_list opponent_value = {opponent_value}/>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
    )
}


export function Opponent_general_value ({opponent_value}) {

        return(

                    <div className='general_value_opponent'>

                        <div className='pv_opponent'>
                            <img src = {pv_icone} className='pv_icone'/>
                            <span className="pv_opponent_text"> {opponent_value.pv} </span>
                        </div>    
                        
                        <div className='xp_opponent'>
                            <span> XP </span>
                            <span className="xp_opponent_text"> {opponent_value.xp} </span>
                        </div> 

                        <div className='other_values_opponent'>
                            <img src = {ca_cac_icone} className='opponent_values_icone'/>
                            <span className='other_values_text'> {opponent_value.class_armure_cac} </span>
                        </div>

                        <div className='other_values_opponent'>
                            <img src = {ca_distance_icone} className='opponent_values_icone'/>
                            <span className='other_values_text'> {opponent_value.class_armure_distance} </span>
                        </div>

                        <div className='other_values_opponent'>
                            <img src = {physical_res_icone} className='opponent_values_icone'/>
                            <span className='other_values_text'> {opponent_value.physical_res} </span>
                        </div>

                        <div className='other_values_opponent'>
                            <img src = {magic_res_icone} className='opponent_values_icone'/>
                            <span className='other_values_text'> {opponent_value.magical_res} </span>
                        </div>

                        <div className='other_values_opponent'>
                            <img src = {init_icone} className='opponent_values_icone'/>
                            <span className='other_values_text'> {opponent_value.initiative} </span>
                        </div>
                        <div className='other_values_opponent'>
                            <img src = {perception_icone} className='opponent_values_icone'/>
                            <span className='other_values_text'> {opponent_value.perception} </span>
                        </div>
                    </div>   
       )
}

export function Oponent_image ({opponent_value}){

    const source = opponent_value.image

    return (
        <div className="oponent_image1">
            <img src = {source} className='opponent_image0'/>
        </div>
    )
}



export function Opponent_attacks ({opponent_value}){
    
    let attack_list = [{competence: opponent_value.competence1, degat_min:opponent_value.degat_min_c1, degat_max: opponent_value.degat_max_c1, toucher:opponent_value.toucher_c1, effet: opponent_value.effet_c1}];

    if (opponent_value.competence2 == 0 ){} else { attack_list.push({competence: opponent_value.competence2, degat_min:opponent_value.degat_min_c2, degat_max: opponent_value.degat_max_c2, toucher:opponent_value.toucher_c2, effet: opponent_value.effet_c2})}
    if (opponent_value.competence3 == 0 ){} else { attack_list.push({competence: opponent_value.competence3, degat_min:opponent_value.degat_min_c3, degat_max: opponent_value.degat_max_c3, toucher:opponent_value.toucher_c3, effet: opponent_value.effet_c3})}

    return (
        <table className="opponent_attack_table">  
            <caption className="opponent_attack_table_title">Attaques</caption>
            <tbody>
                <tr> 
                    <th>Nom</th>
                    <th>Degat</th>
                    <th>toucher</th>
                    <th>Effets</th>
               </tr>

               {attack_list.map((ligne) => (
                    <tr key = {ligne.competence}>
                        <td>{ligne.competence}</td>
                        <td>{ligne.degat_min} a {ligne.degat_max}</td>
                        <td>{ligne.toucher}</td>
                        <td>{ligne.effet}</td>
                    </tr>
               ))}

            </tbody>
        </table>
    )
}

export function Opponent_loot_list ({opponent_value}) {

    let loot_list = [{index:1, loot: opponent_value.loot1, proba: opponent_value.proba_loot1}];

    if (opponent_value.proba_loot2 > 0 ){ loot_list.push({index:2, loot: opponent_value.loot2, proba: opponent_value.proba_loot2})}
    if (opponent_value.proba_loot3 > 0 ){ loot_list.push({index:3, loot: opponent_value.loot3, proba: opponent_value.proba_loot3})}
    if (opponent_value.proba_loot4 > 0 ){ loot_list.push({index:4, loot: opponent_value.loot4, proba: opponent_value.proba_loot4})}

    return (
        <table className="opponent_loot_table">  
            <caption className="opponent_loot_table_title">Butin </caption>
            <tbody>
                <tr> 
                    <th> {opponent_value.pc_min} a {opponent_value.pc_max} <img className="money_loot_icone" src ={copper_coin_icone}></img></th>
                    <th>  </th>
               </tr>

               {loot_list.map((ligne) => (<tr key = {ligne.index+ligne.loot}><td>{ligne.loot}</td><td>{ligne.proba}</td></tr>))}

            </tbody>
        </table>
    )
}

