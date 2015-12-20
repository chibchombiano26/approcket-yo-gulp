/*global angular*/
var app = angular.module('cards', ['ngAnimate']);
app.controller("gameController", function($scope) {
    $scope.rows = 2;
    $scope.columns = 2;
    $scope.level = 1;
    $scope.type = "Simpson";
    $scope.showType = true;
    
	$scope.$on('GameResult', function (event, payload) {
	    var item = payload.win;
	    levelPassed(item);
	});
      
    
    $scope.typeChanged = function(){
        $scope.showType = false;    
    }
    
    function levelPassed(item){
        if(item){
            
            var level = $scope.level +1;
            
            if(pair(level)){
                $scope.columns  = $scope.columns +2;    
            }
            else{
                $scope.rows  = $scope.rows +2;    
            }
            
            $scope.level = level;
        }
        else{
            $scope.rows  = 2;
            $scope.columns  = 2;
            $scope.level = 1;
            //alert("ouch")
        }
    }
    
    function pair(level){
        if (level % 2 == 0){
            return true;
        }
        else{
            return false;
        }
  
    }
    
    
});