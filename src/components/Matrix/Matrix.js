import React, {useEffect, useState} from 'react'
import './Matrix.css'

export const Matrix = ({m, n}) => {
    const [matrix, setMatrix] = useState()
    const [matrixJSX, setMatrixJSX] = useState()
   
    function getMatrix(rows=m,columns=n) {
        let arr = new Array()
        for (let i=0; i< rows; i++) {
            arr[i] = new Array()
            for (let j=0; j < columns; j++) {
                arr[i][j] = Math.floor( Math.random() * 1001 )
            }  
        }
        setMatrixJSX(getMatrixJsx(arr))
        setMatrix(arr)
    }
    

    function getMatrixJsx(arr) {
        let table=[]
        let rows=[]
        for (let i=0; i<m; i++) {
            rows[i] = arr[i].map((item, index)=>{
                return <div 
                    key={index}
                    className="matrix-ceil"
                    >
                        {item}
                    </div>
            })
            table[i] = <div 
                key={i}
                className="matrix-row"
            >
                {rows[i]}
            </div> 
            
        }
        return table
    }

    const sum = (row) => {
        return row.reduce((summa, item) => summa+item, 0) 
    }
    const average = (arr) => {
        const rowCount = arr.length || 0
        const columnCount = arr[0].length || 0
        for (let j=0; j< columnCount; j++) {
            for (let i=0; i< rowCount; i++) {

            }
        }
        //return sum(column)/column.length
    }

    useEffect(()=> {
       getMatrix()
    },[])      
    
    return (
        <div className="matrix-wrap">
            <div className="matrix-content">
                {matrixJSX}
            </div>
        </div>
    )
}