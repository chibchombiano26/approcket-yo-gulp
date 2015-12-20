/*global angular*/
angular.module('cards').
directive('board', function(){
 
 	var directive = {};
	directive.restrict = 'E';
	directive.controller = "boardController";
	directive.templateUrl = "app/main/templates/template.html";
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

