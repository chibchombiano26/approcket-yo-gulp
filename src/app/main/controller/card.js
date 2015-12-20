/*global angular*/
angular.module('cards')
.controller('cardController', function($rootScope, $scope, global, constantsService,  $timeout){
    
	$scope.check = function(card) {
    	if (global.currentSessionOpen && global.previousCard != card && global.previousCard.item == card.item && !card.isFaceUp) {
    		card.isFaceUp = true;
    		global.previousCard = null;
    		global.currentSessionOpen = false;
    		global.numPairs++;
    	} else if(global.currentSessionOpen && global.previousCard != card && global.previousCard.item != card.item && !card.isFaceUp) {
    		$scope.isGuarding = true;
    		card.isFaceUp = true;
    		global.currentSessionOpen = false;			
    		$timeout(function() {
    			global.previousCard.isFaceUp = card.isFaceUp = false;
    			global.previousCard = null;
    			$scope.isGuarding = $scope.timeLimit ? false : true;
    		}, 1000);
    	} else {
    		card.isFaceUp = true;
    		global.currentSessionOpen = true;
    		global.previousCard = card;
    	}	
    
    	if (global.numPairs == constantsService.getNumMatches()) {
    		$rootScope.$broadcast('complete');
    	}
	}
})