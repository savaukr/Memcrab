import React from 'react'

export const DeleteRow = ({footerClass, deleteHandle, ind}) => {

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