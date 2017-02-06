!function($, exports) {
    // Players
    var session;
    
    var getSession = function () {
        return session;
    };
    
    var setSession = function (newSession) {
        session = newSession;
        return session;
    };
    
    var getCurrentGame = function () {
        return session.currentGame;
    };

    // Since this is the last file to load, show start screen after everything else is done
    exports.showStartScreen();
    
    exports.getSession = getSession;
    exports.setSession = setSession;
    exports.getCurrentGame = getCurrentGame;
} ($, ticTacToe);