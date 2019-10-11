import { Texture } from '@pixi/core'
import { TilingSprite } from '@pixi/sprite-tiling'

export default class Space extends TilingSprite {
    constructor() {
        const texture = Texture.from('space')
        super(texture, texture.width, texture.height)  
    }

    onUpdate(delta) {
        
    	this.tilePosition.y += delta 
    }
}