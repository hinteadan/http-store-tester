(function(angular){
	'use strict';

	var confirm = this.confirm,
		hds = this.H.DataStore,
		resultsLog = [],
		log = function(d){
			console.log(d);
			resultsLog.push(d);
		};

	angular.module('HttpDataStoreTester', [])
	.constant('storeUrl', 'http://h-httpstore.azurewebsites.net/')
	.factory('store', ['storeUrl', function(storeUrl){
		return new hds.Store('HttpDataStoreTester', storeUrl);
	}])
	.controller('TesterCtrl', ['$scope', 'store', function($scope, store){
		$scope.createEntity = function(){
			$scope.newEntity = new hds.Entity({});
		};
		$scope.storeEntity = function(){
			store.Save($scope.newEntity).then(function(result){
				$scope.newEntity = null;
				log(result);
			});
		};
		$scope.delete = function(entityId){
			if(!confirm('Are you sure you want to remove the selected entity?')){
				return;
			}
			store.Delete(entityId).then($scope.refreshBlotter);
		};
		$scope.queryMeta = function(query){
			// store.QueryMeta(hds.queryWithAnd()).then(function(result){
			store.QueryMeta(query).then(function(result){
				$scope.queryResult.isMetaQuery = true;
				$scope.queryResult.results = result.data;
				log(result);
				$scope.$apply();
			});
		};
		$scope.query = function(query){
			// store.QueryMeta(hds.queryWithAnd()).then(function(result){
			store.Query(query).then(function(result){
				$scope.queryResult.isMetaQuery = false;
				$scope.queryResult.results = result.data;
				log(result);
				$scope.$apply();
			});
		};

		$scope.entity = {"Name": "Hintee"};
		$scope.queryResult = {
			isMetaQuery: true,
			results: null
		};
		$scope.queryAll = function(){ $scope.queryMeta(hds.queryWithAnd()); };
		$scope.log = resultsLog;
	}]);


}).call(this, this.angular);