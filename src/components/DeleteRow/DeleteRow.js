import React from 'react'
import {connect} from 'react-redux'
import {deleteRow} from '../../redux/actions.js'

const DeleteRow = ({footerClass, deleteRow, ind}) => {

	const deleteHandle = (event) => {
		const ind = event.target.dataset.ind
        deleteRow(ind)
    }

    if (footerClass) {
        return (<></>)
    } else {
            return (
                <>
                    <button onClick={deleteHandle} data-ind={ind}>&times;</button>
                </>
            )
    }
}


const mapDispatchToProps = {
  deleteRow
}

export default connect(null, mapDispatchToProps)(DeleteRow)