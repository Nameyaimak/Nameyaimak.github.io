const toggleSwitch = document.getElementById("darkmode-toggle");
const background = document.querySelector("#background");
const content = document.querySelector(".content");
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelectorAll(".nav-container a");
const navHeader = document.querySelector(".nav-container h1");
const hrElement = document.querySelector('.divider');
const skillHeader = document.querySelector('h1.skill');
const certificate = document.querySelector('h1.Certificate');
const footer = document.querySelector('h1.footer')

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
        hrElement.style.backgroundColor = "#ffffff"; // เปลี่ยนสี hr
        skillHeader.style.color = "#ffffff";
        certificate.style.color = "#ffffff";
        footer.style.color = "#ffffff";

        // เปลี่ยนสีส่วนของ skills
        const skillElements = document.querySelectorAll(".skill h3, .skill p");
        skillElements.forEach(skill => {
            skill.style.color = "#ffffff"; // เปลี่ยนสีข้อความ
        });
        const skillBoxes = document.querySelectorAll(".html-img, .css-img, .js-img");
        skillBoxes.forEach(box => {
            box.style.backgroundColor = "#ffffff"; // พื้นหลังสีขาว
            box.style.boxShadow = "0 0 25px #00b7ff"; // เงาสีฟ้า               เปลี่ยนสีเงาตรงนี้     
        const boxElement = document.querySelector(".box");
        boxElement.style.boxShadow = "0 0 25px 5px #00b7ff"; // กรอบเรืองแสงสีฟ้า  เปลี่ยนสีเงาตรงนี้  
             
        });
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
        hrElement.style.backgroundColor = "#000000"; // เปลี่ยนสี hr
        skillHeader.style.color = "#000000";
        certificate.style.color = "#000000";
        footer.style.color = "#000000";

        // เปลี่ยนสีส่วนของ skills
        const skillElements = document.querySelectorAll(".skill h3, .skill p");
        skillElements.forEach(skill => {
            skill.style.color = "#000000"; // เปลี่ยนสีข้อความ
        });
        const skillBoxes = document.querySelectorAll(".html-img, .css-img, .js-img");
        skillBoxes.forEach(box => {
            box.style.backgroundColor = "#ffffff"; // สีพื้นหลังของกล่อง
            box.style.boxShadow = "0 0 25px #ff5733"; // เงาสี                เปลี่ยนสีเงาตรงนี้    
        const boxElement = document.querySelector(".box");
        boxElement.style.boxShadow = "0 0 25px 5px #ff5733"; // กรอบเรืองแสงสีส้ม เปลี่ยนสีเงาตรงนี้  
        });
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

// CSS transitions สำหรับความสมูท
document.querySelectorAll('*').forEach(element => {
    element.style.transition = "all 0.1s ease-in-out";
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
