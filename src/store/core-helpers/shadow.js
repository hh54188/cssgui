import { produce } from 'immer'

export function factory(set, get) {
  return {
    removeShadow(index) {
      const targetId = get().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].boxShadow.splice(index, 1)
      }));
    },
    addShadow() {
      const targetId = get().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].boxShadow.push({
          enableInset: false,
          offsetX: 5,
          offsetY: 5,
          blurRadius: 20,
          spreadRadius: 0,
          color: 'grey',
          collapsePanel: false,
          enabled: true
        })
      }));
    },
    updateShadow(index, name, value) {
      const targetId = get().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].boxShadow[index][name] = value;
      }));
    },

  }
}

