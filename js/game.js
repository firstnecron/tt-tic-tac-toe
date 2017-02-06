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

    exports.Session = Session;
} ($, ticTacToe);