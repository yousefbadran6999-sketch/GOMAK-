// ===================== نظام الأفاتار 3D =====================
let avatarCanvas, ctx;
let avatarParts = {
  skin: 'naruto',
  hair: 'spiky',
  clothes: 'ninja',
  shoes: 'ninja'
};

// ألوان وأشكال مختلفة حسب الاختيار
const skinColors = {
  naruto: '#f5c9a0',
  saitama: '#e8b88a',
  luffy: '#f0c8a0',
  goku: '#f0c8a0'
};

const hairStyles = {
  spiky: { color: '#ff6600', type: 'spiky' },
  long: { color: '#1a1a1a', type: 'long' },
  short: { color: '#4a4a4a', type: 'short' },
  bald: { color: '#f0c8a0', type: 'bald' }
};

const clothesStyles = {
  ninja: { color1: '#2d2d2d', color2: '#8b4513' },
  samurai: { color1: '#8b0000', color2: '#d4af37' },
  casual: { color1: '#4a90e2', color2: '#ffffff' },
  sport: { color1: '#f39c12', color2: '#2c3e50' }
};

// تهيئة الكانفاس
function initAvatarCanvas() {
  avatarCanvas = document.getElementById('avatarCanvas');
  if(!avatarCanvas) return;
  ctx = avatarCanvas.getContext('2d');
  drawAvatar();
}

// رسم الأفاتار
function drawAvatar() {
  if(!ctx) return;
  const w = 300, h = 300;
  ctx.clearRect(0, 0, w, h);
  
  // خلفية
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, w, h);
  
  // الجسم
  const skinColor = skinColors[avatarParts.skin] || '#f5c9a0';
  
  // الرأس
  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.arc(150, 130, 45, 0, Math.PI * 2);
  ctx.fill();
  
  // العيون
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(125, 120, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(175, 120, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // بؤبؤ العين
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.arc(125, 120, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(175, 120, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // الفم
  ctx.beginPath();
  ctx.arc(150, 150, 15, 0, Math.PI);
  ctx.fillStyle = '#c0392b';
  ctx.fill();
  
  // الشعر
  if(avatarParts.hair !== 'bald') {
    const hair = hairStyles[avatarParts.hair];
    ctx.fillStyle = hair.color;
    if(avatarParts.hair === 'spiky') {
      ctx.beginPath();
      ctx.moveTo(150, 70);
      ctx.lineTo(120, 85);
      ctx.lineTo(130, 80);
      ctx.lineTo(110, 95);
      ctx.lineTo(125, 90);
      ctx.lineTo(105, 105);
      ctx.lineTo(140, 95);
      ctx.lineTo(150, 70);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(150, 70);
      ctx.lineTo(180, 85);
      ctx.lineTo(170, 80);
      ctx.lineTo(190, 95);
      ctx.lineTo(175, 90);
      ctx.lineTo(195, 105);
      ctx.lineTo(160, 95);
      ctx.lineTo(150, 70);
      ctx.fill();
    } else if(avatarParts.hair === 'long') {
      ctx.fillRect(120, 70, 60, 40);
    } else {
      ctx.fillRect(125, 75, 50, 25);
    }
  }
  
  // الجسد (الملابس)
  const clothes = clothesStyles[avatarParts.clothes];
  ctx.fillStyle = clothes.color1;
  ctx.fillRect(115, 175, 70, 80);
  
  // حزام
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(115, 200, 70, 10);
  
  // الأرجل
  ctx.fillStyle = clothes.color2;
  ctx.fillRect(120, 255, 20, 30);
  ctx.fillRect(160, 255, 20, 30);
  
  // الحذاء
  const shoeColor = avatarParts.shoes === 'ninja' ? '#4a4a4a' : (avatarParts.shoes === 'sneakers' ? '#e74c3c' : '#5d4037');
  ctx.fillStyle = shoeColor;
  ctx.fillRect(115, 280, 25, 15);
  ctx.fillRect(160, 280, 25, 15);
}

// تحديث المظهر
function updateAvatarSkin() {
  const select = document.getElementById('skinSelect');
  if(select) avatarParts.skin = select.value;
  drawAvatar();
  saveAvatar();
}

function updateAvatarHair() {
  const select = document.getElementById('hairSelect');
  if(select) avatarParts.hair = select.value;
  drawAvatar();
  saveAvatar();
}

function updateAvatarClothes() {
  const select = document.getElementById('clothesSelect');
  if(select) avatarParts.clothes = select.value;
  drawAvatar();
  saveAvatar();
}

function updateAvatarShoes() {
  const select = document.getElementById('shoesSelect');
  if(select) avatarParts.shoes = select.value;
  drawAvatar();
  saveAvatar();
}

function saveAvatar() {
  localStorage.setItem('gomak_avatar', JSON.stringify(avatarParts));
}

function loadAvatar() {
  const saved = localStorage.getItem('gomak_avatar');
  if(saved) {
    avatarParts = JSON.parse(saved);
    // تحديث قيم الـ select
    const skinSelect = document.getElementById('skinSelect');
    const hairSelect = document.getElementById('hairSelect');
    const clothesSelect = document.getElementById('clothesSelect');
    const shoesSelect = document.getElementById('shoesSelect');
    if(skinSelect) skinSelect.value = avatarParts.skin;
    if(hairSelect) hairSelect.value = avatarParts.hair;
    if(clothesSelect) clothesSelect.value = avatarParts.clothes;
    if(shoesSelect) shoesSelect.value = avatarParts.shoes;
  }
  drawAvatar();
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  initAvatarCanvas();
  loadAvatar();
});
