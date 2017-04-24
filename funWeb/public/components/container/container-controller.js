class containerController{
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
        socketService.socketOn('newCompetition', (resp) => {
            competitionService.getCompetition().then((resp) => {
                this.competitions = resp.data;
            });
        });

        $scope.header = true;
        $scope.first= true;
        $scope.rules = true;
        $scope.scores = true;
        $scope.play= true;
        $scope.footer = true;
        $scope.login=false;
        $scope.register=false;    
        $scope.trivia=false;
        $scope.lane=true;
        $scope.Click = function (id) {      
          angular.element(id).trigger('click');   
        }      
        $scope.ShowLogin = function(){
          $scope.first = false;
          $scope.play= false;
          $scope.scores = false;
          $scope.rules= false;
          $scope.login=true;
          $scope.register=false;  
          $scope.trivia=false;
          //$location.hash('loginPage');
          // call $anchorScroll()
          $anchorScroll();
        }
        $scope.ShowRegister = function(){
          $scope.first = false;
          $scope.play= false;
          $scope.scores = false;
          $scope.rules= false;
          $scope.login=false;
          $scope.register=true; 
          $scope.trivia=false; 
          //$location.hash('loginPage');
          // call $anchorScroll()
          $anchorScroll();
        }
        $scope.ShowContent = function(id){
          
          $scope.first = true;
          $scope.play= true;
          $scope.scores = true;
          $scope.rules= true;
          $scope.login= false;
          $scope.register=false;
          $scope.trivia=false;  
        }
        $scope.ShowTrivia = function(){
          $scope.first = false;
          $scope.play= false;
          $scope.scores = false;
          $scope.rules= false;
          $scope.login=false;
          $scope.register=false; 
          $scope.trivia=true; 
          $scope.header=false;
          $scope.footer=false;
          $scope.lane=true;
          //$location.hash('loginPage');
          // call $anchorScroll()
          $anchorScroll();
        }
    }
}

containerController.$inject = ['$state', 'playerRsp', 'competitionRsp', 'gamesRsp', 'socketService', 'competitionService', '$scope', '$location', '$anchorScroll'];

angular.module('funWebApp').controller('containerController', containerController);

angular.module('funWebApp').directive('footer', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/footer.html'
  };
});

angular.module('funWebApp').directive('header', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/header.html'
  };
});

angular.module('funWebApp').directive('rules', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/rules.html'
  };
});

angular.module('funWebApp').directive('first', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/firstPageBody.html'
  };
});

angular.module('funWebApp').directive('scores', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/scores.html'
  };
});

angular.module('funWebApp').directive('play', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/play.html'
  };
});
angular.module('funWebApp').directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/login.html'
  };
});
angular.module('funWebApp').directive('register', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/register.html'
  };
});

angular.module('funWebApp').controller("loginCtrl", function($scope){
    

///////////////////de pus aici cerea get din login.html

  $scope.data={};
    $scope.save = function() {
        //logheaza user & redirect 
        if ($scope.inputform.$valid)
            alert('User logged in');
        {
            
        }


        
    }

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

