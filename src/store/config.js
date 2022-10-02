import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useConfigStore = create(persist((set) => ({
  randomElementCount: 1000,
  setRandomElementCount: value => set({ randomElementCount: value }),
})), {
  name: 'config-storage'
})
