angular.module('app')
.config(function($routeProvider){
	$routeProvider
	.when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html'})
	.when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html'})
	.when('/classes', { controller: 'ClassesCtrl', templateUrl: './classes/classes.html'})
	.when('/classes/edit', { controller: 'ClassesCtrl', templateUrl: './classes/classesEdit.html'})
	.when('/myinfo', { controller: '', templateUrl: './users/myinfo.html'})
	.when('/classes/showSpecial', { controller: 'SpecialClassesCtrl', templateUrl: './classes/showSpecial.html'})
});