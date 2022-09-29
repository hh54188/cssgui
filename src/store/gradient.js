import create from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer'
import {isColor} from '../utils/style'

const maxOffset = 490 - 30;
const minOffset = 0;

export const useGradientStore = create((set, get) => ({
  curElementId: 0,
  setCurElementId: value => set({ curElementId: value }),
  minOffset,
  maxOffset,
  setMaxOffset: value => set({ maxOffset: value }),
  dragStartFlag: false,
  setDragStartFlag: value => set({ dragStartFlag: value }),
  dragStartOffset: 0,
  setDragStartOffset: value => set({ dragStartOffset: value }),
  elementStartOffset: 0,
  setElementStartOffset: value => set({ elementStartOffset: value }),
  gradientAngle: 90,
  setGradientAngle: value => set({ gradientAngle: value }),
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
  setGradientStopOffset: (offset) => {
    set(produce((state) => {
      const index = state.gradientStops.findIndex(stop => stop.id === state.curElementId)
      state.gradientStops[index].offset = offset;
      state.gradientStops[index].percentage = parseInt((parseFloat(offset / state.maxOffset) * 100));
      state.gradientStops.sort((stopA, stopB) => stopA.offset - stopB.offset)
    }));
  },
  setGradientStopPercentage: (percentage) => {
    set(produce((state) => {
      const index = state.gradientStops.findIndex(stop => stop.id === state.curElementId)
      state.gradientStops[index].offset = percentage < 0
        ? 0
        : percentage > 100
          ? 100
          : parseInt((percentage / 100) * maxOffset)
      state.gradientStops[index].percentage = percentage
      state.gradientStops.sort((stopA, stopB) => stopA.offset - stopB.offset)
    }));
  },
  addGradientStop: (offset, color) => {
    set(produce((state) => {
      const stops = state.gradientStops;
      const maxOffset = state.maxOffset;
      const firstStop = stops[0];
      const lastStop = stops[stops.length - 1];

      if (offset <= firstStop.offset) {
        state.gradientStops.unshift({
          id: uuidv4(),
          offset,
          color,
          visible: true,
          percentage: parseInt((parseFloat(offset / state.maxOffset) * 100))
        })
        return;
      }

      if (offset >= lastStop.offset) {
        state.gradientStops.push({
          id: uuidv4(),
          offset,
          color,
          visible: true,
          percentage: parseInt((parseFloat(offset / state.maxOffset) * 100))
        })
        return 
      }

      for (let i = 0; i < stops.length - 1; i++) {
        const curStop = stops[i];
        const nextStop = stops[i + 1];
        if (offset > curStop.offset && offset <= nextStop.offset) {
          state.gradientStops.splice(i + 1, 0, {
            id: uuidv4(),
            offset,
            color,
            visible: true,
            percentage: parseInt((parseFloat(offset / state.maxOffset) * 100))
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
  }
}))
