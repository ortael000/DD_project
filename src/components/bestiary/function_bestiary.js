export function trier_par_race (table,race) {

    let table2 = [];

    for (let i =0; i< table.length ;i++) {

        if (table[i].type == race) {
            table2.push(table[i]);
        }
    }

    return (table2);
}

export function list_type (table) {
    
    let list= [table[0].type]

    for (let i =1; i< table.length ;i++) {

        let test = 0;

        for (let j =0; j< list.length ;j++) {

            if (table[i].type == list[j]) {
                test =1;
            }
        }


        if (test == 0) {list.push(table[i].type)}
    }

    return (list)
}