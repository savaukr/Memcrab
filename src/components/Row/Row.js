import React from 'react'
import { DeleteRow } from '../DeleteRow/DeleteRow'
import './Row.css'

export const Row = ({arrRow, footerClass, deleteHandle, ind, increaseAmount, focusCeil, focusCeilSum, mouseOut } )=> {
    const getSumRow = (row) => {
        return row.reduce((summa, item) => summa+item.amount, 0) 
    }
    const sum = getSumRow(arrRow)
    

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
                //data-part={`${Math.round(item.amount*100/sum)}%`}
                data-id= {item.id}
                onClick={increaseAmount}
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