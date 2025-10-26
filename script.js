document.addEventListener('DOMContentLoaded', () => {
  const front = document.getElementById('front-page');
  const main = document.getElementById('main-content');
  const envelope = document.getElementById('envelope');
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popupLetter');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  // Keep track of timeouts/intervals from typing so we can cancel them
  let typingTimeouts = [];
  function clearTyping() {
    typingTimeouts.forEach(id => clearTimeout(id));
    typingTimeouts = [];
  }

  // floating hearts
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-shape';
    heart.innerHTML = '💚';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (6 + Math.random() * 5) + 's';
    heart.style.fontSize = (14 + Math.random() * 28) + 'px';
    document.body.appendChild(heart);
  }

  // Typewriter effect for front page headline
  const frontText = document.querySelector('#front-page h1');
  const frontContent = frontText ? frontText.textContent : '';
  if (frontText) {
    frontText.textContent = '';
    let idx = 0;
    const frontInterval = setInterval(() => {
      frontText.textContent += frontContent.charAt(idx);
      idx++;
      if (idx >= frontContent.length) clearInterval(frontInterval);
    }, 50);
  }

  // Random floating mini hearts in main content
  setInterval(() => {
    const miniHeart = document.createElement('div');
    miniHeart.className = 'mini-heart';
    miniHeart.innerHTML = '💚';
    miniHeart.style.left = Math.random() * 100 + 'vw';
    miniHeart.style.fontSize = (10 + Math.random() * 15) + 'px';
    miniHeart.style.animationDuration = (5 + Math.random() * 5) + 's';
    document.body.appendChild(miniHeart);
    setTimeout(() => miniHeart.remove(), 8000);
  }, 800);

  const transitionPage = document.getElementById('transition-envelope-page');
const bigEnvelope = document.getElementById('bigEnvelope');

yesBtn.addEventListener('click', () => {
  // Hide front page
  front.style.opacity = '0';
  setTimeout(() => {
    front.style.display = 'none';
    transitionPage.classList.add('show');
  }, 700);
});

// When the big envelope is clicked, open it and reveal the main content
bigEnvelope.addEventListener('click', () => {
  const flap = bigEnvelope.querySelector('.flap');
  flap.classList.add('open');

  // Envelope burst confetti
  spawnConfetti(50);

  setTimeout(() => { transitionPage.style.opacity = '0'; }, 1500);
  setTimeout(() => { 
    transitionPage.style.display = 'none';
    main.classList.add('show');
    document.body.style.overflow = 'auto';
  }, 2300);
});



  noBtn.addEventListener('click', () => {
    alert("Awww... okay maybe later 😢");
  });

  // Utility: open popup
  function openPopup() {
    const flap = envelope.querySelector('.flap');

    // If already showing, do nothing
    if (popup.classList.contains('show')) return;

    // Ensure popup responds to pointer events
    popup.style.pointerEvents = 'auto';

    flap.classList.add('open');
    overlay.classList.add('show');
    popup.classList.add('show');

    // Prevent background scroll while popup is open
    document.body.style.overflow = 'hidden';

    // Typing animation - clear any previous typing first
    clearTyping();
    const paragraphs = popup.querySelectorAll('.popup-para');
    paragraphs.forEach(p => p.textContent = '');

    // Stagger typing for each paragraph, but keep references to timeouts
    let delay = 0;
    paragraphs.forEach((p) => {
      const fullText = p.dataset.text || '';
      let i = 0;
      const typeStep = () => {
        if (i < fullText.length && popup.classList.contains('show')) {
          p.textContent += fullText.charAt(i);
          i++;
          const t = setTimeout(typeStep, 8);
          typingTimeouts.push(t);
        }
      };
      const tStart = setTimeout(typeStep, delay);
      typingTimeouts.push(tStart);
      delay += Math.max(300, fullText.length * 10) + 100;
    });

    spawnConfetti(80);
  }

  // Utility: close popup
  function closePopup() {
    const flap = envelope.querySelector('.flap');

    // Hide popup and overlay immediately
    overlay.classList.remove('show');
    popup.classList.remove('show');

    // Disable pointer interactions for popup while hidden
    popup.style.pointerEvents = 'none';

    // Stop typing animation timeouts
    clearTyping();

    // Re-enable background scroll
    document.body.style.overflow = 'auto';

    // Delay removing 'open' so the closing animation can play smoothly
    // Match this delay to your flap transition duration (CSS: transition: transform 1.2s)
    // We'll use a shorter delay (400ms) so it feels snappy but not instant.
    setTimeout(() => {
      flap.classList.remove('open');
    }, 400);
  }

  // Envelope click flap + popup (use openPopup)
  envelope.addEventListener('click', () => {
    openPopup();
  });

  // Close popup when overlay clicked
  overlay.addEventListener('click', () => {
    closePopup();
  });

  // Also allow pressing Escape to close the popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      closePopup();
    }
  });

  // Confetti
  function spawnConfetti(count) {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      document.body.appendChild(confetti);

      const falling = setInterval(() => {
        const top = parseFloat(confetti.style.top);
        confetti.style.top = (top + Math.random() * 5 + 2) + 'px';
        confetti.style.left = (parseFloat(confetti.style.left) + Math.random() * 4 - 2) + 'px';
        if (top > window.innerHeight) {
          confetti.remove();
          clearInterval(falling);
        }
      }, 16);
    }
  }

  // Sparkle particles
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    document.body.appendChild(sparkle);
  }

  // Floating birthday messages
  const messages = ['💚', '💚', '💚', '💚'];
  messages.forEach((msg, i) => {
    const span = document.createElement('div');
    span.className = 'floating-msg';
    span.textContent = msg;
    span.style.left = (10 + i * 20) + 'vw';
    span.style.animationDelay = (i * 2) + 's';
    document.body.appendChild(span);
  });
// --- Spawn floating balloons ---
setInterval(() => {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * 100 + 'vw';
  balloon.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
  balloon.style.animationDuration = (6 + Math.random() * 5) + 's';
  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 12000); // remove after animation
}, 1500);

// --- Spawn starfield ---
for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.animationDelay = Math.random() * 3 + 's';
  document.body.appendChild(star);
}
// Spawn floating gifts randomly
setInterval(() => {
  const gift = document.createElement('div');
  gift.className = 'gift';
  gift.style.left = Math.random() * 100 + 'vw';
  gift.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
  gift.style.animationDuration = (6 + Math.random() * 5) + 's';
  document.body.appendChild(gift);
  setTimeout(() => gift.remove(), 12000);
}, 2000);
function spawnFirework(x, y, count = 20) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
    document.body.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 6 + 3;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    let life = 0;

    const interval = setInterval(() => {
      life++;
      particle.style.left = parseFloat(particle.style.left) + vx + 'px';
      particle.style.top = parseFloat(particle.style.top) + vy + 'px';
      vy += 0.1; // gravity effect
      particle.style.opacity = 1 - life / 50;

      if (life > 50) {
        clearInterval(interval);
        particle.remove();
      }
    }, 16);
  }
}
function spawnEnvelopeBurst(count = 30) {
  const envelopeRect = envelope.getBoundingClientRect();
  const centerX = envelopeRect.left + envelopeRect.width / 2;
  const centerY = envelopeRect.top + envelopeRect.height / 2;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti';
    particle.style.left = centerX + 'px';
    particle.style.top = centerY + 'px';
    particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    particle.style.width = particle.style.height = `${Math.random() * 8 + 4}px`;
    document.body.appendChild(particle);

    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 8 + 4;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    let life = 0;

    const interval = setInterval(() => {
      life++;
      particle.style.left = parseFloat(particle.style.left) + vx + 'px';
      particle.style.top = parseFloat(particle.style.top) + vy + 'px';
      vy += 0.2; // gravity
      particle.style.opacity = 1 - life / 60;

      if (life > 60) {
        clearInterval(interval);
        particle.remove();
      }
    }, 16);
  }
}
envelope.addEventListener('click', () => {
  openPopup(); // show the popup
  spawnEnvelopeBurst(40); // burst of confetti

  // Delay fireworks slightly so flap opening doesn't interfere
  setTimeout(() => {
    const rect = envelope.getBoundingClientRect();
    spawnFirework(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      25
    );
  }, 150); // 150ms delay
});

});
