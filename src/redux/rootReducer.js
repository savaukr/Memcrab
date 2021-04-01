import {combineReducers} from 'redux'
import {matrixReducer} from './matrixReducer.js'

export const rootReducer = combineReducers({
	matrix: matrixReducer
})