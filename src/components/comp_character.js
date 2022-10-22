import '../Style/component.css';
import azaram_portrait from "../Assets/azaram_portrait.png";
import jean_claude_protrait from "../Assets/jean_claude_portrait.png"
import kokoro_portrait from "../Assets/kokoro_portrait.png"
import nemeia_portrait from "../Assets/nemeia_portrait.png"
import pv_icone from "../Assets/pv_icone.png"
import mana_icone from "../Assets/mana_icone.png"
import ca_cac_icone from "../Assets/CA_cac_icone.png"
import ca_distance_icone from  "../Assets/CA_distance_icone.png"
import physical_res_icone from "../Assets/phy_res_icone.png"
import magic_res_icone from "../Assets/magic_res_icone.png"
import init_icone from "../Assets/Init_icone.png"
import perception_icone from "../Assets/perception_icone.png"



export function Weapon_grid ({data}) {

    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
        return (
        <div id = "div002"> </div>
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
                           <td> {arme1_object.deg_min}</td>
                           <td> {arme1_object.deg_max}</td>
                           <td> {arme1_object.toucher}</td>
                           <td> {arme1_object.critique}</td>
                       </tr>

                       <tr> 
                           <td> {arme2_object.nom}</td>
                           <td> {arme2_object.type}</td>
                           <td> {arme2_object.range}</td>
                           <td> {arme2_object.deg_min}</td>
                           <td> {arme2_object.deg_max}</td>
                           <td> {arme2_object.toucher}</td>
                           <td> {arme2_object.critique}</td>
                       </tr>

                       <tr> 
                           <td> {arme3_object.nom}</td>
                           <td> {arme3_object.type}</td>
                           <td> {arme3_object.range}</td>
                           <td> {arme3_object.deg_min}</td>
                           <td> {arme3_object.deg_max}</td>
                           <td> {arme3_object.toucher}</td>
                           <td> {arme3_object.critique}</td>
                       </tr>

                   </tbody>
               </table>
       )
    }
}

export function General_values ({data}) {

    if (data == null) {
        {console.log("pas encore de donnée a exploiter")}
        return (
        <div id = "div003"> </div>
        )
    } else{

        let base_caract = data.base_caract
        let equip_caract = data.equip_caract;
        let passif_caract = data.passif_caract;
        let total_caract = data.total_caract;
        let modifier_caract = data.modifier_caract;
        let general_values = data.character_general_values;
        console.log(data[14]);

        return(

            <div className='display_perso'> 

                <div className='titre_perso'>
                    <div className='character_name'> {general_values.nom} </div>
                    <br/>
                    <div className='character_description'> Description a venir </div>
                </div>
                <br/>

                <div className='general_value_perso'>
                    
                        <div className='general_value_perso_1 float_child1'>
                            <div className='xp_perso'>
                                <span> XP </span>
                                <span> {general_values.current_xp} </span>
                                <span> / </span>
                                <span> {general_values.xp_next} </span>
                            </div>

                            <div className='pv_perso'>
                                <img src = {pv_icone} className='pv_icone'/>
                                <span className='pv_perso_text'>
                                    <span> {general_values.max_hp} </span>
                                    <span> / </span>
                                    <span> {general_values.max_hp} </span>
                                </span>
                            </div>

                            <div className='mana_perso'>
                                <img src = {mana_icone} className='mana_icone'/>
                                <span className='mana_perso_text'>
                                    <span> {general_values.max_mana} </span>
                                    <span> / </span>
                                    <span> {general_values.max_mana} </span>
                                </span>
                            </div>
                        </div> <br/>

                    <div className='general_value_perso_2 float_child1'>
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

                    <div className='general_value_perso_4 float_child1'>
                        
                    <table className="caract_table">  
                <caption className="caract_table_title">Caractéristique</caption>
                 <tbody>
                        <tr> 
                            <th> Caracteristique</th>
                            <th> Base</th>
                            <th> Equipement</th>
                            <th> Passif</th>
                            <th> Total</th>
                            <th> Bonus</th>                           
                        </tr>

                        <tr> 
                            <td> force</td>
                            <td> {base_caract.force}</td>
                            <td> {equip_caract.force}</td>
                            <td> {passif_caract.force}</td>
                            <td> {total_caract.force}</td>
                            <td> {modifier_caract.force}</td>
                        </tr>

                        <tr> 
                            <td> dexterite</td>
                            <td> {base_caract.dexterite}</td>
                            <td> {equip_caract.dexterite}</td>
                            <td> {passif_caract.dexterite}</td>
                            <td> {total_caract.dexterite}</td>
                            <td> {modifier_caract.dexterite}</td>
                        </tr>

                        <tr> 
                            <td> intelligence</td>
                            <td> {base_caract.intelligence}</td>
                            <td> {equip_caract.intelligence}</td>
                            <td> {passif_caract.intelligence}</td>
                            <td> {total_caract.intelligence}</td>
                            <td> {modifier_caract.intelligence}</td>
                        </tr>

                        <tr> 
                            <td> constitution</td>
                            <td> {base_caract.constitution}</td>
                            <td> {equip_caract.constitution}</td>
                            <td> {passif_caract.constitution}</td>
                            <td> {total_caract.constitution}</td>
                            <td> {modifier_caract.constitution}</td>
                        </tr>

                        <tr> 
                            <td> puissance</td>
                            <td> {base_caract.puissance}</td>
                            <td> {equip_caract.puissance}</td>
                            <td> {passif_caract.puissance}</td>
                            <td> {total_caract.puissance}</td>
                            <td> {modifier_caract.puissance}</td>
                        </tr>

                        <tr> 
                            <td> charisme</td>
                            <td> {base_caract.charisme}</td>
                            <td> {equip_caract.charisme}</td>
                            <td> {passif_caract.charisme}</td>
                            <td> {total_caract.charisme}</td>
                            <td> {modifier_caract.charisme}</td>
                        </tr>
                    </tbody>

                </table>

                    </div>   



                </div>               
                <br/>
            </div>
       )
    }
}

export function Competence_grid ({data}) {

    if (data == null) {
        // {console.log("pas encore de donnée a exploiter")}
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

export function Caracteristic_grid ({data}) {


    if (data == null) {
       // {console.log("pas encore de donnée a exploiter")}
        return (
        <div id = "div001"> Pas encore de perso selectionné2</div>
        )
    }else{

        let base_caract = data.base_caract
        let equip_caract = data.equip_caract;
        let passif_caract = data.passif_caract;
        let total_caract = data.total_caract;
        let modifier_caract = data.modifier_caract;

        return(

             <table className="caract_table">  
                <caption className="caract_table_title">Caractéristique</caption>
                 <tbody>
                        <tr> 
                            <th> Caracteristique</th>
                            <th> Base</th>
                            <th> Equipement</th>
                            <th> Passif</th>
                            <th> Total</th>
                            <th> Bonus</th>
                            
                        </tr>

                        <tr> 
                            <td> force</td>
                            <td> {base_caract.force}</td>
                            <td> {equip_caract.force}</td>
                            <td> {passif_caract.force}</td>
                            <td> {total_caract.force}</td>
                            <td> {modifier_caract.force}</td>
                        </tr>

                        <tr> 
                            <td> dexterite</td>
                            <td> {base_caract.dexterite}</td>
                            <td> {equip_caract.dexterite}</td>
                            <td> {passif_caract.dexterite}</td>
                            <td> {total_caract.dexterite}</td>
                            <td> {modifier_caract.dexterite}</td>
                        </tr>

                        <tr> 
                            <td> intelligence</td>
                            <td> {base_caract.intelligence}</td>
                            <td> {equip_caract.intelligence}</td>
                            <td> {passif_caract.intelligence}</td>
                            <td> {total_caract.intelligence}</td>
                            <td> {modifier_caract.intelligence}</td>
                        </tr>

                        <tr> 
                            <td> constitution</td>
                            <td> {base_caract.constitution}</td>
                            <td> {equip_caract.constitution}</td>
                            <td> {passif_caract.constitution}</td>
                            <td> {total_caract.constitution}</td>
                            <td> {modifier_caract.constitution}</td>
                        </tr>

                        <tr> 
                            <td> puissance</td>
                            <td> {base_caract.puissance}</td>
                            <td> {equip_caract.puissance}</td>
                            <td> {passif_caract.puissance}</td>
                            <td> {total_caract.puissance}</td>
                            <td> {modifier_caract.puissance}</td>
                        </tr>

                        <tr> 
                            <td> charisme</td>
                            <td> {base_caract.charisme}</td>
                            <td> {equip_caract.charisme}</td>
                            <td> {passif_caract.charisme}</td>
                            <td> {total_caract.charisme}</td>
                            <td> {modifier_caract.charisme}</td>
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
         <div id = "div001"> Pas encore de perso selectionné2</div>
         )
     }else{
        
        let armure_torse = data.armure_torse;
        let armure_jambe = data.armure_jambe;
        let casque = data.casque;
        let brassard = data.brassard;
        let anneau1 = data.anneau1;
        let anneau2 = data.anneau2;
        let  amulette = data.amulette;

        return (
            <table className="equipement_table">  
            <caption className="equipement_table_title">Caractéristique</caption>
            <tbody>
                    <tr> 
                        <th> Nom</th>
                        <th> Type</th>
                        <th> Tier</th>
                        <th> Bonus</th>
                        <th> Autres effets</th>
                    </tr>

                    <tr> 
                        <td> {armure_torse.nom}</td>
                        <td>  armure_torse </td>
                        <td> {armure_torse.tier}</td>
                        <td> {armure_torse.nom}</td>
                        <td> {armure_torse.nom}</td>
                    </tr>
                </tbody>
            </table>
        )

     }
}