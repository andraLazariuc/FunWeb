const standingDirective = () => {
    return {
        templateUrl: 'components/standing/standing.html',
        restrict: 'E',
        scope: {
            games: '=', //{p1_id : '', p2_id: ''}
            players: '=', //[player]
        },
        link: (scope) => {
        	scope.calculateScores = () => {
                if (scope.game.status) {
                    const gameData = angular.copy(scope.gameData);
                    gameData.status = scope.game.status;
                    gameData.id = gameData._id;

                    delete gameData._id;
                    gameService.endGame(gameData).then((rsp) => {
                    	scope.gameData = rsp.data;
                    });
                }
            }
        }
    };
};

standingDirective.$inject = [];

angular.module('funWebApp').directive('standing', standingDirective);
