import React from 'react'
import './AddRow.css'

export const AddRow = ({addRowHandle})=> {
    return (
        <div className="addrRow-wrap">
            <button onClick={addRowHandle}>Створити рядок</button>
        </div>
       
    )
}