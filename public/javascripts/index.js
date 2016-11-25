(function() {
'use restrict';

var app = angular.module('colorfulStone', ['ngMaterial']);

app.controller('ColorfulStoneController', function($scope) {
  $scope.collapse = true;

  $scope.collapseAside = function() {
    $scope.collapse = !$scope.collapse;
  };
});

app.directive("icbcAfterRepeat", ['$timeout', '$log', function($timeout, $log) {
  return {
    restrict: 'A',
    link: function($scope, $elements, $attrs) {
      if ($scope.$parent.$parent.$last && $scope.$parent.$last && $scope.$last) {
        $timeout(function() {
          $scope.$emit('renderTabs');
        });
      }
    }
  };
}]);

app.directive("icbcNavProject", ['$http', '$window', function($http, $window) {
  function nodeFilter(navData) {
    if (navData.nodeList.length <= 0) return {};
    var tabData = {}, dictData = {}, nodes = navData.nodeList, node,
        tabTitle = navData['tabTitle'], subTitle = navData['subTitle'], title = nodes[0][navData['navTitle']];
    for(var i=0; i<nodes.length; ++i) {
      node = nodes[i];
      if (! tabData[node[tabTitle]]) {
        tabData[node[tabTitle]] = {};
        tabData[node[tabTitle]][node[subTitle]] = [ node ];
      } else {
        if (! tabData[node[tabTitle]][node[subTitle]]) {
          tabData[node[tabTitle]][node[subTitle]] = [node];
        } else {
          tabData[node[tabTitle]][node[subTitle]].push(node);
        }
      }
    }
    return {
      title: title,
      data: tabData,
      dict: dictData
    };
  }

  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {},
    templateUrl : '/templates/project-nav.html',
    link: function($scope, $elements, $attrs) {
      var nodeReq = {
        method: 'GET',
        url: $attrs.url
      };
      $scope.$on('renderTabs', function($event) {
        componentHandler.upgradeElements($elements);
      });
      angular.element($window).bind('resize', function() {
        componentHandler.upgradeElements($elements);
      });
      $http(nodeReq).then(function(res) {
        $scope.tabData = nodeFilter(res.data);
      });
    }
  };
}]);


app.directive('icbcDataTable', ['$http', function($http) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: '/templates/data-table.html',
    link: function($scope, $elements, $attrs) {
      var tableReq = {
        method: 'GET',
        url: $attrs.url
      };
      $http(tableReq).then(function(res) {
        $scope.tableData = res.data;
      });
    }
  };
}]);

app.directive('icbcNoticeList', ['$http', function($http) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: '/templates/notice-list.html',
    link: function($scope, $elements, $attrs) {
      var noticeReq = {
        method: 'GET',
        url: $attrs.url
      };
      $http(noticeReq).then(function(res) {
        $scope.noticeData = res.data;
      });
    }
  };
}]);

})();