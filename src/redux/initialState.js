import { defaultStyles, defaultTitle } from '../constants'
import { storage } from '../core/utilits'

const defaultState = {
   colState: {},
   rowState: {},
   dataState: {},
   stylesState: {},
   currentText: '',
   currentStyles: defaultStyles,
   titleState: defaultTitle,
}

export const initialState = storage('excel-state')
   ? storage('excel-state')
   : defaultState
