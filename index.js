
const tracks = ['BTDT', 'Finding Her - Kushagra 320 Kbps', 'Paaro - Aditya Rikhari 320 Kbps', 'Sajna Hai Mujhe - Shruti Rane 320 Kbps'];
 
const queue = [];
let currentTrack = null;

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#ff9de2',
  progressColor: '#800080',
  height: 100,
  responsive: true
});

const audioButtonsContainer = document.getElementById('audioButtons');
const queueList = document.getElementById('queueList');
const playPauseBtn = document.getElementById('playPause');
const timeDisplay = document.getElementById('time-display');

// Add audio list buttons
tracks.forEach(name => {
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.onclick = () => {
    queue.push(name);
    updateQueueDisplay();
    if (!currentTrack) playNextInQueue();
  };
  audioButtonsContainer.appendChild(btn);
});

// Update running queue
function updateQueueDisplay() {
  queueList.innerHTML = '';
  queue.forEach((name, index) => {
    const div = document.createElement('div');
    div.className = 'queue-item';
    if (name === currentTrack) div.classList.add('playing');
    div.textContent = 'Name: ' + name;

    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => {
      queue.splice(index, 1);
      updateQueueDisplay();
    };

    div.appendChild(removeBtn);
    queueList.appendChild(div);
  });
}

// Play next audio in queue
function playNextInQueue() {
  if (queue.length === 0) return;
  currentTrack = queue.shift();
  updateQueueDisplay();
  wavesurfer.load(`./audios/${currentTrack}.mp3`);
}

// Toggle play/pause
playPauseBtn.onclick = () => {
  wavesurfer.playPause();
  playPauseBtn.textContent = wavesurfer.isPlaying() ? 'Pause' : 'Play';
};

// Events
wavesurfer.on('ready', () => {
  wavesurfer.play();
  playPauseBtn.textContent = 'Pause';
});

wavesurfer.on('finish', () => {
  currentTrack = null;
  playNextInQueue();
});

// Show timer
wavesurfer.on('audioprocess', () => {
  if (!wavesurfer.isPlaying()) return;
  updateTimeDisplay();
});

wavesurfer.on('ready', updateTimeDisplay);

function updateTimeDisplay() {
  const current = formatTime(wavesurfer.getCurrentTime());
  const total = formatTime(wavesurfer.getDuration());
  timeDisplay.textContent = `${current} / ${total}`;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
