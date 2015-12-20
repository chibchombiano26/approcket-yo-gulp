/* global angular, Parse*/


angular.module('cards')
.service('simpsons', function($q){

   var dataFactory = {};
   
    
    dataFactory.listImages = function (){
		var deferred = $q.defer();
		var Simpsons = Parse.Object.extend("simpsoms");
		var query = new Parse.Query(Simpsons);
		
		query.find()
		.then(function(result){
			var data = [];
			for (var i = 0; i < result.length; i++) {
				data.push(result[i].toJSON());
			}
			deferred.resolve(data);
			
		},
		function(entidad, error){
 			if(entidad.code === 101){
 				deferred.resolve({});
 			}
 			else{
 			 deferred.reject(error);
 			}
		}
	  )
		
		return deferred.promise;
	}
	

    
    return dataFactory;
    
})