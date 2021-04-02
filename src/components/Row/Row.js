import React from 'react'
import  DeleteRow  from '../DeleteRow/DeleteRow'
import {connect} from 'react-redux'
import {increaseAmount, mouseOverCeil, mouseOut, mouseOverSum} from '../../redux/actions.js'

import './Row.css'

const X=5

const Row = ({matrix, arrRow, footerClass, deleteHandle, ind, increaseAmount, mouseOverCeil, mouseOverSum, mouseOut } )=> {
    const getSumRow = (row) => {
        return row.reduce((summa, item) => summa+item.amount, 0) 
    }
    const sum = getSumRow(arrRow)

    const increaseAmountHandle = (event) => {
        if (event.target.dataset.id[0] !== 'f' ) {
          const row = +event.target.dataset.id.split('x')[0]
          const column = +event.target.dataset.id.split('x')[1]
          increaseAmount(row,column)
        }  
       
    }
    const mouseOverHandler = (event) => {

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

 
      if (event.target.dataset.id[0] !== 'f' && event.target.dataset.id[0] !== 's') {
        
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
        mouseOverCeil(arr)
      }
    }


    const mouseOverSumHandler = (event) => {
        //const ind = +event.target.dataset.ind
        if (event.target.dataset.ind) {
            const arr = matrix.concat()
            arr[ind].forEach((item)=> {
                item.part = !item.part
            })
            mouseOverSum(arr)
        }
    }


    const mouseOutHandler = (event) => {
        const arr = matrix.concat()
        mouseOverHandler(event)
            arr.forEach( (row)=>{
              row.forEach((ceil) => ceil.bright = false)
        })
        mouseOut(arr)
    }
    

    const row = arrRow.map((item) => {
        const styles = {
            height: Math.round(item.amount*100/sum)*2+'%'
        }
        return (
            <div 
                key={item.id}
                className={
                    `matrix-ceil ${footerClass || ''} ${item.bright ? 'bright': ''} ${item.part ? 'part' : ''}`
                }
                data-part={`${Math.round(item.amount*100/sum)}%`}
                data-id= {item.id}
                onClick={increaseAmountHandle}
                onMouseDown = {(event)=>{event.preventDefault()}}

                onMouseOver={mouseOverHandler}
                onMouseOut={mouseOutHandler}
            >
                {item.part ? <div>{`${Math.round(item.amount*100/sum)}%`}</div> : item.amount }
                <div style={styles}></div>       
            </div>
        )
    })  

    return (
        <div className="matrix-row">
            <div className="matrix-ceil sidebar-row">
                <DeleteRow 
                    footerClass={footerClass}
                    ind={ind}
                    deleteHandle={deleteHandle}
                />
            </div>
            {row}
            <div 
                className="matrix-ceil sum"
                data-id={'sum'}
                data-ind = {ind}
                
                onMouseOver={mouseOverSumHandler}
                onMouseOut={mouseOverSumHandler}
            >
                {sum}
            </div>
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        matrix: state.matrix.matrix
    }
}

const mapDispatchToProps = {
  increaseAmount, mouseOverCeil, mouseOut, mouseOverSum
}

export default connect(mapStateToProps, mapDispatchToProps)(Row)