!function($, exports) {
    // Player
    var Player = function (playerName, markType, playerType, color) {
        this.playerNum = 0;
        this.playerName = playerName;
        this.mark = markType;
        this.playerType = playerType;
        this.rgb = color;

        if (playerType === 'ai') {
            this.ai = new AI(this);
        }
    };
    
    // AI
    // Determine move, get the box, trigger a click event on the box
    var AI = function (player, difficulty) {
        this.difficulty = difficulty || 'easy';
        this.player = player;
    };

    AI.prototype.doBlindMove = function () {
        var emptyBoxes = exports.getCurrentGame().currentState.getEmptyBoxes();
        var randomBoxIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

        $(exports.$box[randomBoxIndex]).click();
    };

    AI.prototype.notify = function () {
        switch (this.difficulty) {
            case 'easy':
            default:
                this.doBlindMove(this.player.mark);
                break;
        }
    };

    exports.Player = Player;
} ($, ticTacToe);
