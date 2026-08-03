const config = {

    type: Phaser.AUTO,

    parent: "game-container",
    // TAMBAHKAN BARIS INI:
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

    // ==========================
    // Physics
    // ==========================

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    // ==========================
    // Scene
    // ==========================

    scene: [
        CoverScene,
        LoadingScene,        
        SelectionScene,
        GardenScene,
        EndingScene
    ]

};

new Phaser.Game(config);