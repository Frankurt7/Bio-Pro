import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSettings {
  notifications: boolean;
  language: 'es' | 'en';
}

interface UserState {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  stats: {
    height: number;
    weightGoal: number;
    age: number;
  };
  settings: UserSettings;
  badges: string[];
}

const initialState: UserState = {
  name: 'James',
  level: 1,
  xp: 0,
  xpToNextLevel: 500,
  stats: {
    height: 173,
    weightGoal: 65,
    age: 31,
  },
  settings: {
    notifications: true,
    language: 'es',
  },
  badges: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addXp: (state, action: PayloadAction<number>) => {
      state.xp += action.payload;
      while (state.xp >= state.xpToNextLevel) {
        state.level += 1;
        state.xp -= state.xpToNextLevel;
        state.xpToNextLevel = Math.floor(state.xpToNextLevel * 1.2);
      }
      
      // Auto-unlock badges logic
      const basicBadges = ['early_bird', 'consistent', 'bmi_pro', 'water_master'];
      basicBadges.forEach(badge => {
        if (!state.badges.includes(badge)) {
          state.badges.push(badge);
        }
      });
    },
    updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
        return { ...state, ...action.payload };
    },
    updateStats: (state, action: PayloadAction<Partial<UserState['stats']>>) => {
        state.stats = { ...state.stats, ...action.payload };
    },
    resetUser: (state) => {
        return {
            ...initialState,
            settings: { ...initialState.settings, notifications: true } // Trigger tour again
        };
    }
  },
});

export const { addXp, updateProfile, updateStats, resetUser } = userSlice.actions;
export default userSlice.reducer;
