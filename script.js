document.getElementById('turn-on-btn').addEventListener('click', () => {
  document.getElementById('dark-screen').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';
  launchBalloons();

  if (player) {
    player.playVideo(); // เล่นเพลง YouTube
  }

  const hint = document.querySelector('.hint-text');
  if(hint) {
    hint.style.display = 'block';}
});

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
}


const soundBtn = document.getElementById('toggle-sound-btn');
let isMuted = true;

soundBtn.addEventListener('click', () => {
  if (!player) return;

  if (isMuted) {
    player.unMute();
    soundBtn.textContent = '🔇 ปิดเสียง';
  } else {
    player.mute();
    soundBtn.textContent = '🔈 เปิดเสียง';
  }

  isMuted = !isMuted;
});

const wishes = [
  "ขอให้มีความสุขมาก ๆ นะคะ ❤️",
  "ขอให้ม่าม้าสุขภาพแข็งแรงวิ่งแข็งกับดีดี้ได้เลยค่ะ 🌸",
  "ขอให้ลูกค้าเข้าร้านเยอะๆนะคะ 🥰",
  "ม่าม้าหวังอะไรขอให้สมปรารถนาทุกอย่างเลยค่ะ 🌟",
  "รักม่าม้าเสมอค่ะ 💖"
];

const popSound = document.getElementById('pop-sound');

function launchBalloons() {
  const container = document.getElementById('balloons-container');
  const colors = ['#ff6b81', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];

  for (let i = 0; i < 5; i++) {
    const balloonWrapper = document.createElement('div');
    balloonWrapper.className = 'balloon-wrapper';
    balloonWrapper.style.left = `${Math.random() * 90 + 5}%`;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.backgroundColor = colors[i % colors.length];
    balloonWrapper.appendChild(balloon);

    const string = document.createElement('div');
    string.className = 'string';
    balloonWrapper.appendChild(string);

    // ตั้ง animation float ลูกโป่ง
    const delay = i * 1.5;
    balloonWrapper.style.animation = `floatUp 12s linear infinite`;
    balloonWrapper.style.animationDelay = `${delay}s`;

    // เพิ่ม event click แสดงคำอวยพร
    balloonWrapper.addEventListener('click', () => {
      showWish(wishes[i]);
      popSound.currentTime = 0;
      popSound.play();

      // เพิ่มคลาส animation "pop-click" (เราจะเขียน CSS ต่อ)
      balloon.classList.add('pop-click');
    });

    container.appendChild(balloonWrapper);
  }
}

function showWish(message) {
  const hint = document.querySelector('.hint-text');
  hint.style.display = 'none';
  let existing = document.getElementById('wish-popup');
  if (existing) {
    existing.remove();
  }

  const popup = document.createElement('div');
  popup.id = 'wish-popup';
  popup.textContent = message;
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%) scale(0)';
  popup.style.backgroundColor = 'rgba(255, 220, 87, 0.9)';
  popup.style.padding = '20px 30px';
  popup.style.borderRadius = '15px';
  popup.style.color = '#d6336c';
  popup.style.fontSize = '1.5rem';
  popup.style.fontWeight = 'bold';
  popup.style.boxShadow = '0 0 10px rgba(214, 51, 108, 0.7)';
  popup.style.zIndex = '1000';
  popup.style.transition = 'transform 0.3s ease';

  setTimeout(() => {
      hint.style.display = 'block';
    }, 10000);

  document.body.appendChild(popup);

  // แอนิเมชันขยาย popup
  setTimeout(() => {
    popup.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 50);

  // ซ่อน popup หลัง 3 วินาที
  setTimeout(() => {
    popup.style.transform = 'translate(-50%, -50%) scale(0)';
  }, 3000);

  // ลบ popup หลังแอนิเมชันจบ
  setTimeout(() => {
    popup.remove();
  }, 3500);
}




