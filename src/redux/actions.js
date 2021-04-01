import {ADD_ROW, DELETE_ROW} from './types.js'

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