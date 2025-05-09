
  const tracks = ['BTDT', 'Finding Her - Kushagra 320 Kbps', 'Paaro - Aditya Rikhari 320 Kbps', 'Sajna Hai Mujhe - Shruti Rane 320 Kbps'];
  const queue = [];
  let currentTrack = null;
  let wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#a0d2eb',
    progressColor: '#0077b6',
    height: 100
  });

  const audioButtonsContainer = document.getElementById('audioButtons');
  const queueList = document.getElementById('queueList');
  const playPauseBtn = document.getElementById('playPause');

  // Create buttons for audio list
  tracks.forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name + ' [+]';
    btn.onclick = () => {
      queue.push(name);
      updateQueueDisplay();
      if (!currentTrack) {
        playNextInQueue();
      }
    };
    audioButtonsContainer.appendChild(btn);
  });

  function updateQueueDisplay() {
    queueList.innerHTML = '';
    queue.forEach(name => {
      const div = document.createElement('div');
      div.textContent = 'Name: ' + name;
      div.style.background = 'cornflowerblue';
      div.style.padding = '10px';
      div.style.margin = '5px 0';
      queueList.appendChild(div);
    });
  }

  function playNextInQueue() {
    if (queue.length === 0) return;
    currentTrack = queue.shift();
    updateQueueDisplay();
    wavesurfer.load(`./audios/${currentTrack}.mp3`);
  }

  playPauseBtn.onclick = () => {
    wavesurfer.playPause();
    playPauseBtn.textContent = wavesurfer.isPlaying() ? 'Pause' : 'Play';
  };

  wavesurfer.on('ready', () => {
    wavesurfer.play();
    playPauseBtn.textContent = 'Pause';
  });

  wavesurfer.on('finish', () => {
    currentTrack = null;
    playNextInQueue();
  });
