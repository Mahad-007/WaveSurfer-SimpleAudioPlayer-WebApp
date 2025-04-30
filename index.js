const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
  });
  
  // Load an audio file
  wavesurfer.load('BTDT.mp3');
  