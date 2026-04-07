// ===================== العملات والرصيد =====================
let userCoins = 500;
let isDeveloper = false; // اجعلها true للمطورين
let userMaps = [];
let friends = JSON.parse(localStorage.getItem('friends')) || [];
let vpnActive = false;

// تحديث رصيد العملات
function updateCoinUI() {
  document.getElementById('coinBalance').innerText = userCoins;
  localStorage.setItem('userCoins', userCoins);
}

// شحن بالدولار
function chargeDollars() {
  let amount = prompt("كم دولار تريد شحنها؟ (1$ = 100 عملة)");
  if(amount && !isNaN(amount) && parseFloat(amount) > 0) {
    let coinsAdded = parseFloat(amount) * 100;
    userCoins += coinsAdded;
    updateCoinUI();
    showToast(`✓ تم شحن ${coinsAdded} عملة`);
  }
}

// ===================== VPN مجاني =====================
function toggleVPN() {
  vpnActive = !vpnActive;
  showToast(vpnActive ? "🔒 VPN متصل - اتصالك مشفر" : "🔓 VPN تم فصله");
  document.querySelector('.vpn-btn').style.background = vpnActive ? '#10b981' : '#7c3aed';
}

// ===================== المظاهر (Skins) =====================
const animeSkins = [
  { name: "ناروتو", price: 0, emoji: "🍥", rare: false },
  { name: "سايتاما", price: 200, emoji: "👊", rare: false },
  { name: "إيتشيغو", price: 350, emoji: "⚔️", rare: false },
  { name: "ليفاي", price: 500, emoji: "🌀", rare: true },
  { name: "جوجو", price: 800, emoji: "⭐", rare: true },
  { name: "إيزوكو", price: 1000, emoji: "💚", rare: true }
];

let ownedSkins = JSON.parse(localStorage.getItem('ownedSkins')) || [animeSkins[0].name];

function loadSkins() {
  const container = document.getElementById('skinsGrid');
  if(!container) return;
  container.innerHTML = animeSkins.map(skin => `
    <div class="skin-card">
      <div style="font-size: 48px; margin-bottom: 10px;">${skin.emoji}</div>
      <h3>${skin.name}</h3>
      <p>${skin.price === 0 ? "مجانية" : skin.price + " عملة"}</p>
      ${skin.rare ? '<span style="color:gold;">✨ نادر</span><br>' : ''}
      ${ownedSkins.includes(skin.name) 
        ? '<button disabled style="background:#555;">مملوكة</button>' 
        : `<button onclick="buySkin('${skin.name}', ${skin.price})">شراء</button>`}
    </div>
  `).join('');
}

function buySkin(name, price) {
  if(ownedSkins.includes(name)) {
    showToast("❌ لديك هذا المظهر بالفعل");
    return;
  }
  if(userCoins < price) {
    showToast("❌ رصيدك لا يكفي");
    return;
  }
  userCoins -= price;
  ownedSkins.push(name);
  localStorage.setItem('ownedSkins', JSON.stringify(ownedSkins));
  updateCoinUI();
  loadSkins();
  showToast(`✓ تم شراء مظهر ${name}`);
}

// ===================== الأصدقاء =====================
function updateFriendsUI() {
  const list = document.getElementById('friendsList');
  if(!list) return;
  if(friends.length === 0) {
    list.innerHTML = '<li style="text-align:center;">ليس لديك أصدقاء بعد</li>';
    return;
  }
  list.innerHTML = friends.map(f => `
    <li>
      <span>👤 ${f}</span>
      <button onclick="removeFriend('${f}')" style="background:#ef4444; border:none; padding:4px 12px; border-radius:20px; cursor:pointer;">حذف</button>
    </li>
  `).join('');
}

function addFriend() {
  let name = document.getElementById('friendName')?.value.trim();
  if(!name) {
    showToast("❌ أدخل اسم الصديق");
    return;
  }
  if(friends.includes(name)) {
    showToast("❌ هذا الصديق مضاف بالفعل");
    return;
  }
  friends.push(name);
  localStorage.setItem('friends', JSON.stringify(friends));
  document.getElementById('friendName').value = '';
  updateFriendsUI();
  showToast(`✓ تم إضافة ${name} كصديق`);
}

function removeFriend(name) {
  friends = friends.filter(f => f !== name);
  localStorage.setItem('friends', JSON.stringify(friends));
  updateFriendsUI();
  showToast(`✓ تم حذف ${name} من الأصدقاء`);
}

// ===================== المابات =====================
function createMap() {
  let mapName = prompt("أدخل اسم الخريطة الجديدة:");
  if(!mapName) return;
  
  if(isDeveloper) {
    userMaps.push(mapName);
    showToast(`🗺️ المطور: تم إنشاء خريطة "${mapName}"`);
  } else {
    if(userMaps.length < 1) {
      userMaps.push(mapName);
      showToast(`🗺️ تم إنشاء خريطة "${mapName}" (مسموح لك بخريطة واحدة فقط)`);
    } else {
      showToast("❌ اللاعبين العاديين يسمح لهم بخريطة واحدة فقط");
    }
  }
  updateMapsUI();
}

function updateMapsUI() {
  const container = document.getElementById('mapsList');
  if(!container) return;
  if(userMaps.length === 0) {
    container.innerHTML = '<p style="text-align:center;">لم تنشئ أي خريطة بعد</p>';
    return;
  }
  container.innerHTML = userMaps.map(map => `
    <div style="background:rgba(255,255,255,0.05); padding:12px; margin:10px 0; border-radius:15px;">
      🗺️ ${map}
    </div>
  `).join('');
}

// ===================== الألعاب =====================
const games = [
  { name: "MegaCastle Wars", players: "3,241", genre: "حرب", emoji: "🏰" },
  { name: "Lava Runner", players: "1,892", genre: "مغامرة", emoji: "🌋" },
  { name: "Voxel Farm", players: "5,510", genre: "زراعة", emoji: "🌿" },
  { name: "Neon Grid Battle", players: "2,780", genre: "سباق", emoji: "⚡" }
];

function loadGames() {
  const container = document.getElementById('gamesGrid');
  if(!container) return;
  container.innerHTML = games.map(game => `
    <div class="game-card">
      <div style="font-size: 48px; margin-bottom: 10px;">${game.emoji}</div>
      <h3>${game.name}</h3>
      <p>👥 ${game.players} لاعب</p>
      <p style="color:#a855f7;">${game.genre}</p>
      <button onclick="playGame('${game.name}')" style="margin-top:10px; background:#a855f7; border:none; padding:8px; border-radius:20px; color:white; cursor:pointer;">▶ العب</button>
    </div>
  `).join('');
}

function playGame(name) {
  showToast(`🎮 جاري تشغيل ${name}...`);
}

// ===================== تسجيل الدخول =====================
function isStrongPassword(pw) {
  return pw.length >= 8 && /[A-Za-z]/.test(pw) && /[0-9]/.test(pw);
}

function register() {
  let username = document.getElementById('regUsername').value.trim();
  let password = document.getElementById('regPassword').value;
  
  if(!username) {
    showToast("❌ أدخل اسم اللاعب");
    return;
  }
  if(!isStrongPassword(password)) {
    showToast("❌ كلمة المرور ضعيفة - 8 أحرف وأرقام على الأقل");
    return;
  }
  
  localStorage.setItem('gomak_user', username);
  localStorage.setItem('gomak_pass', password);
  showToast(`🎉 مرحباً ${username} في GOMAK`);
  closeModal();
}

function login() {
  let username = document.getElementById('loginUsername').value.trim();
  let password = document.getElementById('loginPassword').value;
  let savedUser = localStorage.getItem('gomak_user');
  let savedPass = localStorage.getItem('gomak_pass');
  
  if(username === savedUser && password === savedPass) {
    showToast(`👋 أهلاً بعودتك ${username}`);
    closeModal();
  } else {
    showToast("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
  }
}

// ===================== المودال =====================
function openModal() {
  document.getElementById('authModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('authModal').style.display = 'none';
}

function switchTab(tab) {
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const btns = document.querySelectorAll('.tab-btn');
  
  if(tab === 'login') {
    loginTab.style.display = 'block';
    registerTab.style.display = 'none';
    btns[0].classList.add('active');
    btns[1].classList.remove('active');
  } else {
    loginTab.style.display = 'none';
    registerTab.style.display = 'block';
    btns[0].classList.remove('active');
    btns[1].classList.add('active');
  }
}

// ===================== توست =====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===================== تحميل البيانات =====================
window.onload = () => {
  let savedCoins = localStorage.getItem('userCoins');
  if(savedCoins) userCoins = parseInt(savedCoins);
  updateCoinUI();
  loadGames();
  loadSkins();
  updateFriendsUI();
  updateMapsUI();
  
  // إغلاق المودال عند الضغط خارجها
  window.onclick = (e) => {
    let modal = document.getElementById('authModal');
    if(e.target === modal) closeModal();
  };
};
