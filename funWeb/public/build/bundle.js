(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const addCompetition = (competitionService, socketService) => {
    return {
        templateUrl: 'components/add_competition/add-competition.html',
        restrict: 'E',
        link: scope => {

            // General properties
            scope.competition = {
                name: '',
                players: []
            };

            // Adds a new player
            scope.addCompetition = () => {
                if (scope.competition.name && scope.competition.players) {
                    competitionService.addCompetition(scope.competition).then(() => {
                        competitionService.getCompetition().then(resp => {

                            // Update competitions data
                            scope.contCtrl.competitions = resp.data;

                            // General properties
                            scope.competition = {
                                name: '',
                                players: []
                            };

                            // Reset the form after success
                            scope.formModel.$setPristine();
                            scope.formModel.$setUntouched();

                            // Send to server an impulse that we've added the competition
                            socketService.socketEmit('newCompetition', 1);
                        });
                    });
                }
            };
        }
    };
};

addCompetition.$inject = ['competitionService', 'socketService'];

angular.module('funWebApp').directive('addCompetition', addCompetition);

},{}],2:[function(require,module,exports){
const addUsers = playerService => {
    return {
        templateUrl: 'components/add_users/add-users.html',
        restrict: 'E',
        link: scope => {

            // General properties
            scope.player = {
                name: '',
                email: '',
                club: ''
            };

            // Adds a new player
            scope.addPlayer = () => {
                if (scope.player.name && scope.player.email) {

                    // What is a promise Pava? a a a?
                    playerService.addPlayer(scope.player).then(() => {
                        playerService.getPlayers().then(resp => {

                            // Update players data
                            scope.contCtrl.players = resp.data;

                            // Reset player model
                            scope.player = {
                                name: '',
                                email: '',
                                club: ''
                            };

                            // Reset the form after success
                            scope.formModel.$setPristine();
                            scope.formModel.$setUntouched();
                        });
                    });
                }
            };
        }
    };
};

addUsers.$inject = ['playerService'];

angular.module('funWebApp').directive('addUsers', addUsers);

},{}],3:[function(require,module,exports){
const competitionDirective = () => {
    return {
        templateUrl: 'components/competition/competition.html',
        restrict: 'E',
        link: scope => {}
    };
};

competitionDirective.$inject = [];

angular.module('funWebApp').directive('competitionDirective', competitionDirective);

},{}],4:[function(require,module,exports){
class containerController {
  constructor($state, playerRsp, competitionRsp, gamesRsp, socketService, competitionService, $scope, $location, $anchorScroll) {
    // Shared properties throughout the application
    this.players = playerRsp.data;
    this.userHeaders = ['Name', 'Level', 'Score', 'Last played'];
    this.userKeys = ['name', 'level', 'score', 'date'];

    this.competitions = competitionRsp.data;
    this.competitionHeaders = ['Name', 'Current Round', 'Total Rounds', 'Status', 'Date'];
    this.competitionKeys = ['name', 'current_round', 'rounds', 'status', 'date'];

    this.games = gamesRsp.data;
    this.gamesFilter = gamesRsp.data;

    // Set the current view based on what we loaded
    this.viewValue = $state.current.name;
    this.subViewValue = 'player';

    if ($state.params && $state.params.compId) {
      this.currentCompId = $state.params.compId;
    }

    // Register socket
    socketService.registerSocket();

    // Watch for socket incoming data
    socketService.socketOn('newCompetition', resp => {
      competitionService.getCompetition().then(resp => {
        this.competitions = resp.data;
      });
    });

    $scope.header = true;
    $scope.first = true;
    $scope.rules = true;
    $scope.scores = true;
    $scope.play = true;
    $scope.footer = true;
    $scope.login = false;
    $scope.register = false;
    $scope.trivia = false;
    $scope.lane = true;
    $scope.Click = function (id) {
      angular.element(id).trigger('click');
    };
    $scope.ShowLogin = function () {
      $scope.first = false;
      $scope.play = false;
      $scope.scores = false;
      $scope.rules = false;
      $scope.login = true;
      $scope.register = false;
      $scope.trivia = false;
      //$location.hash('loginPage');
      // call $anchorScroll()
      $anchorScroll();
    };
    $scope.ShowRegister = function () {
      $scope.first = false;
      $scope.play = false;
      $scope.scores = false;
      $scope.rules = false;
      $scope.login = false;
      $scope.register = true;
      $scope.trivia = false;
      //$location.hash('loginPage');
      // call $anchorScroll()
      $anchorScroll();
    };
    $scope.ShowContent = function (id) {

      $scope.first = true;
      $scope.play = true;
      $scope.scores = true;
      $scope.rules = true;
      $scope.login = false;
      $scope.register = false;
      $scope.trivia = false;
    };
    $scope.ShowTrivia = function () {
      $scope.first = false;
      $scope.play = false;
      $scope.scores = false;
      $scope.rules = false;
      $scope.login = false;
      $scope.register = false;
      $scope.trivia = true;
      $scope.header = false;
      $scope.footer = false;
      $scope.lane = true;
      //$location.hash('loginPage');
      // call $anchorScroll()
      $anchorScroll();
    };
  }
}

containerController.$inject = ['$state', 'playerRsp', 'competitionRsp', 'gamesRsp', 'socketService', 'competitionService', '$scope', '$location', '$anchorScroll'];

angular.module('funWebApp').controller('containerController', containerController);

angular.module('funWebApp').directive('footer', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/footer.html'
  };
});

angular.module('funWebApp').directive('header', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/header.html'
  };
});

angular.module('funWebApp').directive('rules', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/rules.html'
  };
});

angular.module('funWebApp').directive('first', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/firstPageBody.html'
  };
});

angular.module('funWebApp').directive('scores', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/scores.html'
  };
});

angular.module('funWebApp').directive('play', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/play.html'
  };
});
angular.module('funWebApp').directive('login', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/login.html'
  };
});
angular.module('funWebApp').directive('register', function () {
  return {
    restrict: 'E',
    templateUrl: '././views/register.html'
  };
});

angular.module('funWebApp').controller("loginCtrl", function ($scope) {

  ///////////////////de pus aici cerea get din login.html

  $scope.data = {};
  $scope.save = function () {
    //logheaza user & redirect 
    if ($scope.inputform.$valid) alert('User logged in');
    {}
  };
});
// TO DO: 
// TO DO : PERSONALIZARE ERORI & VALIDARE
// ng-class="{'has-success': inputform.email.$dirty && inputform.email.$valid}"
// ng-class="{'has-success': inputform.password.$dirty && inputform.password.$valid}"
// http://plnkr.co/edit/guaTzs?p=preview
// http://codepen.io/sevilayha/pen/xFcdI

//http://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition
// header + user http://plnkr.co/edit/2u2ZDE?p=preview
// header + user http://plnkr.co/edit/LvtVEE?p=preview
// header + user http://jsfiddle.net/pyeVM/16/

},{}],5:[function(require,module,exports){
const containerDirective = () => {
    return {
        templateUrl: 'components/container/container.html',
        restrict: 'E',
        link: scope => {

            // Changes the view betweeen panels
            scope.changeSubView = view => {
                scope.contCtrl.subViewValue = view;
            };

            // Changes the view betweeen panels
            scope.changeView = view => {
                scope.contCtrl.viewValue = view;
            };
        }
    };
};

containerDirective.$inject = [];

angular.module('funWebApp').directive('containerDirective', containerDirective);

},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
/*
const index = () => {
    return {
        /*templateUrl: 'components/containerIndex/containerIndex.html',
        template: '<h1>I made a directive!</h1>',
        restrict: 'E',
       
    };
};

index.$inject = [];

angular.module('funWebApp').directive('index', index);
*/
angular.module('funWebApp').directive('entry', function () {
    return {
        restrict: 'E',
        templateUrl: 'components/entry/entry.html',
        link: scope => {

            // Changes the view betweeen panels
            scope.changeSubView = view => {
                scope.contCtrl.subViewValue = view;
            };

            // Changes the view betweeen panels
            scope.changeView = view => {
                scope.contCtrl.viewValue = view;
            };
        }
    };
});

},{}],8:[function(require,module,exports){
const gameComponent = ($rootScope, gameService) => {
    return {
        templateUrl: 'components/game/game.html',
        restrict: 'E',
        scope: {
            competitions: '=',
            allGames: '=',
            gameData: '=', //{p1_id : '', p2_id: ''}
            players: '=' },
        link: scope => {
            scope.game = {
                status: '2' //draw
            };

            scope.playerOne = scope.players.filter(obj => obj._id === scope.gameData.p1_id)[0];
            scope.playerTwo = scope.players.filter(obj => obj._id === scope.gameData.p2_id)[0];

            scope.endGame = () => {
                if (scope.game.status) {
                    const gameData = angular.copy(scope.gameData);
                    gameData.status = scope.game.status;
                    gameData.id = gameData._id;

                    delete gameData._id;
                    gameService.endGame(gameData).then(rsp => {
                        scope.gameData = rsp.data;
                        scope.allGames.forEach(obj => {
                            if (obj._id === scope.gameData._id) {
                                obj.status = scope.gameData.status;
                            }
                        });
                        $rootScope.$broadcast('gameFinished', 1);
                    });
                }
            };
        }
    };
};

gameComponent.$inject = ['$rootScope', 'gameService'];

angular.module('funWebApp').directive('game', gameComponent);

},{}],9:[function(require,module,exports){
const laneDirective = () => {
    return {
        templateUrl: 'components/lane/lane.html',
        restrict: 'E',
        link: scope => {}
    };
};

laneDirective.$inject = [];

angular.module('funWebApp').directive('laneDirective', laneDirective);

},{}],10:[function(require,module,exports){
const messageBox = () => {
	return {
		restrict: 'A',
		templateUrl: 'components/message_box/message-box.html',
		scope: true,
		link: scope => {

			// Initialize the default properties
			scope.messages = [];
			scope.text = 'init value';
			scope.type = 'danger';

			// Populates the message list
			scope.addMessage = () => {
				if (scope.text && scope.type) {
					const msg = {
						text: scope.text,
						type: scope.type
					};
					scope.messages.push(msg);
					scope.text = '';
					scope.type = '';
				}
			};

			// Removes a message by index
			scope.removeMessage = index => {
				scope.messages.splice(index, 1);
			};
		}
	};
};

angular.module('funWebApp').directive('messageBox', messageBox);

},{}],11:[function(require,module,exports){
const paginationComponent = ($rootScope, competitionService) => {
    return {
        templateUrl: 'components/pagination/pagination.html',
        restrict: 'E',
        scope: {
            competitions: '=',
            competitionId: '=',
            allGames: '=',
            filteredGames: '='
        },
        link: scope => {
            // Get the current competition
            scope.competition = scope.competitions.filter(obj => {
                return obj._id === scope.competitionId;
            })[0];

            // Create array for listing the rounds in the header of the stadings table
            scope.competitionRounds = new Array(scope.competition.rounds);

            // Returns another result set of games
            scope.getNewGameSet = round => {
                scope.filteredGames = scope.allGames.filter(obj => {
                    return obj.round === round;
                });
            };
            scope.getNewGameSet(scope.competition.current_round);

            $rootScope.$on('gameFinished', () => {
                competitionService.getCompetition().then(rsp => {
                    scope.competitions = rsp.data;
                    // Get the current competition
                    scope.competition = scope.competitions.filter(obj => {
                        return obj._id === scope.competitionId;
                    })[0];
                    scope.getNewGameSet(scope.competition.current_round);
                });
            });
        }
    };
};

paginationComponent.$inject = ['$rootScope', 'competitionService'];

angular.module('funWebApp').directive('pagination', paginationComponent);

},{}],12:[function(require,module,exports){
const rainWithIcons = $timeout => {
	return {
		restrict: 'A',
		scope: true,
		link: (scope, element) => {

			// Generates a random int between two numbers
			scope.getRandomInt = (min, max) => {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			};

			// Generates a random int between two numbers
			scope.getRandomArbitrary = (min, max) => {
				return Math.random() * (max - min) + min;
			};

			// Set timeout so we have the element data
			$timeout(() => {

				// Constants here 
				const listOfIcons = ['glyphicon-asterisk', 'glyphicon-plus', 'glyphicon-euro', 'glyphicon-minus', 'glyphicon-cloud', 'glyphicon-envelope', 'glyphicon-pencil', 'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star'];
				const attachElem = angular.element(element);
				const elementWidth = attachElem[0].clientWidth;
				const elementHeight = attachElem[0].clientHeight;

				// Check how many element fit in one line
				let numberOfElementsWidth = parseInt(elementWidth / 20);
				let numberOfElementsHeight = parseInt(elementHeight / 20);

				attachElem.addClass('rain-emoji-block');
				const backElem = angular.element('<div class="rain-emoji-block__background"></div>');

				// Iterate through the list of icons and add them to the rain-emoji div
				for (let h = 0; h < numberOfElementsHeight; h++) {
					for (let i = 0; i < numberOfElementsWidth; i++) {
						const random = scope.getRandomInt(0, listOfIcons.length);
						const iconElm = angular.element(`<span class="glyphicon ${listOfIcons[random]}"></span>`);
						const leftMargin = i * 20;
						const animationDelay = scope.getRandomArbitrary(h, h + 3);
						const color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
						iconElm.css('left', `${leftMargin}px`);
						iconElm.css('color', `${color}`);
						iconElm.css('animation-delay', `${animationDelay}s`);
						iconElm.css('animation-duration', `${parseInt(elementHeight / 50) * 2}s`);
						backElem.append(iconElm);
					}
				}

				// Insert the rain-emoji div into the target element
				// MAKE IT RAIN!!! :D
				attachElem.append(backElem);
			}, 1000);
		}
	};
};

rainWithIcons.$inject = ['$timeout'];

angular.module('funWebApp').directive('rainWithIcons', rainWithIcons);

},{}],13:[function(require,module,exports){
const standingDirective = () => {
    return {
        templateUrl: 'components/standing/standing.html',
        restrict: 'E',
        scope: {
            games: '=', //{p1_id : '', p2_id: ''}
            players: '=' },
        link: scope => {
            scope.calculateScores = () => {
                if (scope.game.status) {
                    const gameData = angular.copy(scope.gameData);
                    gameData.status = scope.game.status;
                    gameData.id = gameData._id;

                    delete gameData._id;
                    gameService.endGame(gameData).then(rsp => {
                        scope.gameData = rsp.data;
                    });
                }
            };
        }
    };
};

standingDirective.$inject = [];

angular.module('funWebApp').directive('standing', standingDirective);

},{}],14:[function(require,module,exports){
const standingsComponent = $uibModal => {
    return {
        templateUrl: 'components/standings/standings.html',
        restrict: 'E',
        scope: {
            games: '=',
            players: '=',
            competitions: '=',
            competitionId: '='
        },
        link: scope => {
            // Returns the current competition based on the current tab
            scope.returnCompetition = () => {
                return scope.competitions.filter(obj => {
                    return obj._id === scope.competitionId;
                })[0];
            };

            // Make the calculation here
            scope.calculateStandings = () => {
                let stdObj = {};
                for (let i = 0; i < scope.games.length; i++) {
                    const obj = scope.games[i];
                    if (typeof stdObj[obj.p1_id] === 'undefined') {
                        stdObj[obj.p1_id] = {};
                        stdObj[obj.p1_id].rounds = {};
                        stdObj[obj.p1_id].score = 0;
                    }
                    if (typeof stdObj[obj.p2_id] === 'undefined') {
                        stdObj[obj.p2_id] = {};
                        stdObj[obj.p2_id].rounds = {};
                        stdObj[obj.p2_id].score = 0;
                    }

                    if (obj.status !== 0) {
                        let p1GameScore = 0;
                        let p2GameScore = 0;
                        if (obj.status === 2) {
                            stdObj[obj.p1_id].score += .5;
                            stdObj[obj.p2_id].score += .5;
                            p1GameScore = .5;
                            p2GameScore = .5;
                        } else if (obj.status === 1) {
                            stdObj[obj.p1_id].score += 1;
                            p1GameScore = 1;
                        } else {
                            stdObj[obj.p2_id].score += 1;
                            p2GameScore = 1;
                        }
                        stdObj[obj.p1_id].rounds[obj.round] = p1GameScore + '' + (obj.p1_color == 0 ? 'w' : 'b');
                        stdObj[obj.p2_id].rounds[obj.round] = p2GameScore + '' + (obj.p2_color == 0 ? 'w' : 'b');
                    } else {
                        stdObj[obj.p1_id].rounds[obj.round] = '-';
                        stdObj[obj.p2_id].rounds[obj.round] = '-';
                    }
                }

                const sorted = Object.keys(stdObj).sort((a, b) => {
                    return stdObj[b].score - stdObj[a].score;
                });

                const finalStats = {};
                for (let i = 0; i < sorted.length; i++) {
                    finalStats[sorted[i]] = stdObj[sorted[i]];
                }

                return finalStats;
            };

            // Open the modal that contains the stading table here
            scope.open = () => {
                const modalInstance = $uibModal.open({
                    templateUrl: 'standingsModal.html',
                    controller: ($scope, $uibModalInstance) => {
                        // Calculate standings when we open modal
                        $scope.standings = scope.calculateStandings();

                        // Get the current competition details
                        $scope.competition = scope.returnCompetition();

                        // Create array for listing the rounds in the header of the stadings table
                        $scope.competitionRounds = new Array($scope.competition.rounds);

                        // Returns the player by a specific id
                        $scope.getPlayerById = id => {
                            return scope.players.filter(obj => {
                                return obj._id === id;
                            })[0];
                        };

                        // When we hit the ok button
                        $scope.ok = () => {
                            $uibModalInstance.close();
                        };

                        // When we hit the cancel button
                        $scope.cancel = () => {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }
                });

                modalInstance.result.then(() => {
                    // Manage when we hit the ok button
                    console.log('oki doki');
                }, () => {
                    // Manage when we hit the cancel button
                    console.log('oki doki cancel doki');
                });
            };
        }
    };
};

standingsComponent.$inject = ['$uibModal'];

angular.module('funWebApp').directive('standings', standingsComponent);

},{}],15:[function(require,module,exports){
const tableComponent = () => {
    return {
        templateUrl: 'components/table/table-component.html',
        restrict: 'E',
        scope: {
            tableTitle: '@',
            tableHeaders: '=',
            tableKeys: '=',
            tableBody: '='
        },
        link: scope => {}
    };
};

tableComponent.$inject = [];

angular.module('funWebApp').directive('tableComponent', tableComponent);

},{}],16:[function(require,module,exports){
const triviaDirective = () => {
    return {
        templateUrl: 'components/trivia/trivia.html',
        restrict: 'E',
        link: scope => {}
    };
};

triviaDirective.$inject = [];

angular.module('funWebApp').directive('triviaDirective', triviaDirective);

},{}],17:[function(require,module,exports){
let _$http;

class competitionService {
    constructor($http) {
        _$http = $http;
    }

    addCompetition(competitionSettings) {
        // Make a default configuration object for 'POST' request
        // in order to create a step for a specific case
        const configObject = {
            method: 'POST',
            url: '/competition',
            data: competitionSettings
        };

        // Make the request using $http service
        // Return promise
        return _$http(configObject);
    }

    getCompetition() {
        const configObject = {
            method: 'GET',
            url: '/competition'
        };
        return _$http(configObject);
    }

    deleteCompetition(id) {
        const promise = _$http({
            method: 'DELETE',
            url: '/competition',
            data: { _id: id },
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        });
        // Return the promise to the controller
        return promise;
    }
}

competitionService.$inject = ['$http'];

angular.module('funWebApp').service('competitionService', competitionService);
'';

},{}],18:[function(require,module,exports){
let _$http;
let _games;

class gameService {
    constructor($http) {
        _$http = $http;
        _games = [];
    }

    getGames(compId) {
        const configObject = {
            method: 'GET',
            url: `/game/${compId}`
        };
        return _$http(configObject);
    }

    endGame(data) {
        const configObject = {
            method: 'PUT',
            url: '/game',
            data: JSON.stringify(data)
        };
        return _$http(configObject);
    }

}

gameService.$inject = ['$http'];

angular.module('funWebApp').service('gameService', gameService);

},{}],19:[function(require,module,exports){
let _$http;
let _players;

class playerService {
    constructor($http) {
        _$http = $http;
        _players = [];
    }

    addPlayer(playerData) {
        const configObject = {
            method: 'POST',
            url: '/player',
            data: JSON.stringify(playerData)
        };
        return _$http(configObject);
    }

    getPlayers() {
        const configObject = {
            method: 'GET',
            url: '/player'
        };
        return _$http(configObject);
    }

    deletePlayer(id) {
        const promise = _$http({
            method: 'DELETE',
            url: '/player',
            data: { _id: id },
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        });
        // Return the promise to the controller
        return promise;
    }
}

playerService.$inject = ['$http'];

angular.module('funWebApp').service('playerService', playerService);

},{}],20:[function(require,module,exports){
angular.module('funWebApp').service('socketService', function () {

	this._socket = null;
	var obj = {
		registerSocket: function () {
			// this._socket = io('http://localhost:3000');
			this._socket = io.connect();
		},

		unregisterSocket: function () {
			if (this._socket) {
				this._socket.disconnect();
				this._socket = null;
			}
		},

		socketOn: function (eventName, cb) {
			if (!eventName) {
				throw new Error('Must provide an event to emit for');
			}

			if (!cb || typeof cb !== 'function') {
				throw new Error('Must provide a callback for the socket event listener');
			}
			this._socket.on(eventName, cb);
		},

		socketEmit: function (eventName, data) {
			if (!eventName) {
				throw new Error('Must provide an event to emit for');
			}
			this._socket.emit(eventName, data);
		}
	};
	return obj;
});

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
