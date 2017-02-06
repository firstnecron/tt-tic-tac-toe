!function($, exports) {
    // Game
    // Session (play again continues, new game resets)
    var Session = function () {
        this.gamesPlayed = 0;
        this.movesMade = 0;
        this.score = {
            player1: 0,
            player2: 0
        };
    };

    exports.Session = Session;
} ($, ticTacToe);
