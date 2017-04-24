const triviaDirective = () => {
    return {
        templateUrl: 'components/trivia/trivia.html',
        restrict: 'E',
        link: (scope) => {}
    };
};

triviaDirective.$inject = [];

angular.module('funWebApp').directive('triviaDirective', triviaDirective);