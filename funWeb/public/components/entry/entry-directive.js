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
angular.module('funWebApp').directive('entry', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/entry/entry.html',
    link: (scope) => {

    	// Changes the view betweeen panels
        scope.changeSubView = (view) => {
            scope.contCtrl.subViewValue = view;
        }

        // Changes the view betweeen panels
    	scope.changeView = (view) => {
    		scope.contCtrl.viewValue = view;
    	}
    }
  };
});