(function(angular){
	'use strict';

	var log = this.console.log;

	angular.module('HttpDataStoreTester')
	.directive('jsonEdit', [function(){

		function renderJsonEditor(elementJq, jsonData, options){
			if(!jsonData){
				return;
			}
			elementJq.jsonEditor(jsonData, options);
		}

		return {
            restrict: 'E',
            replace: true,
            transclude: false,
            template: '<div class="json-editor"></div>',
            scope: {
                options: '=',
                json: '='
            },
            link: function (scope, element) {
            	var handledChange = scope.options ? scope.options.change : null,
            		options = angular.copy(scope.options) || {};
            	function onChange(data){
            		scope.json = data;
            		scope.$apply();
            		log(data);
            		if(handledChange){
            			handledChange.call(null, data);
            		}
            	}
            	options.change = onChange;
                scope.$watch('json', function () {
                    renderJsonEditor(element, scope.json, options);
                });
                scope.$watch('options', function () {
                    renderJsonEditor(element, scope.json, options);
                });
            }
        };
	}]);


}).call(this, this.angular);