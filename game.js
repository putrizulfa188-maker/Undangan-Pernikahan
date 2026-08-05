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

const game = new Phaser.Game(config);

// ==========================
// CEK ORIENTASI
// ==========================

function checkOrientation() {

    const overlay = document.getElementById("rotate-device");

    if (!overlay) return;

    if (window.innerHeight > window.innerWidth) {

        // Portrait
        overlay.style.display = "flex";

    } else {

        // Landscape
        overlay.style.display = "none";

    }

    // Refresh ukuran Phaser
    game.scale.refresh();

}

// Jalankan saat halaman selesai dimuat
window.addEventListener("load", checkOrientation);

// Jalankan saat ukuran berubah
window.addEventListener("resize", checkOrientation);

// Jalankan saat HP diputar
window.addEventListener("orientationchange", checkOrientation);
