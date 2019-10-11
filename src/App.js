import { Application } from '@pixi/app'
import {Rectangle} from 'pixi.js' 
import { Sprite } from '@pixi/sprite'
import Space from './components/Space'
import Player from './components/Player'
import EnemyShip from './components/EnemyShip'
import GG from './components/GG'

//default width 800 height 600 
let pX = 380
let pY = 550
var enemies = [];
var stage;
let ct = 0;
let fTime = Date.now()   
let nTime
export default class App extends Application {
    constructor() {
        super()
        document.body.appendChild(this.view) 
        this.init()
        stage = this.stage
        this.game = true
    }
    init() {
        this.loader.add('player', './assets/ss1.png')
        this.loader.add('enemy', './assets/ss3.png')
        this.loader.add('space', './assets/space1.png')
        this.loader.add('plProj','./assets/rp.png')
        this.loader.add('enProj','./assets/gp.png')
         
        this.loader.load(this.drawBackground.bind(this))
        this.loader.load(this.drawPlayer.bind(this))
        
    }
    drawBackground() {
        this.space = new Space()
        this.stage.addChild(this.space)
        this.ticker.add(this.onUpdate.bind(this))
    }
    drawPlayer(){
        this.player = new Player({x:pX,y:pY,stage:stage})
        this.stage.addChild(this.player)
        this.ticker.add(this.onUpdate.bind(this))
    }
    
    onUpdate(delta) {
        ct++

        nTime = Date.now()
        this.space.onUpdate(delta)
        this.player.onUpdate(delta)
         
        
        
        if(ct % 150 == 0) createEnemy(10,0)
        for(var e=enemies.length-1;e>=0;e--){
            enemies[e].onUpdate(delta)
            if(checkShipsCollision(this.player,enemies[e])===true){
                console.log("Kaboom")
            } 
        }
        if (checkTimeOut(fTime,nTime) == true){
            
            this.ticker.stop()
        }
         
         
    }
}
function createEnemy(){
    var enemy = new EnemyShip({stage});
    stage.addChild(enemy)
    enemies.push(enemy)
}
function checkTimeOut(fTime,nTime){
  
    if(Math.floor((nTime - fTime)/1000) >= 10){   
        
        
        stop = true
    }
    return stop
}
function checkShipsCollision(enemy,player){
     
    let hit = false
    let totalW,totalH,vx,vy
    enemy.cx = enemy.x + enemy.width / 2
    enemy.cy = enemy.y + enemy.height / 2
    player.cx = player.x + player.width / 2
    player.cy = player.y + player.height / 2

    enemy.hw = enemy.width / 2
    enemy.hh = enemy.height / 2
    player.hw = player.width / 2
    player.hh = player.height / 2

    vx = enemy.cx - player.cx;
    vy = enemy.cy - player.cy;

    totalW = enemy.hw + player.hw;
    totalH = enemy.hh + player.hh;


    if (Math.abs(vx) < totalW) {

        if (Math.abs(vy) < totalH) {
            hit = true;
             
        } else {

        hit = false;
        }
    } else {
        hit = false;
    }
    return hit;

 }
