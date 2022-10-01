import create from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer'
import { isColor } from '../utils/style'
import chroma from "chroma-js";

export const maxOffset = 490 - 30;
export const minOffset = 0;

export function computePercentage(offset) {
  return parseInt((parseFloat(offset / maxOffset) * 100))
}

export const useGradientStore = create((set, get) => ({
  minOffset,
  maxOffset,

  curElementId: 0,
  setCurElementId: value => set({ curElementId: value }),

  gradientAngle: 90,
  setGradientAngle: value => set({ gradientAngle: value }),
  gradientPresets: [
    [{
      id: uuidv4(),
      offset: 0,
      color: '#ffa500',
      percentage: 0,
      visible: true,
    }, {
      id: uuidv4(),
      offset: maxOffset,
      color: '#87ceeb',
      percentage: 100,
      visible: true,
    }],
    [{
      id: uuidv4(),
      offset: 0,
      color: '#3c3b3f',
      percentage: 0,
      visible: true,
    }, {
      id: uuidv4(),
      offset: maxOffset,
      color: '#605c3c',
      percentage: 100,
      visible: true,
    }],
    [{
      id: uuidv4(),
      offset: 0,
      color: '#ad5389',
      percentage: 0,
      visible: true,
    }, {
      id: uuidv4(),
      offset: maxOffset,
      color: '#3c1053',
      percentage: 100,
      visible: true,
    }],
  ],
  gradientStops: [{
    id: uuidv4(),
    offset: 0,
    color: '#ffa500',
    percentage: 0,
    visible: true,
  }, {
    id: uuidv4(),
    offset: maxOffset,
    color: '#87ceeb',
    percentage: 100,
    visible: true,
  }],
  setGradientStops: value => set({ gradientStops: value }),
  setGradientStopOffset: (offset) => {
    set(produce((state) => {
      const index = state.gradientStops.findIndex(stop => stop.id === state.curElementId)
      state.gradientStops[index].offset = offset;
      state.gradientStops[index].percentage = computePercentage(offset);
      state.gradientStops.sort((stopA, stopB) => stopA.offset - stopB.offset)
    }));
  },
  setGradientStopPercentage: (percentage) => {
    set(produce((state) => {
      const index = state.gradientStops.findIndex(stop => stop.id === state.curElementId)
      state.gradientStops[index].offset = percentage < 0
        ? 0
        : percentage > 100
          ? maxOffset
          : parseInt((percentage / 100) * maxOffset)
      state.gradientStops[index].percentage = percentage < 0
        ? 0
        : percentage > 100
          ? 100
          : percentage
      state.gradientStops.sort((stopA, stopB) => stopA.offset - stopB.offset)
    }));
  },
  addGradientStop: (offset) => {
    set(produce((state) => {
      const stops = state.gradientStops;
      const maxOffset = maxOffset;
      const firstStop = stops[0];
      const lastStop = stops[stops.length - 1];

      if (offset <= firstStop.offset) {
        state.gradientStops.unshift({
          id: uuidv4(),
          offset,
          color: firstStop.color,
          visible: true,
          percentage: computePercentage(offset)
        })
        return;
      }

      if (offset >= lastStop.offset) {
        state.gradientStops.push({
          id: uuidv4(),
          offset,
          color: lastStop.color,
          visible: true,
          percentage: computePercentage(offset)
        })
        return
      }

      for (let i = 0; i < stops.length - 1; i++) {
        const curStop = stops[i];
        const nextStop = stops[i + 1];
        if (offset > curStop.offset && offset <= nextStop.offset) {
          const range = chroma.scale([curStop.color, nextStop.color]);
          state.gradientStops.splice(i + 1, 0, {
            id: uuidv4(),
            offset,
            color: range((offset - curStop.offset) / (nextStop.offset - curStop.offset)).hex(),
            visible: true,
            percentage: computePercentage(offset)
          })
          return
        }
      }
    }))
  },
  updateGradientStopColor: (index, color) => {
    const colorValue = color.hex;
    set(produce((state) => {
      state.gradientStops[index].color = colorValue;
    }));
  },
  removeGradientStop: (index) => {
    set(produce((state) => {
      state.gradientStops.splice(index, 1)
    }));
  },
  copyGradientStop: (targetIndex) => {
    set(produce((state) => {
      if (targetIndex === state.gradientStops.length - 1) {
        state.gradientStops.push({
          ...JSON.parse(JSON.stringify(state.gradientStops[state.gradientStops.length - 1])),
          id: uuidv4(),
        })
        return;
      }
      state.gradientStops.splice(targetIndex + 1, 0, {
        ...JSON.parse(JSON.stringify(state.gradientStops[targetIndex])),
        id: uuidv4()
      })
    }));
  },
  toggleGradientStopVisible: (index) => {
    set(produce((state) => {
      state.gradientStops[index].visible = !state.gradientStops[index].visible;
    }));
  },
  applyGradientPreset: (index) => {
    set(produce(state => {
      state.gradientStops = state.gradientPresets[index]
    }))
  }
}))
