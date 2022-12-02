import * as PIXI from 'pixi.js'
import { Application, Assets, Sprite } from 'pixi.js';

export function animate_temp(base_image,sprite_array,app,hauteur,largeur,nb_frame, delai_frame, nb_repeat) {

    const start_time = 300;  // time before the animation start
    const period_time = (delai_frame*nb_frame*nb_repeat)  //Total time the loop will take, including the time when the animaton hasn't started
    let image = PIXI.Sprite.from(base_image);
    let animation = []
    for (let i in sprite_array) {
        animation.push(PIXI.Sprite.from(sprite_array[i]))
        animation[i].height = hauteur;
        animation[i].width = largeur;
    }
    app.stage.addChild(image)
    let elapsed = 0.0;

    app.ticker.add((delta) => {
        // Add the time to our total elapsed time
        elapsed += delta;
        let period = (elapsed % (period_time+start_time));
       // console.log(period)
        for (let i = app.stage.children.length - 1; i >= 0; i--) {app.stage.removeChild(app.stage.children[i]);};
        if (period > start_time) {
            let indice = Math.floor(((period-start_time)%(nb_frame*delai_frame))/delai_frame);
            app.stage.addChild(animation[indice])
           // console.log("on va chercher l'image d'indice" + indice)
        } else {
            image = PIXI.Sprite.from(base_image);
            app.stage.addChild(image)
        }
        image.width = largeur;
        image.height = hauteur;
    })
}

