class GardenScene extends Phaser.Scene {
    constructor() {
        super("GardenScene");
    }

    init(data) {
        // Menerima data dari SelectionScene
        this.karakterPilihan = data.charPilihan || "tamu_pria"; 
        this.namaTamu = data.namaTamu || "Tamu Spesial"; 
    }

    preload() {
        this.load.image("garden", "assets/background/garden.png");
        this.load.image("pengantin", "assets/character/pengantin.png");
        this.load.image("tamu_pria", "assets/character/tamu_pria.png");
        this.load.image("tamu_wanita", "assets/character/tamu_wanita.png");
        
        this.load.image("up", "assets/ui/up.png");
        this.load.image("down", "assets/ui/down.png");
        this.load.image("left", "assets/ui/left.png");
        this.load.image("right", "assets/ui/right.png");
        
        this.load.image("flower", "assets/object/bunga.png");
        this.load.image("ring", "assets/object/cincin.png");
        this.load.image("letter", "assets/object/surat.png");
        this.load.image("camera", "assets/object/camera.png");
        
        this.load.image("foto1", "assets/object/foto1.jpg");
        this.load.image("foto2", "assets/object/foto2.jpg");
        this.load.image("foto3", "assets/object/foto3.jpg");
        this.load.image("foto_pria", "assets/object/foto_pria.png");
        this.load.image("foto_wanita", "assets/object/foto_wanita.png");

        this.load.audio("bgm", "assets/audio/bgm.mp3");
        this.load.audio("pop", "assets/audio/pop.wav");
        this.load.audio("walk", "assets/audio/walk.wav");
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;
        const centerY = height / 2;

        this.bgm = this.sound.add("bgm", { loop: true, volume: 0.5 });
        this.input.once('pointerdown', () => { if (!this.bgm.isPlaying) this.bgm.play(); });

        this.popSound = this.sound.add("pop", { volume: 0.8 });
        this.walkSound = this.sound.add("walk", { loop: true, volume: 0.6 });

        this.cameras.main.fadeIn(500);
        const bg = this.add.image(centerX, centerY, "garden");
        bg.setDisplaySize(width, height);

        // Panel Nama
        this.add.rectangle(
            centerX,
            45,
            420,
            60,
            0xffffff,
            0.82
        )
        .setStrokeStyle(2, 0xd4af37)
        .setDepth(9);

        // Tulisan
        this.add.text(
            centerX,
            45,
            `✨ Selamat Datang, ${this.namaTamu} ✨`,
            {
                fontFamily: "Georgia",
                fontSize: "22px",
                color: "#1b4332",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setDepth(10);

        this.player = this.physics.add.sprite(centerX, 560, this.karakterPilihan).setScale(0.15);

        this.MIN_X = 80; this.MAX_X = width - 80;
        this.MIN_Y = 80; this.MAX_Y = height - 80;

        this.moveUp = false; this.moveDown = false;
        this.moveLeft = false; this.moveRight = false;

        const BUTTON_SCALE = 0.10;
        const GAP = 60;
        const CONTROL_X = 120;
        const CONTROL_Y = height - 120;

        const up = this.add.image(CONTROL_X, CONTROL_Y - GAP, "up").setInteractive().setScrollFactor(0).setScale(BUTTON_SCALE);
        const left = this.add.image(CONTROL_X - GAP, CONTROL_Y, "left").setInteractive().setScrollFactor(0).setScale(BUTTON_SCALE);
        const right = this.add.image(CONTROL_X + GAP, CONTROL_Y, "right").setInteractive().setScrollFactor(0).setScale(BUTTON_SCALE);
        const down = this.add.image(CONTROL_X, CONTROL_Y + GAP, "down").setInteractive().setScrollFactor(0).setScale(BUTTON_SCALE);

        up.on("pointerdown", () => { this.moveUp = true; this.popSound.play(); }); up.on("pointerup", () => this.moveUp = false); up.on("pointerout", () => this.moveUp = false);
        down.on("pointerdown", () => { this.moveDown = true; this.popSound.play(); }); down.on("pointerup", () => this.moveDown = false); down.on("pointerout", () => this.moveDown = false);
        left.on("pointerdown", () => { this.moveLeft = true; this.popSound.play(); }); left.on("pointerup", () => this.moveLeft = false); left.on("pointerout", () => this.moveLeft = false);
        right.on("pointerdown", () => { this.moveRight = true; this.popSound.play(); }); right.on("pointerup", () => this.moveRight = false); right.on("pointerout", () => this.moveRight = false);

        this.hasFlower = false; this.hasRing = false;
        this.hasLetter = false; this.hasCamera = false;

        this.flower = this.add.image(250, 220, "flower").setScale(0.10);
        this.ring = this.add.image(1030, 220, "ring").setScale(0.50);
        this.camera = this.add.image(250, 500, "camera").setScale(0.10);
        this.letter = this.add.image(1030, 500, "letter").setScale(0.10);

        this.shadow = this.add.image(centerX, 180, "pengantin").setScale(0.15).setAlpha(0.6).setVisible(false);

        this.btnPelaminan = this.add.text(0, 0, " NAIK KE PELAMINAN ", {
            fontSize: "18px", backgroundColor: "#ff007f", color: "#ffffff", padding: { x: 10, y: 5 }, fontStyle: "bold"
        }).setOrigin(0.5).setVisible(false).setInteractive().setDepth(60);

        this.btnPelaminan.on("pointerdown", () => {
            this.popSound.play();
            this.bgm.stop(); 
            this.walkSound.stop(); 
            // BAWA NAMA TAMU KE ENDING SCENE
            this.scene.start("EndingScene", { namaTamu: this.namaTamu });
        });

        [this.flower, this.ring, this.camera, this.letter].forEach(item => {
            this.tweens.add({ targets: item, scale: item.scale + 0.015, duration: 700, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
        });
        
        this.popupContainer = this.add.container(centerX, centerY).setDepth(100).setVisible(false);
        this.popupBg = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8).setStrokeStyle(4, 0xffffff);
        this.popupText = this.add.text(0, -20, "", { fontSize: "24px", color: "#ffffff", align: "center", wordWrap: { width: 350, useAdvancedWrap: true } }).setOrigin(0.5);

        this.fotoIndex = 1; this.totalFoto = 3;
        this.fotoTampil = this.add.image(0, -10, "foto1").setScale(0.2).setVisible(false);
        this.btnKiri = this.add.text(-160, -10, " < ", { fontSize: "30px", backgroundColor: "#333333", color: "#ffffff", padding: { x: 5, y: 5 } }).setOrigin(0.5).setInteractive().setVisible(false);
        this.btnKanan = this.add.text(160, -10, " > ", { fontSize: "30px", backgroundColor: "#333333", color: "#ffffff", padding: { x: 5, y: 5 } }).setOrigin(0.5).setInteractive().setVisible(false);
        this.teksHalaman = this.add.text(0, 60, "1 / 3", { fontSize: "16px", color: "#aaaaaa" }).setOrigin(0.5).setVisible(false);

        this.btnKiri.on("pointerdown", () => { this.popSound.play(); this.fotoIndex--; if (this.fotoIndex < 1) this.fotoIndex = this.totalFoto; this.fotoTampil.setTexture("foto" + this.fotoIndex); this.teksHalaman.setText(this.fotoIndex + " / " + this.totalFoto); });
        this.btnKanan.on("pointerdown", () => { this.popSound.play(); this.fotoIndex++; if (this.fotoIndex > this.totalFoto) this.fotoIndex = 1; this.fotoTampil.setTexture("foto" + this.fotoIndex); this.teksHalaman.setText(this.fotoIndex + " / " + this.totalFoto); });

        this.fotoWanita = this.add.image(-160, -40, "foto_wanita").setScale(0.15).setVisible(false);
        this.teksWanita = this.add.text(-160, 50, "Putri Zulfa S.Kom\nPutri dari Bapak ... dan Ibu ...", { fontSize: "16px", color: "#ffffff", align: "center", wordWrap: { width: 220 } }).setOrigin(0.5).setVisible(false);
        this.teksDan = this.add.text(0, -10, "&", { fontSize: "40px", color: "#ffffff", align: "center", fontStyle: "bold" }).setOrigin(0.5).setVisible(false);
        this.fotoPria = this.add.image(160, -40, "foto_pria").setScale(0.15).setVisible(false);
        this.teksPria = this.add.text(160, 50, "Muhamad Firmansyah\nPutra dari Bapak ... dan Ibu ...", { fontSize: "16px", color: "#ffffff", align: "center", wordWrap: { width: 220 } }).setOrigin(0.5).setVisible(false);

        this.targetTanggalAcara = new Date("Dec 31, 2026 09:00:00").getTime(); 
        this.teksCountdown = this.add.text(0, 0, "", { fontSize: "22px", color: "#ffcc00", align: "center", fontStyle: "bold", backgroundColor: "#222222", padding: { x: 10, y: 10 } }).setOrigin(0.5).setVisible(false);
        
        this.btnGmaps = this.add.text(0, 70, " 📍 BUKA GOOGLE MAPS ", { fontSize: "18px", backgroundColor: "#007bff", color: "#ffffff", padding: { x: 10, y: 8 } }).setOrigin(0.5).setInteractive().setVisible(false);
        this.btnGmaps.on("pointerdown", () => { this.popSound.play(); window.open("https://maps.app.goo.gl/masukkan_link_disini", "_blank"); });

        this.closeBtn = this.add.text(0, 50, " TUTUP ", { fontSize: "20px", backgroundColor: "#dc3545", color: "#ffffff", padding: { x: 10, y: 5 } }).setOrigin(0.5).setInteractive();
        this.closeBtn.on("pointerdown", () => { this.popSound.play(); this.popupContainer.setVisible(false); });

        this.popupContainer.add([
            this.popupBg, this.popupText, this.fotoTampil, this.btnKiri, this.btnKanan, this.teksHalaman, 
            this.fotoWanita, this.teksWanita, this.teksDan, this.fotoPria, this.teksPria, 
            this.teksCountdown, this.btnGmaps, this.closeBtn
        ]);

        this.btnAmbil = this.add.text(0, 0, " BUKA ", { fontSize: "18px", backgroundColor: "#28a745", color: "#ffffff", padding: { x: 10, y: 5 } }).setOrigin(0.5).setVisible(false).setInteractive().setDepth(50);
        this.btnAmbil.on("pointerdown", () => { this.popSound.play(); this.ambilItemSekarang(); });

        this.daftarObjek = [
            { sprite: this.flower, nama: "Bunga", status: "hasFlower" },
            { sprite: this.ring, nama: "Cincin", status: "hasRing" },
            { sprite: this.camera, nama: "Kamera", status: "hasCamera" },
            { sprite: this.letter, nama: "Surat", status: "hasLetter" }
        ];

        this.objekTerdekat = null;
    }

    update() {
        if (this.popupContainer.visible && this.teksCountdown.visible) {
            let sekarang = new Date().getTime();
            let jarak = this.targetTanggalAcara - sekarang;

            if (jarak < 0) {
                this.teksCountdown.setText("ACARA SEDANG BERLANGSUNG");
            } else {
                let hari = Math.floor(jarak / (1000 * 60 * 60 * 24));
                let jam = Math.floor((jarak % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let menit = Math.floor((jarak % (1000 * 60 * 60)) / (1000 * 60));
                let detik = Math.floor((jarak % (1000 * 60)) / 1000);
                this.teksCountdown.setText(`${hari} Hari : ${jam} Jam : ${menit} Menit : ${detik} Detik`);
            }
        }

        const speed = 250;
        this.player.setVelocity(0);

        let isMoving = false;

        if (this.moveUp) { this.player.setVelocityY(-speed); isMoving = true; }
        if (this.moveDown) { this.player.setVelocityY(speed); isMoving = true; }
        if (this.moveLeft) { this.player.setVelocityX(-speed); isMoving = true; }
        if (this.moveRight) { this.player.setVelocityX(speed); isMoving = true; }

        this.player.x = Phaser.Math.Clamp(this.player.x, this.MIN_X, this.MAX_X);
        this.player.y = Phaser.Math.Clamp(this.player.y, this.MIN_Y, this.MAX_Y);

        if (isMoving && !this.popupContainer.visible) {
            if (!this.walkSound.isPlaying) {
                this.walkSound.play();
            }
        } else {
            if (this.walkSound.isPlaying) {
                this.walkSound.stop();
            }
        }

        if (this.hasFlower && this.hasRing && this.hasCamera && this.hasLetter) {
            this.shadow.setVisible(true);

            let jarakPelaminan = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.shadow.x, this.shadow.y);
            if (jarakPelaminan < 120) {
                this.btnPelaminan.setVisible(true);
                this.btnPelaminan.setPosition(this.player.x, this.player.y - 70);
            } else {
                this.btnPelaminan.setVisible(false);
            }
        }

        const JARAK_MAKSIMAL = 80; 
        let adaObjekDekat = null;

        for (let i = 0; i < this.daftarObjek.length; i++) {
            let item = this.daftarObjek[i];
            
            let jarak = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.sprite.x, item.sprite.y);
            if (jarak < JARAK_MAKSIMAL) {
                adaObjekDekat = item; 
                break;
            }
        }

        if (adaObjekDekat) {
            this.objekTerdekat = adaObjekDekat;
            this.btnAmbil.setVisible(true);
            this.btnAmbil.setPosition(this.player.x, this.player.y - 70);
        } else {
            this.objekTerdekat = null;
            this.btnAmbil.setVisible(false);
        }
    }

    ambilItemSekarang() {
        if (this.objekTerdekat) {
            let item = this.objekTerdekat;
            this[item.status] = true; 
            
            this.btnAmbil.setVisible(false);

            this.fotoTampil.setVisible(false); this.btnKiri.setVisible(false); this.btnKanan.setVisible(false); this.teksHalaman.setVisible(false);
            this.fotoWanita.setVisible(false); this.teksWanita.setVisible(false); this.teksDan.setVisible(false); this.fotoPria.setVisible(false); this.teksPria.setVisible(false);
            this.teksCountdown.setVisible(false); this.btnGmaps.setVisible(false);
            
            if (item.nama === "Kamera") {
                this.popupBg.setDisplaySize(450, 300); 
                this.popupText.setFontSize("24px").setText("Foto Kenangan Kita").setPosition(0, -110);
                this.fotoTampil.setVisible(true); this.btnKiri.setVisible(true); this.btnKanan.setVisible(true); this.teksHalaman.setVisible(true);
                this.fotoIndex = 1; this.fotoTampil.setTexture("foto1"); this.teksHalaman.setText("1 / 3");
                this.closeBtn.setPosition(0, 110); 
            } else if (item.nama === "Bunga") {
                this.popupBg.setDisplaySize(550, 260); 
                const ayat = "QS. Ar-Rum: 21\n\n\"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.\"";
                this.popupText.setText(ayat).setFontSize("18px").setWordWrapWidth(500).setPosition(0, -25);
                this.closeBtn.setPosition(0, 90); 
            } else if (item.nama === "Cincin") {
                this.popupBg.setDisplaySize(650, 380); 
                this.popupText.setText("Kami yang berbahagia").setFontSize("22px").setPosition(0, -150);
                this.fotoWanita.setVisible(true); this.teksWanita.setVisible(true); this.teksDan.setVisible(true);
                this.fotoPria.setVisible(true); this.teksPria.setVisible(true);
                this.closeBtn.setPosition(0, 140); 
            } else if (item.nama === "Surat") {
                this.popupBg.setDisplaySize(550, 420); 
                const detailLokasi = "AKAD\nTanggal : ---\nWaktu : ___\n\nRESEPSI\nTanggal : ___\nWaktu : ___\n\nLOKASI\nJl. ___ (Rumah Mempelai Wanita)";
                this.popupText.setText(detailLokasi).setFontSize("18px").setPosition(0, -110);
                this.teksCountdown.setVisible(true); this.teksCountdown.setPosition(0, 50);
                this.btnGmaps.setVisible(true); this.btnGmaps.setPosition(0, 110);
                this.closeBtn.setPosition(0, 170); 
            }

            this.popupContainer.setVisible(true);
            this.objekTerdekat = null;
        }
    }
}
