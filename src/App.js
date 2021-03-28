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

  const addRowHandle = (event) => {
    const arr = matrix.concat()
    arr.push(getMatrixRow(N, matrix.length))
    setMatrix(arr)
  }

  const deleteHandle = (event) => {
    const arr = matrix.concat()
    arr.splice(event.target.dataset.ind, 1)
    for (let i= event.target.dataset.ind; i<arr.length; i++) {
      for (let j=0; j< arr[i].length; j++) {
        const row = +arr[i][j].id.split('x')[0]
        arr[i][j].id = `${row-1}x${j}`
      }
    }
    setMatrix(arr)
  }

  const increaseAmount = (event) => {
    if (event.target.dataset.id) {
      const arr = matrix.concat()
      const row = +event.target.dataset.id.split('x')[0]
      const column = +event.target.dataset.id.split('x')[1]
      arr[row][column]['amount'] = arr[row][column]['amount']+1
      setMatrix(arr)
    }  
  }

  const focusCeil = (event) => {
    try{
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
      
        const index = +arrSort.findIndex((item)=>item.amount === elem.amount)

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
          if ( (diffStart !== diffEnd) && (diffStart > diffEnd) )  start++ 
            else  end--
        }
       return [ ...arrSort.slice(start, index), ...arrSort.slice(index, end+1)]
      }

      if (event.target.dataset.id) {
        
        const row = +event.target.dataset.id.split('x')[0]
        const column = +event.target.dataset.id.split('x')[1]
        const arr = matrix.concat()

        //arr[row][column]['bright'] = !arr[row][column]['bright'] //Підсвічування елемнта, на якому миша
        let arrNear = findXNearAmount(arr, arr[row][column], X)
        arrNear.forEach((elem) => {
          const i = +elem.id.split('x')[0]
          const j = +elem.id.split('x')[1]
          elem.bright = !elem.bright
          arr[i][j] = Object.assign({}, elem)
        })
              
        setMatrix(arr)
      } 
    } catch(err) {throw err}
  }

   const focusCeilSum = (event) => {
      const ind = +event.target.dataset.ind
      const arr = matrix.concat()
      arr[ind].forEach((item)=> {
        item.part = !item.part
      })
      setMatrix(arr)
   }
   const mouseOut = (event) => {
    const arr = matrix.concat()
    focusCeil(event)
    arr.forEach( (row)=>{
      row.forEach((ceil) => ceil.bright = false)
    })
   }

  /////////////////////////////////////////

try {
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
          mouseOut={mouseOut}
        />
        <AddRow addRowHandle={addRowHandle} />
      </div>
    );
} catch (err) {console.log(err.message)}
}

export default App;
