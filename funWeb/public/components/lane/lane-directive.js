const laneDirective = () => {
    return {
        templateUrl: 'components/lane/lane.html',
        restrict: 'E',
        link: (scope) => {}
    };
};

laneDirective.$inject = [];

angular.module('funWebApp').directive('laneDirective', laneDirective);