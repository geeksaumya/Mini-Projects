const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const winnerText = document.getElementById("winner-text");

const CELL_SIZE = 100;
const BOARD_SIZE = 3;
const BOARD_PADDING = 10;

canvas.addEventListener("click", handleClick);

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const x = j * CELL_SIZE + BOARD_PADDING;
            const y = i * CELL_SIZE + BOARD_PADDING;
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
        }
    }

    for (let i = 0; i < board.length; i++) {
        const row = Math.floor(i / BOARD_SIZE);
        const col = i % BOARD_SIZE;
        const x = col * CELL_SIZE + CELL_SIZE / 2 + BOARD_PADDING;
        const y = row * CELL_SIZE + CELL_SIZE / 2 + BOARD_PADDING;
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = board[i] === 'X' ? "#4CAF50" : "#FFA500"; // Color X as green and O as orange
        ctx.fillText(board[i], x, y);
    }
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / CELL_SIZE);
    const col = Math.floor(x / CELL_SIZE);
    const index = row * BOARD_SIZE + col;

    makeMove(index);
}

function makeMove(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        drawBoard();
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showWinner(board[a]);
            return true;
        }
    }
    if (!board.includes('')) {
        showWinner('Draw');
        return true;
    }
    return false;
}

function showWinner(winner) {
    overlay.style.display = "flex";
    winnerText.innerText = winner === 'Draw' ? "It's a Draw!" : `Player ${winner} wins!`;
}

function closePopup() {
    overlay.style.display = "none";
    resetGame();
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    drawBoard();
}

document.getElementById("close-button").addEventListener("click", closePopup);

drawBoard();
