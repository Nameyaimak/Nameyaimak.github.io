const toggleSwitch = document.getElementById("darkmode-toggle");
const background = document.querySelector(".background");
const content = document.querySelector(".content");
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelectorAll(".nav-container a");
const navHeader = document.querySelector(".nav-container h1");

// ฟังก์ชันสำหรับตั้งค่าธีม
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        // โหมดมืด
        document.body.style.backgroundColor = "#242424";
        background.style.backgroundColor = "#242424";
        content.style.backgroundColor = "#242424";
        content.style.color = "#ffffff";
        navContainer.style.backgroundColor = "#242424";
        navLinks.forEach(link => {
            link.style.color = "#ffffff";
        });
        navHeader.style.color = "#ffffff";

    } else {
        // โหมดสว่าง
        document.body.style.backgroundColor = "#ffffff";
        background.style.backgroundColor = "#ffffff";
        content.style.backgroundColor = "#ffffff";
        content.style.color = "#000000";
        navContainer.style.backgroundColor = "#ffffff";
        navLinks.forEach(link => {
            link.style.color = "#000000";
        });
        navHeader.style.color = "#000000";
    }
}

// ตั้งค่าธีมเมื่อหน้าเว็บโหลด
window.addEventListener("DOMContentLoaded", function () {
    const isDarkMode = toggleSwitch.checked; // ตรวจสอบสถานะของ toggle
    applyTheme(isDarkMode); // ใช้ฟังก์ชันตั้งค่าธีม
});

// เพิ่ม event listener สำหรับสลับโหมด
toggleSwitch.addEventListener("change", function () {
    applyTheme(this.checked); // ใช้ฟังก์ชันตั้งค่าธีมตาม toggle
});



const texts = [
    "Nawapol Horthong"
];
let speed = 100; // ความเร็วในการพิมพ์
let eraseSpeed = 50; // ความเร็วในการลบ

const textElements = document.querySelector("span.name");

let textlndex = 0;
let charcterlndex = 0;
let currentText = ""; // เก็บข้อความที่พิมพ์แล้ว

function typeWriter() {
    if (charcterlndex < texts[textlndex].length) {
        // พิมพ์ข้อความใหม่ทีละตัว
        currentText += texts[textlndex].charAt(charcterlndex);
        textElements.innerHTML = currentText; // แสดงข้อความที่พิมพ์แล้ว
        charcterlndex++;
        setTimeout(typeWriter, speed); // พิมพ์ตัวถัดไป
    } else {
        // เมื่อพิมพ์เสร็จ ให้เริ่มลบข้อความใหม่ที่พิมพ์
        setTimeout(eraseText, 1000); // รอ 1 วินาที
    }
}

function eraseText() {
    if (charcterlndex > 0) {
        // ลบทีละตัวจากข้อความที่พิมพ์
        currentText = currentText.slice(0, -1);
        textElements.innerHTML = currentText; // อัปเดตข้อความที่แสดง
        charcterlndex--;
        setTimeout(eraseText, eraseSpeed); // ลบตัวถัดไป
    } else {
        // เมื่อข้อความที่พิมพ์ลบหมดแล้ว ไปที่ข้อความถัดไป
        textlndex = (textlndex + 1) % texts.length; // ไปที่ข้อความถัดไป
        setTimeout(typeWriter, 500); // รอ 500ms ก่อนเริ่มพิมพ์ข้อความใหม่
    }
}

window.onload = typeWriter; // เริ่มทำงานเมื่อโหลดหน้าจอ