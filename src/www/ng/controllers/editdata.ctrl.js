angular.module('app')
.controller('EditDataCtrl', function ($scope, EditDataSvc) {
	$scope.save = function (firstname, lastname, email, telephone, permissions) {
		EditDataSvc.update({
			firstname, lastname, email, telephone, permissions
		}).success(() => {
			window.location.assign("/#/mydata");
		});
    };
    
    EditDataSvc.fetch().success(function(data) {
        $scope.data = data;
        console.log(data);
	});

	
});