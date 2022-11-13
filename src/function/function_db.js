import {calculate_character_values} from './function.js'

import {armelist } from '../data/armes.js';
import {equipementlist } from '../data/equipements.js';
import {objectlist} from '../data/objet.js'

import {find_object} from "../components/character_component/inventory.js"

const adresse = "https://ortaelddproject.link";

export async function get_charact(charac_id) {  // La fonction qui appelle l'API en fonction de l'ID du perso et qui renvoie un objet avec les caracteristiques du perso
    //console.log("on lance getchart pour ", charac_id)

    try {
        const reponse = await fetch(adresse+'/character/'+charac_id, {
            method: 'GET',
            dataType: 'json',
            headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'},  // A comprendre pourquoi il a fallu mettre ca
            mode: 'cors'
        });

        const data = await reponse.json();
        //console.log(data);
        return (data[0]);

    } catch (err) {
        console.log(err);
      }
}

export async function modify_database (sql) {  // La fonction prend en parametre une requete sql sour la forme d'un string et modifie la DB en consequence

    const charge = {instruction: sql,}

    try {
        const chargeUtile = JSON.stringify(charge);
        
        console.log(chargeUtile);
        console.log(typeof chargeUtile);
        await fetch(adresse+"/", {
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

}

export async function get_table(table) {  // La fonction qui appelle l'API pour toute une table

    try {
        const reponse = await fetch(adresse+"/"+table, {
        method: 'GET',
        dataType: 'json',
        headers: {'Accept': 'application/json',
                 'Content-Type': 'application/json'},  // A comprendre pourquoi il a fallu mettre ca
        mode: 'cors'
    });

    const data = await reponse.json();


    return (data);

    } catch (err) {
        console.log(err);
      }
}

export async function change_perso (charac_id, key, value, setcharactValue, setInputValue) { // une fonction qui prend en input l 'ID du perso, le code de la nouvelle valeur,  la clé de la nouvelle valeur a changer(competence1,competence2,..,arme1,arme2 etc..) et qui met a jour la base de donner avant de la rappeler. 
    
    const sql = ("UPDATE character SET "+ key + " = \""+value+"\" WHERE char_id = "+ charac_id + ";");
    console.log("on va lancer modify avec la requete ", sql);

    await modify_database(sql);

    const new_base_data= await get_charact(charac_id);
    setInputValue(new_base_data);
    const new_character_final_values = calculate_character_values(new_base_data);
    setcharactValue(new_character_final_values);
}

export async function get_inventory(char_id) {  // La fonction qui appelle l'API en fonction de l'ID du perso et qui renvoie un objet avec les caracteristiques du perso

    try {
        const reponse = await fetch(adresse+"/inventory/"+char_id, {
        method: 'GET',
        dataType: 'json',
        headers: {'Accept': 'application/json',
                 'Content-Type': 'application/json'},  // A comprendre pourquoi il a fallu mettre ca
        mode: 'cors'
    });

    const data = await reponse.json();


    return (data);

    } catch (err) {
        console.log(err);
      }
}

export async function add_item_to_character (quantity,item_id,char_id,setItemStatus) {

    const inventory = await get_inventory(char_id);

    //console.log("on check inventory");
    //console.log(inventory);

    for (let i in inventory) {
        //console.log("on compare"+ inventory[i].object_id + " et "+ item_id)
        if(item_id == inventory[i].object_id) {
           // console.log("on a deja la quantite")
           // console.log(inventory[i].quantite)
            quantity = (inventory[i].quantite +quantity)
        }
    }
    if(quantity > 1) {
        const sql = ("UPDATE inventory SET quantite = "+ quantity + " WHERE char_id = "+char_id+" AND object_id = \"" +item_id + "\";")
        //console.log("on check l'instruction sql");
        //console.log(sql);
        await modify_database(sql);
        setItemStatus(0);
    } else {

        console.log("check item_id");
        console.log(item_id);

        const object = find_object(item_id)

        console.log("check object");
        console.log(object);
        

        const sql = ("INSERT INTO inventory VALUES ("+char_id +",\""+ object.nom +"\",\""+ object.object_id +"\",\""+ object.description +"\","+ 1 +","+ object.valeur +");")
        //console.log("on check l'instruction sql");
        //console.log(sql);
        await modify_database(sql);
        setItemStatus(0);

        //{"instruction":"INSERT INTO inventory VALUES (7, \" cuir de troll\", \"ingr5\",\"le cuir d'un troll est plus resistant que la normal car il integre des elements mineraux tout en conservant sa souplesse\", 1,75);"}
    }
    }
