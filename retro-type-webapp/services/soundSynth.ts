let audioCtx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const bufferSize = ctx.sampleRate * 0.05;
    noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
}

function getPentatonicFreq(char: string): number {
  const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  const index = char.charCodeAt(0) % pentatonicScale.length;
  return pentatonicScale[index];
}

function getWholetoneFreq(char: string): number {
  const wholetoneScale = [261.63, 293.66, 329.63, 369.99, 415.30, 466.16, 523.25, 587.33, 659.25, 739.99];
  const index = char.charCodeAt(0) % wholetoneScale.length;
  return wholetoneScale[index];
}

export function playClickSound(soundType: string, volume: number, char: string = ' ') {
  if (typeof window === 'undefined' || soundType === 'off') return;

  try {
    const ctx = getAudioContext();
    const destination = ctx.destination;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    gainNode.connect(destination);

    const now = ctx.currentTime;

    if (soundType === 'click' || soundType === 'trust gxt') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
    } else if (soundType === 'beep') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    } else if (soundType === 'pop' || soundType === 'rubber keys') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    } else if (soundType === 'typewriter') {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      noise.connect(filter);
      filter.connect(gainNode);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.connect(gainNode);

      noise.start(now);
      noise.stop(now + 0.02);
      osc.start(now);
      osc.stop(now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    } else if (soundType === 'osu' || soundType === 'hitmarker') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.02);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
    } else if (soundType === 'sine' || soundType === 'sawtooth' || soundType === 'square' || soundType === 'triangle') {
      const osc = ctx.createOscillator();
      osc.type = soundType as OscillatorType;
      const baseFreq = 440 + (char.charCodeAt(0) % 12) * 20;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    } else if (soundType === 'pentatonic') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(getPentatonicFreq(char), now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    } else if (soundType === 'wholetone') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(getWholetoneFreq(char), now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    } else if (soundType === 'fist fight') {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);
      osc.connect(gainNode);

      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      noise.connect(filter);
      filter.connect(gainNode);

      osc.start(now);
      osc.stop(now + 0.08);
      noise.start(now);
      noise.stop(now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    } else if (soundType === 'fart') {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90 + Math.random() * 20, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.12);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    } else if (soundType === 'cherrymx blue abs' || soundType === 'kalih box white' || soundType === 'razer green') {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(2500, now);
      noise.connect(hp);
      hp.connect(gainNode);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.connect(gainNode);

      noise.start(now);
      noise.stop(now + 0.015);
      osc.start(now);
      osc.stop(now + 0.035);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.035);
    } else if (soundType === 'cherrymx black abs' || soundType === 'cherrymx black pbt' || soundType === 'tealios v2' || soundType === 'nk creams') {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      const f = soundType === 'cherrymx black abs' || soundType === 'nk creams' ? 180 : 150;
      osc.frequency.setValueAtTime(f, now);
      osc.connect(gainNode);

      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(500, now);
      noise.connect(lp);
      lp.connect(gainNode);

      noise.start(now);
      noise.stop(now + 0.02);
      osc.start(now);
      osc.stop(now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    } else if (soundType === 'cherrymx brown pbt') {
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(220, now);
      osc1.connect(gainNode);

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(140, now + 0.012);
      osc2.connect(gainNode);

      osc1.start(now);
      osc1.stop(now + 0.02);
      osc2.start(now + 0.012);
      osc2.stop(now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    } else if (soundType === 'cherrymx blue pbt') {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(2200, now);
      noise.connect(hp);
      hp.connect(gainNode);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.connect(gainNode);

      noise.start(now);
      noise.stop(now + 0.015);
      osc.start(now);
      osc.stop(now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    } else {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    }
  } catch (error) {
    console.error(error);
  }
}

export function playErrorSound(soundType: string, volume: number) {
  if (typeof window === 'undefined' || soundType === 'off') return;

  try {
    const ctx = getAudioContext();
    const destination = ctx.destination;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
    gainNode.connect(destination);

    const now = ctx.currentTime;

    if (soundType === 'damage') {
      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.2);
      noise.connect(filter);
      filter.connect(gainNode);

      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
      osc.connect(gainNode);

      noise.start(now);
      noise.stop(now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    } else if (soundType === 'triangle') {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    } else if (soundType === 'square') {
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(110, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    } else if (soundType === 'missed punch') {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now);
      osc.connect(gainNode);
      osc.start(now);
      osc.stop(now + 0.1);

      const noise = ctx.createBufferSource();
      noise.buffer = getNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      noise.connect(filter);
      filter.connect(gainNode);

      noise.start(now);
      noise.stop(now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    }
  } catch (error) {
    console.error(error);
  }
}

export function playWarningSound(volume: number) {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    const destination = ctx.destination;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gainNode.connect(destination);

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
  } catch (error) {
    console.error(error);
  }
}
