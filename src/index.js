module.exports = function solveSudoku(matrix) {
    const initial = matrix;
    var stack = [];

    function solveSudoku() {
        let row = 0;
        let col = 0;
        let number = 0;
        debugger
        while (!(row === 8 && col === 8)) {
            if (initial[row][col] === 0) {
                if (!solveCell(row, col, number)) {
                    initial[row][col] = 0;
                    if (stack.length > 0) {
                        row = stack[stack.length - 1][0];
                        col = stack[stack.length - 1][1];
                        number = stack[stack.length - 1][2];
                        stack.pop();
                        initial[row][col] = 0;
                        if (col === 0) {
                            col = 8;
                            row--;
                        } else {
                            col--;
                        }

                    }
                } else {
                    number = 0;
                }

            }

            if (col == 8) {
                col = 0;
                row++;
            } else {
                col++;
            }

        }
        if (initial[8][8] === 0) {
            solveCell(8, 8, 0)
        }
    }

    function solveCell(row, col, number) {
        number++;

        while (number < 10) {
            if (!sameColumn(row, col, number) && !sameRow(row, col, number) && !sameSquare(row, col, number)) {
                initial[row][col] = number;
                stack.push([row, col, number]);
                return true;
            }
            number++;
        }
        return false;
    }


    function sameColumn(row, col, number) {
        for (let i = 0; i < 9; i++) {
            if (i === row) continue;
            if (initial[i][col] === number) {
                return true;
            }
        }
        return false;
    }

    function sameRow(row, col, number) {
        for (let i = 0; i < 9; i++) {
            if (i === col) continue;
            if (initial[row][i] === number) {
                return true;
            }
        }
        return false;
    }

    function sameSquare(row, col, number) {
        let x, y;

        if (col < 3) x = 0;
        else if (col < 6) x = 3;
        else if (col < 9) x = 6;

        if (row < 3) y = 0;
        else if (row < 6) y = 3;
        else if (row < 9) y = 6;


        for (let i = y; i < y + 3; i++) {
            for (let j = x; j < x + 3; j++) {
                if (i === row && j === col) continue;
                if (initial[i][j] === number) {
                    return true;
                }
            }
        }
        return false;
    }

    solveSudoku();
    console.log(initial);
    return initial;
};