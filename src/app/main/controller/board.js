/*global angular*/


angular.module('cards')
.controller("CardController", function($rootScope, $scope, deckService, constantsService, $timeout, $interval, global) {
	
	$scope.showImage = true;
	var tipo;
	
	$scope.$watch('level', function() {
		$scope.init(tipo);
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
		
		$scope.init(e);
		
	});

	$scope.init = function(type){
		constantsService['rows'] = $scope.rows;
		constantsService['columns'] = $scope.columns;
		constantsService.constants();
		
		deckService.createDeck(type).then(function(result){
			$scope.deck = result;	
		})
		$scope.isGuarding = true;
		$scope.inGame = false;	
		
		$scope.start();
	}


	// for the timer
	$scope.timeLimit = 60000;
	$scope.isCritical = false;
	var timer = null;

	// start the timer as soon as the player presses start
	$scope.start = function(){
		
		if(timer && timer !== null){
			$interval.cancel(timer);
		}
		
		// set the time of 1 minutes and remove the cards guard
		$scope.timeLimit = 60000;
		$scope.isGuarding = false;
		$scope.inGame = true;
		
		timer = $interval(function(){
			
			$scope.timeLimit -= 1000;
			$scope.isCritical = $scope.timeLimit <= 10000 ? true : false;
			
			if ($scope.timeLimit === 0) {
				$interval.cancel(timer);
			}
			
		},1000);

		
	}	
	// function to stop the timer
	$scope.stopTimer = function() {
	 
	  $scope.inGame = false;
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
    	$scope.stopTimer();     
    });

}); 
