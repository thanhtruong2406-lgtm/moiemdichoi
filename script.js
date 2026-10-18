
/* =========================================
   THIỆP 20-10 - SCRIPT.JS
   Google Apps Script + Google Sheets
========================================= */

// URL Google Apps Script của bạn
const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzZc4iGDr9uv81W18vAiGWEzgTFNFrzOCwzRu8MAkQP7Bc6xyhlLJkZhhSDVQ6UuwvY/exec";

// ========== KHAI BÁO ==========

const $ = (selector) => document.querySelector(selector);

const state = {
    food: "",
    coffee: "",
    kiss: ""
};

const labels = {
    food: $("#summaryFood"),
    coffee: $("#summaryCoffee"),
    kiss: $("#summaryKiss")
};

const esc = (value) => String(value || "").trim();


// ========== HIỆU ỨNG TIM BAY ==========

function driftHeart() {
    const container = $("#hearts");

    if (!container) return;

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    const hearts = ["♡", "♥", "✦", "🌸"];

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDuration =
        (8 + Math.random() * 8) + "s";

    heart.style.fontSize =
        (14 + Math.random() * 18) + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 16000);
}

// Tim bay khi tải trang
for (let i = 0; i < 16; i++) {
    setTimeout(driftHeart, i * 440);
}

setInterval(driftHeart, 1150);


// ========== MỞ THIỆP ==========

function openLetter() {
    const intro = $("#intro");

    if (!intro || intro.classList.contains("gone")) {
        return;
    }

    $("#openLetter").classList.add("opening");

    setTimeout(() => {
        intro.classList.add("gone");

        $("#experience").classList.remove("hidden");

        requestAnimationFrame(() => {
            $("#experience").classList.add("shown");
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        for (let i = 0; i < 28; i++) {
            setTimeout(driftHeart, i * 65);
        }
    }, 950);
}

$("#openLetter").addEventListener("click", openLetter);
$("#openBtn").addEventListener("click", openLetter);


// ========== CẬP NHẬT LỰA CHỌN ==========

function sync() {

    // Món ăn
    if (state.food === "Món em đang thèm") {
        labels.food.textContent =
            esc($("#foodCustom").value) || "Món em đang thèm";
    } else {
        labels.food.textContent =
            state.food || "Chưa chọn";
    }

    // Cà phê
    if (state.coffee === "Quán em thích") {
        labels.coffee.textContent =
            esc($("#coffeeCustom").value) || "Quán em thích";
    } else {
        labels.coffee.textContent =
            state.coffee || "Chưa chọn";
    }

    // Hun nhau
    if (state.kiss) {
        labels.kiss.textContent =
            state.kiss.startsWith("Yes")
                ? "Yes 💘"
                : "No 🌷";
    } else {
        labels.kiss.textContent = "Chưa chọn";
    }
}


// ========== XỬ LÝ NÚT CHỌN ==========

document.querySelectorAll("[data-group]").forEach((btn) => {

    btn.addEventListener("click", () => {

        const group = btn.dataset.group;

        // Bỏ chọn các nút cùng nhóm
        document
            .querySelectorAll(`[data-group="${group}"]`)
            .forEach((button) => {
                button.classList.remove("selected");
                button.setAttribute("aria-pressed", "false");
            });

        // Đánh dấu nút đang chọn
        btn.classList.add("selected");

        btn.setAttribute("aria-pressed", "true");

        state[group] = btn.dataset.value;

        // Hiện / ẩn ô nhập món ăn
        const customFood =
            state.food === "Món em đang thèm";

        $("#foodCustomLabel").classList.toggle(
            "hidden",
            !customFood
        );

        $("#foodCustom").classList.toggle(
            "hidden",
            !customFood
        );

        // Hiện / ẩn ô nhập quán cà phê
        const customCoffee =
            state.coffee === "Quán em thích";

        $("#coffeeCustomLabel").classList.toggle(
            "hidden",
            !customCoffee
        );

        $("#coffeeCustom").classList.toggle(
            "hidden",
            !customCoffee
        );

        // Phản hồi Yes / No
        if (group === "kiss") {
            $("#kissFeedback").textContent =
                state.kiss.startsWith("Yes")
                    ? "Huhu anh vui quá trời! Nhưng em đổi ý lúc nào cũng được nha 💗"
                    : "Dạ, không sao hết. Anh vẫn rất vui khi được đi chơi với em 🌷";
        }

        sync();
    });
});


// ========== NHẬP LỰA CHỌN KHÁC ==========

$("#foodCustom").addEventListener("input", sync);

$("#coffeeCustom").addEventListener("input", sync);


// ========== KIỂM TRA FORM ==========

function validateForm() {
    const status = $("#formFeedback");

    if (!state.food || !state.coffee || !state.kiss) {
        status.textContent =
            "Em chọn đủ 3 mục rồi gửi cho anh nha 🥺";

        return false;
    }

    if (
        state.food === "Món em đang thèm" &&
        !esc($("#foodCustom").value)
    ) {
        status.textContent =
            "Em ghi món mình đang thèm giúp anh nha 🍜";

        $("#foodCustom").focus();

        return false;
    }

    if (
        state.coffee === "Quán em thích" &&
        !esc($("#coffeeCustom").value)
    ) {
        status.textContent =
            "Em điền tên quán em thích nha ☕";

        $("#coffeeCustom").focus();

        return false;
    }

    return true;
}


// ========== LẤY DỮ LIỆU FORM ==========

function getFormData() {
    return {
        food: labels.food.textContent,
        cafe: labels.coffee.textContent,
        answer: state.kiss,
        note: esc($("#extraNote").value) || "(Không có)"
    };
}


// ========== GỬI GOOGLE SHEETS ==========

async function sendToGoogleSheets(data) {

    // Google Apps Script Web App
    // no-cors: không đọc được phản hồi từ server

    await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
    });
}


// ========== NÚT GỬI LỰA CHỌN ==========

$("#submitBtn").addEventListener("click", async () => {

    const status = $("#formFeedback");
    const btn = $("#submitBtn");

    // Kiểm tra form
    if (!validateForm()) return;

    // Khóa nút để tránh gửi liên tục
    btn.disabled = true;

    btn.textContent = "Đang gửi lời thương... 💌";

    status.textContent = "";

    const payload = getFormData();

    try {

        // Gửi dữ liệu
        await sendToGoogleSheets(payload);

        // Với no-cors, chưa xác minh được Sheet đã lưu
        status.textContent =
            "Đã gửi yêu cầu 💗 Anh sẽ kiểm tra Google Sheets nha!";

        // Hiệu ứng tim
        for (let i = 0; i < 35; i++) {
            setTimeout(driftHeart, i * 45);
        }

    } catch (error) {

        console.error("Lỗi gửi dữ liệu:", error);

        status.textContent =
            "Chưa gửi được. Em thử lại nha 🥺";

    } finally {

        btn.disabled = false;

        btn.innerHTML =
            'Gửi lựa chọn cho anh <span>💌</span>';
    }
});


// ========== ĐÓNG POPUP ==========

$("#closeModal").addEventListener("click", () => {
    $("#successModal").classList.add("hidden");
});

$("#successModal").addEventListener("click", (e) => {

    if (e.target.id === "successModal") {
        e.target.classList.add("hidden");
    }
});


// ========== NHẠC NỀN ==========

let audioCtx;
let musicOn = false;
let musicTimer;

const notes = [
    392,
    440,
    523.25,
    440,
    349.23,
    392,
    440,
    329.63
];

$("#soundBtn").addEventListener("click", () => {

    musicOn = !musicOn;

    $("#soundBtn span").textContent =
        musicOn ? "Music on" : "Music off";

    // Tắt nhạc
    if (!musicOn) {

        clearInterval(musicTimer);

        if (audioCtx) {
            audioCtx.suspend();
        }

        return;
    }

    // Khởi tạo AudioContext
    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) {
        musicOn = false;
        return;
    }

    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    audioCtx.resume();

    let n = 0;

    // Phát một nốt nhạc
    const play = () => {

        const oscillator =
            audioCtx.createOscillator();

        const gain =
            audioCtx.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value =
            notes[n++ % notes.length];

        gain.gain.setValueAtTime(
            0.00001,
            audioCtx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.025,
            audioCtx.currentTime + 0.035
        );

        gain.gain.exponentialRampToValueAtTime(
            0.00001,
            audioCtx.currentTime + 0.34
        );

        oscillator.connect(gain);

        gain.connect(audioCtx.destination);

        oscillator.start();

        oscillator.stop(
            audioCtx.currentTime + 0.36
        );
    };

    play();

    musicTimer = setInterval(play, 510);
});
