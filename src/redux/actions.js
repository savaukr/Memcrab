import {ADD_ROW, DELETE_ROW, INCREASE_AMOUNT} from './types.js'

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