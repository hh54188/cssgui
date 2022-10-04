import create from 'zustand'
import {persist} from 'zustand/middleware'

export const useUIStore = create(persist((set) => ({
  applyToAll: false,
  toggleApplyToAll: (value) => set({ applyToAll: value }),

  positionHorizontalValueState: 'Left',
  setPositionHorizontalValue: (value) => set({ positionHorizontalValueState: value }),

  positionVerticalValueState: 'Top',
  setPositionVerticalValue: (value) => set({ positionVerticalValueState: value }),

  dragStartPoint: [0,0],
  setDragStartPoint: value => set({ dragStartPoint: value }),

  dragBegin: false,
  setDragBegin: value => set({ dragBegin: value }),

  dragStartElementPoint: [0,0],
  setDragStartElementPoint: value => set({ dragStartElementPoint: value }),

  showAnimationPanel: false,
  toggleAnimationPanel: value => set({ showAnimationPanel: value }),

  openAddMultipleElementsDialog: false,
  toggleAddMultipleElementsDialog: value => set({ openAddMultipleElementsDialog: value }),

  cloneElementWhenAddMultipleElements: false,
  toggleCloneElementWhenAddMultipleElements: value => set({ cloneElementWhenAddMultipleElements: value }),

  openCopyStyleCodeDialog: false,
  setOpenCopyStyleCodeDialog: value => set({ openCopyStyleCodeDialog: value }),

  openGradientPickerDialog: false,
  setOpenGradientPickerDialog: value => set({ openGradientPickerDialog: value }),
}), {
  name: 'ui-storage'
}))
