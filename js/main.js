!function($, exports) {
    // Players
    var player1;
    var player2;

    // Player
    var Player = function (playerName, markType, playerType) {
        this.playerName = playerName;
        this.mark = markType;
        this.playerType = playerType;
    };

    var startGame = function() {
        // Prepare the board
        var $player1 = $('#player1');
        $player1.find('svg').remove();
        $player1.prepend(marks[exports.player1.mark]);
        $player1.find('div').text(exports.player1.playerName);

        var $player2 = $('#player2');
        $player2.find('svg').remove();
        $player2.prepend(marks[exports.player2.mark]);
        $player2.find('div').text(exports.player2.playerName);
    };
    
    exports.player1 = player1;
    exports.player2 = player2;

    exports.Player = Player;
    exports.startGame = startGame;
}($, ticTacToe);