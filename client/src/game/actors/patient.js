// import { Actor, Vector, Color } from "excalibur";
import { Actor, Color } from "excalibur";
import * as ex from 'excalibur'
// import{ Config } from './config'
import { Resources } from "../resources";

export default class Patient extends Actor {
    constructor(pos) {
        super({
            z: 100,
            pos: ex.vec(20, 540),
            width: 25,
            height: 25,
            collisionType: ex.CollisionType.Passive,
            color: Color.Chartreuse
        })
        this.following = false
    }

    onInitialize(engine) {
        const sprite = Resources.PatientPng.toSprite()
        sprite.scale.setTo(1.5, 1.5)

        this.graphics.use(sprite)

    }
}