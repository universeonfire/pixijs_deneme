import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
 
export default class Projectile extends Sprite {
   constructor(props) {
        super(Texture.EMPTY)
        this.sprite = Sprite.from('plProj')
        this.x = props.x
        this.y = props.y
        this.sprite.position.set(this.x,this.y)
        this.addChild(this.sprite)
    }
    
}