export function Table_display ({table}) {

    if (table == null) {
        // {console.log("pas encore de donnée a exploiter")}
         return (
            <tbody></tbody>
         )
    }else{

        const values_table = table.map((ligne) => (Object.values(ligne))); //renvoie un tableau contenant les valeurs des propriétés d'un objet
        const keys = Object.keys(table[0]);

        return (
            <tbody>
                <tr>
                {keys.map((valeur) => (<th> {valeur} </th>))};
                </tr>
                {values_table.map((ligne) => (<tr key = "key"> {ligne.map((valeur) => (<td> {valeur} </td>))} </tr>))}
            </tbody>
        )
    }

}
