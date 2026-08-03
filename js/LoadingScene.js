class LoadingScene extends Phaser.Scene {

    constructor() {
        super("LoadingScene");
    }

    preload() {
        // Load gambar background utama
        this.load.image("loadingBg", "assets/background/loading.png");
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        // Transisi masuk halus
        this.cameras.main.fadeIn(500);

        // 1. TAMPILKAN BACKGROUND FULL
        const bg = this.add.image(centerX, height / 2, "loadingBg");
        bg.setDisplaySize(width, height);

        // 2. TEKS PERSENTASE (Hijau Emerald Gelap yang Elegan)
        const percentText = this.add.text(
            centerX,
            590, // Diletakkan di area bawah (di dekat/bawah kalimat "Mempersiapkan hari bahagia...")
            "0%",
            {
                fontFamily: "Georgia",
                fontSize: "36px",
                fontStyle: "bold",
                color: "#1B4332",                  // Warna Hijau Emerald
                stroke: "#FFFFFF",                 // Stroke putih tipis agar makin tegas
                strokeThickness: 2
            }
        ).setOrigin(0.5);

        // 3. ANIMASI PERSENTASE LOADING
        let value = 0;

        const timer = this.time.addEvent({
            delay: 25,
            repeat: 99,
            callback: () => {
                value++;
                percentText.setText(value + "%");

                if (value >= 100) {
                    timer.remove();
                    this.cameras.main.fadeOut(500);
                }
            }
        });

        // 4. PINDAH KE SCENE SELESAI
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("SelectionScene");
        });
    }
}