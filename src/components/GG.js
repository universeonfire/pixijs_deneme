import { Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'

export default class GG extends Sprite {
    constructor() {
        super(Texture.EMPTY)
        
        this.sprite = Sprite.from('gg')

        this.x = 0
        this.y = 0
        this.addChild(this.sprite)
    }

    
}