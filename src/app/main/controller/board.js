/*global angular*/


angular.module('cards')
.controller("boardController", function($rootScope, $scope, deckService, constantsService, $timeout, $interval, global) {
	
	var vm = $scope;
	
	vm.showImage = true;
	var tipo;
	
	$scope.$watch('level', function() {
		vm.init(tipo);
	});
	
	$scope.$watch('type', function(e) {
		tipo = e;
		switch (tipo) {
			
			case 'Simpson':
				$scope.showImage = true;
				break;
			case 'Letters':
				$scope.showImage = false;
				break;
			case 'hiragana':
				$scope.showImage = false;
				break;
			default:
				$scope.showImage = true;
		}
		
		vm.init(e);
		
	});

	vm.init = function(type){
		constantsService['rows'] = vm.rows;
		constantsService['columns'] = vm.columns;
		constantsService.constants();
		
		deckService.createDeck(type).then(function(result){
			vm.deck = result;	
		})
		vm.isGuarding = true;
		vm.inGame = false;	
		
		vm.start();
	}


	// for the timer
	vm.timeLimit = 60000;
	vm.isCritical = false;
	var timer = null;

	// start the timer as soon as the player presses start
	vm.start = function(){
		
		if(timer && timer !== null){
			$interval.cancel(timer);
		}
		
		// set the time of 1 minutes and remove the cards guard
		vm.timeLimit = 60000;
		vm.isGuarding = false;
		vm.inGame = true;
		
		timer = $interval(function(){
			
			vm.timeLimit -= 1000;
			vm.isCritical = vm.timeLimit <= 10000 ? true : false;
			
			if (vm.timeLimit === 0) {
				$interval.cancel(timer);
			}
			
		},1000);

		
	}	
	// function to stop the timer
	vm.stopTimer = function() {
	 
	  vm.inGame = false;
	  global.previousCard = null;
	  global.currentSessionOpen = false;
	  global.numPairs = 0;
	  
	  //Inform to the parent
	  if($scope.timeLimit > 1000){
	  	$rootScope.$broadcast('GameResult', {win : true});
	  }
	  else{
	  	$rootScope.$broadcast('GameResult', {win : false});
	  }
	}
	
	$scope.$on('complete', function (event, payload) {
    	vm.stopTimer();     
    });

}); 
