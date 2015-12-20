/*global angular*/
angular.module('cards')
.controller('cardController', function($rootScope, $scope, global, constantsService,  $timeout){
    
	var vm = $scope;
    
	vm.check = function(card) {
    	if (global.currentSessionOpen && global.previousCard && global.previousCard != card && global.previousCard.item == card.item && !card.isFaceUp) {
    		card.isFaceUp = true;
    		global.previousCard = null;
    		global.currentSessionOpen = false;
    		global.numPairs++;
    	} else if(global.currentSessionOpen && global.previousCard && global.previousCard != card && global.previousCard.item != card.item && !card.isFaceUp) {
    		vm.isGuarding = true;
    		card.isFaceUp = true;
    		global.currentSessionOpen = false;			
    		$timeout(function() {
    			global.previousCard.isFaceUp = card.isFaceUp = false;
    			global.previousCard = null;
    			vm.isGuarding = vm.timeLimit ? false : true;
    		}, 400);
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