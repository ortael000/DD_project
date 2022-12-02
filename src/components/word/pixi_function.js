import { Mouse, SensorOccupiedTwoTone } from '@mui/icons-material';
import * as PIXI from 'pixi.js'
import { Application, Assets, Sprite } from 'pixi.js';

export function Create_clickable_area (abs,ord,ray,text,app) {

    const base_alpha = 0;

    var circle = new PIXI.Graphics();
    circle.lineStyle(8, 0x4f36d1, 1);
    circle.drawCircle(abs, ord, ray);
    circle.endFill();
    circle.alpha = base_alpha;
    app.stage.addChild(circle);
    // designate circle as being interactive so it handles events
    circle.interactive = true;
    circle.hitArea = new PIXI.Circle(abs, ord, ray);   

    var circle2 = new PIXI.Graphics();
    circle2.lineStyle(8, 0x240ca2, 1);
    circle2.drawCircle(abs, ord, ray+6);
    circle2.endFill();
    circle2.alpha = base_alpha;
    app.stage.addChild(circle2);

    let ord2 = 0;
    let abs2 = 0;

    const hauteur_panneau = 910;
    const largeur_panneau = 800;

    if (ord > 3000) {ord2 = -hauteur_panneau}
    if (abs >4000) {abs2 = -largeur_panneau}

    let text_font = new PIXI.Graphics();
    text_font.beginFill(0xf7e3a4);
    text_font.lineStyle({ color: 0x010100, width: 4, alignment: 0 });
    text_font.drawRect(0, 0, 800, 910);
    text_font.position.set(abs+ray+abs2, ord+ray+ord2);
    
    let pixitext = new PIXI.Text(text,
        {
          fontSize: 44,
          fill: 0x270302,
          wordWrap: true,
          wordWrapWidth: (largeur_panneau-30)
        }
    );
    pixitext.x = 20;
    pixitext.y = 20;

    var close_circle = new PIXI.Graphics();
    close_circle.lineStyle(20, 0xb20c0c, 1);
    close_circle.drawCircle(largeur_panneau, 0, 10);
    close_circle.beginFill(0xb20c0c);
    close_circle.alpha = 0.5;
    // designate circle as being interactive so it handles events
    close_circle.interactive = true;
    close_circle.hitArea = new PIXI.Circle(800, 0, 30);

    circle.on('mouseover', onMouseOver);
    circle.on('mouseout', onMouseOut);
    circle.on('click', onClick);

    close_circle.on('click',handleClose)
    close_circle.on('mouseover', onMouseOver2);
    close_circle.on('mouseout', onMouseOut2);

    function onMouseOver(event) {
        circle.alpha = 1;
        circle2.alpha = 1;
    }

    function onMouseOut(event) {
        circle.alpha = base_alpha;
        circle2.alpha = base_alpha;
    } 

    function onMouseOver2(event) {
        close_circle.alpha = 1;
    }

    function onMouseOut2(event) {
        close_circle.alpha = 0.5;
    } 

    function onClick(event) {
        console.log('event on click: ');
        console.log("on active handleClose")

        app.stage.removeChild(text_font);
        app.stage.removeChild(pixitext);
        app.stage.removeChild(close_circle);

        app.stage.addChild(text_font);
        text_font.addChild(pixitext)
        text_font.addChild(close_circle)

    }

    function handleClose() {

        console.log("on active handleClose")
        app.stage.removeChild(text_font);
        app.stage.removeChild(pixitext);
        app.stage.removeChild(close_circle);
    }

    
}


export function Create_link_from_map (app,abs,ord,largeur,hauteur,set_current_map_code,newvalue) {

    console.log("on lance Create_link_from_map area for " + newvalue)

    var rectangle = new PIXI.Graphics();
    rectangle.lineStyle(20, 0xFFFFFF, 1);
    rectangle.drawRect(abs, ord, largeur, hauteur);
    rectangle.alpha = 0;
    app.stage.addChild(rectangle);

    rectangle.interactive = true;
    rectangle.hitArea = new PIXI.Rectangle(abs, ord, largeur, hauteur);

    rectangle.on('mouseover', onMouseOver);
    rectangle.on('mouseout', onMouseOut);
    rectangle.on('click', onClick);

    function onMouseOver(event) {
        rectangle.alpha = 1;
    }

    function onMouseOut(event) {
        rectangle.alpha = 0;
    } 

    function onClick(event) {
        console.log("on click sur la map")
        set_current_map_code(newvalue)
    }
}

export function report_coordinate (app) {

    const abs = 0;
    const ord =0;
    const largeur = 5200;
    const hauteur = 4000;

    var rectangle = new PIXI.Graphics();
    rectangle.lineStyle(3, 0xb20c0c, 1);
    for (let i = 0; i <40;i++) {
        rectangle.drawRect(0, i*100, 5200, 100);
        rectangle.alpha = 1;
        app.stage.addChild(rectangle);

        let pixitext = new PIXI.Text(i*100,
            {
              fontSize: 40,
              fill: 0x270302,
            }
        );
        pixitext.x = 10;
        pixitext.y = i*100;
        rectangle.addChild(pixitext)
    }

    for (let i = 0; i <52;i++) {

        rectangle.drawRect(i*100, 0, 100, 4000);
        rectangle.alpha = 1;
        app.stage.addChild(rectangle);

        let pixitext = new PIXI.Text(i*100,
            {
              fontSize: 40,
              fill: 0x270302,
            }
        );
        pixitext.x = i*100;
        pixitext.y = 10;
        rectangle.addChild(pixitext)
    }


}

