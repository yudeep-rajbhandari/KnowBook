

var app = angular.module('knowbooks', ['ui.router', 'BackendService', 'toaster', 'service.authorization']);

app.run(function (principal, $rootScope) {
    principal.identity().then(function (data) {
        console.log(data)
        if (data) {
            $rootScope.userData = data;
        }
    })
})

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/home/login');
    $stateProvider

        // HOME STATES AND NESTED VIEWS =======================================

        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'templates/navbar.html',
            data: {
                roles: []
            },
            controller: 'signUpController'

        })
        
        .state('home.login', {

            url: '/login',
            templateUrl: 'templates/login.html',
            controller: "signUpController",
            data: {
                roles: []
            }
        })
        .state('home.addplace', {

            url: '/addplace',
            templateUrl: 'templates/addplace.html',
            controller: "booksController",
            data: {
                roles: []
            }
        })
        .state('home.addsubject', {

            url: '/addsubject',
            templateUrl: 'templates/addsubject.html',
            controller: "booksController",
            data: {
                roles: []
            }
        })
        

}])


app.controller('signUpController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope', '$stateParams',
        function ($scope, $http, toaster, $state, principal, service, $rootScope, $stateParams) {
            $scope.formdata = {};
            

            $scope.checkForm = function () {
                service.save({user: $scope.formdata}, "/users/login", function (err, response) {

                    if (!err) {

                        if (response.data.user) {
                            var userData={
                                userid: response.data.user._id, roles: response.data.user.role,
                                username: response.data.user.name
                            }
                            principal.authenticate(userData);

                            $rootScope.userData=userData;


                            $state.go('home.addplace');
                        }
                        else {

                            toaster.pop('success', "oops", "wrong username or password");
                        }

                    } else {

                        console.log(response);
                    }

                })
            }
            

            $scope.logout = function () {
                console.log('<<<<<<<<<');
                principal.authenticate(null);
                $rootScope.userData = null;
                $state.go("home.login");


            }


        }]
)

app.controller('booksController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope',
    function ($scope, $http, toaster, $state, principal, service, $rootScope, directive) {
        $scope.addsubject = {};
        $scope.faculties=["CE","CS"];
        $scope.semesters=[1,2,3,4,5,6,7,8];
        

         $scope.addSubject = function () {
           
            service.save({addSubject: $scope.addsuject}, "/subject/savedata",
                function (err, response) {


                    if (err) {
                        throw (err);

                    }
                    if (!err) {
                        toaster.pop("success", "added successfully");
                        $state.go('home.addplace');

                    }
                    else {
                        console.log(response);
                    }
                }
            )
        }
    }
])