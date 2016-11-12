/**
 * button will return array
 * variables:
 * 1. array of data to show only
 * 2. array of headings = [{alias, name, width}]
 *    (will display alias as headings only)
 * 3. prefix for div ids
 * 4. multiselect/singleselect
 *
 * requirements:
 * 1. both arrays should be preformatted
 * 2. both arrays should have same order
 *    (array of data's object values should be in same order as array of headings' alias)
 */

var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', '$log', '$location', '$anchorScroll', function ($scope, $http, $log, $location, $anchorScroll) {
  $scope.sample = [
  	{
  		color: "1red",
  		value: "#f00"
  	},
  	{
  		color: "gran",
  		value: "#0f0"
  	},
  	{
  		color: "blue",
  		value: "#00f"
  	},
  	{
  		color: "cyan",
  		value: "#0ff"
  	},
  	{
  		color: "sase",
  		value: "#f0f"
  	},
  	{
  		color: "yellow",
  		value: "#ff0"
  	},
  	{
  		color: "black",
  		value: "#000"
  	},
    {
      color: "red",
      value: "#f00"
    },
    {
      color: "green",
      value: "#0f0"
    },
    {
      color: "blue",
      value: "#00f"
    },
    {
      color: "cyan",
      value: "#0ff"
    },
    {
      color: "sade",
      value: "#f0f"
    },
    {
      color: "yellow",
      value: "#ff0"
    },
    {
      color: "cyan",
      value: "#0ff"
    },
    {
      color: "masagenta",
      value: "#f0f"
    },
    {
      color: "yellow",
      value: "#ff0"
    },
    {
      color: "blasack",
      value: "#000"
    },
    {
      color: "cya25n",
      value: "#0ff"
    },
    {
      color: "maeqgenta",
      value: "#f0f"
    },
    {
      color: "yellow",
      value: "#ff0"
    },
    {
      color: "black",
      value: "#000"
    },
    {
      color: "blaack",
      value: "#000"
    },
    {
      color: "red",
      value: "#f00"
    },
    {
      color: "gfreen",
      value: "#0f0"
    },
    {
      color: "blue",
      value: "#00f"
    },
    {
      color: "cyan",
      value: "#0ff"
    },
    {
      color: "tq5magenta",
      value: "#f0f"
    },
    {
      color: "yel3low",
      value: "#ff0"
    },
    {
      color: "zzzz32",
      value: "#000"
    }
  ];


  $scope.headings = [];
  $scope.headings.push({'alias': 'BIG COLOR', 'name': 'color', 'width': 15});
  $scope.headings.push({'alias': 'BIG VALUE', 'name': 'value', 'width': 10});
  var multiselect = true;
  $scope.prefix = 'div';

  for (var i = 0; i < $scope.sample.length; i++) {
    $scope.sample[i].selected = 'not selected';
    $scope.sample[i].searched = 'not searched';
    $scope.sample[i].filtered = 'shown';
    $scope.sample[i].searchid = i;
  }

  $scope.sampleHeadings = 0;
  $scope.singleClickOutput = [];
  $scope.selected = 'no-highlight';
  $scope.propertyName = $scope.headings[0].name;
  $scope.reverse = true;  
  $scope.enterPressed = 0;
  $scope.results = [];

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName.name) ? !$scope.reverse : false;
    $scope.propertyName = propertyName.name;
  };

  $scope.sortBy('color');

  $scope.doubleClick = function(item) {
    $scope.doubleClickOutput = item;
  };

  for (var key in $scope.sample[0]) {
    $scope.sampleHeadings++;
  }

  $scope.searchHeading = function(heading, searchFilter) {
    if (searchFilter !== '') {
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
        $scope.sample[i].filtered = 'hidden';
        if ($scope.sample[i][heading].includes(searchFilter)) {
          $scope.sample[i].searched = 'searched';
          $scope.sample[i].filtered = 'shown';
        }
      }
    } else {
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
        $scope.sample[i].filtered = 'shown';
      }
    }
    $scope.searchHeadingOutput = heading;
  };
  
  $scope.singleClick = function(item) {
    var alreadyExists = false;
    if (multiselect === false) {
      $scope.singleClickOutput.splice(0, 1);
      for (var j = 0; j < $scope.sample.length; j++) {
        $scope.sample[j].selected = 'not selected';
      }
    }
    for (var i = 0; i < $scope.singleClickOutput.length; i++) {
      if ($scope.singleClickOutput[i] === item) {
        $scope.singleClickOutput.splice(i, 1);
        alreadyExists = true;
        item.selected = 'not selected';
      }
    }
    if (!alreadyExists) {
      item.selected = 'selected';
      $scope.singleClickOutput.push(item);
    }
  };

  $scope.jumpSearch = function() {
    if ($scope.enterPressed + 1 < $scope.results.length) {
      var main_columns = document.getElementById('main-columns');
      main_columns.scrollTop = 0;
      var prefixno = document.getElementById('' + $scope.prefix + $scope.results[$scope.enterPressed]);
      main_columns.scrollTop = main_columns.scrollTop + prefixno.offsetTop;
      $scope.enterPressed++;
    } else {
      $scope.enterPressed = 0;
    }
  };

  $scope.searchItems = function() {
    $scope.enterPressed = 0;
    $scope.results = [];
    var main_columns = document.getElementById('main-columns');
    main_columns.scrollTop = 0;
    if ($scope.searchItem !== '') {
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
        for (var keys in $scope.sample[i]) {
          if (keys !== 'selected' && keys !== 'searched' && keys !== '$$hashKey' && keys !== 'searchid' && keys !== 'filtered') {
            if ($scope.sample[i][keys].includes($scope.searchItem)) {
              $scope.sample[i].searched = 'searched';
              $scope.results.push(i);
            }
          }
        }
      }
    } else {
      main_columns.scrollTop = 0;
      for (var i = 0; i < $scope.sample.length; i++) {
        $scope.sample[i].searched = 'not searched';
      }
    }
  };
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
              scope.$apply(function (){
                  scope.$eval(attrs.ngEnter);
              });
              event.preventDefault();
            }
        });
    };
});