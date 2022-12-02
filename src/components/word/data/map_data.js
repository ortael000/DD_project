import * as PIXI from 'pixi.js'
import { Application, Assets, Sprite } from 'pixi.js';

import map_illidria_detail from "../../../Assets/map/illidria_detail.png";
import map_illidria_global from "../../../Assets/map/illidria.png";
import map_illidria_border from "../../../Assets/map/illidria_border.png";
import map_illidria_races from '../../../Assets/map/illidria_race.png';
 
import map_gothir_detail from '../../../Assets/map/gothir_detail.png';
import map_gothir_global from '../../../Assets/map/gothir.png';
import map_gothir_border from '../../../Assets/map/gothir_border.png';
import map_gothir_race from '../../../Assets/map/gothir_race.png';

import map_nadir_detail from '../../../Assets/map/nadir_steppe_detail.png';
import map_nadir_global from '../../../Assets/map/nadir_steppe.png';
import map_nadir_border from '../../../Assets/map/nadir_steppe_border.png';
import map_nadir_races from '../../../Assets/map/nadir_steppe_race.png';




export const maps_array = [
    {global: map_illidria_global, detail: map_illidria_detail, border: map_illidria_border, race: map_illidria_races, code: "illidria"},
    {global: map_gothir_global, detail: map_gothir_detail, border: map_gothir_border, race: map_gothir_race, code: "gothir"},
    {global: map_nadir_global, detail: map_nadir_detail, border: map_nadir_border, race: map_nadir_races, code:"nadir"}
]

export const maps_status_array = {global: 0, detail: 0, border: 0, race: 0};

export const maps_data_array = [
    [  
        // illidria
        {abs: 4060, ord: 1880, text: "Herai: La deuxieme plus grande ville de l'empire avec pres de 160 000 habitants. Ancienne capitale de l'ordre de la redemption, elle demeure un important centre commerciale et d'artisanat. La ville profite notamment des richesses des mines des montagnes un peu a l'est"},
        {abs: 2730, ord: 1165, text: "Sachta: La capitale de l'empire d'Iluvatar. La ville abrite aujoud'hui pres de 200 000 habitants. En son sein se trouve l'assemblé des provinces de l'empire, le palais imperial, le siege de la guilde des mages et la quartier general des armées."},
        {abs: 1340, ord: 2235, text: "Kazaran est a l'origine une ville construite par les Khajits pour servire de refuge en temps de crise. Avec le temps, sa position strategique au carrefour de plusieurs royaumes en a fait une importante place commerciale ainsi qu'une ville tres cosmopolite. On y trouve des halfelins venu vendre leur prodits agricole et profiter des plaisirs de la ville, des nains de Thoranak venu vendre leur fabrication de la forge, des elfes de Styria et des humains de Mithridan"},
        {abs: 3550, ord: 1280, text: "Le fort de Vra'al a a l'origine etait construit par l'empire de Sachta pour se proteger des attaques de l'ordre de la redemption. Apres l'unification des deux territoires, le fort est resté en activité du fait de son endroit strategique. Une garnison importante y reside toujours, dont la principale mission est d'assurer la securite des habitants et des voyageux dans la region"},
        {abs: 3950, ord: 780, text: "La region des collines de Shandora a toujours été peuplé par de nombreuses races. La ville de Shandar, a l'origine construite par des humains autour d'un groupe de temple, est donc rapidement devenu une ville cosmopolite, servant de lieu sacré et de refuge a plusieurs races. On y trouve principalement des humains, des Khajits et des Halfelins mais egalement des elfes, des centaures et quelques clans orcs"},
        {abs: 4000, ord: 3650, text: "Les Iles de feu, du feu de leur caractere volcanique, beneficient de terre tres fertiles et d'un climat plus chaud que le reste de la peninsule. Pour ces raisons, une faune endemique s'y est developpé, dont plusieurs especes de wyvernes. Certaines epices comme le poivre ou le coumen y poussent egalement tres bien, ce qui a poussé certains riches marchand a y installer des plantations et des comptoirs, regroupés depuis dans la ligue marchande des iles de feu. "},
        {abs: 2620, ord: 1700, text: "Les plateaux de Vroengard sont des territoires tres vallonées, parois presque montagneux, mais neanmois assez fertile. La region habrite de nombreuses tribus de gobelin et de troll, ainsi qu'une faune dangereuse et varié. Pendant longtemps, les tribus gobloides habitant les plateaux menacaient les regions alentours, ou ils effectuaient regulierement des raides. Deux campagnes d'exterminations menées par Ortael, puis la construction de plusieurs forts aux frontieres, on fini par grandement reduire cette menace."},
        {abs: 3450, ord: 1580, text: "Les plaines d'Erains sont parmi les terres les plus fertiles de la peninsule d'Illidria, notamment du fait des nombreux fleuves qui la traverse. Malgrés cela, elle est longtemps resté peu peuplé car trop exposé aux attaques des gobloides venu des plateaux de Vroengard. Depuis l'avenement de l'empire, celui-ci a lancé des grands programme de mise en valeur de ces terres. Des communautées agricoles auto-géré mais soutenu et soumise a l'administration imperial ont vu le jour sur tout le territoire, qui est maintenant l'un des plus prosperes du continent"},
        {abs: 1860, ord: 2270, text: "La foret d'Eanix abritent une faune nombreuse et varié, marqué par la presence de nombreuse creatures magiques. Les plus celebres de ces créatures sont sans doute les phénix, qui n'existent pas ailleurs sur la peninsule. La foret abrite egalement le royaume elfe de Styria. Grace aux tres nombreux arbres fruitiers et a la faune foisonnante, les elfes peuvent vivre sous les arbres en nombre sans avoir presque besoin d'agriculture. "},
        {abs: 720, ord: 1060, text: "La plaine des centaures est, comme son nom l'indique, peuplée principalement par une trentaine de hardes centaures, comptant chacun de 2000 a 4000 individus. Pendant longtemps, les centaures ont régulierement mené des raids de pillage dans les territoires elfes et humains a l'est. Par deux fois, Ils ravagerent meme Almeria. En repressaille, une coalition emmenée par Sachta extermina plusieurs tribus. Par la suite, un traité fut signé entre les centaures, Almeria et Sachta, garantissant la paix. Aujoud'hui, de nombreux centaures se sont engagés comme auxilliaire dans l'armée de l'empire."},
        {abs: 3810, ord: 2490, text: "La peninsule des Aendreds, ce qui signifie les peaux-vertes en elfe, a été nommé ainsi par les elfes de Styria, nom repris ensuite dans la langue commune. C'est une region vallonée, boisée et sauvage, ou l'on trouve de nombreuse petite tribus d'orc, de gobelin et de troll. La region est egalement connu pour abriter des ours géants et pour les nombreuses plantes rares qui y poussent."},

    ],
    [
        //gothir
        {abs: 3400, ord: 900, text: "Il y a encore 70 ans, Gothir etait une cité etat parmis d'autre dans la region du bassin de l'agolte, prospere grace aux terres fertiles des environs et aux mines d'argent des collines a l'ouest. Avec l'avenement du roi Grisha I, Gothir entreprit une politique de reforme militaire puis d'extenton territoriale rapide, soumettant les regions voisines et devenant la capitale d'un royaume centralisé et militarisé. Entre autre particularité, Gothir fonde une partie de son economie sur l'esclavage, ce qui provoque des guerres fréquentes pour alimenter son besoin en main--d'oeuvre"},
        {abs: 4250, ord: 2210, text: " Thiril-ael est la capitale et la seule veritable ville du royaume avenain eponyme. En realité il s'agit plus d'un grand palais-forteresse sur la montagne, servant a abriter le roi et sa cour. La plupart des avenains preferent vivres en nomade et ne construisent donc pas de batiment durable. Les differents clans avenains nomades reconnaissent toutefois l'autorite du roi et lui paient tribu en echange de sa protection et de son arbitrage."},
        {abs: 1520, ord: 1250, text: " Thorim-Anur est la capitale est la plus grande ville du royaume nain de Thormadun. Il s'agit probablement du plus grand royaume nain du continent, riche de ses mines de fer et de mitrils dans les monts Arpares. Contrairement a d'autres royaumes nains, celui-ci possede de nombreux villages agricoles dans les montagnes et dans la grande vallée au milieu de celles-ci, ce qui lui permet d'etre autosuffisant sur le plan alimentaire"},
        {abs: 820, ord: 1850, text: " Les khajits de la région vivent generalement en nomade pastorale ou dans de petites communautées agricoles. Dashara est l'exception a cette regle, puisqu'il y reside une population d'environ 5000 Khajits, donc plus d'une centaine de pretre de Kaash, le principale dieu khajit. La ville est toutefois beaucoup plus grande que cela et demeure vide la majorité de l'année. Deux fois par ans, durant 5 jours, les douzes tribus se rassemblement dans la ville, les pretres arbitrent les differents, les champions de chaque clans s'affrontent lors d'epreuve de tir a l'arc et de combat au batons et les pretres animent de grandes cérémonies."},
    ],
    [
        //nadir
        {abs: 2530, ord: 1340, text: "La faille de Samkara est un grand canyon qui, selon les Nadirs, auraient été créé par l'impact d'un coup de Samkara alors que celui-ci abatait un seigneur démon, liberant ainsi les hommes reduits en esclavages par les demons et qui deviendront par la suite les nadirs. A l'extremité sud de la faille, un temple a été bati, autour duquel se rassemblent toutes les tribus une fois tous les deux ans, pour celebrer leur héro fondateur par de multiple tournois de tir a l'arc, de combat et de course de chevaux"},
        {abs: 1810, ord: 2630, text: "La pyramide d'Uyulun est l'un des deux lieux de rassemblement de toutes les tribus Nadir. Une fois tous les deux ans, tous les chefs nadir et une large partie de leur tribu viennent y celebrer le dieu soleil. Durant cette periode, tout conflit est prohibé et de grande ceremonies ont lieu. La plus importante etant le sacrifice du meilleur cheval de chaque tribus au dieu soleil. Cet evenement met en scene la contribution de chaque tribus nadir au bien de tous en satisfaisant leur dieu soleil"},
    ]
]