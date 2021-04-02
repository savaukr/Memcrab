import {ADD_ROW, DELETE_ROW, INCREASE_AMOUNT,
		MOUSE_OVER_CEIL, MOUSE_OUT, MOUSE_OVER_SUM} from './types.js'

export  function addRow(row) {
	return {
		type: ADD_ROW,
		payload: row
	}
}

export function deleteRow(ind) {
	return {
		type: DELETE_ROW,
		payload: ind
	}
}
export function increaseAmount(row, column) {
	return {
		type: INCREASE_AMOUNT,
		payload: {row, column}
	}
}
export function mouseOverCeil(arr) {
	return {
		type: MOUSE_OVER_CEIL,
		payload: arr
	}
}
export function mouseOut(arr) {
	return {
		type: MOUSE_OUT,
		payload: arr
	}
}

export function mouseOverSum(arr) {
	return {
		type: MOUSE_OVER_SUM,
		payload: arr
	}
}
