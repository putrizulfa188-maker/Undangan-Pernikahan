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
        mode: Phaser.Scale.NONE,
        width: 1280,
        height: 720
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
const game = new Phaser.Game(config);

function resizeGame() {

    const canvas = game.canvas;

    const screenHeight = window.innerHeight;

    const screenWidth = screenHeight * (1280 / 720);

    canvas.style.height = screenHeight + "px";
    canvas.style.width = screenWidth + "px";

}

resizeGame();

window.addEventListener("resize", resizeGame);

setTimeout(() => {
    const canvas = document.querySelector("canvas");

    console.log("Window:", window.innerWidth, window.innerHeight);
    console.log("Canvas Attribute:", canvas.width, canvas.height);
    console.log("Canvas Client:", canvas.clientWidth, canvas.clientHeight);
    console.log("Canvas Style:", canvas.style.width, canvas.style.height);
}, 1000);
