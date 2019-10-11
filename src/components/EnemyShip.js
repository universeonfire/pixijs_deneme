import {Rectangle} from 'pixi.js'
import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import Projectile2 from './Projectile2'

var projs = [];  
var bulletSpeed = 5;
var stage;
let ct = 0;
let vx = Math.floor(Math.random() * 5) 
let vy = 3
let direction = Math.random() > 0.5 ? 1 : -1
function proje(pX,pY){
    
    var proj = new Projectile2('enProj');
    proj.position.x = pX + 30;
    proj.position.y = pY;
    stage.addChild(proj);
    projs.push(proj);
}
export default class EnemyShip extends Sprite {
    constructor(props) {
        super(Texture.EMPTY)
        this.sprite = Sprite.from('enemy')
        this.x = (50 + Math.floor(Math.random() * 600) )
        this.y = 10
        stage = props.stage
        
        this.hitArea = new Rectangle(0 , 0, 50 , 50 );
        
        this.addChild(this.sprite)
    }
     
    onUpdate(delta) {
        ct += 1
        this.y += vy      
        if (this.y > 650){
            
            stage.removeChild(this.sprite)

        }
        if(Math.floor(ct) % 50 == 0) proje(this.x,this.y)
        for(var p=projs.length-1;p>=0;p--){  
            projs[p].position.y += 2*bulletSpeed;
            
        }
        
    } 
}