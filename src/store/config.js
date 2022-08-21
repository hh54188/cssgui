import create from 'zustand'

export const useConfigStore = create((set) => ({
  randomElementCount: 1000,
  setRandomElementCount: value => set({ randomElementCount: value }),
}))