import { useUIStore } from '../ui'
import { produce } from 'immer'

export function factory(set, get) {
  return {
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
  }
}

