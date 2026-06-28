export function playChime() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const audioCtx = new AudioContext();
    
    // Create a gentle bell/chime sound
    const oscillator1 = audioCtx.createOscillator();
    const oscillator2 = audioCtx.createOscillator();
    const oscillator3 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Frequencies for a soothing meditative chime (C5, E5, G5 - C Major chord)
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5

    oscillator3.type = 'sine';
    oscillator3.frequency.setValueAtTime(783.99, audioCtx.currentTime); // G5

    // Envelope for the gain (volume) - Soft attack, long release
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.1); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    oscillator3.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator1.start(audioCtx.currentTime);
    oscillator2.start(audioCtx.currentTime);
    oscillator3.start(audioCtx.currentTime);

    oscillator1.stop(audioCtx.currentTime + 3);
    oscillator2.stop(audioCtx.currentTime + 3);
    oscillator3.stop(audioCtx.currentTime + 3);
  } catch (e) {
    console.error('Failed to play chime sound', e);
  }
}
