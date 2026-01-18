const toggleSwitch = document.getElementById("darkmode-toggle");
const background = document.querySelector("#background");
const content = document.querySelector(".content");
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelectorAll(".nav-container a");
const navHeader = document.querySelector(".nav-container h1");
const hrElements = document.querySelectorAll("hr"); 
const skillHeader = document.querySelector("h1.skill");
const certificate = document.querySelector("h1.Certificate"); 
const footer = document.querySelector("h1.footer");

// ฟังก์ชันสำหรับตั้งค่าธีม
function applyTheme(isDarkMode) {
    const projectItems = document.querySelectorAll(".project-item");
    const projectInfo = document.querySelectorAll(".project-info h3");

    if (isDarkMode) {
        // --- Dark Mode ---
        document.body.style.backgroundColor = "#121212";
        content.style.backgroundColor = "#121212";
        content.style.color = "#ffffff";
        
        navLinks.forEach(link => link.style.color = "#ffffff");
        navHeader.style.color = "#ffffff";
        skillHeader.style.color = "#ffffff";
        if(certificate) certificate.style.color = "#ffffff";
        footer.style.color = "#ffffff";

        hrElements.forEach(hr => hr.style.backgroundColor = "#ffffff");

        // Skill colors
        document.querySelectorAll(".skill h3, .skill p").forEach(skill => skill.style.color = "#ffffff");
        document.querySelectorAll(".html-img, .css-img, .js-img, .cpp-img, .py-img").forEach(box => {
            box.style.backgroundColor = "#333"; 
            box.style.boxShadow = "0 0 25px #00b7ff"; 
        });

        // Profile Box
        const boxElement = document.querySelector(".box");
        if (boxElement) boxElement.style.boxShadow = "0 0 25px 5px #00b7ff"; 

        // Project Items (Glow, No Border)
        projectItems.forEach(item => {
            item.style.backgroundColor = "#242424";
            item.style.boxShadow = "0 0 20px #00b7ff"; 
            item.style.border = "none";
        });
        
        projectInfo.forEach(info => info.style.color = "#ffffff");

    } else {
        // --- Light Mode ---
        document.body.style.backgroundColor = "#ffffff";
        content.style.backgroundColor = "#ffffff";
        content.style.color = "#000000";
        
        navLinks.forEach(link => link.style.color = "#000000");
        navHeader.style.color = "#000000";
        skillHeader.style.color = "#000000";
        if(certificate) certificate.style.color = "#000000";
        footer.style.color = "#000000";

        hrElements.forEach(hr => hr.style.backgroundColor = "#000000");

        document.querySelectorAll(".skill h3, .skill p").forEach(skill => skill.style.color = "#000000");
        document.querySelectorAll(".html-img, .css-img, .js-img, .cpp-img, .py-img").forEach(box => {
            box.style.backgroundColor = "#ffffff"; 
            box.style.boxShadow = "0 0 25px #ff5733"; 
        });

        const boxElement = document.querySelector(".box");
        if (boxElement) boxElement.style.boxShadow = "0 0 25px 5px #ff5733"; 

        // Project Items
        projectItems.forEach(item => {
            item.style.backgroundColor = "#ffffff";
            item.style.boxShadow = "0 0 20px #ff5733"; 
            item.style.border = "none";
        });

        projectInfo.forEach(info => info.style.color = "#333333");
    }
}

// Initial Theme Check
window.addEventListener("DOMContentLoaded", function () {
    const isDarkMode = toggleSwitch.checked; 
    applyTheme(isDarkMode); 
});

toggleSwitch.addEventListener("change", function () {
    applyTheme(this.checked); 
});

// CSS Transitions
document.querySelectorAll('*').forEach(element => {
    element.style.transition = "all 0.1s ease-in-out";
});

// Typing Effect
const texts = ["Nawaphon Horthong"];
let speed = 100; 
let eraseSpeed = 50; 
const textElements = document.querySelector("span.name");
let textIndex = 0;
let characterIndex = 0;
let currentText = ""; 

function typeWriter() {
    if(!textElements) return; 
    if (characterIndex < texts[textIndex].length) {
        currentText += texts[textIndex].charAt(characterIndex);
        textElements.innerHTML = currentText; 
        characterIndex++;
        setTimeout(typeWriter, speed); 
    } else {
        setTimeout(eraseText, 1000); 
    }
}

function eraseText() {
    if(!textElements) return;
    if (characterIndex > 0) {
        currentText = currentText.slice(0, -1);
        textElements.innerHTML = currentText; 
        characterIndex--;
        setTimeout(eraseText, eraseSpeed); 
    } else {
        textIndex = (textIndex + 1) % texts.length; 
        setTimeout(typeWriter, 500); 
    }
}
window.onload = typeWriter;

// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');
  if(menuToggle && menu) {
      menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
        menuToggle.classList.toggle('active');
      });
  }
  const darkToggle = document.getElementById('darkmode-toggle');
  if(darkToggle) {
      darkToggle.addEventListener('change', () => {
        document.body.classList.toggle('darkmode', darkToggle.checked);
      });
  }
});

// --- Project Modal Logic (Multi-Image Support) ---
const projectItems = document.querySelectorAll('.project-item');
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const imageCounter = document.getElementById('image-counter'); // ตัวบอกจำนวนรูป
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImages = []; // เก็บรายชื่อรูปภาพของโปรเจกต์ปัจจุบัน
let currentImageIndex = 0; // ตำแหน่งรูปปัจจุบัน

// ฟังก์ชันอัปเดตรูปภาพใน Modal
function updateModalImage() {
    if (currentImages.length > 0) {
        modalImg.src = currentImages[currentImageIndex];
        
        // แสดงจำนวนรูป (ถ้ามีมากกว่า 1)
        if (currentImages.length > 1) {
            imageCounter.style.display = "block";
            imageCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        } else {
            imageCounter.style.display = "none";
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
    }
}

if (projectItems.length > 0 && modal) {
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            // ดึงข้อมูลรูปภาพ (แยกด้วย comma)
            const imagesAttr = item.getAttribute('data-images');
            
            // ถ้ามี data-images ให้ใช้ ถ้าไม่มีให้ใช้ src จาก img tag
            if (imagesAttr) {
                currentImages = imagesAttr.split(',').map(src => src.trim());
            } else {
                const img = item.querySelector('img').src;
                currentImages = [img];
            }
            
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            // Reset Index
            currentImageIndex = 0;
            
            // อัปเดตข้อมูล
            updateModalImage();
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; 
        });
    });

    // ปุ่มปิด
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    }

    // คลิกข้างนอกปิด
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // ปุ่มถัดไป
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex++;
            if (currentImageIndex >= currentImages.length) {
                currentImageIndex = 0; // วนกลับไปรูปแรก
            }
            updateModalImage();
        });
    }

    // ปุ่มย้อนกลับ
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = currentImages.length - 1; // วนไปรูปสุดท้าย
            }
            updateModalImage();
        });
    }
}

// --- Logic เดิมสำหรับ Certificate (เผื่อไว้ถ้ายังใช้) ---
const images = document.querySelectorAll('.certificate-item img');
const overlay = document.getElementById('overlay');

if(images.length > 0 && overlay) {
    images.forEach(img => {
      img.addEventListener('click', () => {
        img.classList.add('active');
        overlay.classList.add('active');
      });
    });

    overlay.addEventListener('click', () => {
      images.forEach(img => img.classList.remove('active'));
      overlay.classList.remove('active');
    });
}
