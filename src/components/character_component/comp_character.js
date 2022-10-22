import '../../Style/component.css';
import '../../Style/character/character.css'
import '../../Style/character/grids.css'
import '../../Style/character/character_title.css'

import Button from '@mui/material/Button';

import azaram_portrait from "../../Assets/azaram_portrait.png";
import jean_claude_protrait from "../../Assets/jean_claude_portrait.png"
import kokoro_portrait from "../../Assets/kokoro_portrait.png"
import nemeia_portrait from "../../Assets/nemeia_portrait.png"

import pv_icone from "../../Assets/pv_icone.png"
import mana_icone from "../../Assets/mana_icone.png"
import ca_cac_icone from "../../Assets/CA_cac_icone.png"
import ca_distance_icone from  "../../Assets/CA_distance_icone.png"
import physical_res_icone from "../../Assets/phy_res_icone.png"
import magic_res_icone from "../../Assets/magic_res_icone.png"
import init_icone from "../../Assets/Init_icone.png"
import perception_icone from "../../Assets/perception_icone.png"

import {Add_caracteristic,point_to_attribute} from '../../function/function.js'
import {Change_HP_Button, Change_mana_Button} from "../character_component/change_button.js"
 
export function Weapon_grid ({data}) {

    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div id = "div001"> </div>
        )
    } else{

        let arme1_object = data.arme1_final;
        let arme2_object = data.arme2_final;
        let arme3_object = data.arme3_final;

        return(

            <table className="weapon_table">  
               <caption className="weapon_table_title">Armes</caption>
                <tbody>
                       <tr> 
                           <th> Nom</th>
                           <th> Type</th>
                           <th> Range</th>
                           <th> Degat_min</th>
                           <th> Degat_max</th>
                           <th> Toucher</th>
                           <th> Critique</th>
                           
                       </tr>

                       <tr> 
                           <td> {arme1_object.nom}</td>
                           <td> {arme1_object.type}</td>
                           <td> {arme1_object.range}</td>
                           <td className='grid_contain_number'> {arme1_object.deg_min}</td>
                           <td className='grid_contain_number'> {arme1_object.deg_max}</td>
                           <td className='grid_contain_number'> {arme1_object.toucher}</td>
                           <td className='grid_contain_number'> {arme1_object.critique}</td>
                       </tr>

                       <tr> 
                           <td> {arme2_object.nom}</td>
                           <td> {arme2_object.type}</td>
                           <td> {arme2_object.range}</td>
                           <td className='grid_contain_number'> {arme2_object.deg_min}</td>
                           <td className='grid_contain_number'> {arme2_object.deg_max}</td>
                           <td className='grid_contain_number'> {arme2_object.toucher}</td>
                           <td className='grid_contain_number'> {arme2_object.critique}</td>
                       </tr>

                       <tr> 
                           <td> {arme3_object.nom}</td>
                           <td> {arme3_object.type}</td>
                           <td> {arme3_object.range}</td>
                           <td className='grid_contain_number'> {arme3_object.deg_min}</td>
                           <td className='grid_contain_number'> {arme3_object.deg_max}</td>
                           <td className='grid_contain_number'> {arme3_object.toucher}</td>
                           <td className='grid_contain_number'> {arme3_object.critique}</td>
                       </tr>

                   </tbody>
               </table>
       )
    }
}

export function Perso_title ({data}) {

    if (data == null) {
       // {console.log("pas encore de donnée a exploiter")}
        return (
        <div id = "div002"> </div>
        )
    } else {

        return (
            <div className='titre_perso'>
                <div className='Title_border_1'>
                    <div className='Title_border_2'>
                        <div className='character_name'> {data.character_general_values.nom} </div>
                        <br/>
                        <div className='character_description'> Description a venir </div>
                    </div>
                </div>
            </div>
        )

    }


}


export function General_values1 ({data, charact_data, setInputValue, setcharactValue}) {

    if (data == null) {
        return (
        <div id = "div003"> </div>
        )
    } else{

        let general_values = data.character_general_values;

        return(
                    
                        <div className='general_value_perso1 float_child1'>

                            <div className='niveau_perso'>
                                <span> NIVEAU </span>
                                <span className=' niveau_perso2'> {general_values.niveau} </span>
                            </div>

                            <div className='xp_perso'>
                                <span> XP </span>
                                <span> {general_values.current_xp} </span>
                                <span> / </span>
                                <span> {general_values.xp_next} </span>
                            </div> <br/>

                            <div className='pv_perso'>
                                <img src = {pv_icone} className='pv_icone'/>
                                <span className='pv_perso_text'>
                                    <span> {general_values.current_pv} </span>
                                    <span> / </span>
                                    <span> {general_values.max_hp} </span>
                                    <span className='gain_pv'> (+{general_values.gain_pv})  </span>
                                    <Change_HP_Button charact_data = {charact_data} setInputValue = {setInputValue} setcharactValue ={setcharactValue} />
                                </span>
                            </div>

                            <div className='mana_perso'>
                                <img src = {mana_icone} className='mana_icone'/>
                                <span className='mana_perso_text'>
                                    <span> {general_values.current_mana} </span>
                                    <span> / </span>
                                    <span> {general_values.max_mana} </span>
                                    <span className='gain_mana'> (+{general_values.gain_mana})  </span>
                                    <Change_mana_Button charact_data = {charact_data} setInputValue = {setInputValue} setcharactValue ={setcharactValue} />
                                </span>
                            </div>
                        </div>           
       )
    }
}

export function General_values2 ({data}) {

    if (data == null) {
        return (
        <div id = "div003"> </div>
        )
    } else{

        let general_values = data.character_general_values;
        // console.log(data[14]);

        return(

                    <div className='general_value_perso2 float_child1'>
                            <div className='other_values_perso'>
                                <img src = {ca_cac_icone} className='other_values_icone'/>
                                <span className='other_values_text'> {general_values.class_armure_cac} </span>
                            </div>

                            <div className='other_values_perso'>
                                <img src = {ca_distance_icone} className='other_values_icone'/>
                                <span className='other_values_text'> {general_values.class_armure_distance} </span>
                            </div>

                            <div className='other_values_perso'>
                                <img src = {physical_res_icone} className='other_values_icone'/>
                                <span className='other_values_text'> {general_values.physical_res} </span>
                            </div>

                            <div className='other_values_perso'>
                                <img src = {magic_res_icone} className='other_values_icone'/>
                                <span className='other_values_text'> {general_values.magical_res} </span>
                            </div>

                            <div className='other_values_perso'>
                                <img src = {init_icone} className='other_values_icone'/>
                                <span className='other_values_text'> {general_values.initiative} </span>
                            </div>
                            <div className='other_values_perso'>
                                <img src = {perception_icone} className='other_values_icone'/>
                                <span className='other_values_text'> {general_values.perception} </span>
                            </div>
                    </div>   
       )
    }
}

export function Caracteristic_grid ({data}) {

    if (data == null) {

        return (
        <div id = "div006"> </div>
        )
    } else{

        let base_caract = data.base_caract
        let equip_caract = data.equip_caract;
        let passif_caract = data.passif_caract;
        let temp_caract = data.temp_caract;
        let total_caract = data.total_caract;
        let modifier_caract = data.modifier_caract;
        // console.log(data[14]);

        return(
            <div className=' float_child1'>
                        
            <table className="caract_table">  
                <caption className="caract_table_title">Caractéristique</caption>
                 <tbody>
                        <tr> 
                            <th> Caracteristique</th>
                            <th> Base</th>
                            <th> Equip</th>
                            <th> Passif</th>
                            <th> Temp</th>
                            <th> Total</th>
                            <th> Bonus</th>                           
                        </tr>

                        <tr> 
                            <td> force</td>
                            <td className='grid_contain_number' id = "base_force_grid"> {base_caract.force}</td>
                            <td className='grid_contain_number'> {equip_caract.force}</td>
                            <td className='grid_contain_number'> {passif_caract.force}</td>
                            <td className='grid_contain_number'> {temp_caract.force}</td>
                            <td className='grid_contain_number'> {total_caract.force}</td>
                            <td className='grid_contain_number'> {modifier_caract.force}</td>
                        </tr>

                        <tr> 
                            <td> dexterite</td>
                            <td className='grid_contain_number' id = "base_dexterite_grid"> {base_caract.dexterite}</td>
                            <td className='grid_contain_number'> {equip_caract.dexterite}</td>
                            <td className='grid_contain_number'> {passif_caract.dexterite}</td>
                            <td className='grid_contain_number'> {temp_caract.dexterite}</td>
                            <td className='grid_contain_number'> {total_caract.dexterite}</td>
                            <td className='grid_contain_number'> {modifier_caract.dexterite}</td>
                        </tr>

                        <tr> 
                            <td> intelligence</td>
                            <td className='grid_contain_number' id = "base_intelligence_grid"> {base_caract.intelligence}</td>
                            <td className='grid_contain_number'> {equip_caract.intelligence}</td>
                            <td className='grid_contain_number'> {passif_caract.intelligence}</td>
                            <td className='grid_contain_number'> {temp_caract.intelligence}</td>
                            <td className='grid_contain_number'> {total_caract.intelligence}</td>
                            <td className='grid_contain_number'> {modifier_caract.intelligence}</td>
                        </tr>

                        <tr> 
                            <td> constitution</td>
                            <td className='grid_contain_number' id = "base_constitution_grid"> {base_caract.constitution}</td>
                            <td className='grid_contain_number'> {equip_caract.constitution}</td>
                            <td className='grid_contain_number'> {passif_caract.constitution}</td>
                            <td className='grid_contain_number'> {temp_caract.constitution}</td>
                            <td className='grid_contain_number'> {total_caract.constitution}</td>
                            <td className='grid_contain_number'> {modifier_caract.constitution}</td>
                        </tr>

                        <tr> 
                            <td> puissance</td>
                            <td className='grid_contain_number' id = "base_puissance_grid"> {base_caract.puissance}</td>
                            <td className='grid_contain_number'> {equip_caract.puissance}</td>
                            <td className='grid_contain_number'> {passif_caract.puissance}</td>
                            <td className='grid_contain_number'> {temp_caract.puissance}</td>
                            <td className='grid_contain_number'> {total_caract.puissance}</td>
                            <td className='grid_contain_number'> {modifier_caract.puissance}</td>
                        </tr>

                        <tr> 
                            <td> charisme</td>
                            <td className='grid_contain_number' id = "base_charisme_grid"> {base_caract.charisme}</td>
                            <td className='grid_contain_number'> {equip_caract.charisme}</td>
                            <td className='grid_contain_number'> {passif_caract.charisme}</td>
                            <td className='grid_contain_number'> {temp_caract.charisme}</td>
                            <td className='grid_contain_number'> {total_caract.charisme}</td>
                            <td className='grid_contain_number'> {modifier_caract.charisme}</td>
                        </tr>
                    </tbody>

                </table>
            </div>              

       )
    }
}

export function Competence_grid ({data}) {

    if (data == null) {
        return (
        <div id = "div003"> </div>
        )
    } else{

        let competence1 = data.competence_final1;
        let competence2 = data.competence_final2;
        let competence3 = data.competence_final3;
        let competence4 = data.competence_final4;
        let competence5 = data.competence_final5;

        return(

            <table className="competence_table">  
               <caption className="competence_table_title">Competence</caption>
                <tbody>
                       <tr> 
                           <th> Nom</th>
                           <th> Element </th>
                           <th> Cout en mana</th>
                           <th> porté</th>
                           <th> Degat_min</th>
                           <th> Degat_max</th>
                           <th> Toucher</th>
                           <th> Description</th>
                           
                       </tr>

                       <tr> 
                           <td> {competence1.nom}</td>
                           <td> {competence1.element}</td>
                           <td> {competence1.manacost}</td>
                           <td> {competence1.porte}</td>
                           <td> {competence1.deg_min}</td>
                           <td> {competence1.deg_max}</td>
                           <td> {competence1.toucher}</td>
                           <td className="description_competence" > {competence1.description}</td>
                       </tr>

                       <tr> 
                           <td> {competence2.nom}</td>
                           <td> {competence2.element}</td>
                           <td> {competence2.manacost}</td>
                           <td> {competence2.porte}</td>
                           <td> {competence2.deg_min}</td>
                           <td> {competence2.deg_max}</td>
                           <td> {competence2.toucher}</td>
                           <td className="description_competence" > {competence2.description}</td>
                       </tr>

                       <tr> 
                           <td> {competence3.nom}</td>
                           <td> {competence3.element}</td>
                           <td> {competence3.manacost}</td>
                           <td> {competence3.porte}</td>
                           <td> {competence3.deg_min}</td>
                           <td> {competence3.deg_max}</td>
                           <td> {competence3.toucher}</td>
                           <td className="description_competence" > {competence3.description}</td>
                       </tr>

                       <tr> 
                           <td> {competence4.nom}</td>
                           <td> {competence4.element}</td>
                           <td> {competence4.manacost}</td>
                           <td> {competence4.porte}</td>
                           <td> {competence4.deg_min}</td>
                           <td> {competence4.deg_max}</td>
                           <td> {competence4.toucher}</td>
                           <td className="description_competence" > {competence4.description}</td>
                       </tr>

                       <tr> 
                           <td> {competence5.nom}</td>
                           <td> {competence5.element}</td>
                           <td> {competence5.manacost}</td>
                           <td> {competence5.porte}</td>
                           <td> {competence5.deg_min}</td>
                           <td> {competence5.deg_max}</td>
                           <td> {competence5.toucher}</td>
                           <td className="description_competence" > {competence5.description}</td>
                       </tr>

                   </tbody>
               </table>
       )


    }
}

export function Equipment_grid ({data}) {

    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
         return (
         <div id = "div005"> </div>
         )
     }else{
        
        let armure_torse = data.armure_torse;
        let armure_jambe = data.armure_jambe;
        let casque = data.casque;
        let brassard = data.brassard;
        let anneau1 = data.anneau1;
        let anneau2 = data.anneau2;
        let  amulette = data.amulette;
        let botte = data.botte;

        let text_bonus_equipment = data.text_bonus_equipment

        return (
            <table className="equipement_table">  
            <caption className="equipement_table_title">Equipement</caption>
            <tbody>
                    <tr> 
                        <th> Type</th>
                        <th> Nom</th>
                        <th> Tier</th>
                        <th> Bonus</th>
                        <th> Autres effets</th>
                    </tr>

                    <tr> 
                        <td> armure torse </td>
                        <td> {armure_torse.nom}  </td>
                        <td> {armure_torse.tier}</td>
                        <td> {text_bonus_equipment.armure_torse_bonus}</td>
                        <td> {armure_torse.effet}</td>
                    </tr>

                    <tr> 
                        <td> armure jambe </td>
                        <td> {armure_jambe.nom}  </td>
                        <td> {armure_jambe.tier}</td>
                        <td> {text_bonus_equipment.armure_jambe_bonus}</td>
                        <td> {armure_jambe.effet}</td>
                    </tr>

                    <tr> 
                        <td> casque</td>
                        <td> {casque.nom} </td>
                        <td> {casque.tier}</td>
                        <td> {text_bonus_equipment.casque_bonus}</td>
                        <td> {casque.effet}</td>
                    </tr>

                    <tr> 
                        <td>  brassard  </td>
                        <td> {brassard.nom}</td>
                        <td> {brassard.tier}</td>
                        <td> {text_bonus_equipment.brassard_bonus}</td>
                        <td> {brassard.effet}</td>
                    </tr>

                    <tr>             
                        <td>  anneau1  </td>
                        <td> {anneau1.nom}</td>
                        <td> {anneau1.tier}</td>
                        <td> {text_bonus_equipment.anneau1_bonus}</td>
                        <td> {anneau1.effet}</td>
                    </tr>

                    <tr> 
                        <td>  anneau2 </td>
                        <td> {anneau2.nom}  </td>
                        <td> {anneau2.tier}</td>
                        <td> {text_bonus_equipment.anneau2_bonus}</td>
                        <td> {anneau2.effet}</td>
                    </tr>

                    <tr> 
                        <td>  amulette </td>
                        <td> {amulette.nom}  </td>
                        <td> {amulette.tier}</td>
                        <td> {text_bonus_equipment.amulette_bonus}</td>
                        <td> {amulette.effet}</td>
                    </tr>

                    <tr> 
                        <td>  botte </td>
                        <td> {botte.nom}  </td>
                        <td> {botte.tier}</td>
                        <td> {text_bonus_equipment.botte_bonus}</td>
                        <td> {botte.effet}</td>
                    </tr>

                </tbody>
            </table>
        )

     }
}

export function Passif_grid ({data}) {

    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
         return (
         <div id = "div005"> </div>
         )
     }else{
        
        let passif1 = data.passif1;
        let passif2 = data.passif2;
        let passif3 = data.passif3;
        let passif4 = data.passif4;


        let passif1_text = data.passif_bonus_text.passif1_bonus;
        let passif2_text = data.passif_bonus_text.passif2_bonus;
        let passif3_text = data.passif_bonus_text.passif3_bonus;
        let passif4_text = data.passif_bonus_text.passif4_bonus;

        return (
            <table className="passif_table">  
            <caption className="passif_table_title">Passifs</caption>
            <tbody>
                    <tr> 
                        <th> Nom</th>
                        <th> Bonus</th>
                        <th> Description</th>
                    </tr>

                    <tr> 
                        <td> {passif1.nom}  </td>
                        <td> {data.passif_bonus_text.passif1_bonus}  </td>
                        <td> {passif1.autres_effets}</td>
                    </tr>

                    
                    <tr> 
                        <td> {passif2.nom}  </td>
                        <td> {data.passif_bonus_text.passif2_bonus}  </td>
                        <td> {passif2.autres_effets}</td>
                    </tr>

                    
                    <tr> 
                        <td> {passif3.nom}  </td>
                        <td> {data.passif_bonus_text.passif3_bonus}  </td>
                        <td> {passif3.autres_effets}</td>
                    </tr>              

                    <tr> 
                        <td> {passif4.nom}  </td>
                        <td> {data.passif_bonus_text.passif4_bonus}  </td>
                        <td> {passif4.autres_effets}</td>
                    </tr>     

                </tbody>
            </table>
        )

     }
}

export function Competence_Pratique_grid ({data}) {

    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
         return (
         <div id = "div005"> </div>
         )
     }else{
        
        const competence_pratique = data.competence_pratique

        return (
            <table className="competence_pratique_table">  
            <caption className="competence_pratique_title">Competence pratique</caption>
            <tbody>
                    <tr> 
                        <th> Competence</th>
                        <th> Bonus</th>
                    </tr>

                    <tr> 
                        <td> Crochetage </td>
                        <td> {competence_pratique.competence_crochetage}  </td>
                    </tr> 

                    <tr> 
                        <td> Dissimulation </td>
                        <td> {competence_pratique.competence_dissimulation}  </td>
                    </tr> 

                    <tr> 
                        <td> Vol a la tire </td>
                        <td> {competence_pratique.competence_vol}  </td>
                    </tr> 

                    <tr> 
                        <td> Pistage </td>
                        <td> {competence_pratique.competence_pistage}  </td>
                    </tr> 
                    
                    <tr> 
                        <td> Alchimie </td>
                        <td> {competence_pratique.competence_alchimie}  </td>
                    </tr> 

                    <tr> 
                        <td> Fabrication </td>
                        <td> {competence_pratique.competence_fabrication}  </td>
                    </tr> 

                    <tr> 
                        <td> Connaissance de la mature </td>
                        <td> {competence_pratique.connaissance_nature}  </td>
                    </tr> 

                    <tr> 
                        <td> Connaissance de la magie </td>
                        <td> {competence_pratique.connaissance_magie}  </td>
                    </tr> 

                    <tr> 
                        <td> Connaissance demonologie</td>
                        <td> {competence_pratique.connaissance_demologie}  </td>
                    </tr> 

                </tbody>
            </table>
        )

     }
}

export function Image_Perso ({data}) {
    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
         return (
         <div id = "div005"> </div>
         )
    }else{
        let image = {};

        let nom = data.character_general_values.nom;
       // console.log("On test le nom pour l'image" , nom)

        if (nom == "Kokoro") {
            image = kokoro_portrait;
        } else if (nom == "Nemeia") {
            image = nemeia_portrait;
        } else if (nom == "Jean-Claude") {
            image = jean_claude_protrait;
        } else if (nom == "Azaram") {
             image = azaram_portrait;
        }

        return ( 
            <div className='border_portrait_1'> 
                <div className='border_portrait_2'>
                    <img src = {image} className='image_perso'/>
                </div>
            </div>
            )
     }
}

export function Point_a_attribuer ({base_data, setInputValue, calculate_character_values, setcharactValue}) {  // une fonction qui prend en parametre les parametres de base d'un personnage 
    // console.log("on lance Point a attribuer")
    if(base_data == null) {return(null)} else {

       // console.log(base_data);

        const niveau = base_data.niveau;
        const total_point = 60+12+ point_to_attribute(niveau);
        // console.log("point deja attribue ", base_data.force +"+"+ base_data.dexterite +"+"+ base_data.intelligence +"+"+ base_data.puissance +"+"+ base_data.constitution +"+"+ base_data.charisme)
        const total_point_attribué = base_data.force + base_data.dexterite + base_data.intelligence + base_data.puissance + base_data.constitution + base_data.charisme;
        const point_a_attribuer = total_point - total_point_attribué;
        
      //  console.log("il y a ",total_point," qui devraient etre attribue")
      //  console.log("il y a ",total_point_attribué," deja attribué")
      //  console.log("il y a ",point_a_attribuer," a attribuer")

        if (point_a_attribuer == 0 ) { return(null)}
        
        else if (point_a_attribuer > 0 ){
            return (
                    <div className='point_attribuer_positif'>
                         <div className='point_attribuer_positif_1_0'> Point a attribuer </div>
                         <div className='point_attribuer_positif_1_1'>
                            <Button variant="contained"  color="success" className='point_attribuer_positif_1_2'> {point_a_attribuer}  </Button> <br/>
                        </div>
                         <br/>
                         <div className='Button_container'>
                            <Button variant="contained" color="success" className='add_carac_button' onClick={() => {
                                Add_caracteristic ("force", base_data, setInputValue, calculate_character_values, setcharactValue)} 
                                }> + force </Button> <br/>

                            <Button variant="contained"  color="success" className='add_carac_button' onClick={() => {
                                Add_caracteristic ("intelligence", base_data, setInputValue, calculate_character_values, setcharactValue)} 
                                }> + intel </Button> <br/>

                            <Button variant="contained" color="success" className='add_carac_button' onClick={() => {
                                Add_caracteristic ("dexterite", base_data, setInputValue, calculate_character_values, setcharactValue)} 
                                }> + dexte </Button> <br/>

                            <Button variant="contained" color="success" className='add_carac_button' onClick={() => {
                                Add_caracteristic ("constitution", base_data, setInputValue, calculate_character_values, setcharactValue)} 
                                }> + const </Button> <br/>

                            <Button variant="contained" color="success" className='add_carac_button' onClick={() => {
                                Add_caracteristic ("puissance", base_data, setInputValue, calculate_character_values, setcharactValue)} 
                                }> + puiss </Button> <br/>

                            <Button variant="contained" color="success" className='add_carac_button' onClick={() => {
                                Add_caracteristic ("charisme", base_data, setInputValue, calculate_character_values, setcharactValue)} 
                                }> + chari </Button > <br/>

                         </div>
                    </div>
            )
        } else if (point_a_attribuer < 0 ){
            return (
                    <div className='point_attribuer_negatif'>
                         {point_a_attribuer}
                    </div>
            )
        }
    }
}