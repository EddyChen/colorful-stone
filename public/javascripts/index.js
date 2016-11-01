
var app = angular.module('colorfulStone', []);

app.controller('ColorfulStoneController', function($scope) {
  $scope.collapse = true;

  $scope.collapseAside = function() {
    $scope.collapse = !$scope.collapse;
  };
});

app.directive("icbcNavProject", ['$http', function($http) {
  function nodeFilter(navData) {
    if (navData.nodeList.length <= 0) return {};
    var tabData = {}, dictData = {}, nodes = navData.nodeList, node,
        tabTitle = navData['tabTitle'], subTitle = navData['subTitle'];
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
      data: tabData,
      dict: dictData
    };
  }

  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl : '/templates/project-nav.html',
    controller: function($scope, $element, $attrs) {
      var nodeReq = {
        method: 'GET',
        url: $attrs.url
      };
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
    scope: true,
    templateUrl: '/templates/data-table.html',
    controller: function($scope, $element, $attrs) {
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