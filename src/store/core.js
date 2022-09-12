import create from 'zustand'
import {persist} from 'zustand/middleware'
import { useUIStore } from './ui'
import { getNewState } from '../element-state-template'
import { useConfigStore } from './config'
import { factory as borderFactory } from './core-helpers/border'
import { factory as boxShadowFactory } from './core-helpers/shadow'
import { factory as transformFactory } from './core-helpers/transform'
import { factory as positionFactory } from './core-helpers/position'
import { factory as animationFactory } from './core-helpers/animation'
import { produce } from 'immer'

let idSeed = 0;
export const useCoreDataStore = create((set, get) => ({
  elementCollection: {},
  targetId: null,
  setTargetId: (value) => set({ targetId: value }),
  updateSingleElement: (newState) => {
    set(produce((state) => {
      state.elementCollection[state.targetId] = newState;
    }));
  },
  addNewElement: () => {
    set(() => {
      const id = ++idSeed;
      get().setTargetId(id)

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
    const targetId = get().targetId;
    if (!targetId) {
      return 0;
    }
    return get().elementCollection[targetId][name];
  },
  getTargetElementState() {
    const targetId = get().targetId;
    if (!targetId) {
      return;
    }
    return get().elementCollection[targetId];
  },
  updateTargetStyle(name, value) {
    const targetId = get().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      const originElementCollection = state.elementCollection;
      const targetId = get().targetId;
      const originTargetElementState = originElementCollection[targetId];
      if (useUIStore.getState().applyToAll) {
        Object.keys(originElementCollection).forEach(id => {
          state.elementCollection[id][name] = value;
          state.elementCollection[id].top = originTargetElementState.top;
          state.elementCollection[id].left = originTargetElementState.left;
        })
      } else {
        state.elementCollection[targetId][name] = value;
      }
    }))
  },
  deleteElement() {
    const targetId = get().targetId;
    set(produce((state) => {
      state.targetId = null;
      delete state.elementCollection[targetId];
    }));
  },
  copyElement() {
    const targetId = get().targetId;
    const targetElementState = get().elementCollection[targetId];

    get().setTargetId(++idSeed)
    get().updateSingleElement({
      ...JSON.parse(JSON.stringify(targetElementState)),
      top: targetElementState.top + 20,
      left: targetElementState.left + 20
    });
  },
  generateElements() {
    set(produce((state) => {
      const originElementCollection = state.elementCollection;
      const targetId = get().targetId;
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

        const sourceState = cloneElementWhenAddMultipleElements
          ? selectedElementState
          : getNewState({ left, top });

        state.elementCollection[++idSeed] = {
          ...sourceState,
          left,
          top
        }
      }
    }));
  },
  ...borderFactory(set, get),
  ...boxShadowFactory(set, get),
  ...transformFactory(set, get),
  ...positionFactory(set, get),
  ...animationFactory(set, get),
}))
