import {ADD_ROW, DELETE_ROW, INCREASE_AMOUNT,
		MOUSE_OVER_CEIL, MOUSE_OUT, MOUSE_OVER_SUM} from './types.js'

const M=5 // кількість стрічок 
const N=10 //кількість стовпчиків
const X = 5 // кількість близьких Amount

function getMatrixRow(columns=N, i) {
    const row=[]
    for (let j=0; j < columns; j++) {
      const amount = Math.floor( Math.random() * 1001)
            row[j] = {id:`${i}x${j}`, amount, bright:false, part:false}
    }
    return row
  }

  function getMatrix(rows=M,columns=N) {
    let table = []
    for (let i=0; i< rows; i++) {
        table[i]= getMatrixRow(columns, i) 
    }
   return table
  }

 const initialState = {
	matrix:getMatrix() 
}

export const matrixReducer = (state = initialState, action) => {
	let arr = state.matrix.concat()

	switch (action.type) {
		case ADD_ROW: 
			return { ...state, matrix:[...state.matrix, action.payload]}
		case DELETE_ROW:
		    arr.splice(action.payload, 1)
		    for (let i= action.payload; i<arr.length; i++) {
		      for (let j=0; j< arr[i].length; j++) {
		        const row = +arr[i][j].id.split('x')[0]
		        arr[i][j].id = `${row-1}x${j}`
		        
		      }
		    }
			return {...state, matrix:[...arr]}
		case INCREASE_AMOUNT: 
			const row = action.payload.row
			const column = action.payload.column
			arr[row][column]['amount'] = arr[row][column]['amount']+1
			return { ...state, matrix:[...arr]}
		case MOUSE_OVER_CEIL: 
			return { ...state, matrix: [...action.payload]}
		case MOUSE_OUT: 
			return { ...state, matrix: [...action.payload]}
		case MOUSE_OVER_SUM: 
			return { ...state, matrix: [...action.payload]}
		

		default: return state
	}
}