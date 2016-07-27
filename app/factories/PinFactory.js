"use strict";

app.factory("PinFactory", function(FirebaseURL, $q, $http, IdService) {

	const getPins = function(){
		let boardId = IdService.getBoardId();
		console.log(boardId);
		let pins = [];
		return $q(function(resolve, reject){
			$http.get(`${FirebaseURL}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
			.success(function(pinsObj){
				let pinCollection = pinsObj;
				Object.keys(pinCollection).forEach(function(key){
					pinCollection[key].uniqueId = key;
					pins.push(pinCollection[key]);
				});
				resolve(pins);
			})
			.error(function(error){
				reject(error);
			});
		});
	};

	const deletePinFB = function(uniqueId) {
		return $q(function(resolve, reject) {
			$http.delete(`${FirebaseURL}/pins/${uniqueId}.json`)
			.success(function() {
				resolve();
			})
			.error(function(error){
				reject(error);
			});
		});
	};	

	const postPinFB = function(newPin){
		return $q(function(resolve, reject){
			$http.post(`${FirebaseURL}/pins.json`,
			JSON.stringify(newPin))
			.success(function(){
				resolve();
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	return {getPins, postPinFB, deletePinFB};
});