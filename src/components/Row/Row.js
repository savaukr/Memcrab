import React from 'react'
import { DeleteRow } from '../DeleteRow/DeleteRow'
import './Row.css'

export const Row = ({arrRow, footerClass, deleteHandle, ind, increaseAmount, focusCeil, focusCeilSum } )=> {
    const getSumRow = (row) => {
        return row.reduce((summa, item) => summa+item.amount, 0) 
    }

    const row = arrRow.map((item) => {
        return (
            <div 
                key={item.id}
                className={
                    `matrix-ceil ${footerClass || ''} 
                    ${item.bright ? 'bright': ''} 
                    ${item.part ? 'part' : ''}`
                }
                data-id= {item.id}
                onClick={increaseAmount}
                onMouseOver={focusCeil}
                onMouseOut={focusCeil}
            >
                {item.amount}
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
                {getSumRow(arrRow)}
            </div>
        </div> 
    )
}