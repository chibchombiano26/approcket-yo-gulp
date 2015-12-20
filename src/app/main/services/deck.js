/*global angular*/
angular.module('cards').
service('deckService', function(constantsService, utilService, simpsons, $q){
    
    var dataFactory = {};
    
    // this function creates deck of cards that returns an object of cards 
    // to the caller
    
    dataFactory.createDeck = function (type) {
        var deferred = $q.defer();
        simpsons.listImages().then(function(result){
            deferred.resolve(makeDake(result, type));
        })
        
        return deferred.promise;
    }
    
    function makeDake(data, type){
        var rows = constantsService.getRows();
    	var cols = constantsService.getColumns();
    	var key = dataFactory.createRandom(data, type);
    	var deck = {};
    	deck.rows = [];
    
    	// create each row
    	for(var i = 0; i < rows; i++) {
    		var row = {};
    		row.cards = [];
    		
    		// creat each card in the row
    		for (var j = 0; j < cols; j++) {
    			var card = {};
    			card.isFaceUp = false;
    			card.item = key.pop();
    			row.cards.push(card);
    		}
    		deck.rows.push(row);
    	}
    	return deck;
    }
    
    
    // creates a random array of items that contain matches
    // for example: [1, 5, 6, 5, 1, 6]
    dataFactory.createRandom = function (data, type) {
    	var matches = constantsService.getNumMatches();
    	var pool = [];
    	var answers = [];
    	var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'
    					, 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'
    					, 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'];
    	
    	var hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き'
    					, 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ'
    					, 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ'
    					, 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'つ', 'づ', 'て'
    					, 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の'
    					, 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ'
    					, 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま'
    					, 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら'
    					, 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
    					

            					
    	var fromParse = data;
        
    	// set what kind of item to display
    	if(!type){
    	    var items = fromParse;    
    	}
    	else{
    	    switch (type) {
    	        case 'Simpson':
    	            var items = fromParse;    
    	            break;
    	            
    	        case 'hiragana':
    	            var items = hiragana;    
    	            break;
    	            
	            case 'Letters':
    	            var items = letters;    
    	            break;
    	        
    	        
    	        default:
    	            var items = fromParse;    
    	    }
    	    
    	}
    	
    	
    
    	// create the arrays for random numbers and item holder
    	for (var i = 0; i < matches * 2; i++) {
    		pool.push(i); // random numbers
    	}
    	
    	// generate an array with the random items
    	for (var n = 0; n < matches; n++) {
    		// grab random letter from array and remove that letter from the
    		// original array
    		var randLetter = Math.floor((Math.random() * items.length));
    		var letter = items[randLetter];
    		utilService.removeByIndex(items, randLetter);
    		// generate two random placements for each item
    		var randPool = Math.floor((Math.random() * pool.length));
    		
    		// remove the placeholder from answers and insert the letter into 
    		// random slot
    		utilService.insertByIndex(answers, pool[randPool], letter);
    		
    		// remove random number from pool
    		utilService.removeByIndex(pool, randPool);
    		
    		// redo this process for the second placement
    		randPool = Math.floor((Math.random() * pool.length));
    		utilService.insertByIndex(answers, pool[randPool], letter);
    
    		// remove rand number from pool
    		utilService.removeByIndex(pool, randPool);
    	}
    	return answers;
    } 
    
    return dataFactory;
})