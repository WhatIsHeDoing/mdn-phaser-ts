import { AUTO, Game, GameObjects, Physics, Scene, Types } from "phaser";

const sceneConfig: Types.Scenes.SettingsConfig = {
    active: false,
    key: "Game",
    visible: false
};

type ArcadeRectangle = GameObjects.Rectangle & { body: Physics.Arcade.Body };

export class GameScene extends Scene {
    private square = {} as ArcadeRectangle;

    constructor() {
        super(sceneConfig);
    }

    create(): void {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as ArcadeRectangle;
        this.physics.add.existing(this.square);
    }

    update(): void {
        const cursorKeys = this.input.keyboard.createCursorKeys();
        const speed = 500;

        const y = cursorKeys.up?.isDown
            ? -speed
            : cursorKeys.down?.isDown
                ? speed
                : 0;

        this.square.body.setVelocityY(y);

        const x = cursorKeys.right?.isDown
            ? speed
            : cursorKeys.left?.isDown
                ? -speed
                : 0;

        this.square.body.setVelocityX(x);
    }
}

const gameConfig: Types.Core.GameConfig = {
    backgroundColor: "#000000",
    parent: "game",

    physics: {
        arcade: {
            debug: true
        },
        default: "arcade"
    },


    scale: {
        height: window.innerHeight,
        width: window.innerWidth
    },

    scene: GameScene,
    title: "Sample",
    type: AUTO
};

export const game = new Game(gameConfig);
