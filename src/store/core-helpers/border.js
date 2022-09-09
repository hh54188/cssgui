import { produce } from 'immer'

export function factory(set, get) {
  return {
    enableBorderAllInOne() {
      set(produce((state) => {
        const targetId = get().targetId;
        const selectedElementState = get().getTargetElementState()
        const selectedElementStateTopBorder = selectedElementState.border.top;

        state.elementCollection[targetId].borderAllInOne = true;
        state.elementCollection[targetId].border.top = selectedElementStateTopBorder;
        state.elementCollection[targetId].border.bottom = selectedElementStateTopBorder;
        state.elementCollection[targetId].border.left = selectedElementStateTopBorder;
        state.elementCollection[targetId].border.right = selectedElementStateTopBorder;
      }));
    },
    disableBorderAllInOne() {
      const targetId = get().targetId;
      set(produce((state) => {
        state.elementCollection[targetId].borderAllInOne = false;
      }));
    },
    toggleBorderAllInOne() {
      if (get().getTargetStyle("borderAllInOne")) {
        get().disableBorderAllInOne();
      } else {
        get().enableBorderAllInOne();
      }
    },
    toggleEnableBorder() {
      const targetId = get().targetId;
      set(produce((state) => {
        if (state.elementCollection[targetId].borderEnabled) {
          state.elementCollection[targetId].borderEnabled = false;
        } else {
          state.elementCollection[targetId].borderEnabled = true;
        }
      }));
    },
    updateBorder(name, value, position) {
        const targetId = get().targetId;
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
  }
}

