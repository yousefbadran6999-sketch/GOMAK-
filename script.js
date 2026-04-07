// ===================== العملات والرصيد =====================
let userCoins = 500;
let friends = JSON.parse(localStorage.getItem('friends')) || [];
let vpnActive = false;

// تحديث رصيد العملات
function updateCoinUI() {
  document.getElementById('coinBalance').innerText = userCoins;
  localStorage.setItem('userCoins', userCoins);
}

// ===================== VPN =====================
function toggleVPN() {
  vpnActive = !vpnActive;
  showToast(vpnActive ? "🔒 VPN متصل - اتصالك مشفر" : "🔓 VPN تم فصله");
  document.querySelector('.vpn-btn').style.background = vpnActive ? '#10b981' : '#7c3aed';
}

// ===================== الألعاب (تشتغل فعلاً) =====================
const games = [
  { name: "Mega Castle Wars", players: "3,241", genre: "حرب", emoji: "🏰", gameFile: "game-demo.html" },
  { name: "Lava Runner", players: "1,892", genre: "مغامرة", emoji: "🌋", gameFile: "game-demo.html" },
  { name: "Voxel Farm", players: "5,510", genre: "زراعة", emoji: "🌿", gameFile: "game-demo.html" },
  { name: "Neon Grid", players: "2,780", genre: "سباق", emoji: "⚡", gameFile: "game-demo.html" },
  { name: "Desert Storm", players: "988", genre: "استراتيجية", emoji: "🏜️", gameFile: "game-demo.html" },
  { name: "Frost Arena", players: "4,102", genre: "PVP", emoji: "🧊", gameFile: "game-demo.html" }
];

function loadGames() {
  const container = document.getElementById('gamesGrid');
  if(!container) return;
  container.innerHTML = games.map(game => `
    <div class="game-card" onclick="openGame('${game.gameFile}', '${game.name}')">
      <div style="font-size: 48px; margin-bottom: 10px;">${game.emoji}</div>
      <h3>${game.name}</h3>
      <p>👥 ${game.players} لاعب</p>
      <p style="color:#a855f7;">${game.genre}</p>
      <button style="margin-top:10px; background:#a855f7; border:none; padding:8px; border-radius:20px; color:white; cursor:pointer;">▶ العب</button>
    </div>
  `).join('');
}

// فتح اللعبة في مودال
function openGame(gameFile, gameName) {
  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  frame.src = gameFile;
  modal.style.display = 'flex';
  showToast(`🎮 جاري تشغيل ${gameName}...`);
}

function closeGameModal() {
  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  frame.src = '';
  modal.style.display = 'none';
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

function openChargeModal() {
  document.getElementById('chargeModal').style.display = 'flex';
}

function closeChargeModal() {
  document.getElementById('chargeModal').style.display = 'none';
}

function openAvatarBuilder() {
  document.getElementById('avatar').scrollIntoView({ behavior: 'smooth' });
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
  updateFriendsUI();
  
  // إغلاق المودال عند الضغط خارجها
  window.onclick = (e) => {
    let authModal = document.getElementById('authModal');
    let chargeModal = document.getElementById('chargeModal');
    let gameModal = document.getElementById('gameModal');
    if(e.target === authModal) closeModal();
    if(e.target === chargeModal) closeChargeModal();
    if(e.target === gameModal) closeGameModal();
  };
};
