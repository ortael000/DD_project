import React from "react";

import '../Style/homepage/homepage.css'
import '../Style/homepage/homepage_medium.css'
import '../Style/homepage/homepage_small.css'
import '../Style/homepage/homepage_large.css'


import character_pres1 from "../Assets/homepage/character_pres1.png"
import character_pres2 from "../Assets/homepage/character_pres2.png"
import bestiary_pres from "../Assets/homepage/bestiary_pres.png"
import fight_pres from "../Assets/homepage/fight_pres.png"
import world_pres from "../Assets/homepage/world_pres.png"


export function Homepage() {

    return(
        <div className= "page_content"> 
            <div className="homepage_content" > 
            
                <div className="section">
                    <div className="intro_section_1">
                        <div className="intro_text">
                            <div className="intro_title">
                                Bienvenue sur Donjon et Dragon Remastered 
                            </div>
                            
                            <div className="intro_message">
                                Le site qui heberge et simplifie vos parties de jeu de roles
                            </div>
                        </div>
                    </div>
                </div>


                <div className="section">
                    <div className="section2">
                        <div className="character_section_text">
                            <div className="section_text">
                                <div className="Section_Subtitle1">
                                    Gérer votre personnage
                                </div>
                                <div className="character_sub_text">
                                        Gérer l'ensemble des elements de votre personnage directement en ligne.<br/>
                                        <ul>
                                        <li>Investissez vos points de caracteristique.</li>
                                        <li>Choississez vos sorts et competences parmi des centaines disponibles.</li>
                                        <li>Equiper votre perso avec un large panel de combinaison et de build possible</li>
                                    </ul>
                                    Tous les changements sont pris en compte et vos PV, degats et scores de toucher sont calculés automatiquement
                                </div>
                            </div>
                        </div>

                        <div className="pres_image2">
                            <img className="pres_image1" src = {character_pres1} />
                            <img className="pres_image1" src = {character_pres2} />
                        </div>

                    </div>
                </div>


                <div className="section">
                    <div className="section2">
                        
                        <div className="pres_image2">
                            <img className="pres_image1" src = {fight_pres} />
                        </div>

                        <div className="fight_section_text">
                            <div className="section_text">
                                <div className="Section_Subtitle1">
                                    Organiser vos combats
                                </div>
                                <div className="fight_sub_text">
                                    Un outils pour accelerer les combats et simplifier la vie du DM<br/>
                                    <ul>
                                        <li>Choissisez vos opposants et selectionner vos héros</li>
                                        <li>Simuler les jets d'initiatives</li>
                                        <li>Simuler les attaques de vos ennemis automatiquement</li>
                                        <li>Metter a jour en direct les PV des participants</li>
                                        <li>Generer et repartissez-vous le butin </li>
                                    </ul>
                                    Pour conserver le plaisir du lancer de dés, les jets de toucher et de degat des joueurs se font toujours a la main au des.
                                    Cet outil a surtout pour but d'aider le DM et d'accelerer les combats.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="section">
                    <div className="section2">

                        <div className="world_section_text">
                            <div className="section_text">
                                <div className="Section_Subtitle1">
                                    Découvrez un univers
                                </div>
                                <div className="world_sub_text">
                                    UL'ensemble des elements du lore sont a découvrir sur le site<br/>
                                    <ul>
                                        <li>Des centaines d'equipements et de competence pour votre personnage</li>
                                        <li>Des multitudes d'objets et un systeme de craft</li>
                                        <li>Un bestiaire présentant tous vos adversaires potentiels</li>
                                        <li>Une map interactive pour decouvrir l'univers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pres_image2">
                            <img className="pres_image1" src = {bestiary_pres} />
                            <img className="pres_image1" src = {world_pres} />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}


