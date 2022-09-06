import { useUIStore } from '../ui'
import { produce } from 'immer'

export function factory(set, get) {
  return {
    updateTransform(type, coordinate, value) {
      const targetId = useUIStore.getState().targetId;
      if (!targetId) {
        return;
      }
      set(produce((state) => {
        state.elementCollection[targetId].transform[type][coordinate] = value;
      }));
    },
    resetTranslate() {
      const targetId = useUIStore.getState().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].transform.translate = {
          x: 0,
          y: 0,
          z: 0
        }
      }));
    },
    resetScale() {
      const targetId = useUIStore.getState().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].transform.scale = {
          x: 1,
          y: 1,
          z: 1
        }
      }));
    },
    resetSkew() {
      const targetId = useUIStore.getState().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].transform.skew = {
          x: 0,
          y: 0,
        }
      }));
    },
  }
}

