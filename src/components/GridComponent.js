import React, { useState } from 'react';

function GridComponent() {
    const [rows, setRows] = useState(1);
    const [columns, setColumns] = useState(1);
    const [gridData, setGridData] = useState({});
    const [highlightedCell, setHighlightedCell] = useState({ row: 0, col: 0 }); // State to track highlighted cell

    const handleInputChange = (e) => {
        console.log(e.target,'helllooo')
        const { name, value } = e.target;
        console.log('hii',name)
        // console.log('hii2',e.target.value)

        if (name === 'rows') {
            setRows(parseInt(value));
        } else if (name === 'columns') {
            setColumns(parseInt(value));
        } else {
            const [row, col] = name.split(',');
            const newGridData = { ...gridData };
            newGridData[row] = newGridData[row] || {};
            newGridData[row][col] = value;
            setGridData(newGridData);
        }
    };

    const createGrid = () => {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                const isHighlighted = highlightedCell.row === i && highlightedCell.col === j;
                row.push(
                    <td key={j} className="cell" style={{ backgroundColor: isHighlighted ? 'red' : 'white' }}>
                        <input
                            type="text"
                            name={`${i},${j}`}
                            value={gridData[i]?.[j] || ''}
                            onChange={handleInputChange}
                        />
                    </td>
                );
            }
            grid.push(
                <tr key={i}>
                    {row}
                </tr>
            );
        }
        return grid;
    };

    const moveHighlight = (direction) => {
        setHighlightedCell((prev) => {
            let newRow = prev.row;
            let newCol = prev.col;

            switch (direction) {
                case 'right':
                    newCol = Math.min(newCol + 1, columns - 1);
                    break;
                case 'left':
                    newCol = Math.max(newCol - 1, 0);
                    break;
                case 'down':
                    newRow = Math.min(newRow + 1, rows - 1);
                    break;
                case 'up':
                    newRow = Math.max(newRow - 1, 0);
                    break;
                default:
                    break;
            }

            return { row: newRow, col: newCol };
        });
    };

    return (
        <div>
            <h1>Create Excel-like Grid</h1>
            <div>
                <label htmlFor="rows">Rows:</label>
                <input
                    type="number"
                    id="rows"
                    name="rows"
                    min="1"
                    value={rows}
                    onChange={handleInputChange}
                    required
                />
                <label htmlFor="columns">Columns:</label>
                <input
                    type="number"
                    id="columns"
                    name="columns"
                    min="1"
                    value={columns}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <table id="gridContainer">
                <tbody>{createGrid()}</tbody>
            </table>
            <div>
                <button onClick={() => moveHighlight('up')}>Up</button>
                <button onClick={() => moveHighlight('down')}>Down</button>
                <button onClick={() => moveHighlight('left')}>Left</button>
                <button onClick={() => moveHighlight('right')}>Right</button>
            </div>
        </div>
    );
}

export default GridComponent;