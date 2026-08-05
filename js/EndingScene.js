class EndingScene extends Phaser.Scene {
    constructor() {
        super("EndingScene");
    }

    init(data) {
        this.namaTamu = data.namaTamu || "Tamu Spesial";
    }

    preload() {
        this.load.image("endingBG", "assets/background/ending.png");
        this.load.image("pengantin", "assets/character/pengantin.png");
    }

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        //=========================================
        // BACKGROUND
        //=========================================

        this.add.image(centerX, centerY, "endingBG")
            .setDisplaySize(width, height);

        // Overlay agar teks lebih jelas
        this.add.rectangle(
            centerX,
            centerY,
            width,
            height,
            0xffffff,
            0.08
        );

        //=========================================
        // SHADOW PANEL
        //=========================================

        this.add.rectangle(
            centerX + 8,
            centerY + 85,
            920,
            420,
            0x000000,
            0.08
        );

        //=========================================
        // PANEL
        //=========================================

        const panelWidth = 950;
        const panelHeight = 500;

        const panel = this.add.rectangle(
            centerX,
            centerY,
            panelWidth,
            panelHeight,
            0xffffff,
            0.88
        );

        panel.setStrokeStyle(4, 0xd4af37);

        panel.setScale(0.9);
        panel.setAlpha(0);

        this.tweens.add({
            targets: panel,
            scale: 1,
            alpha: 1,
            duration: 700,
            ease: "Back.Out"
        });

        //=========================================
        // PENGANTIN
        //=========================================

        const pengantin = this.add.image(
            centerX - 280,
            centerY + 20,
            "pengantin"
        );

        pengantin.setScale(0.24);

        pengantin.setScale(0.24);

        this.tweens.add({
            targets: pengantin,
            y: pengantin.y - 8,
            duration: 1800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        //=========================================
        // JUDUL
        //=========================================

        this.add.text(
            centerX + 150,
            150,
            "Terima Kasih",
            {
                fontFamily: "Georgia",
                fontSize: "48px",
                color: "#b8860b",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        //=========================================
        // ISI
        //=========================================

        const isi =
`Terima kasih ${this.namaTamu},
Telah meluangkan waktu 
mengunjungi undangan pernikahan kami.

Merupakan suatu kebahagiaan bagi kami
apabila Bapak/Ibu/Saudara/i
berkenan hadir dan memberikan doa restu.

Semoga Allah SWT senantiasa melimpahkan rahmat,
keberkahan, serta kebahagiaan kepada kita semua.`;

        this.add.text(
            centerX + 150,
            210,
            isi,
            {
                fontFamily: "Georgia",
                fontSize: "22px",
                color: "#5d4b36",
                align: "center",
                lineSpacing: 5
            }
        ).setOrigin(0.5, 0);

        //=========================================
        // NAMA PENGANTIN
        //=========================================

        this.add.text(
            centerX + 150,
            560,
            "Putri & Firman",
            {
                fontFamily: "Georgia",
                fontSize: "40px",
                color: "#b8860b",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        //=========================================
        // TOMBOL
        //=========================================

        const btn = this.add.rectangle(
            centerX,
            700,
            350,
            65,
            0x0f5b3d,
            1
        );

        btn.setStrokeStyle(3, 0xd4af37);
        btn.setInteractive({ useHandCursor: true });

        const txtBtn = this.add.text(
            centerX,
            700,
            "🏠 Kembali ke Awal",
            {
                fontFamily: "Georgia",
                fontSize: "24px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        btn.on("pointerover", () => {
            btn.setFillStyle(0x16784f);
            btn.setScale(1.05);
            txtBtn.setScale(1.05);
        });

        btn.on("pointerout", () => {
            btn.setFillStyle(0x0f5b3d);
            btn.setScale(1);
            txtBtn.setScale(1);
        });

        btn.on("pointerdown", () => {

            this.cameras.main.fadeOut(600);

            this.time.delayedCall(600, () => {
                this.scene.start("CoverScene");
            });

        });

        //=========================================
        // PANEL MELAYANG
        //=========================================

        this.tweens.add({
            targets: panel,
            y: panel.y - 4,
            duration: 2200,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        //=========================================
        // FADE IN
        //=========================================

        this.cameras.main.fadeIn(1000);

    }
}
