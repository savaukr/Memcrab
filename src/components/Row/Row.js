import React from 'react'
import  DeleteRow  from '../DeleteRow/DeleteRow'
import {connect} from 'react-redux'
import {increaseAmount} from '../../redux/actions.js'

import './Row.css'

const Row = ({arrRow, footerClass, deleteHandle, ind, increaseAmount, focusCeil, focusCeilSum, mouseOut } )=> {
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
                onMouseOver={focusCeil}
                onMouseOut={mouseOut}
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
                onMouseOver={focusCeilSum}
                onMouseOut={focusCeilSum}
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
  increaseAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(Row)