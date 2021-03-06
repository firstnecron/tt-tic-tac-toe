!function($, exports) {
    // Game
    // Session (play again continues, new game resets)
    var Session = function (player1, player2) {
        this.gamesPlayed = 0;
        this.movesMade = 0;
        this.score = {
            player1: 0,
            player2: 0
        };
        this.player1 = player1;
        this.player2 = player2;
    };

    Session.prototype.startGame = function () {
        // Get who is starting
        // If even - player1 if odd - player 2
        if (this.gamesPlayed % 2 === 0) {
            // Player 1 starts
            this.currentGame = new Game(this.player1.mark, this.player1, this.player2);
        } else {
            // Player 2 starts
            this.currentGame = new Game(this.player2.mark, this.player1, this.player2);
        }

        this.gamesPlayed++;
        this.currentGame.start();
    };

    var Game = function (startingTurn, player1, player2) {
        this.currentState = new State();
        this.currentState.turn = startingTurn;
        this.currentState.board = [0, 0, 0,
            0, 0, 0,
            0, 0, 0];

        this.player1 = player1;
        this.player2 = player2;

        this.movesMade = 0;
        this.isStarted = false;
        this.isDone = false;
    };

    Game.prototype.advanceToState = function (state) {
        this.currentState = state;
        if (state.isTerminal()) {
            this.isDone = true;

            // check state for win or draw
            if (state.result === 'draw') {
                // draw
                exports.prepareFinishScreen();
            } else {
                // Winner - get the player object and call ui function with it
                exports.prepareFinishScreen(this.getCurrentPlayer());
            }

            // Add .5 second delay before showing finish screen
            setTimeout(function () {
                exports.showFinishScreen();
            }, 500);
        } else {
            if (this.currentState.result !== 'starting') {
                this.movesMade++;
                this.currentState.advanceTurn();
            } else if (this.currentState.result === 'starting') {
                this.currentState.result = 'running';
            }

            var currentPlayer = this.getCurrentPlayer();
            exports.setActivePlayer(currentPlayer);

            if (currentPlayer.playerType === 'ai') {
                // Add a "thinking" delay of 1 second
                setTimeout(function () {
                    currentPlayer.ai.notify();
                }, 1000);
            }
        }
    };

    Game.prototype.start = function () {
        if (!this.isStarted) {
            this.advanceToState(this.currentState);
            this.isStarted = true;
        }
    };

    Game.prototype.getCurrentPlayer = function () {
        if (this.player1.mark === this.currentState.turn) {
            return this.player1;
        } else {
            return this.player2;
        }
    };

    var State = function (oldState) {
        this.turn = '';
        this.board = [];
        this.result = 'starting';

        if (oldState) {
            this.result = oldState.result;
            this.turn = oldState.turn;
            this.board = oldState.board;
        }
    };

    State.prototype.advanceTurn = function () {
        this.turn = this.turn === 'x' ? 'o' : 'x';
    };

    State.prototype.getEmptyBoxes = function () {
        var indexes = [];
        for (var i = 0; i < 9; i++) {
            if (this.board[i] === 0) {
                indexes.push(i);
            }
        }

        return indexes;
    };

    // Check if the game is over
    State.prototype.isTerminal = function () {
        var board = this.board;

        // Check rows
        for (var i = 0; i <= 6; i = i + 3) {
            if (board[i] !== 0 && board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
                this.result = board[i] + ' won';
                return true;
            }
        }

        // Check columns
        for (i = 0; i < 3; i++) {
            if (board[i] !== 0 && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
                this.result = board[i] + ' won';
                return true;
            }
        }

        // Check diagonals
        // Top left to bottom right
        if (board[0] !== 0 && board[0] === board[4] && board[4] === board[8]) {
            this.result = board[i] + ' won';
            return true;
        }
        // Top right to bottom left
        if (board[2] !== 0 && board[2] === board[4] && board[4] === board[6]) {
            this.result = board[i] + ' won';
            return true;
        }

        // Check for draw (if empty boxes, game is still running & return false)
        if (this.getEmptyBoxes().length === 0) {
            this.result = 'draw';
            return true;
        } else {
            return false;
        }
    };

    exports.Game = Game;
    exports.Session = Session;
    exports.State = State;
} ($, ticTacToe);
