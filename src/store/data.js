import create from 'zustand'
import {persist} from 'zustand/middleware'
import { useUIStore } from './ui'
import { getNewState } from '../element-state-template'
import { useConfigStore } from './config'
import { produce } from 'immer'
import {createBoxShadowString, moveCenterLeft, moveTopCenter, moveTopLeft} from "../utils";
import {v4 as uuidv4} from "uuid";

let idSeed = 0;
export const useDataStore = create(persist((set, get) => ({
  elementCollection: {},
  setElementCollection: (value) => set({ elementCollection: value }),
  updateSingleElement: (newState) => {
    set(produce((state) => {
      state.elementCollection[useUIStore.getState().targetId] = newState;
    }));
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
    set(produce((state) => {
      const originElementCollection = state.elementCollection;
      const targetId = useUIStore.getState().targetId;
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
    const targetId = useUIStore.getState().targetId;
    useUIStore.getState().setTargetId(null);
    set(produce((state) => {
      delete state.elementCollection[targetId];
    }));
  },
  cloneElement(targetElementState) {
    const id = idSeed++;
    useUIStore.getState().setTargetId(id);
    get().updateSingleElement(targetElementState)
  },
  copyElement() {
    const targetId = useUIStore.getState().targetId;
    const targetElementState = get().elementCollection[targetId];

    useUIStore.getState().setTargetId(++idSeed);
    get().updateSingleElement({
      ...JSON.parse(JSON.stringify(targetElementState)),
      top: targetElementState.top + 20,
      left: targetElementState.left + 20
    });
  },
  generateElements() {
    set(produce((state) => {
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
  enableBorderAllInOne() {
    const targetId = useUIStore.getState().targetId;
    set(produce((state) => {
      const selectedElementState = state.elementCollection[targetId];
      const selectedElementStateTopBorder = selectedElementState.border.top;

      state.elementCollection[targetId].borderAllInOne = true;
      state.elementCollection[targetId].border.top = selectedElementStateTopBorder;
      state.elementCollection[targetId].border.bottom = selectedElementStateTopBorder;
      state.elementCollection[targetId].border.left = selectedElementStateTopBorder;
      state.elementCollection[targetId].border.right = selectedElementStateTopBorder;
    }));
  },
  disableBorderAllInOne() {
    const targetId = useUIStore.getState().targetId;
    set(produce((state) => {
      state.elementCollection[targetId].borderAllInOne = false;
    }));
  },
  toggleBorderAllInOne() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    if (get().elementCollection[targetId].borderAllInOne) {
      get().disableBorderAllInOne();
    } else {
      get().enableBorderAllInOne();
    }
  },
  toggleEnableBorder() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      if (state.elementCollection[targetId].borderEnabled) {
        state.elementCollection[targetId].borderEnabled = false;
      } else {
        state.elementCollection[targetId].borderEnabled = true;
      }
    }));
  },
  updateBorder(name, value, position) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      if (state.elementCollection[targetId].borderAllInOne) {
        state.elementCollection[targetId].border['top'][name] = value;
        state.elementCollection[targetId].border['bottom'][name] = value;
        state.elementCollection[targetId].border['left'][name] = value;
        state.elementCollection[targetId].border['right'][name] = value;
      } else {
        state.elementCollection[targetId].border[position][name] = value;
      }
    }));
  },
  removeShadow(index) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].boxShadow.splice(index, 1)
    }));
  },
  addShadow() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
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
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].boxShadow[index][name] = value;
    }));
  },
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
  moveTopLeft() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].left = 0;
      state.elementCollection[targetId].top = 0;
    }));
  },
  moveTopCenter() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      state.elementCollection[targetId].left = canvasPanelWidth / 2 - elementWidth / 2;
      state.elementCollection[targetId].top = 0;
    }));
  },
  moveTopRight() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      state.elementCollection[targetId].left = canvasPanelWidth - elementWidth;
      state.elementCollection[targetId].top = 0;
    }));
  },
  moveCenterLeft() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      const elementHeight = state.elementCollection[targetId].height
      state.elementCollection[targetId].left = 0;
      state.elementCollection[targetId].top = canvasPanelHeight / 2 - elementHeight / 2;
    }));
  },
  moveCenterCenter() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      const elementHeight = state.elementCollection[targetId].height
      state.elementCollection[targetId].top = canvasPanelHeight / 2 - elementHeight / 2;
      state.elementCollection[targetId].left = canvasPanelWidth / 2 - elementWidth / 2
    }));
  },
  moveCenterRight() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      const elementHeight = state.elementCollection[targetId].height
      state.elementCollection[targetId].top = canvasPanelHeight / 2 - elementHeight / 2;
      state.elementCollection[targetId].left = canvasPanelWidth - elementWidth
    }));
  },
  moveBottomLeft() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      const elementHeight = state.elementCollection[targetId].height
      state.elementCollection[targetId].top = canvasPanelHeight - elementHeight;
      state.elementCollection[targetId].left = 0
    }));
  },
  moveBottomCenter() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      const elementHeight = state.elementCollection[targetId].height
      state.elementCollection[targetId].top = canvasPanelHeight - elementHeight;
      state.elementCollection[targetId].left = canvasPanelWidth / 2 - elementWidth / 2
    }));
  },
  moveBottomRight() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const canvasPanel = document.querySelector('.canvas-panel');
    const canvasPanelStyle = window.getComputedStyle(canvasPanel);
    const canvasPanelWidth = parseInt(canvasPanelStyle.width, 10);
    const canvasPanelHeight = parseInt(canvasPanelStyle.height, 10);

    set(produce((state) => {
      const elementWidth = state.elementCollection[targetId].width
      const elementHeight = state.elementCollection[targetId].height
      state.elementCollection[targetId].top = canvasPanelHeight - elementHeight;
      state.elementCollection[targetId].left = canvasPanelWidth - elementWidth;
    }));
  },
  updateAnimationProperty(key, value) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].animation[key] = value
    }));
  },
  updateAnimationAnimatedProperties(property, value) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].animation.animatedProperties[property] = value
    }));
  },
  saveAnimationStartStatus(status) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].animation.animationTimeline[0] = status
    }));
  },
  saveAnimationEndStatus(status) {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      state.elementCollection[targetId].animation.animationTimeline[1] = status;
    }));
  },
  stopAnimation() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      const { animation: { name } } = state.elementCollection[targetId];
      if (!name) {
        return;
      }
      const style = document.querySelector(`#${name}`);
      style.parentElement.removeChild(style);
      state.elementCollection[targetId].animation.name = '';
    }));
  },
  playAnimation() {
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    set(produce((state) => {
      const { animation: { animationTimeline } } = state.elementCollection[targetId];
      if (!animationTimeline.length) {
        return;
      }
      const [start, end] = animationTimeline;
      const name = `animation_${uuidv4()}`;
      const head = document.head;
      const style = document.createElement('style');
      style.id = name;
      const css = `@keyframes ${name} {
        from {
            ${start.join(';')}
        }
        to {
            ${end.join(';')}
        }
      }`
      head.appendChild(style)
      style.appendChild(document.createTextNode(css));
      state.elementCollection[targetId].animation.name = name;
    }));
  },
  getStatusByProperties() {
    const result = [];
    const targetId = useUIStore.getState().targetId;
    if (!targetId) {
      return;
    }
    const sourceElementState = get().elementCollection[targetId];
    const { animation: { animatedProperties } } = sourceElementState;
    Object.keys(animatedProperties).forEach(property => {
      const value = animatedProperties[property]
      if (!value) {
        return;
      }
      switch (property) {
        case 'size':
          result.push(`width:${sourceElementState.width}px;`);
          result.push(`height:${sourceElementState.height}px`);
          break;
        case 'position':
          result.push(`left:${sourceElementState.left}px;`);
          result.push(`top:${sourceElementState.top}px`);
          break;
        case 'background':
          result.push(`background:${sourceElementState.backgroundColor};`);
          break;
        case 'border':
          result.push(`border-top: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.top.width}px ${sourceElementState.border.top.style} ${sourceElementState.border.top.color}`}`);
          result.push(`border-bottom: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.bottom.width}px ${sourceElementState.border.bottom.style} ${sourceElementState.border.bottom.color}`}`);
          result.push(`border-left: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.left.width}px ${sourceElementState.border.left.style} ${sourceElementState.border.left.color}`}`);
          result.push(`border-right: ${!sourceElementState.borderEnabled ? 'none' : `${sourceElementState.border.right.width}px ${sourceElementState.border.right.style} ${sourceElementState.border.right.color}`}`);
          break;
        case 'boxShadow':
          result.push(`box-shadow: ${createBoxShadowString(sourceElementState.boxShadow)}`)
          break;
        case 'translate':
          result.push(`transform: translate3d(${sourceElementState.transform.translate.x}px, ${sourceElementState.transform.translate.y}px, ${sourceElementState.transform.translate.z}px)`)
          break;
        case 'scale':
          result.push(`transform: scale3d(${sourceElementState.transform.scale.x}px, ${sourceElementState.transform.scale.y}px, ${sourceElementState.transform.scale.z}px)`)
          break;
        case 'skew':
          result.push(`transform: skew(${sourceElementState.transform.skew.x}deg, ${sourceElementState.transform.skew.y}deg)`)
          break;
      }
    })
    return result;
  }
}),{
  name: 'data',
}))
