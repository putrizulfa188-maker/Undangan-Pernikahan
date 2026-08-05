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

        let namaTamu = "Tamu Spesial";

        // ===============================
        // Fade In
        // ===============================

        this.cameras.main.fadeIn(700, 0, 0, 0);

        // ===============================
        // Background
        // ===============================

        if (this.textures.exists("selectionBg")) {

            const bg = this.add.image(centerX, height / 2, "selectionBg");

            bg.setDisplaySize(width, height);

            this.add.rectangle(
                centerX,
                height / 2,
                width,
                height,
                0xfcf8f2,
                0.35
            );

        } else {

            this.add.rectangle(
                centerX,
                height / 2,
                width,
                height,
                0xf8f3ec
            );

        }

        // ===============================
        // Judul
        // ===============================

        this.add.text(
            centerX,
            55,
            "Selamat Datang",
            {
                fontFamily: "Georgia",
                fontSize: "42px",
                color: "#6b4f32",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.add.text(
            centerX,
            95,
            "Wedding Adventure",
            {
                fontFamily: "Georgia",
                fontSize: "18px",
                color: "#c5a059",
                fontStyle: "italic"
            }
        ).setOrigin(0.5);

        // ===============================
        // PANEL NAMA
        // ===============================

        // Shadow

        this.add.rectangle(
            centerX + 5,
            185,
            550,
            170,
            0x000000,
            0.12
        );

        // Panel

        this.add.rectangle(
            centerX,
            180,
            550,
            170,
            0xffffff,
            0.93
        )
        .setStrokeStyle(3, 0xd4af37);

        // Judul Panel

        this.add.text(
            centerX,
            128,
            "Kepada Yth. Bapak / Ibu / Saudara / i",
            {
                fontFamily: "Georgia",
                fontSize: "20px",
                color: "#1b4332",
                fontStyle: "italic"
            }
        ).setOrigin(0.5);

        this.add.text(
            centerX,
            155,
            "Silakan tuliskan nama Anda",
            {
                fontFamily: "Georgia",
                fontSize: "14px",
                color: "#888888"
            }
        ).setOrigin(0.5);

        // ===============================
        // FORM HTML
        // ===============================

        const inputHTML = `

<div style="
display:flex;
flex-direction:column;
align-items:center;
gap:10px;
width:100%;
">

<div style="
display:flex;
gap:10px;
">

<input
id="inputNama"
type="text"
placeholder="Nama Tamu..."
style="
width:260px;
padding:10px 14px;
border-radius:10px;
border:2px solid #d4af37;
background:#faf8f5;
font-size:15px;
font-family:Georgia;
font-weight:bold;
text-align:center;
outline:none;
color:#1b4332;
">

<button
id="btnSimpan"
style="
padding:10px 18px;
border:none;
border-radius:10px;
background:#d4af37;
color:white;
font-weight:bold;
font-family:Georgia;
cursor:pointer;
">
SIMPAN
</button>

</div>

<div
id="pesanSukses"
style="
display:none;
font-size:14px;
color:#1b4332;
font-weight:bold;
">
</div>

</div>

`;

        const formElement = this.add
            .dom(centerX, 205)
            .createFromHTML(inputHTML);

        const inputField = formElement.getChildByID("inputNama");

        const btnSimpan = formElement.getChildByID("btnSimpan");

        const pesanSukses = formElement.getChildByID("pesanSukses");

        const simpanNama = () => {

            const inputVal = inputField.value.trim();

            if (inputVal !== "") {

                namaTamu = inputVal;

                pesanSukses.innerHTML =
                    "✓ Selamat datang, <b>" +
                    namaTamu +
                    "</b>";

                pesanSukses.style.display = "block";

            } else {

                alert("Silakan isi nama terlebih dahulu.");

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
        // ===============================
        // PANEL PILIH KARAKTER
        // ===============================

        // Shadow Panel

        this.add.rectangle(
            centerX + 5,
            485,
            550,
            330,
            0x000000,
            0.12
        );

        // Panel

        this.add.rectangle(
            centerX,
            480,
            550,
            330,
            0xffffff,
            0.93
        )
        .setStrokeStyle(3,0xd4af37);

        // Judul

        this.add.text(
            centerX,
            340,
            "Pilih Karaktermu",
            {
                fontFamily:"Georgia",
                fontSize:"28px",
                color:"#1b4332",
                fontStyle:"bold"
            }
        ).setOrigin(.5);

        this.add.text(
            centerX,
            372,
            "Klik salah satu karakter untuk memulai",
            {
                fontFamily:"Georgia",
                fontSize:"15px",
                color:"#777777",
                fontStyle:"italic"
            }
        ).setOrigin(.5);

        // =====================================
        // GLOW
        // =====================================

        const glowPria = this.add.circle(
            centerX - 140,
            510,
            95,
            0xffd86b,
            0
        );

        const glowWanita = this.add.circle(
            centerX + 140,
            510,
            95,
            0xffd86b,
            0
        );

        // =====================================
        // SHADOW KARAKTER
        // =====================================

        this.add.ellipse(
            centerX - 140,
            605,
            90,
            18,
            0x000000,
            .15
        );

        this.add.ellipse(
            centerX + 140,
            605,
            90,
            18,
            0x000000,
            .15
        );

        // =====================================
        // KARAKTER PRIA
        // =====================================

        const pria = this.add.image(
            centerX - 140,
            510,
            "tamu_pria"
        )
        .setScale(.28)
        .setInteractive({
            useHandCursor:true
        });

        // =====================================
        // KARAKTER WANITA
        // =====================================

        const wanita = this.add.image(
            centerX + 140,
            510,
            "tamu_wanita"
        )
        .setScale(.28)
        .setInteractive({
            useHandCursor:true
        });

        // =====================================
        // LABEL NAMA
        // =====================================

        const namaPria = this.add.text(
            pria.x,
            635,
            "Firman",
            {
                fontFamily:"Georgia",
                fontSize:"20px",
                color:"#6b4f32",
                fontStyle:"bold"
            }
        ).setOrigin(.5);

        const namaWanita = this.add.text(
            wanita.x,
            635,
            "Putri",
            {
                fontFamily:"Georgia",
                fontSize:"20px",
                color:"#6b4f32",
                fontStyle:"bold"
            }
        ).setOrigin(.5);

        // =====================================
        // FLOATING ANIMATION
        // =====================================

        [pria,wanita].forEach((char)=>{

            this.tweens.add({

                targets:char,

                y:500,

                duration:1200,

                ease:"Sine.easeInOut",

                yoyo:true,

                repeat:-1

            });

        });

        // =====================================
        // HOVER EFFECT
        // =====================================

        const hoverCharacter=(obj)=>{

            obj.on("pointerover",()=>{

                this.tweens.add({

                    targets:obj,

                    scale:0.31,

                    duration:150

                });

            });

            obj.on("pointerout",()=>{

                if(obj!==selectedCharacter){

                    this.tweens.add({

                        targets:obj,

                        scale:0.28,

                        duration:150

                    });

                }

            });

        };

        hoverCharacter(pria);

        hoverCharacter(wanita);

        // =====================================
        // TANDA DIPILIH
        // =====================================

        const pilihPria=this.add.text(

            pria.x,

            665,

            "✓ Dipilih",

            {

                fontFamily:"Georgia",

                fontSize:"16px",

                color:"#2b9348",

                fontStyle:"bold"

            }

        ).setOrigin(.5).setVisible(false);

        const pilihWanita=this.add.text(

            wanita.x,

            665,

            "✓ Dipilih",

            {

                fontFamily:"Georgia",

                fontSize:"16px",

                color:"#2b9348",

                fontStyle:"bold"

            }

        ).setOrigin(.5).setVisible(false);

        let selectedCharacter=null;

        let pilihanKarakter="";
        // =====================================
        // POPUP TUTORIAL
        // =====================================

        this.popupTutorial = this.add.container(centerX, 360);

        this.popupTutorial.setDepth(100);

        this.popupTutorial.setVisible(false);

        // Shadow

        const popupShadow = this.add.rectangle(
            5,
            5,
            560,
            370,
            0x000000,
            0.18
        );

        // Background

        const popupBG = this.add.rectangle(
            0,
            0,
            560,
            370,
            0xffffff,
            0.98
        );

        popupBG.setStrokeStyle(4,0xd4af37);

        // Judul

        const popupTitle = this.add.text(

            0,

            -140,

            "📖 Cara Bermain",

            {

                fontFamily:"Georgia",

                fontSize:"28px",

                color:"#1b4332",

                fontStyle:"bold"

            }

        ).setOrigin(.5);

        // Isi

        const popupIsi=this.add.text(

            0,

            -15,

`🕹 Gunakan tombol arah untuk berjalan.

🌸 Dekati objek yang ada di taman.

📖 Tekan tombol BUKA untuk membaca informasi.

💍 Setelah semua objek selesai dibuka,
temui kedua mempelai di pelaminan.

🎉 Selamat menikmati petualangan!`,

            {

                fontFamily:"Georgia",

                fontSize:"18px",

                color:"#555555",

                align:"left",

                lineSpacing:12

            }

        ).setOrigin(.5);

        // Tombol

        const btnMulai=this.add.text(

            0,

            130,

            " MULAI PETUALANGAN ",

            {

                fontFamily:"Georgia",

                fontSize:"20px",

                fontStyle:"bold",

                backgroundColor:"#1b4332",

                color:"#ffffff",

                padding:{

                    left:25,

                    right:25,

                    top:12,

                    bottom:12

                }

            }

        )
        .setOrigin(.5)
        .setInteractive({useHandCursor:true});

        // Hover Tombol

        btnMulai.on("pointerover",()=>{

            btnMulai.setStyle({

                backgroundColor:"#2d6a4f"

            });

        });

        btnMulai.on("pointerout",()=>{

            btnMulai.setStyle({

                backgroundColor:"#1b4332"

            });

        });

        this.popupTutorial.add([

            popupShadow,

            popupBG,

            popupTitle,

            popupIsi,

            btnMulai

        ]);

        // =====================================
        // LOGIKA MEMILIH KARAKTER
        // =====================================

        const pilih=(obj,glow,label,tipe)=>{

            popSound.play();

            if(inputField.value.trim()!=""){

                namaTamu=inputField.value.trim();

            }

            pilihanKarakter=tipe;

            selectedCharacter=obj;

            glowPria.setAlpha(0);

            glowWanita.setAlpha(0);

            pilihPria.setVisible(false);

            pilihWanita.setVisible(false);

            pria.setScale(.28);

            wanita.setScale(.28);

            glow.setAlpha(.35);

            label.setVisible(true);

            obj.setScale(.31);

            pria.disableInteractive();

            wanita.disableInteractive();

            formElement.setVisible(false);

            this.time.delayedCall(300,()=>{

                this.popupTutorial.setScale(.8);

                this.popupTutorial.setAlpha(0);

                this.popupTutorial.setVisible(true);

                this.tweens.add({

                    targets:this.popupTutorial,

                    alpha:1,

                    scale:1,

                    duration:300,

                    ease:"Back.Out"

                });

            });

        };

        pria.on("pointerdown",()=>{

            pilih(

                pria,

                glowPria,

                pilihPria,

                "tamu_pria"

            );

        });

        wanita.on("pointerdown",()=>{

            pilih(

                wanita,

                glowWanita,

                pilihWanita,

                "tamu_wanita"

            );

        });

        // =====================================
        // MULAI GAME
        // =====================================

        btnMulai.on("pointerdown",()=>{

            popSound.play();

            this.cameras.main.fadeOut(600,0,0,0);

            this.time.delayedCall(600,()=>{

                this.scene.start(

                    "GardenScene",

                    {

                        charPilihan:pilihanKarakter,

                        namaTamu:namaTamu

                    }

                );

            });

        });
    }

}
