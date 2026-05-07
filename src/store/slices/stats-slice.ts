import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BodyEntry } from '../../types/stats';

interface StatsState {
  entries: BodyEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  entries: [],
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<BodyEntry>) => {
      state.entries.unshift(action.payload);
    },
    removeEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    updateEntry: (state, action: PayloadAction<BodyEntry>) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    resetStats: (state) => {
      state.entries = [];
    }
  },
});

export const { addEntry, removeEntry, updateEntry, resetStats } = statsSlice.actions;
export default statsSlice.reducer;
