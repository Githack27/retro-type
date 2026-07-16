import { navigationService } from './navigation';

export interface SettingsState {
  difficulty: 'normal' | 'expert' | 'master';
  quickRestart: 'off' | 'esc' | 'tab' | 'enter';
  repeatQuotes: 'off' | 'typing';
  blindMode: 'off' | 'on';
  alwaysShowWordsHistory: 'off' | 'on';
  singleListCommandLine: 'manual' | 'on';
  minSpeed: 'off' | 'custom';
  minSpeedCustom: number;
  minAccuracy: 'off' | 'custom';
  minAccuracyCustom: number;
  soundVolume: number;
  playSoundOnClick: string;
  playSoundOnError: string;
  playTimeWarning: 'off' | '1 second' | '3 seconds' | '5 seconds' | '10 seconds';
  fontSize: number;
  fontFamily: string;
  localFont: string;
}

const DEFAULT_SETTINGS: SettingsState = {
  difficulty: 'normal',
  quickRestart: 'off',
  repeatQuotes: 'off',
  blindMode: 'off',
  alwaysShowWordsHistory: 'off',
  singleListCommandLine: 'manual',
  minSpeed: 'off',
  minSpeedCustom: 100,
  minAccuracy: 'off',
  minAccuracyCustom: 90,
  soundVolume: 0.5,
  playSoundOnClick: 'off',
  playSoundOnError: 'off',
  playTimeWarning: 'off',
  fontSize: 2,
  fontFamily: 'Roboto Mono',
  localFont: '',
};

class SettingsService {
  private state: SettingsState = { ...DEFAULT_SETTINGS };
  private listeners: Set<(state: SettingsState) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadInitialSettings();
      navigationService.subscribeAuth(() => {
        this.syncWithBackend();
      });
    }
  }

  getSettings(): SettingsState {
    return this.state;
  }

  subscribe(listener: (state: SettingsState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  private loadInitialSettings() {
    const local = localStorage.getItem('retro_type_settings');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        this.state = { ...DEFAULT_SETTINGS, ...parsed };
      } catch (e) {
        this.state = { ...DEFAULT_SETTINGS };
      }
    }
    this.notify();
    this.syncWithBackend();
  }

  private async syncWithBackend() {
    if (!navigationService.getIsLoggedIn()) {
      return;
    }
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const dbSettings = await response.json();
        const incoming = {
          difficulty: dbSettings.difficulty,
          quickRestart: dbSettings.quickRestart,
          repeatQuotes: dbSettings.repeatQuotes,
          blindMode: dbSettings.blindMode,
          alwaysShowWordsHistory: dbSettings.alwaysShowWordsHistory,
          singleListCommandLine: dbSettings.singleListCommandLine,
          minSpeed: dbSettings.minSpeed,
          minSpeedCustom: Number(dbSettings.minSpeedCustom),
          minAccuracy: dbSettings.minAccuracy,
          minAccuracyCustom: Number(dbSettings.minAccuracyCustom),
          soundVolume: Number(dbSettings.soundVolume),
          playSoundOnClick: dbSettings.playSoundOnClick,
          playSoundOnError: dbSettings.playSoundOnError,
          playTimeWarning: dbSettings.playTimeWarning,
          fontSize: Number(dbSettings.fontSize),
          fontFamily: dbSettings.fontFamily,
          localFont: dbSettings.localFont,
        };
        this.state = { ...this.state, ...incoming };
        localStorage.setItem('retro_type_settings', JSON.stringify(this.state));
        this.notify();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateSetting<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    this.state[key] = value;
    localStorage.setItem('retro_type_settings', JSON.stringify(this.state));
    this.notify();

    if (navigationService.getIsLoggedIn()) {
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [key]: value }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async updateAllSettings(newSettings: Partial<SettingsState>) {
    this.state = { ...this.state, ...newSettings };
    localStorage.setItem('retro_type_settings', JSON.stringify(this.state));
    this.notify();

    if (navigationService.getIsLoggedIn()) {
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export const settingsService = new SettingsService();
