!function($, exports) {
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

    // Marks
    var marks = {
        x: '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#FFFFFF"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>',
        o: '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#FFFFFF"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>'
    };
    
    // Players (Stored until both are created - then passed to session)
    var player1;

    // Screens
    var showStartScreen = function () {
        $playerPrompt.hide();
        $board.hide();
        $finishScreen.hide();

        $startScreen.show();
    };

    var showPlayerPromopt = function () {
        $startScreen.hide();
        $board.hide();
        $finishScreen.hide();

        $playerPrompt.show();
    };

    var showBoard = function () {
        $startScreen.hide();
        $playerPrompt.hide();
        $finishScreen.hide();

        $board.show();
    };

    var showFinishScreen = function () {
        $startScreen.hide();
        $playerPrompt.hide();
        $board.hide();

        $finishScreen.show();
    };

    var showPlayer2Prompt = function () {
        // Change prompt html for player 2
        $playerPrompt.find('h1').text('Player 2');
        $playerPrompt.find('#player-name').val('');
        // Force the other mark for player 2
        if (exports.player1.mark === 'x') {
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

    var prepareBoard = function (player1, player2) {
        // Prepare the board
        var $player1 = $('#player1');
        $player1.find('svg').remove();
        $player1.prepend(exports.marks[player1.mark]);
        $player1.find('div').text(player1.playerName);

        var $player2 = $('#player2');
        $player2.find('svg').remove();
        $player2.prepend(exports.marks[player2.mark]);
        $player2.find('div').text(player2.playerName);
    };

    // Event Handling
    // Start button on click event
    $startScreen.find('.button').on('click', function () {
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

        var player = new exports.Player(playerName, markType, playerType);

        if ($playerPrompt.find('h1').text() === 'Player 1') {
            player1 = player;
            showPlayer2Prompt();
        } else {
            // player2 = player
            var session = new exports.Session(player1, player);
            
            player1 = null; // Clear player holder
            exports.setSession(session).startGame();
        }
    });

    // Finish button on click event
    $finishScreen.find('.button').on('click', function () {
        if ($(this).text() === 'Play again') {
            // Play again
        } else {
            // New game
        }
    });


    $('.box').on('mouseenter', function () {
        // Todo: Get whoevers turn it is and fill in x or o (replace player1.mark)
        var mark = exports.getCurrentGame().getCurrentPlayer().mark;
        $(this).append('<img src="img/' + exports.player1.mark + '.svg"/>');
    });

    $('.box').on('mouseleave', function () {
        $(this).find('img').remove();
    });

    $('.box').on('click', function () {
        // Todo: Get whoevers turn it is and fill in x or o (replace player1.mark)
        $(this).addClass('box-filled-' + exports.player1.mark);
    });

    // Insert HTML for start and finish screen - hidden by default
    $board.before($startScreen.hide());
    $board.before($playerPrompt.hide());
    $board.after($finishScreen.hide());

    // Exports
    exports.marks = marks;

    exports.showStartScreen = showStartScreen;
    exports.showPlayerPrompt = showPlayerPromopt;
    exports.showPlayer2Prompt = showPlayer2Prompt;
    exports.showBoard = showBoard;
    exports.showFinishScreen = showFinishScreen;
} ($, ticTacToe);