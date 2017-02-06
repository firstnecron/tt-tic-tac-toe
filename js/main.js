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
    
    exports.getSession = getSession;
    exports.setSession = setSession;
    exports.getCurrentGame = getCurrentGame;
} ($, ticTacToe);