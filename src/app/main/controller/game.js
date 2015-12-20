/*global angular*/


var app = angular.module('cards', ['ngAnimate']);
app.controller("gameController", function($scope) {
    
	var vm = $scope;
    
    vm.rows = 2;
    vm.columns = 2;
    vm.level = 1;
    vm.type = "Simpson";
    vm.showType = true;
    
	$scope.$on('GameResult', function (event, payload) {
	    var item = payload.win;
	    levelPassed(item);
	});
      
    
    vm.typeChanged = function(){
        vm.showType = false;    
    }
    
    function levelPassed(item){
        if(item){
            
            var level = vm.level +1;
            
            if(pair(level)){
                vm.columns  = vm.columns +2;    
            }
            else{
                vm.rows  = vm.rows +2;    
            }
            
            vm.level = level;
        }
        else{
            vm.rows  = 2;
            vm.columns  = 2;
            vm.level = 1;
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