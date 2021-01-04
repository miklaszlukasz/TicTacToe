class Game {
    fields;
    gameActive;
    activePlayer;
    board;

    winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor() {
        this.board = new Board(this.handleItemClick, this.handleResetButtonClick);
        this.setDefaults();
    };

    isBordFull = () => {
        return this.fields.find(field => field === '') === undefined;
    };

    validateGame = () => {
        let gameWon = false;
        for(let i = 0; i < this.winningConditions.length; i++) {
            const [posA, posB, posC] = this.winningConditions[i];
            const value1 = this.fields[posA];
            const value2 = this.fields[posB];
            const value3 = this.fields[posC];
    
            if (value1 !== '' && value1 === value2 && value1 === value3) {
                gameWon = true;
                break;
            }
        }
    
        if(gameWon) {
            this.gameActive = false;
            this.board.displayWinMessage(this.activePlayer);
        } else if (this.isBordFull()) {
            this.gameActive = false;
            this.board.displayTieMessage();
        }
    };
    
    handleItemClick = (e) => {
        const { pos } = e.target.dataset;
        if (this.gameActive && this.fields[pos] === '') {
            this.fields[pos] = this.activePlayer;
            e.target.classList.add(`board__item--filled-${this.activePlayer}`);
            this.validateGame();
            this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
        }      
    };

    handleResetButtonClick = () => {
        this.setDefaults();
    };

    setDefaults = () => {
        this.fields = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.activePlayer = 'X';
    };
}

class Board {
    fieldsElements = document.querySelectorAll('.board__item');
    panel = document.querySelector('.panel')
    resetButtom = document.querySelector('.reset-buttom');
    onButtonClick;

    constructor(onItemClick, onButtonClick) {
        this.onButtonClick = onButtonClick;
        this.resetButtom.addEventListener('click', this.handleResetButtonClick);
        this.fieldsElements.forEach((field) => {
            field.addEventListener('click', onItemClick);
        });
    };

    handleResetButtonClick = () => {
        this.resetBoardClasses();
        this.resetMessage();
        this.onButtonClick();
    };

    resetBoardClasses = () => {
        this.fieldsElements.forEach(field => {
            field.classList.remove('board__item--filled-X', 'board__item--filled-O');
        });
    };

    displayWinMessage = (activePlayer) => {
        this.panel.innerText = `${activePlayer} won!`;
    };
    
    resetMessage = () => {
        this.panel.innerText = ``;
    };
    
    displayTieMessage = () => {
        this.panel.innerText  = 'Tie!';
    };
}

const game = new Game();