import {ADD_ROW, DELETE_ROW} from './types.js'

const M=5 // кількість стрічок 
const N=10 //кількість стовпчиків

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
	switch (action.type) {
		case ADD_ROW: 
			return { ...state, matrix:[...state.matrix, action.payload]}
			break
		case DELETE_ROW:
				const arr = state.matrix.concat()
			    arr.splice(action.payload, 1)
			    for (let i= action.payload; i<arr.length; i++) {
			      for (let j=0; j< arr[i].length; j++) {
			        const row = +arr[i][j].id.split('x')[0]
			        arr[i][j].id = `${row-1}x${j}`
			        
			      }
			    }
			return {...state, matrix:[...arr]}
			break

		default: return state
	}
}