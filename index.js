const fieldsElements = document.querySelectorAll('.board__item');
const panel = document.querySelector('.panel')
const resetButtom = document.querySelector('.reset-buttom');
let fields;
let gameActive;
let activePlayer;

const displayWinMessage = () => {
    panel.innerText = `${activePlayer} won!`;
}

const resetMessage = () => {
    panel.innerText = '';
}

const displayTieMessage = () => {
    panel.innerText  = 'Tie!';
}

const setDefaults = () => {
    fields = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    activePlayer = 'X';
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const isBordFull = () => {
    return fields.find(field => field === '') === undefined;
}

const validateGame = () => {
    let gameWon = false;
    for(let i = 0; i <= 7; i++) {
        const [posA, posB, posC] = winningConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if (value1 !== '' && value1 === value2 && value1 === value3) {
            gameWon = true;
            break;
        }
    }

    if(gameWon) {
        gameActive = false;
        displayWinMessage();
    } else if (isBordFull()) {
        gameActive = false;
        displayTieMessage();
    }
}

const handleCellClick = (e) => {
    const { pos } = e.target.dataset;
    if (gameActive && fields[pos] === '') {
        fields[pos] = activePlayer;
        e.target.classList.add(`board__item--filled-${activePlayer}`);
        validateGame();
        activePlayer = activePlayer === 'X' ? 'O' : 'X';
    }      
}

const handleResetButtonClick = () => {
    setDefaults();
    resetMessage();
    fieldsElements.forEach(field => {
        field.classList.remove('board__item--filled-X', 'board__item--filled-O');
    });
}
setDefaults();
fieldsElements.forEach((field) => {
    field.addEventListener('click', handleCellClick);
});
resetButtom.addEventListener('click', handleResetButtonClick);

