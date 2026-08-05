const config = {

    type: Phaser.AUTO,

    parent: "game-container",

    dom: {
        createContainer: true
    },

    width: 1280,
    height: 720,

    backgroundColor: "#000000",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    scene: [
        CoverScene,
        LoadingScene,
        SelectionScene,
        GardenScene,
        EndingScene
    ]

};

// ==========================
// BUAT GAME
// ==========================
new Phaser.Game(config);
