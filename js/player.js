!function($, exports) {
    // Player
    var Player = function (playerName, markType, playerType) {
        this.playerNum = 0;
        this.playerName = playerName;
        this.mark = markType;
        this.playerType = playerType;
    };

    exports.Player = Player;
} ($, ticTacToe);
