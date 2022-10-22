import { armelist } from '../data/armes.js';
import { equipementlist } from '../data/equipements.js';
import { passiflist } from '../data/passifs.js';
import { competencelist } from '../data/competence.js';
import { get_charact} from './function_db.js'

export function find_weapon(weaponid) {   // une fonction qui retourne un objet de la liste d'objet dans "../data/armes.js"

    let arme_object = {nom: "Poing",type: "cac",type2: "une main",min_deg: 1,max_deg: 4,deg_carac1: "force",deg_car2: "dexterite",touch_carac1: "dexterite",touch_carac2: "force",min_modifier: 0.6,max_modifier: 0.8,touch_modifier: 0.7,min_critique: 20,Tier: 1,};

    for (let i =0; i< armelist.length; i++) {

        if (armelist[i].ID == weaponid ){
            arme_object = armelist[i];
        }
    }

    return (arme_object);
}
export function find_passif(passifid) { // une fonction qui retourne un objet de la liste de competence passive dans ../data/passif.js

    let passif_object = {};

    for (let i =0; i< passiflist.length; i++) {

        if (passiflist[i].ID == passifid ){
            passif_object = passiflist[i];
        }
    }

    return (passif_object);
}

export function find_equipment(equipid) { // une fonction qui retourne un objet de la liste de competence passive dans ../data/passif.js
    let equipment_object = {};

    for (let i =0; i< equipementlist.length; i++) {

        if (equipementlist[i].ID == equipid ){
            equipment_object = equipementlist[i];
        }
    }

    return (equipment_object);
}

export function find_competence(compid) { // une fonction qui retourne un objet de la liste de competence passive dans ../data/passif.js
    let competence_object = {};

    for (let i =0; i< competencelist.length; i++) {

        if (competencelist[i].ID == compid ){
            competence_object = competencelist[i];
        }
    }

    return (competence_object);
}

export function calculate_character_values (data) {  // une fonction qui prend en input les données de base d'un personnage et renvoie l'ensemble des valeurs qui vont nous interesser 

    if(data == null) { return(null)} else {

        console.log("on lance calculate_character_values avec la donnée suivante");
        console.log(data);


//       ---- CARACTERISTIQUE DU PERSO  -----
    let base_caract = {force:data.force, dexterite:data.dexterite, intelligence:data.intelligence, constitution:data.constitution, puissance:data.puissance, charisme:data.charisme};
    let equip_caract = {force:0, dexterite:0, intelligence:0, constitution:0, puissance:0, charisme:0};
    let passif_caract = {force:0, dexterite:0, intelligence:0, constitution:0, puissance:0, charisme:0};
    let temp_caract = {force: data.temp_force, dexterite:data.temp_dexterite, intelligence:data.temp_intelligence, constitution:data.temp_constitution, puissance:data.temp_puissance, charisme:data.temp_charisme};
    let total_caract = {force:0, dexterite:0, intelligence:0, constitution:0, puissance:0, charisme:0};
    let modifier_caract = {force:0, dexterite:0, intelligence:0, constitution:0, puissance:0, charisme:0};

//on va ensuite remplir la table des caracteristiques apporte par les equipements, pour cela il faut d'abord recuperer lesdits equipements

    const armure_torse = find_equipment(data.armure_torse);
    const armure_jambe =  find_equipment(data.armure_jambe);
    const casque =  find_equipment(data.casque);
   // console.log("on cherche le brassard " , data.brassard)
    const brassard =  find_equipment(data.brassard);
   // console.log("on trouve le brassard");
   // console.log(brassard);
    const anneau1 =  find_equipment(data.anneau1);
    const anneau2 =  find_equipment(data.anneau2);
    const amulette =  find_equipment(data.amulette);
    const botte = find_equipment(data.botte);

    equip_caract.force = armure_torse.force + armure_jambe.force + casque.force + brassard.force + anneau1.force + anneau2.force + amulette.force + botte.force;
    // console.log("le bonus de force des equipements est " + " + " + armure_torse.force+ " + " + armure_jambe.force + " + " +casque.force + " + " + brassard.force + " + " + anneau1.force + " + " + anneau2.force + " + " + amulette.force)
    equip_caract.dexterite = armure_torse.dexterite + armure_jambe.dexterite + casque.dexterite + brassard.dexterite + anneau1.dexterite + anneau2.dexterite + amulette.dexterite + botte.dexterite;
    // console.log("le bonus de dexterite des equipements est " + " + " + armure_torse.dexterite+ " + " + armure_jambe.dexterite + " + " +casque.dexterite + " + " + brassard.dexterite + " + " + anneau1.dexterite + " + " + anneau2.dexterite + " + " + amulette.dexterite)
    equip_caract.intelligence = armure_torse.intelligence + armure_jambe.intelligence + casque.intelligence + brassard.intelligence + anneau1.intelligence + anneau2.intelligence + amulette.intelligence + botte.intelligence;
    equip_caract.constitution = armure_torse.constitution + armure_jambe.constitution + casque.constitution + brassard.constitution + anneau1.constitution + anneau2.constitution + amulette.constitution + botte.constitution;
    equip_caract.puissance = armure_torse.puissance + armure_jambe.puissance + casque.puissance + brassard.puissance + anneau1.puissance + anneau2.puissance + amulette.puissance + botte.puissance;
    equip_caract.charisme = armure_torse.charisme + armure_jambe.charisme + casque.charisme + brassard.charisme + anneau1.charisme + anneau2.charisme + amulette.charisme + botte.charisme;

    //    -------------BONUS ELEMENTAIRE DES EQUIPMENTS------------------
    // on en profite pour calculer les bonus de degats elementaires procures par les equipements
    const bonus_sort = armure_torse.degats_sort + armure_jambe.degats_sort + casque.degats_sort + brassard.degats_sort + anneau1.degats_sort + anneau2.degats_sort + amulette.degats_sort + botte.degats_sort;
    const bonus_feu = armure_torse.degat_feu + armure_jambe.degat_feu + casque.degat_feu + brassard.degat_feu + anneau1.degat_feu + anneau2.degat_feu + amulette.degat_feu + botte.degat_feu;
    const bonus_glace = armure_torse.degat_glace + armure_jambe.degat_glace + casque.degat_glace + brassard.degat_glace + anneau1.degat_glace + anneau2.degat_glace + amulette.degat_glace + botte.degat_glace;
    const bonus_psy = armure_torse.degat_psy + armure_jambe.degat_psy + casque.degat_psy + brassard.degat_psy + anneau1.degat_psy + anneau2.degat_psy + amulette.degat_psy + botte.degat_psy;
    const bonus_arcane = armure_torse.degat_arcane + armure_jambe.degat_arcane + casque.degat_arcane + brassard.degat_arcane + anneau1.degat_arcane + anneau2.degat_arcane + amulette.degat_arcane + botte.degat_arcane;
    const bonus_nature = armure_torse.degat_nature + armure_jambe.degat_nature + casque.degat_nature + brassard.degat_nature + anneau1.degat_nature + anneau2.degat_nature + amulette.degat_nature + botte.degat_nature;
    const bonus_chi = armure_torse.degat_chi + armure_jambe.degat_chi + casque.degat_chi + brassard.degat_chi + anneau1.degat_chi + anneau2.degat_chi + amulette.degat_chi + botte.degat_chi;
    
    const bonus_elementaire = {sort:bonus_sort, feu:bonus_feu, glace:bonus_glace, psy:bonus_psy, arcane:bonus_arcane, nature:bonus_nature,chi: bonus_chi}

    //        -------------TEXTE DES BONUS EQUIPMENTS-------------
    const armure_torse_bonus = find_equipment_bonus(armure_torse);
    const armure_jambe_bonus = find_equipment_bonus(armure_jambe);
    const casque_bonus = find_equipment_bonus(casque);
    const brassard_bonus = find_equipment_bonus(brassard);
    const anneau1_bonus = find_equipment_bonus(anneau1);
    const anneau2_bonus = find_equipment_bonus(anneau2);
    const amulette_bonus = find_equipment_bonus(amulette);
    const botte_bonus = find_equipment_bonus(botte);

    const text_bonus_equipment = {armure_torse_bonus:armure_torse_bonus, armure_jambe_bonus:armure_jambe_bonus, casque_bonus:casque_bonus, brassard_bonus:brassard_bonus, anneau1_bonus:anneau1_bonus, anneau2_bonus:anneau2_bonus, amulette_bonus: amulette_bonus, botte_bonus:botte_bonus}

    // On remplit ensuite la table des caracteristique des passif, pareil il faut d'abord recuperer les passifs
    const class_passif = find_passif(data.passif1)
    const passif1 = training_level_multiplier(data.niveau,class_passif);
   // console.log(passif1);
    const passif2 = find_passif(data.passif2)
    const passif3 = find_passif(data.passif3)
    const passif4 = find_passif(data.passif4)

    passif_caract.force = passif1.force +passif2.force + passif3.force +passif4.force;
    passif_caract.dexterite = passif1.dexterite +passif2.dexterite + passif3.dexterite +passif4.dexterite;
    passif_caract.intelligence = passif1.intelligence +passif2.intelligence + passif3.intelligence +passif4.intelligence;
    passif_caract.constitution = passif1.constitution +passif2.constitution + passif3.constitution +passif4.constitution;
   // console.log(passif1.puissance +" + " +passif2.puissance +" + " + passif3.puissance +" + " +passif4.puissance)
    passif_caract.puissance = passif1.puissance +passif2.puissance + passif3.puissance +passif4.puissance;
    passif_caract.charisme = passif1.charisme +passif2.charisme + passif3.charisme +passif4.charisme;

    // ------ TEXT BONUS PASSIF-------------------
    const passif1_bonus = find_passive_bonus (passif1);
    const passif2_bonus = find_passive_bonus (passif2);
    const passif3_bonus = find_passive_bonus (passif3);
    const passif4_bonus = find_passive_bonus (passif4);
    const passif_bonus_text = {passif1_bonus,passif2_bonus,passif3_bonus,passif4_bonus}
    //console.log (passif1.nom);
    // console.log(passif1_bonus);

// On calcule ensuite le total et le modificateur

    total_caract.force =  data.force + equip_caract.force + passif_caract.force +temp_caract.force;
    modifier_caract.force = Math.floor((total_caract.force-10)/2);

   // console.log(base_caract.dexterite + " + " + equip_caract.dexterite +" + " + passif_caract.dexterite)
    total_caract.dexterite =  data.dexterite + equip_caract.dexterite + passif_caract.dexterite +temp_caract.dexterite;
    modifier_caract.dexterite = Math.floor((total_caract.dexterite-10)/2);
   // console.log(total_caract.dexterite);

    total_caract.intelligence =  data.intelligence + equip_caract.intelligence + passif_caract.intelligence +temp_caract.intelligence;
    modifier_caract.intelligence = Math.floor((total_caract.intelligence-10)/2);

    total_caract.constitution =  data.constitution + equip_caract.constitution + passif_caract.constitution +temp_caract.constitution;
    modifier_caract.constitution = Math.floor((total_caract.constitution-10)/2);
    // console.log("le bonus de constitution est de ", modifier_caract.constitution);
    // console.log("base_caract.constitution ", base_caract.constitution )
    // console.log("equip_caract.constitution ",equip_caract.constitution )
    // console.log("passif_caract.constitution ",passif_caract.constitution )

    total_caract.puissance =  data.puissance + equip_caract.puissance + passif_caract.puissance +temp_caract.puissance;
    modifier_caract.puissance = Math.floor((total_caract.puissance-10)/2);

    total_caract.charisme =  data.charisme + equip_caract.charisme + passif_caract.charisme +temp_caract.charisme;
    modifier_caract.charisme = Math.floor((total_caract.charisme-10)/2);

// Une fois les caracteristiques et les modificateurs calculés, on peut calculer les scores des armes et competences
//             ------- ARMES --------
   
    let arme1_final = {nom:"", type:"",range:"", carac_deg1:0, carac_deg2:0, carac_touch1:0, carac_touch2:0, deg_min:0, deg_max:0, toucher:0, critique:0};
    let arme2_final = {nom:"", type:"",range:"", carac_deg1:0, carac_deg2:0, carac_touch1:0, carac_touch2:0, deg_min:0, deg_max:0, toucher:0, critique:0};
    let arme3_final = {nom:"", type:"",range:"", carac_deg1:0, carac_deg2:0, carac_touch1:0, carac_touch2:0, deg_min:0, deg_max:0, toucher:0, critique:0};

    let arme1_base = find_weapon(data.arme1);
    let arme2_base = find_weapon(data.arme2);
    let arme3_base = find_weapon(data.arme3);

    arme1_final.nom = arme1_base.nom;
    arme2_final.nom = arme2_base.nom;
    arme3_final.nom = arme3_base.nom;

    arme1_final.type = arme1_base.type;
    arme2_final.type = arme2_base.type;
    arme3_final.type = arme3_base.type;

    arme1_final.range = arme1_base.type2;
    arme2_final.range = arme2_base.type2;
    arme3_final.range = arme3_base.type2;

    arme1_final.critique = arme1_base.min_critique;
    arme2_final.critique = arme2_base.min_critique;
    arme3_final.critique = arme3_base.min_critique;

    // on va chercher les valeurs de modificateurs associe aux caracteristiques utilise pour les degats et le score de toucher de l'arme
        arme1_final.carac_deg1 = find_caracteristic_modifier(modifier_caract,arme1_base.deg_carac1);
        arme1_final.carac_deg2 = find_caracteristic_modifier(modifier_caract,arme1_base.deg_car2);
        arme1_final.carac_touch1 = find_caracteristic_modifier(modifier_caract,arme1_base.touch_carac1);
        arme1_final.carac_touch2 = find_caracteristic_modifier(modifier_caract,arme1_base.touch_carac2);

        arme2_final.carac_deg1 = find_caracteristic_modifier(modifier_caract,arme2_base.deg_carac1);
        arme2_final.carac_deg2 = find_caracteristic_modifier(modifier_caract,arme2_base.deg_car2);
        arme2_final.carac_touch1 = find_caracteristic_modifier(modifier_caract,arme2_base.touch_carac1);
        arme2_final.carac_touch2 = find_caracteristic_modifier(modifier_caract,arme2_base.touch_carac2);

        arme3_final.carac_deg1 = find_caracteristic_modifier(modifier_caract,arme3_base.deg_carac1);
        arme3_final.carac_deg2 = find_caracteristic_modifier(modifier_caract,arme3_base.deg_car2);
        arme3_final.carac_touch1 = find_caracteristic_modifier(modifier_caract,arme3_base.touch_carac1);
        arme3_final.carac_touch2 = find_caracteristic_modifier(modifier_caract,arme3_base.touch_carac2);

    // on calcule les degats min et max ainsi que le score de toucher des armes
        arme1_final.deg_min = Math.round(arme1_base.min_deg + (arme1_final.carac_deg1 +  arme1_final.carac_deg2)*arme1_base.min_modifier/2);
        arme1_final.deg_max = Math.round(arme1_base.max_deg + (arme1_final.carac_deg1 +  arme1_final.carac_deg2)*arme1_base.max_modifier/2);
        arme1_final.toucher = Math.round((arme1_final.carac_touch1 +  arme1_final.carac_touch2)/2*arme1_base.touch_modifier);

        arme2_final.deg_min = Math.round(arme2_base.min_deg + (arme2_final.carac_deg1 +  arme2_final.carac_deg2)*arme2_base.min_modifier/2);
        arme2_final.deg_max = Math.round(arme2_base.max_deg + (arme2_final.carac_deg1 +  arme2_final.carac_deg2)*arme2_base.max_modifier/2);
        arme2_final.toucher = Math.round((arme2_final.carac_touch1 +  arme2_final.carac_touch2)/2*arme2_base.touch_modifier);

        arme3_final.deg_min = Math.round(arme3_base.min_deg + (arme3_final.carac_deg1 +  arme3_final.carac_deg2)*arme3_base.min_modifier/2);
        arme3_final.deg_max = Math.round(arme3_base.max_deg + (arme3_final.carac_deg1 +  arme3_final.carac_deg2)*arme3_base.max_modifier/2);
        arme3_final.toucher = Math.round((arme3_final.carac_touch1 +  arme3_final.carac_touch2)/2*arme3_base.touch_modifier);

// On a finit de calculer les valeurs pour les armes et on passe aux competences
//             ------- COMPETENCES --------

let competence_base1 = find_competence(data.competence1);
let competence_base2 = find_competence(data.competence2);
let competence_base3 = find_competence(data.competence3);
let competence_base4 = find_competence(data.competence4);
let competence_base5 = find_competence(data.competence5);

let competence_final1 = calculate_comp_value(modifier_caract,competence_base1,bonus_elementaire);
let competence_final2 = calculate_comp_value(modifier_caract,competence_base2,bonus_elementaire);
let competence_final3 = calculate_comp_value(modifier_caract,competence_base3,bonus_elementaire);
let competence_final4 = calculate_comp_value(modifier_caract,competence_base4,bonus_elementaire);
let competence_final5 = calculate_comp_value(modifier_caract,competence_base5,bonus_elementaire);


// Enfin on calcule les valeurs generales du perso
//             ------- VALEURS GENERALES --------
let character_general_values = {nom:"", niveau:0, current_xp:0, xp_next:0, current_pv: data.current_pv, current_mana: data.current_mana, max_hp:0, max_mana:0, gain_pv:0, gain_mana:0, initiative:0, perception:0, class_armure_cac:0,class_armure_distance:0, physical_res:0, magical_res:0 }

character_general_values.nom = data.nom
character_general_values.niveau = data.niveau
character_general_values.current_xp = data.xp;
character_general_values.xp_next = Math.floor(((Math.pow(data.niveau, 2.4))*250+400*data.niveau+400)/100)*100;
character_general_values.max_hp = 8 +Math.floor(data.niveau)*2 + Math.floor(Math.pow(modifier_caract.constitution, 1.2))*3;
character_general_values.max_mana = 8 + Math.floor(Math.pow(data.niveau, 1.2))*2 + Math.floor(Math.pow(modifier_caract.puissance, 1.2))*5+modifier_caract.constitution*3 + modifier_caract.intelligence*3;
character_general_values.gain_pv = 4 + data.niveau + modifier_caract.constitution;
character_general_values.gain_mana = 4 + data.niveau + modifier_caract.constitution + modifier_caract.puissance*2 + modifier_caract.intelligence;
character_general_values.initiative = Math.floor((data.niveau + modifier_caract.intelligence + modifier_caract.dexterite)/2);
character_general_values.perception = Math.floor(data.niveau/2) + passif1.competence_perception + passif2.competence_perception + passif3.competence_perception + passif4.competence_perception +data.competence_perception + armure_torse.perception + armure_jambe.perception + casque.perception + brassard.perception + anneau1.perception + anneau2.perception + amulette.perception;
character_general_values.class_armure_cac = 10 + passif1.ca_cac + passif2.ca_cac + passif3.ca_cac + passif4.ca_cac + Math.floor(modifier_caract.dexterite*2/3) + armure_torse.ca_cac + armure_jambe.ca_cac + casque.ca_cac + brassard.ca_cac + anneau1.ca_cac + anneau2.ca_cac + amulette.ca_cac;
character_general_values.class_armure_distance = 10 + passif1.ca_distance + passif2.ca_distance + passif3.ca_distance + passif4.ca_distance + Math.floor(modifier_caract.dexterite*2/3) + armure_torse.ca_distance + armure_jambe.ca_distance + casque.ca_distance + brassard.ca_distance + anneau1.ca_distance + anneau2.ca_distance + amulette.ca_distance;
character_general_values.physical_res =  passif1.resistance_physique + passif2.resistance_physique + passif3.resistance_physique + passif4.resistance_physique +armure_torse.resistance_physique + armure_jambe.resistance_physique + casque.resistance_physique + brassard.resistance_physique + anneau1.resistance_physique + anneau2.resistance_physique + amulette.resistance_physique;
character_general_values.magical_res = passif1.resistance_magique + passif2.resistance_magique + passif3.resistance_magique + passif4.resistance_magique +armure_torse.resistance_magique + armure_jambe.resistance_magique + casque.resistance_magique + brassard.resistance_magique + anneau1.resistance_magique + anneau2.resistance_magique + amulette.resistance_magique;

// console.log("niveau: ", data.niveau)
// console.log(character_general_values)


//  -------------COMPETENCE ET CONNAISSANCE-------------

let competence_vol = data.competence_vol + passif1.competence_vol + passif2.competence_vol + passif3.competence_vol + passif4.competence_vol + armure_torse.vol + armure_jambe.vol + casque.vol + brassard.vol + anneau1.vol + anneau2.vol + amulette.vol;
let competence_pistage = data.competence_pistage + passif1.competence_pistage + passif2.competence_pistage + passif3.competence_pistage + passif4.competence_pistage;
let competence_crochetage = data.competence_crochetage + passif1.competence_crochetage + passif2.competence_crochetage + passif3.competence_crochetage + passif4.competence_crochetage;
let competence_dissimulation = data.competence_dissimulation + passif1.competence_dissimulation + passif2.competence_dissimulation + passif3.competence_dissimulation + passif4.competence_dissimulation + armure_torse.dissimulation + armure_jambe.dissimulation + casque.dissimulation + brassard.dissimulation + anneau1.dissimulation + anneau2.dissimulation + amulette.dissimulation;
let competence_alchimie = data.competence_alchimie + passif1.competence_alchimie + passif2.competence_alchimie + passif3.competence_alchimie + passif4.competence_alchimie + Math.floor(modifier_caract.intelligence/2);
let competence_fabrication = data.competence_fabrication + passif1.competence_fabrication + passif2.competence_fabrication + passif3.competence_fabrication + passif4.competence_fabrication + Math.floor(modifier_caract.dexterite/2);
let connaissance_nature = data.connaissance_nature + passif1.connaissance_nature + passif2.connaissance_nature + passif3.connaissance_nature + passif4.connaissance_nature;
let connaissance_magie = data.connaissance_magie + passif1.connaissance_magie + passif2.connaissance_magie + passif3.connaissance_magie + passif4.connaissance_magie;
let connaissance_demologie = data.connaissance_demologie + passif1.connaissance_demologie + passif2.connaissance_demologie + passif3.connaissance_demologie + passif4.connaissance_demologie;

const competence_pratique = {competence_vol:competence_vol, competence_pistage:competence_pistage, competence_crochetage, competence_dissimulation:competence_dissimulation, competence_alchimie:competence_alchimie, competence_fabrication:competence_fabrication, connaissance_nature:connaissance_nature, connaissance_magie:connaissance_magie, connaissance_demologie:connaissance_demologie}


// on retourne ensuite les elements calculés
    const table_result = {
        base_caract: base_caract, 
        equip_caract: equip_caract, 
        passif_caract:passif_caract,
        temp_caract,
        total_caract:total_caract,
        modifier_caract:modifier_caract,
        arme1_final:arme1_final,
        arme2_final:arme2_final,
        arme3_final:arme3_final,
        competence_final1:competence_final1,
        competence_final2:competence_final2,
        competence_final3:competence_final3,
        competence_final4:competence_final4,
        competence_final5:competence_final5,
        bonus_elementaire:bonus_elementaire,
        character_general_values:character_general_values,
        armure_torse:armure_torse,
        armure_jambe:armure_jambe,
        casque:casque,
        brassard:brassard,
        anneau1:anneau1,
        anneau2:anneau2,
        amulette:amulette,
        botte:botte,
        text_bonus_equipment:text_bonus_equipment,
        passif1 :passif1,
        passif2:passif2,
        passif3:passif3,
        passif4:passif4,
        passif_bonus_text:passif_bonus_text,
        competence_pratique:competence_pratique,
    };
    return(table_result)
    }
    
}

function find_caracteristic_modifier (data,carac_search) {  // une fonction qui prend en input l'objet modifier_caract (qu'on cree dans la fonction calculate_character_values) et la caracteristique qu'on veut et qui renvoie la valeur du modificateur associe

    let result = 0;

    if (carac_search === "force" ) {result = data.force}
    else if (carac_search === "dexterite" ) {result = data.dexterite}
    else if (carac_search === "intelligence" ) {result = data.intelligence}
    else if (carac_search === "constitution" ) {result = data.constitution}
    else if (carac_search === "puissance" ) {result = data.puissance}
    else if (carac_search === "charisme" ) {result = data.charisme}

    return (result)

}

function calculate_comp_value(modifier_caract,competence_basex,bonus_element) { // une fonction qui prend en input l'objet modifier_caract (qu'on cree dans la fonction calculate_character_values) et l'objet competence_base (dans la meme fonction) et renvoie les valeurs de la competence (degat min?max, toucher)

    // on commence par retrouver les mdoficateurs pour les caracteristiques de degat et de toucher des objets
    const carac_deg1_modifier = find_caracteristic_modifier (modifier_caract,competence_basex.deg_carac1);
    const carac_deg2_modifier = find_caracteristic_modifier (modifier_caract,competence_basex.deg_carac2);
    const cara_touch2_modifier = find_caracteristic_modifier (modifier_caract,competence_basex.touch_carac);

    // on retrouve ensuite le bonus elementaire lie aux competences
    let deg_elem = 0;
    if(competence_basex.Element == "feu") {
        deg_elem = bonus_element.sort +bonus_element.feu

    }else if (competence_basex.Element == "glace")  {
        deg_elem = bonus_element.sort +bonus_element.glace

    }else if (competence_basex.Element == "psy")  {
        deg_elem = bonus_element.psy

    }else if (competence_basex.Element == "arcane")  {
        deg_elem = bonus_element.sort +bonus_element.arcane

    }else if (competence_basex.Element == "nature")  {
        deg_elem = bonus_element.sort +bonus_element.nature

    }else if (competence_basex.Element == "chi")  {
        deg_elem = bonus_element.chi
    }

    const min_deg_value = Math.round(competence_basex.min_deg + (carac_deg1_modifier+carac_deg2_modifier)/2*competence_basex.min_modifier + deg_elem);
    const max_deg_value = Math.round(competence_basex.max_deg + (carac_deg1_modifier+carac_deg2_modifier)/2*competence_basex.max_modifier +deg_elem);
    const mana_cost_value = Math.round(competence_basex.mana_cost + (carac_deg1_modifier+carac_deg2_modifier)/2*competence_basex.mana_cost_modifier);
    const touch_value = Math.round(cara_touch2_modifier*competence_basex.touch_modifier);

    return({nom: competence_basex.nom, element:competence_basex.Element, manacost:mana_cost_value, deg_min:min_deg_value,deg_max:max_deg_value,toucher:touch_value,porte:competence_basex.portée ,description: competence_basex.Description})
    
}

function training_level_multiplier(niveau,class_passif) {   // a function that take into the level of the character and the passif and return the passif object with updated value. Only for the class traning passives

    let passif_result = class_passif;

    if ( class_passif.ID == "pass2") {  // entrainement de moine
        passif_result.ca_cac = 1 + Math.floor(niveau/2);
        passif_result.ca_distance = Math.floor(niveau/2);
        passif_result.resistance_physique = Math.floor(niveau/2);
        passif_result.resistance_magique = Math.floor(niveau/2);
    }
    // console.log(passif_result)
    return (passif_result);
}

function find_equipment_bonus (equipement) {  // take the equipment object as input and return a strin with the list of bonus different from 0

    let bonus = "";

    if (equipement.ca_cac == 0) {} else{
        bonus = bonus + " CA_cac: " + equipement.ca_cac;
    }
    if (equipement.ca_distance == 0) {} else{
        bonus = bonus + " ca_distance: " + equipement.ca_distance;
    }
    if (equipement.force == 0) {} else{
        bonus = bonus + " force: " + equipement.force;
    }
    if (equipement.dexterite == 0) {} else{
        bonus = bonus + " dexterite: " + equipement.dexterite;
    }
    if (equipement.intelligence == 0) {} else{
        bonus = bonus + " intelligence: " + equipement.intelligence;
    }
    if (equipement.constitution == 0) {} else{
        bonus = bonus + " constitution: " + equipement.constitution;
    }
    if (equipement.puissance == 0) {} else{
        bonus = bonus + " puissance: " + equipement.puissance;
    }
    if (equipement.charisme == 0) {} else{
        bonus = bonus + " charisme: " + equipement.charisme;
    }
    if (equipement.resistance_physique == 0) {} else{
        bonus = bonus + " resistance_physique: " + equipement.resistance_physique;
    }
    if (equipement.resistance_magique == 0) {} else{
        bonus = bonus + " resistance_magique: " + equipement.resistance_magique;
    }
    if (equipement.degats_sort == 0) {} else{
        bonus = bonus + " degats_sort: " + equipement.degats_sort;
    }
    if (equipement.degat_feu == 0) {} else{
        bonus = bonus + " degat_feu: " + equipement.degat_feu;
    }
    if (equipement.degat_glace == 0) {} else{
        bonus = bonus + " degat_glace: " + equipement.degat_psy;
    }
    if (equipement.degat_arcane == 0) {} else{
        bonus = bonus + " degat_arcane: " + equipement.degat_arcane;
    }
    if (equipement.degat_nature == 0) {} else{
        bonus = bonus + " degat_nature: " + equipement.degat_nature;
    }
    if (equipement.degat_chi == 0) {} else{
        bonus = bonus + " degat_chi: " + equipement.degat_chi;
    }

    return (bonus)
}

function find_passive_bonus (passif) {  // Cette fonction prend en parametre un object "passif" de la table des passifs et renvoie un texte avec les bonus differents de 0"

    let bonus = "";

    if (passif.force == 0) {} else{
        bonus = bonus + " force: " + passif.force;
    }
    if (passif.dexterite == 0) {} else{
        bonus = bonus + " dexterite: " + passif.dexterite;
    }
    if (passif.intelligence == 0) {} else{
        bonus = bonus + " intelligence: " + passif.intelligence;
    }
    if (passif.constitution == 0) {} else{
        bonus = bonus + " constitution: " + passif.constitution;
    }
    if (passif.puissance == 0) {} else{
        bonus = bonus + " puissance: " + passif.puissance;
    }
    if (passif.charisme == 0) {} else{
        bonus = bonus + " charisme: " + passif.charisme;
    }
    if (passif.ca_cac == 0) {} else{
        bonus = bonus + " ca_cac: " + passif.ca_cac;
    }
    if (passif.ca_distance == 0) {} else{
        bonus = bonus + " ca_distance: " + passif.ca_distance;
    }
    if (passif.toucher_cac == 0) {} else{
        bonus = bonus + " toucher_cac: " + passif.toucher_cac;
    }
    if (passif.toucher_distance == 0) {} else{
        bonus = bonus + " toucher_distance: " + passif.toucher_distance;
    }
    if (passif.toucher_sort == 0) {} else{
        bonus = bonus + " toucher_sort: " + passif.toucher_sort;
    }
    if (passif.resistance_magique == 0) {} else{
        bonus = bonus + " resistance_magique: " + passif.resistance_magique;
    }
    if (passif.resistance_physique == 0) {} else{
        bonus = bonus + " resistance_physique: " + passif.resistance_physique;
    }
    if (passif.degat_sort == 0) {} else{
        bonus = bonus + " degat_nature: " + passif.degat_sort;
    }
    if (passif.degat_feu == 0) {} else{
        bonus = bonus + " degat_chi: " + passif.degat_feu;
    }
    if (passif.degat_glace == 0) {} else{
        bonus = bonus + " degat_chi: " + passif.degat_glace;
    }
    if (passif.degat_psy == 0) {} else{
        bonus = bonus + " degat_chi: " + passif.degat_psy;
    }
    if (passif.degat_arcane == 0) {} else{
        bonus = bonus + " degat_chi: " + passif.degat_arcane;
    }
    if (passif.degat_nature == 0) {} else{
        bonus = bonus + " degat_chi: " + passif.degat_nature;
    }
    if (passif.degat_chi == 0) {} else{
        bonus = bonus + " degat_chi: " + passif.degat_chi;
    }
    if (passif.competence_vol == 0) {} else{
        bonus = bonus + " competence_vol: " + passif.competence_vol;
    }
    if (passif.competence_pistage == 0) {} else{
        bonus = bonus + " competence_pistage: " + passif.competence_pistage;
    }
    if (passif.competence_crochetage == 0) {} else{
        bonus = bonus + " competence_crochetage: " + passif.competence_crochetage;
    }
    if (passif.competence_perception == 0) {} else{
        bonus = bonus + " competence_perception: " + passif.competence_perception;
    }
    if (passif.competence_dissimulation == 0) {} else{
        bonus = bonus + " competence_dissimulation: " + passif.competence_dissimulation;
    }
    if (passif.competence_alchimie == 0) {} else{
        bonus = bonus + " competence_alchimie: " + passif.competence_alchimie;
    }
    if (passif.competence_fabrication == 0) {} else{
        bonus = bonus + " competence_fabrication: " + passif.competence_fabrication;
    }
    if (passif.connaissance_nature == 0) {} else{
        bonus = bonus + " connaissance_nature: " + passif.connaissance_nature;
    }
    if (passif.connaissance_magie == 0) {} else{
        bonus = bonus + " connaissance_magie: " + passif.connaissance_magie;
    }
    if (passif.connaissance_demologie == 0) {} else{
        bonus = bonus + " connaissance_demologie: " + passif.connaissance_demologie;
    }

    return (bonus)
}

export async function Add_caracteristic (carac, base_data, setInputValue, calculate_character_values, setcharactValue) {

    let current_carac =base_data[carac];

    const sql = 'UPDATE character SET ' + carac +' = '+ (current_carac+1)+' WHERE char_id = '+ base_data.char_id+';'
    const charge = {instruction: sql,}

    try {
        const chargeUtile = JSON.stringify(charge);
        
        console.log(chargeUtile);
        console.log(typeof chargeUtile);
        await fetch("http://localhost:3001/", {
            method: "POST",
            dataType: 'json',
            headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json' },
            body: chargeUtile,
            mode: 'cors'
        });
        
    }catch (err) {
        console.log(err);
    }

    const new_base_data= await get_charact(base_data.char_id);
    setInputValue(new_base_data);
    const New_character_final_values = calculate_character_values(new_base_data);
    setcharactValue(New_character_final_values);
}

export function point_to_attribute(niveau) {   // une fonction qui calcule le nombre de points qui devrait de base attibuer 
    
    let point_bonus = 0;

    for(let i = 2;i < niveau;i++) {
        point_bonus = point_bonus + Math.floor(niveau/2) +1  
    }
    return (point_bonus)
}

export function trier_sur_nom (table) { 

    table.sort(function (a, b) {
        
        if (a.nom > b.nom) {
            return 1;
        }
        if (b.nom > a.nom) {
            return -1;
        }
        return 0;
    })
    return (table);
} 