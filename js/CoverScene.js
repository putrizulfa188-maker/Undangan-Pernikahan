class CoverScene extends Phaser.Scene {

    constructor() {
        super("CoverScene");
    }

    preload() {

        this.load.image("cover", "assets/background/cover.png");
        this.load.image("start", "assets/ui/start.png");

    }

    create() {

        // this.add.image(640, 380, "cover");
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        const bg = this.add.image(centerX, height / 2, "cover");
        bg.setDisplaySize(width, height);

        this.add.text(640, 130, "", {
            fontFamily: "Georgia",
            fontSize: "36px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(640, 190, "", {
            fontFamily: "Georgia",
            fontStyle: "bold",
            fontSize: "64px",
            color: "#FFD700"
        }).setOrigin(0.5);

        // ==========================================
        // TOMBOL START (Posisi Y diturunkan ke 650)
        // ==========================================
        const btn = this.add.image(640, 550, "start")
            .setInteractive()
            .setScale(0.23);

        // ==========================================
        // EFEK ZOOM IN & ZOOM OUT (ANIMASI PULSING)
        // ==========================================
        this.tweens.add({
            targets: btn,
            scale: 0.27,           // Ukuran membesar dari 0.23 ke 0.27
            duration: 800,         // Durasi 0.8 detik per gerak
            yoyo: true,            // Mengecil kembali secara otomatis
            repeat: -1,            // Berulang tanpa henti (-1)
            ease: "Sine.easeInOut" // Gerakan halus/smooth
        });

        btn.on("pointerdown", () => {

            // Nonaktifkan tombol agar tidak bisa diklik berkali-kali
            btn.disableInteractive();

            // Hentikan efek zoom saat tombol diklik
            this.tweens.killTweensOf(btn);

            // Efek fade keluar
            this.cameras.main.fadeOut(800, 0, 0, 0);

        });

        this.cameras.main.once("camerafadeoutcomplete", () => {

            this.scene.start("LoadingScene");

        });

    }

}