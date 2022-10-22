import {calculate_character_values} from './function.js'

export async function get_charact(charac_id) {  // La fonction qui appelle l'API en fonction de l'ID du perso et qui renvoie un objet avec les caracteristiques du perso
    //console.log("on lance getchart pour ", charac_id)

    try {
        const reponse = await fetch('http://localhost:3001/character/'+charac_id, {
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

}

export async function get_table(table) {  // La fonction qui appelle l'API pour toute une table

    try {
        const reponse = await fetch('http://localhost:3001/'+table, {
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
        const reponse = await fetch('http://localhost:3001/inventory/'+char_id, {
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