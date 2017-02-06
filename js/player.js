!function($, exports) {
    // Player
    var Player = function (playerName, markType, playerType, color) {
        this.playerNum = 0;
        this.playerName = playerName;
        this.mark = markType;
        this.playerType = playerType;
        this.rgb = color;
    };

    exports.Player = Player;
} ($, ticTacToe);
