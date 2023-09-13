import { defaultStyles, defaultTitle } from '../constants'
import { clone } from '../core/utilits'

const defaultState = {
   colState: {},
   rowState: {},
   dataState: {},
   stylesState: {},
   currentText: '',
   currentStyles: defaultStyles,
   titleState: defaultTitle,
   openedDate: new Date().toJSON(),
}

const normalize = (state) => ({
   ...state,
   currentStyles: defaultStyles,
   currentText: '',
})

export function normalizeInitialState(state) {
   return state ? normalize(state) : clone(defaultState)
}
