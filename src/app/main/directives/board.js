/*global angular*/
angular.module('cards').
directive('board', function(){
 
 	var directive = {};
	directive.restrict = 'E';
	directive.controller = "CardController";
	directive.templateUrl = "app/main/directives/template.html";
	directive.scope = {
	    rows : '=',
	    columns: '=',
	    level: '=',
	    type: '=',
	    callback: '&'
	};
	
	directive.link = function (scope, iElement, attrs) {
	
	}
	
	return directive;
})

