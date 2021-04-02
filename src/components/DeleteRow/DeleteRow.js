import React from 'react'
import {connect} from 'react-redux'
import {deleteRow} from '../../redux/actions.js'

const DeleteRow = ({footerClass, deleteRow, ind}) => {

	const deleteHandle = (event) => {
        deleteRow(ind)
    }

    if (footerClass) {
        return (<></>)
    } else {
            return (
                <>
                    <button onClick={deleteHandle} >&times;</button>
                </>
            )
    }
}


const mapDispatchToProps = {
  deleteRow
}

export default connect(null, mapDispatchToProps)(DeleteRow)