const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
  });
  
  // Load an audio file
  wavesurfer.load('BTDT.mp3');
  document.getElementById('playBtn').addEventListener('click', () => {
    wavesurfer.playPause();
  });

  