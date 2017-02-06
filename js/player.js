!function($, exports) {
    // Player
    var Player = function (playerName, markType, playerType) {
        this.playerName = playerName;
        this.mark = markType;
        this.playerType = playerType;
    };

    exports.Player = Player;
} ($, ticTacToe);
