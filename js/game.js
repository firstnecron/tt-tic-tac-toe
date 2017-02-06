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
            this.currentGame = new Game(this.player1.mark);
        } else {
            // Player 2 starts
            this.currentGame = new Game(this.player2.mark);
        }
    };

    exports.Session = Session;
} ($, ticTacToe);
