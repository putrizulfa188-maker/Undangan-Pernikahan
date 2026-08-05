class SelectionScene extends Phaser.Scene {
    constructor() {
        super("SelectionScene");
    }

    preload() {
        this.load.image("selectionBg", "assets/background/Selection.png");
        this.load.image("tamu_pria", "assets/character/tamu_pria.png");
        this.load.image("tamu_wanita", "assets/character/tamu_wanita.png");
        this.load.audio("pop", "assets/audio/pop.wav");
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        const popSound = this.sound.add("pop");

        // Variable Nama Default
        let namaTamu = "Tamu Spesial";

        // ==========================================
        // 1. BACKGROUND GAMBAR DENGAN OVERLAY KREM
        // ==========================================
        if (this.textures.exists("selectionBg")) {
            const bg = this.add.image(centerX, height / 2, "selectionBg");
            bg.setDisplaySize(width, height);
            this.add.rectangle(centerX, height / 2, width, height, 0xfcf9f2, 0.55);
        } else {
            this.add.rectangle(0, 0, width, height, 0xf9f3ea).setOrigin(0, 0);
        }

        // ==========================================
        // 2. AREA NAMA TAMU (CARD ATAS)
        // ==========================================
        // Kotak Putih Lis Emas
        this.add.rectangle(centerX, 180, 520, 160, 0xffffff, 0.95)
            .setStrokeStyle(2, 0xc5a059);

        // Judul
        this.add.text(centerX, 130, "Kepada Yth. Bapak/Ibu/Saudara/i:", {
            fontFamily: "Georgia",
            fontSize: "18px",
            color: "#1b4332",
            fontStyle: "italic"
        }).setOrigin(0.5);

        // HTML DOM Input Nama (Masuk ke dalam kotak)
        const inputHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; font-family: Georgia, serif; width: 100%;">
                <div style="display: flex; gap: 8px; justify-content: center;">
                    <input type="text" id="inputNama" placeholder="Ketik Nama Anda..." 
                           style="width: 220px; padding: 8px 12px; font-size: 14px; border-radius: 6px; border: 2px solid #c5a059; outline: none; background: #faf8f5; color: #1b4332; text-align: center; font-weight: bold; font-family: Georgia, serif;">
                    <button id="btnSimpan" 
                            style="padding: 8px 14px; font-size: 13px; background: #1b4332; color: #ffffff; border: 1px solid #c5a059; border-radius: 6px; cursor: pointer; font-weight: bold; font-family: Georgia, serif;">
                        SIMPAN
                    </button>
                </div>
                <div id="pesanSukses" style="color: #1b4332; font-size: 13px; font-weight: bold; display: none;"></div>
            </div>
        `;

        // Posisi Y diset ke 195 (Tepat di tengah bawah teks Yth)
        const formElement = this.add.dom(centerX, 195).createFromHTML(inputHTML);

        const inputField = formElement.getChildByID("inputNama");
        const btnSimpan = formElement.getChildByID("btnSimpan");
        const pesanSukses = formElement.getChildByID("pesanSukses");

        const simpanNama = () => {
            const inputVal = inputField.value.trim();
            if (inputVal !== "") {
                namaTamu = inputVal;
                pesanSukses.innerText = `✓ Selamat datang, ${namaTamu}!`;
                pesanSukses.style.display = "block";
            } else {
                alert("Silakan ketik nama Anda terlebih dahulu!");
            }
        };

        btnSimpan.addEventListener("click", () => {
            popSound.play();
            simpanNama();
        });

        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                popSound.play();
                simpanNama();
            }
        });

        // ==========================================
        // 3. AREA PEMILIHAN KARAKTER (CARD BAWAH)
        // ==========================================
        this.add.rectangle(centerX, 480, 520, 300, 0xffffff, 0.95)
            .setStrokeStyle(2, 0xc5a059);

        this.add.text(centerX, 360, "Pilih Karaktermu", {
            fontFamily: "Georgia",
            fontSize: "18px",
            color: "#1b4332",
            fontStyle: "italic"
        }).setOrigin(0.5);

        // Karakter Pria
        const pria = this.add.image(centerX - 130, 510, "tamu_pria")
            .setScale(0.22)
            .setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: pria,
            scaleX: 0.235,
            scaleY: 0.235,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // Karakter Wanita
        const wanita = this.add.image(centerX + 130, 510, "tamu_wanita")
            .setScale(0.18)
            .setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: wanita,
            scaleX: 0.235,
            scaleY: 0.235,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // ==========================================
        // 4. POPUP TUTORIAL
        // ==========================================
        this.popupTutorial = this.add.container(centerX, 360).setDepth(100).setVisible(false);
        
        const bgPopup = this.add.rectangle(0, 0, 520, 340, 0xffffff, 0.98).setStrokeStyle(3, 0xc5a059);
        const judulPopup = this.add.text(0, -120, "CARA BERMAIN", { fontSize: "24px", color: "#1b4332", fontStyle: "bold", fontFamily: "Georgia" }).setOrigin(0.5);
        
        const teksInstruksi = "1. Gunakan tombol arah / analog di layar untuk berjalan.\n2. Dekati objek (Bunga, Kamera, dll).\n3. Klik tombol 'BUKA' untuk membaca informasi.\n4. Jika semua sudah dibuka, temui Mempelai di Pelaminan!";
        const isiPopup = this.add.text(0, -10, teksInstruksi, { 
            fontFamily: "Georgia", fontSize: "16px", color: "#333333", align: "left", wordWrap: { width: 450 }, lineSpacing: 8
        }).setOrigin(0.5);

        const btnMulai = this.add.text(0, 115, " MULAI PETUALANGAN ", { 
            fontFamily: "Georgia", fontSize: "18px", fontStyle: "bold", backgroundColor: "#1b4332", color: "#ffffff", padding: { x: 22, y: 10 } 
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.popupTutorial.add([bgPopup, judulPopup, isiPopup, btnMulai]);

        // ==========================================
        // LOGIKA PINDAH SCENE
        // ==========================================
        let pilihanKarakter = "";

        const tampilkanTutorial = (karakter) => {
            popSound.play();
            
            if (inputField.value.trim() !== "") {
                namaTamu = inputField.value.trim();
            }

            pilihanKarakter = karakter;
            
            formElement.setVisible(false);
            pria.disableInteractive(); 
            wanita.disableInteractive(); 
            
            this.popupTutorial.setVisible(true);
        };

        pria.on("pointerdown", () => tampilkanTutorial("tamu_pria"));
        
        wanita.on("pointerdown", () => tampilkanTutorial("tamu_wanita"));
        

        btnMulai.on("pointerdown", () => {
            popSound.play();
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start("GardenScene", { charPilihan: pilihanKarakter, namaTamu: namaTamu });
            });
        });
    }
}
