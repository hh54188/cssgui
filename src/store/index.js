import create from 'zustand'

export const useStore = create((set) => ({
  applyToAll: false,
  toggleApplyToAll: (value) => set({ applyToAll: value })
}))