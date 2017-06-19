class containerController{
    constructor($state,  $scope, $location, $http, $anchorScroll, socketService, quizFactory, userRsp, userService, userFactory) {
    	// Shared properties throughout the application
       
        var dateFormat = require('dateformat');
       
        this.user = userFactory.user();
        this.userId = userFactory.userId();
        this.username = userFactory.username();
        this.userScore = parseInt(userFactory.userScore()); 
        this.userLevel = userFactory.userLevel();    
        this.users = userRsp.data;
        this.userHeaders = ['Name', 'Level', 'Score'];
        this.userKeys = ['level', 'score'];
        
        this.viewValue = $state.current.name; 
        this.subViewValue = 'player';
       
        // Register socket
        socketService.registerSocket();
        
        // Watch for socket incoming data
        socketService.socketOn('newCompetition', (resp) => {
            competitionService.getCompetition().then((resp) => {
                this.competitions = resp.data;
            });
        });  

        $scope.questions = quizFactory.getQuizQuestions(); 

        $scope.$watch(quizFactory.getQuizQuestions,function () {
             $scope.questions = quizFactory.getQuizQuestions(); 
             //alert("watch: " + $scope.questions.length + " | ");
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
        $scope.questionNb = 0;
        $scope.questions = [];
        
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
          
          $scope.header=true;
          $scope.footer=true;
        }
        $scope.ShowTrivia = function(file){
          $scope.first = false;
          $scope.play= false;
          $scope.scores = false;
          $scope.rules= false;
          $scope.login=false;
          $scope.register=false; 
          $scope.trivia=true;          
          $scope.header=true;
          $scope.footer=true;          
          $scope.questionNb = 0;          
          quizFactory.createQuizQuestions(file,10); //alert($scope.questions[0]['Answer']);          
          /*$http.get(file).then( function(response) {
              $scope.questions = response.data; //alert($scope.questions[0]['Answer']);
          });*/
          $anchorScroll();
        }
    }
}

containerController.$inject = ['$state', '$scope', '$location', '$http', '$anchorScroll', 'socketService', 'quizFactory', 'userRsp', 'userService',  'userFactory'];

angular.module('funWebApp').controller('containerController', containerController);

angular.module('funWebApp').factory('quizFactory', function($http) {
  var questions = []; 
  var categQuestions = [];
  var quizQuestions = [];
  var aux = [];

  function getRandom(arr, n) {
      var result = new Array(n),
          len = arr.length,
          taken = new Array(len); 
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len;
      }
      return result;
  }

  function createQuizQuestions(category, nb) {
        return $http.get(category).then( function(response) {
                  aux =  response.data; 
                  quizQuestions = getRandom(aux,nb); //alert(quizQuestions[0]['Answer']);
                }); 
  }

  //var factory = {};
  
  return {   
    createQuizQuestions: createQuizQuestions,
    
    getQuizQuestions: function () {
            //createQuizQuestions(category, nb);
            return quizQuestions; 
        },
    getCategoryQuestions: function getCategoryQuestions(category) {
                              return $http.get(category).then( function(response) {
                                    categQuestions = response.data; //alert($scope.questions[0]['Answer']);
                                });
                              //return categQuestions;
    },
    
    getQuestion: function getQuestion(id){
                  if(id < questions.length) {
                          return questions[id];
                  } else {
                          return false;
                  }
              }
  }
 
});

angular.module('funWebApp').directive('footer', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/footer.html'
  };
});

angular.module('funWebApp').directive('trivia', function() {
  return {
    restrict: 'E',
    templateUrl: '././views/trivia.html'
  };
});

angular.module('funWebApp').directive('question', function ($timeout, $rootScope, userService) {
  
  return {
    //require: 'ngModel',
    restrict: 'E',
    templateUrl: '././views/question.html',
    scope: {
        qData: '=',
        qnb: '=',        
        username: '=',        
        user: '='
    },
    link: (scope,elem, attrs) => {
            //console.log("user: " + scope.username);
            scope.selected = { option : '.'};
            scope.score = 0;            
            //scope.playerOne = scope.players.filter((obj) => obj._id === scope.gameData.p1_id)[0];
            //scope.playerTwo = scope.players.filter((obj) => obj._id === scope.gameData.p2_id)[0];
            scope.nextQuestion = () => {
              if (scope.qnb < 9) 
              {
                scope.qnb += 1;                  
              }
              else{ //quiz over
                  
                  //scope.userScore += scope.score; /////////////////////////////////////// save score in db
                  //scope.user.score += scope.score;
                  var update = {_id:scope.user._id, score:scope.score };
                  userService.updateUser(update).then((rsp) => {
                      scope.user = angular.copy(rsp.data);
                      console.log("userScore updated");
                      //console.log(JSON.stringify(rsp.data));
                      $rootScope.$broadcast('gameFinished', 1);
                  });
                  $('.question').hide();
                  $('#result').show();
              }
            }
            scope.checkAnswer = () => { //console.log("selected answ: |" + $('input[name=option]:checked').val() + "| vs. |" + scope.qData.Answer +"|" );
                      
                /*if (scope.qData.Options[scope.qData.Answer] == scope.selected.option ) { */                  
                  if(!$('input[name=option]:checked').length) return;

                  var ans = $('input[name=option]:checked').val();
                  var correctAnsw = parseInt(scope.qData.Answer) - 1; 
                  var correct = scope.qData.Options[correctAnsw] ; 

                  if(ans == scope.qData.Options[correctAnsw]  ) {
                    scope.score += 10;
                    scope.correctAns = true;
                    $('#'+ scope.qnb).val('#ccff99');
                    $('input[name=option]:checked').parent().css("background-color", "#ccff99");
                    $timeout(scope.nextQuestion, 2000);                          
                  } else {
                    scope.correctAns = false;
                    $('#'+ scope.qnb).val('#ffcccc');
                    $('input[name=option]:checked').parent().css("background-color", "#ffcccc");
                    $('input[name=option][value=\'' + correct + '\']').parent().css("background-color", "#ccff99");
                    $timeout(scope.nextQuestion, 2000);
                  }   
            }
        }
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
