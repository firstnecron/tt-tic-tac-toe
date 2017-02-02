var game = (function($) {
    var exports = {};

    // Screens
    var $board = $('#board');
    var $startScreen = $('<div class="screen screen-start" id="start">' +
        '<header>' +
        '<h1>Tic Tac Toe</h1>' +
        '<a href="#" class="button">Start game</a>' +
        '</header>' +
        '</div>');
    var $playerPrompt = $('<div class="screen" id="player-prompt">' +
        '<div class="container">' +
        '<h1>Player 1</h1>' +
        '<input type="text" name="player-name" id="player-name" placeholder="Enter Your Name">' +
        '<div id="mark-type">' +
        '<input type="radio" name="mark" id="mark-x" value="x" checked>' +
        '<label for="mark-x">X</label>' +
        '<input type="radio" name="mark" id="mark-o" value="o">' +
        '<label for="mark-o">O</label>' +
        '</div>' +
        '<div id="player-type">' +
        '<input type="radio" name="player-type" id="human" value="human" checked>' +
        '<label for="human">Human</label>' +
        '<input type="radio" name="player-type" id="ai" value="ai">' +
        '<label for="ai">Computer / AI</label>' +
        '</div>' +
        '<div id="color-picker">' +
        '<span id="color-picker-color" style="background-color: rgb(249, 156, 1)"></span>' +
        '<div id="color-picker-sliders">' +
        '<p><label for="red">Red</label><input type="range" name="red" id="red" max="255" value="249"></p>' +
        '<p><label for="green">Green</label><input type="range" name="green" id="green" max="255" value="156"></p>' +
        '<p><label for="blue">Blue</label><input type="range" name="blue" id="blue" max="255" value="1"></p>' +
        '</div>' +
        '</div>' +
        '<p>(No white or black colors)</p>' +
        '<button>Next</button>' +
        '</div>' +
        '</div>');
    var $finishScreen = $('<div class="screen screen-win" id="finish">' +
        '<header>' +
        '<h1>Tic Tac Toe</h1>' +
        '<p class="message"></p>' +
        '<a href="#" class="button">New game</a>' +
        '<a href="#" class="button">Play again</a>' +
        '</header>' +
        '</div>');

    // Players
    var player1;
    var player2;

    // Insert HTML for start and finish screen - hidden by default
    $board.before($startScreen.hide());
    $board.before($playerPrompt);
    $board.after($finishScreen.hide());

    // Player
    var Player = function (playerName, markType, playerType) {
        this.playerName = playerName;
        this.mark = markType;
        this.playerType = playerType;
    };
    
    var showStartScreen = function () {
        // Hide board and show start screen
        $board.hide();
        $startScreen.show();
    };
    
    var showFinishScreen = function () {
        // Hide board and show start screen
        $board.hide();
        $finishScreen.show();
    };

    var showPlayerPromopt = function () {
        $board.hide();
        $finishScreen.hide();
        $startScreen.hide();
        $playerPrompt.show();
    };

    var showPlayer2Prompt = function () {
        // Change prompt html for player 2
        $playerPrompt.find('h1').text('Player 2');
        $playerPrompt.find('#player-name').val('');
        // Force the other mark for player 2
        if (player1.mark === 'x') {
            $playerPrompt.find('#mark-x').prop('disabled', true);
            $playerPrompt.find('#mark-o').prop('checked', true);
        } else {
            $playerPrompt.find('#mark-o').prop('disabled', true);
            $playerPrompt.find('#mark-x').prop('checked', true);
        }
        // Default to human 2nd player
        $playerPrompt.find('#human').prop('checked', true);
        // Change to default 2nd player color
        $playerPrompt.find('#color-picker-color').css('background-color', 'rgb(59, 136, 192)');
        $playerPrompt.find('#red').val('59');
        $playerPrompt.find('#green').val('136');
        $playerPrompt.find('#blue').val('192');
    };

    var startGame = function() {
        $board.show();

    };

    // Event Handling
    // Start button on click event
    $startScreen.find('.button').on('click', function () {
        // Toggle visibility
        $startScreen.hide();
        showPlayerPromopt();
    });
    // Color slider event
    $playerPrompt.find('input[type="range"]').on('input', function () {
        var red = $playerPrompt.find('#red').val();
        var green = $playerPrompt.find('#green').val();
        var blue = $playerPrompt.find('#blue').val();

        $playerPrompt.find('#color-picker-color').css('background-color', 'rgb(' + red + ', ' + green + ', ' + blue + ')');
    });
    // Player prompt on click event
    $playerPrompt.find('button').on('click', function () {
        var playerName = $playerPrompt.find('#player-name').val();
        var markType = $playerPrompt.find('input[name="mark"]').filter(':checked').val();
        var playerType = $playerPrompt.find('input[name="player-type"]').filter(':checked').val();
        var color = $playerPrompt.find('#color-picker-color').css('background-color');

        // Quick and dirty validation
        if (color === 'rgb(0, 0, 0)' || color === 'rgb(255, 255, 255)') {
            return;
        }

        // If player name is blank set default
        playerName = playerName === '' ? $playerPrompt.find('h1').text() : playerName;
        
        var player = new Player(playerName, markType, playerType);

        if ($playerPrompt.find('h1').text() === 'Player 1') {
            player1 = player;
            showPlayer2Prompt();
        } else {
            player2 = player;
            $playerPrompt.hide();
            startGame();
        }
    });
    // Finish button on click event
    $finishScreen.find('.button').on('click', function () {
        // Toggle visibility
        $finishScreen.hide();
        $board.show();
    });

    showStartScreen();
    $board.hide();
    $playerPrompt.hide();

    // Exports
    exports.showStartScreen = showStartScreen;
    exports.showPlayerPrompt = showPlayerPromopt;
    exports.showPlayer2Prompt = showPlayer2Prompt;
    exports.showFinishScreen = showFinishScreen;
    exports.startGame = startGame;

    return exports;
}($));