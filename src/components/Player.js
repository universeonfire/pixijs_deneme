import {Rectangle} from 'pixi.js'
import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import Projectile from './Projectile'

let pX = 0
let pY = 0
let pVx = 0
let pVy = 0
let ppVx = 0
let ppVy = 0
var projs = [];  
var bulletSpeed = 5;
var stage;
function proje(){
    var proj = new Projectile('plProj');
    proj.position.x = pX + 30;
    proj.position.y = pY;

    stage.addChild(proj);
    projs.push(proj);
}


export default class Player extends Sprite {
    constructor(props) {
        super(Texture.EMPTY)
        
        this.sprite = Sprite.from('player')
        this.x = props.x
        this.y = props.y
        this.hitArea = new Rectangle(0 , 0, 50 , 50 )
        stage = props.stage
        this.addChild(this.sprite)
        this.keyboardEvents()
         
    }
    
    keyboardEvents() {
        document.addEventListener('keydown', this.keyDown)
        document.addEventListener('keyup', this.keyUp)
    }

    keyDown(event) {
        switch(event.keyCode){
            case 32: //space to shoot,
                ppVy = -2
                proje() 
                break;
            case 37: //left        
                pVx = -2
                break;
            case 38: //up
                pVy = -2
                break;
            case 39: //right
                pVx = 2
                break; 
            case 40: //down
                pVy = 2
                break;

        }

    }
    keyUp(event) {
        switch(event.keyCode){
            case 37: //left        
                pVx = 0
                break;
            case 38: //up
                pVy = 0
                break;
            case 39: //right
                pVx = 0
                break; 
            case 40: //down
                pVy = 0
                break;       
        }
       
    }
    onUpdate(delta) {
        let vx = pVx
        let vy = pVy
        //boundary problemss???
        if (this.x + this.sprite.width >= 800){
            vx = 0
            this.x = 799 - this.sprite.width  
        }
        else if(this.x  <= 0){
            vx = 0
            this.x = 1
        }
        if (this.y + this.sprite.height >= 600  ){
            vy = 0
            this.y = 599 - this.sprite.height
        }else if(this.y  <= 0){
            vy = 0
            this.y = 1
        }

        this.x += vx * delta
        this.y += vy * delta
        pX = this.x
        pY = this.y
        //bang bang fire fire
        for(var b=projs.length-1;b>=0;b--){
            projs[b].position.y -= 2*bulletSpeed;

        }       
    } 
}