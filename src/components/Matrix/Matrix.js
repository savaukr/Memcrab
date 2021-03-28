import React, {useEffect, useState} from 'react'
import {Row} from '../Row/Row'
import './Matrix.css'

export const Matrix = ({arr, deleteHandle, increaseAmount, focusCeil, focusCeilSum}) => {
    const [matrixJSX, setMatrixJSX] = useState()

    function getMatrixJsx(arr) {
        let table=[]
    
        for (let i=0; i<arr.length; i++) { 
            table[i] = <Row
                            key={i}
                            arrRow = {arr[i]}
                            deleteHandle={deleteHandle}
                            ind={i}
                            increaseAmount={increaseAmount}
                            focusCeilSum={focusCeilSum}
                            focusCeil={focusCeil}
                        /> 
        }
        table[arr.length] = <Row key={arr.length} arrRow = {getAverages(arr)}  footerClass={'footer'} />
        return table
    }

    
    const getAverages = (arr) => {
        const arrAverage=[]
        const rowCount = arr.length || 0
        const columnCount = arr[0].length || 0
        for (let j=0; j< columnCount; j++) {
            let sum = 0
            for (let i=0; i< rowCount; i++) {
                sum += arr[i][j]['amount']
            }
            arrAverage[j] = {id: `footer${j}`, amount: Math.ceil(sum/rowCount) }
        }
        return arrAverage
    }
       

    useEffect(()=> {
        setMatrixJSX(getMatrixJsx(arr))
    }, [arr])
    
    return (
        <div className="matrix-wrap">
            <div className="matrix-content">
                <div className="matrix-header">Сума по рядку</div>
                {matrixJSX}
            </div>
        </div>
    )
}