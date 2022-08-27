import create from 'zustand'
import { useUIStore } from './ui'
import { getNewState } from '../element-state-template'
import { useConfigStore } from './config'

let idSeed = 0;
export const useDataStore = create((set, get) => ({
  elementCollection: {},
  setElementCollection: (value) => set({ elementCollection: value }),
  updateSingleElement: (newState) => {
    set((state) => {
      const originElementCollection = state.elementCollection;
      return {
        elementCollection: {
          ...originElementCollection,
          [useUIStore.getState().targetId]: {
            ...newState
          }
        }
      }
    });
  },
  addNewElement: () => {
    set(() => {
      const id = ++idSeed;

      useUIStore.getState().setTargetId(id)
      const canvasPanel = document.querySelector('.canvas-panel');
      const canvasPanelStyle = window.getComputedStyle(canvasPanel);
      const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
      const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

      const width = 200;
      const height = 200;

      const top = canvasPanelHeight / 2 - height / 2;
      const left = canvasPanelWidth / 2 - width / 2

      get().updateSingleElement(getNewState({ width, height, left, top }));
    })
  },
  getTargetStyle(name) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return 0;
    }
    return get().elementCollection[targetId][name];
  },
  updateTargetStyle(name, value) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(state => {
      const originElementCollection = state.elementCollection;
      const targetId = useUIStore.getState().targetId;
      const originTargetElementState = originElementCollection[targetId];
      if (useUIStore.getState().applyToAll) {
        Object.keys(originElementCollection).forEach(id => {
          const originElementState = originElementCollection[id]
          originElementCollection[id] = {
            ...originElementState,
            [name]: value,
            left: originElementState.left,
            top: originElementState.top
          }
        })
        return {
          elementCollection: {
            ...originElementCollection,
          }
        }
      } else {
        return {
          elementCollection: {
            ...originElementCollection,
            [targetId]: {
              ...originTargetElementState,
              [name]: value
            }
          }
        }
      }
    })
  },
  deleteElement() {
    const targetId = useUIStore.getState().targetId;
    useUIStore.getState().setTargetId(null);
    set((state) => {
      const originElementCollection = state.elementCollection;
      delete originElementCollection[targetId];
      return {
        elementCollection: {
          ...originElementCollection
        }
      }
    });
  },
  cloneElement(targetElementState) {
    const id = idSeed++;
    useUIStore.getState().setTargetId(id);
    get().updateSingleElement(targetElementState)
  },
  copyElement() {
    const targetId = useUIStore.getState().targetId;
    const targetElementState = elementStateCollection[targetId];

    useUIStore.getState().setTargetId(++idSeed);
    get().updateSingleElement({
      ...JSON.parse(JSON.stringify(targetElementState)),
      top: targetElementState.top + 20,
      left: targetElementState.left + 20
    });
  },
  generateElements() {
    set((state) => {
      const originElementCollection = state.elementCollection;
      const targetId = useUIStore.getState().targetId;
      const cloneElementWhenAddMultipleElements = useUIStore.getState().cloneElementWhenAddMultipleElements;
      const selectedElementState = originElementCollection[targetId];
      const randomElementCount = useConfigStore.getState().randomElementCount;

      const canvasPanel = document.querySelector('.canvas-panel');
      const canvasPanelStyle = window.getComputedStyle(canvasPanel);
      const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
      const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

      for (let i = 0; i < randomElementCount; i++) {
        const left = Math.floor(Math.random() * canvasPanelWidth);
        const top = Math.floor(Math.random() * canvasPanelHeight);

        if (cloneElementWhenAddMultipleElements) {
          originElementCollection[++idSeed] = {
            ...selectedElementState,
            left,
            top
          }
        } else {
          originElementCollection[++idSeed] = {
            ...getNewState({ left, top }),
            left,
            top
          }
        }
      }

      return {
        elementCollection: {
          ...originElementCollection
        }
      }
    });
  }
}))
