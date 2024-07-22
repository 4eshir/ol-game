document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid")
    const scoreDisplay = document.querySelector("#score")
    const resultDisplay = document.querySelector("#result")
    const width = 4
    let squares = []
    let score = 0

    // create the playing board
    function createBoard(squareTest = []) {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div")
            square.innerHTML = squareTest.length === 0 ? 0 : squareTest[i]
            gridDisplay.appendChild(square)
            squares.push(square)
        }

        if (squareTest.length === 0) {
            generate()
            generate()
        }
    }

    createBoard(
        [
            4, 2, 4, 4,
            2, 4, 2, 0,
            4, 2, 4, 2,
            2, 4, 2, 4,
        ]
    )

    //generate a new number
    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    function getDataFromSquares(matrix) {
        let data = []
        for (let i = 0; i < 16; i++) {
            data.push(matrix[i].innerHTML)
        }

        return data
    }

    function checkChange(matrix1, matrix2) {
        for (let i = 0; i < 16; i++) {
            if (matrix1[i] !== matrix2[i]) {
                return true
            }
        }
        return false
    }

    function moveRight() {
        let success = false
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]

                if (checkChange(row, newRow)) {
                    success = true
                }
            }
        }

        return success;
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveUp() {
        let success = false
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]

            if (checkChange(column, newColumn)) {
                success = true
            }
        }

        return success
    }

    function moveDown() {
        let success = false
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width * 2].innerHTML
            let totalFour = squares[i + width * 3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + width * 2].innerHTML = newColumn[2]
            squares[i + width * 3].innerHTML = newColumn[3]

            if (checkChange(column, newColumn)) {
                success = true
            }
        }

        return success
    }

    function combineRow(direction) {
        let success = false
        if (direction === 'left') {
            for (let i = 0; i < 15; i++) {
                if (squares[i].innerHTML === squares[i + 1].innerHTML && (i + 1) % 4 !== 0) {
                    success = true
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i + 1].innerHTML = 0
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }
        else {
            for (let i = 15; i > 1; i--) {
                if (squares[i].innerHTML === squares[i - 1].innerHTML && (i - 1) % 4 !== 3) {
                    success = true
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i - 1].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i - 1].innerHTML = 0
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }

        checkForWin()

        return success
    }

    function combineColumn(direction) {
        if (direction === 'up') {
            for (let i = 0; i < 12; i++) {
                if (squares[i].innerHTML === squares[i + width].innerHTML) {
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                    squares[i].innerHTML = combinedTotal
                    squares[i + width].innerHTML = 0
                    score += combinedTotal
                    scoreDisplay.innerHTML = score
                }
            }
        }
        else {
            for (let i = 11; i >= 0; i--) {
                // Проверяем, есть ли ячейка ниже для суммирования
                if (squares[i].innerHTML === squares[i + width].innerHTML) {
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);

                    squares[i + width].innerHTML = combinedTotal; // Ставим сумму в нижний квадрат
                    squares[i].innerHTML = 0; // Обнуляем верхний квадрат (текущую ячейку)

                    score += combinedTotal; // Увеличиваем счет
                    scoreDisplay.innerHTML = score; // Обновляем отображение счета
                }
            }
        }

        checkForWin()
    }

    ///assign functions to keys
    function control(e) {
        if (e.key === "ArrowLeft") {
            keyLeft()
        } else if (e.key === "ArrowRight") {
            keyRight()
        } else if (e.key === "ArrowUp") {
            keyUp()
        } else if (e.key === "ArrowDown") {
            keyDown()
        }
    }
    document.addEventListener("keydown", control)

    function keyLeft() {
        let squareStart = getDataFromSquares(squares)
        moveLeft()
        combineRow('left')
        moveLeft()
        let squareEnd = getDataFromSquares(squares)
        console.log(checkChange(squareStart, squareEnd))
        if (checkChange(squareStart, squareEnd)) {
            generate()
        }
    }

    function keyRight() {
        let squareStart = getDataFromSquares(squares)
        moveRight()
        combineRow('right')
        moveRight()
        let squareEnd = getDataFromSquares(squares)
        if (checkChange(squareStart, squareEnd)) {
            generate()
        }
    }

    function keyUp() {
        let squareStart = getDataFromSquares(squares)
        moveUp()
        combineColumn('up')
        moveUp()
        let squareEnd = getDataFromSquares(squares)
        if (checkChange(squareStart, squareEnd)) {
            generate()
        }
    }

    function keyDown() {
        let squareStart = getDataFromSquares(squares)
        moveDown()
        combineColumn('down')
        moveDown()
        let squareEnd = getDataFromSquares(squares)
        if (checkChange(squareStart, squareEnd)) {
            generate()
        }
    }

    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You WIN!"
                document.removeEventListener("keydown", control)
                setTimeout(clear, 3000)
            }
        }
    }

    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        let canCombine = false;

        // Check if there are empty squares or possible merges
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }

        // Check for possible combinations in rows
        for (let i = 0; i < 16; i++) {
            if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML) {
                canCombine = true; // Can combine left-right
            }
            if (i < 12 && squares[i].innerHTML === squares[i + 4].innerHTML) {
                canCombine = true; // Can combine up-down
            }
        }

        // If there are no zeros and no possible combines, the game is over
        if (zeros === 0 && !canCombine) {
            resultDisplay.innerHTML = "You LOSE!";
            document.removeEventListener("keydown", control);
            setTimeout(showModal, 500);
        }
    }

    function clear() {
        clearInterval(myTimer)
    }

    //add colours
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = "#afa192"
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = "#eee4da"
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = "#ede0c8"
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = "#f2b179"
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = "#ffcea4"
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = "#e8c064"
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = "#ffab6e"
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = "#fd9982"
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = "#ead79c"
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = "#76daff"
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = "#beeaa5"
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = "#d7d4f0"
        }
    }
    addColours()

    let myTimer = setInterval(addColours, 50)

    function showModal() {
        const modal = document.getElementById("myModal");
        const retryButton = document.getElementById("end");

        const actionUrl = '/index.php?r=game%2Fgame-2048%2Fend-game&score=' + score;

        retryButton.setAttribute('href', actionUrl); // Устанавливаем атрибут href для кнопки

        modal.style.display = "block"; // Отображаем модальное окно
    }

    // Закрыть модальное окно при нажатии на "x"
    document.querySelector('.close').addEventListener('click', function() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    });

    // Закрыть модальное окно при клике вне его области
    window.onclick = function(event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
})


