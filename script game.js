// Ambil elemen DOM
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverText = document.getElementById('gameOverText');

// Inisialisasi variabel game
let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

// Mulai Game
function startGame() {
  score = 0;
  timeLeft = 30;
  updateDisplay();

  clearInterval(gameInterval);
  clearInterval(timerInterval);

  // Reset game over
  gameOverText.style.display = "none";
  gameOverText.classList.remove('fade-in', 'fade-out');

  spawnBox();
  gameInterval = setInterval(spawnBox, 1000);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      gameArea.innerHTML = '';

      // Tampilkan teks Game Over dengan animasi fade
      gameOverText.innerHTML = `⏰ Waktu Habis!<br>🎯 Skormu: <strong>${score}</strong>`;
      gameOverText.style.display = "block";
      gameOverText.classList.add('fade-in');

      // Tunggu 5 detik, lalu fade out
      setTimeout(() => {
        gameOverText.classList.remove('fade-in');
        gameOverText.classList.add('fade-out');

        // Sembunyikan setelah animasi selesai
        setTimeout(() => {
          gameOverText.style.display = "none";
        }, 1000); // waktu animasi fade-out
      }, 5000);
    }
  }, 1000);
}

function updateDisplay() {
  scoreDisplay.textContent = `Skor: ${score}`;
  timerDisplay.textContent = `Waktu: ${timeLeft} detik`;
}

function spawnBox() {
  const box = document.createElement('div');
  box.classList.add('box');

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);

  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  box.onclick = () => {
    score++;
    updateDisplay();
    gameArea.removeChild(box);
  };

  gameArea.innerHTML = '';
  gameArea.appendChild(box);
}
