import React, {useState} from 'react'
import { AddRow } from './components/AddRow/AddRow'
import { Matrix } from './components/Matrix/Matrix'
//import { serviceWrap } from './service/service'


function App() {
  const M=5 // кількість стрічок 
  const N=10 //кількість стовпчиків
  const X = 5 // кількість близьких Amount
  const initialState=getMatrix()
  const [matrix, setMatrix] = useState(initialState)

  // const service = serviceWrap(M, N, X )
  // const { getMatrixRow, getMatrix, addRowHandle, deleteHandle, increaseAmount, focusCeil, focusCeilSum } = service

  // ///////////////////////////////////////////
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

  const addRowHandle = () => {
    const arr = matrix.concat()
    arr.push(getMatrixRow(N, matrix.length))
    setMatrix(arr)
  }

  const deleteHandle = (event) => {
    const arr = matrix.concat()
    arr.splice(event.target.dataset.ind, 1)
    setMatrix(arr)
  }

  const increaseAmount = (event) => {
    if (event.target.dataset.id) {
      const row = +event.target.dataset.id.slice(0,1)
      const column = +event.target.dataset.id.slice(2)
      const arr = matrix.concat()
      arr[row][column]['amount'] = arr[row][column]['amount']+1
      setMatrix(arr)
    }  
  }

  const focusCeil = (event) => {
    
    //Знаходження масиву найблищих елементів у матриці
    const findXNearAmount = (arr, elem, X) => {
      const arrSort = []
      let k=0
      for (let i=0; i < arr.length; i++ ) {
        for (let j=0; j<arr[i].length; j++) {
          arrSort[k] = Object.assign({}, arr[i][j])
          k++
        }
      }
      arrSort.sort((a,b)=>{
        return a.amount - b.amount;
      })
      const index = arrSort.findIndex((item)=>item.amount == elem.amount)

      let start, end
      start= index - Math.ceil(X/2)
      end = index + Math.ceil(X/2)

      while (start < 0) { 
        start++
        end++
       }
      while (end >= arrSort.length) { 
        start-- 
        end--
      }
      
      if (X % 2) {
        const diffStart = arrSort[start]['amount']-arrSort[index]['amount']
        const diffEnd = arrSort[index]['amount'] - arrSort[end]['amount']
        if ( diffStart != diffStart && diffStart > diffEnd )  start++ 
          else  end--
        
      }       
      return [ ...arrSort.slice(start, index), ...arrSort.slice(index+1, end+1)]
    }

    if (event.target.dataset.id) {
      const row = +event.target.dataset.id.slice(0,1)
      const column = +event.target.dataset.id.slice(2)
      const arr = matrix.concat()
      //arr[row][column]['bright'] = !arr[row][column]['bright'] //Підсвічування елемнта, на якому миша
      const arrNear = findXNearAmount(arr, arr[row][column], X)
      arrNear.forEach((elem) => {
        elem.bright = !elem.bright
        const i = elem.id.slice(0,1)
        const j = elem.id.slice(2)
        arr[i][j] = Object.assign({}, elem)
      })

      setMatrix(arr)
    }  
  }

   const focusCeilSum = (event) => {
      console.log('sum')
      const ind = +event.target.dataset.ind
      const arr = matrix.concat()
      arr[ind].forEach((item)=> {
        item.part = !item.part
      })
      setMatrix(arr)
   }
  /////////////////////////////////////////


  if (!matrix.length) return (
    <div className="container">
      <h1>Немає жодної стрічки!</h1>
      <AddRow addRowHandle={addRowHandle} />
    </div>
  )

  return (
    <div className="container">
      <Matrix 
        arr={matrix}
        deleteHandle={deleteHandle}
        increaseAmount={increaseAmount}
        focusCeilSum={focusCeilSum}
        focusCeil={focusCeil}
      />
      <AddRow addRowHandle={addRowHandle} />
    </div>
  );
}

export default App;
