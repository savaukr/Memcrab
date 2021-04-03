import React from "react";
import { connect } from "react-redux";
import { AddRow } from "./components/AddRow/AddRow";
import { addRow } from "./redux/actions.js";
import Matrix from "./components/Matrix/Matrix";
import { N } from "./config/config";


function App({ addRow, matrix }) {
 
  function getMatrixRow(columns = N, i) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const amount = Math.floor(Math.random() * 1001);
      row[j] = { id: `${i}x${j}`, amount, bright: false, part: false };
    }
    return row;
  }

  const addRowHandle = (event) => {
    addRow(getMatrixRow(N, matrix.length));
  };

  
  try {
    if (!matrix.length)
      return (
        <div className="container">
          <h1>Немає жодної стрічки!</h1>
          <AddRow addRowHandle={addRowHandle} />
        </div>
      );
    return (
      <div className="container">
        <Matrix />
        <AddRow addRowHandle={addRowHandle} />
      </div>
    );
  } catch (err) {
    console.log(err.message);
  }
}

const mapStateToProps = (state) => {
  return {
    matrix: state.matrix.matrix,
  };
};

const mapDispatchToProps = {
  addRow,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
