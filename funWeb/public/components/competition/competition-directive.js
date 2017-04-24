const competitionDirective = () => {
    return {
        templateUrl: 'components/competition/competition.html',
        restrict: 'E',
        link: (scope) => {}
    };
};

competitionDirective.$inject = [];

angular.module('funWebApp').directive('competitionDirective', competitionDirective);

