const serviceWrap  = (matrix,setMatrix,  M, N, X) => {
    function getMatrixRow(columns=N, i) {
        const row=[]
        for (let j=0; j < columns; j++) {
        const amount = Math.floor( Math.random() * 1001)
                row[j] = {id:`${i}x${j}`, amount, bright:false}
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
        let start= index - X/2
        let end = index +X/2
        if (X % 2) {
            arrSort[start]['amount'] > arrSort[end]['amount'] ? start++ : end++
        }       
        return [ ...arrSort.slice(start, index), ...arrSort.slice(index+1, end+1)]
        }

        if (event.target.dataset.id) {
        const row = +event.target.dataset.id.slice(0,1)
        const column = +event.target.dataset.id.slice(2)
        const arr = matrix.concat()
        arr[row][column]['bright'] = !arr[row][column]['bright']
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
    }

    return {
        getMatrixRow,
        getMatrix,
        addRowHandle, 
        deleteHandle,
        increaseAmount,
        focusCeil,
        focusCeilSum
    }
}

export {serviceWrap}

