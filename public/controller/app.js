

var app = angular.module('knowbooks', ['ui.router', 'BackendService', 'toaster', 'service.authorization', 'angular-filepicker']);

app.run(function (principal, $rootScope) {
    principal.identity().then(function (data) {
        console.log(data)
        if (data) {
            $rootScope.userData = data;
        }
    })
})

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider","filepickerProvider", function ($stateProvider, $urlRouterProvider, $httpProvider,filepickerProvider) {


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
        .state('home.addbook', {

            url: '/addbook',
            templateUrl: 'templates/addbook.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })
        .state('home.addsubject', {

            url: '/addsubject',
            templateUrl: 'templates/addsubject.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })

        .state('home.welcome', {

            url: '/welcome',
            templateUrl: 'templates/welcome.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })

        .state('home.view', {

            url: '/view',
            templateUrl: 'templates/view.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })

.state('home.booksdetails', {

            url: '/booksdetails/:subjectid',
            templateUrl: 'templates/booksdetails.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })

 filepickerProvider.setKey('Anq0xcldQW6yRUWW5v1DVz');

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


                            $state.go('home.welcome');
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

app.controller('booksController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope','$stateParams','filepickerService',
    function ($scope, $http, toaster, $state, principal, service, $rootScope, $stateParams,filepickerService) {
        $scope.addsubject = {};
        $scope.faculties=["CE","CS"];
        $scope.semesters=[1,2,3,4,5,6,7,8];
        $scope.addbooks={};

         $scope.upload = function(){
        filepickerService.pick(
            {
                mimetype: 'image/*',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
            },
            function(Blob){
                console.log(JSON.stringify(Blob));
                $scope.addsubject.picture = Blob;
                $scope.$apply();
            }
        );
    };
    //Multiple files upload set to 3 as max number
    $scope.uploadMultiple = function(){
        filepickerService.pickMultiple(
            {
                mimetype: 'image/*',
                language: 'en',
                maxFiles: 3, //pickMultiple has one more option
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
                openTo: 'IMAGE_SEARCH'
            },
      function(Blob){
                console.log(JSON.stringify(Blob));
                $scope.addsubject.morePictures = Blob;
                $scope.$apply();
            }
        );
    };  

       $scope.$watch("[addbooks.Faculties,addbooks.Semester]",function(newValue,oldValue,scope){
console.log("<<<<<<");
           if (($scope.addbooks.Faculties) && ($scope.addbooks.Semester)){
               console.log("<<<<<<");
            service.get({Faculty:$scope.addbooks.Faculties,Semester:$scope.addbooks.Semester},"/subject/getsubject",
            function(err,data){
                        if (err) {
                        throw (err); 

                    }
                    if (!err) {

                        //console.log(data.data[0].subjectcode);
                       $scope.subjects=data.data.data;
                       console.log($scope.subjects);
                       

                    }
                    else {
                        console.log(response);
                    }

                })
                          
           }
       })

       if ($stateParams.subjectid) {
            console.log($stateParams.subjectid);
            service.get(null,'/books/Requests/' + $stateParams.subjectid, function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.seeRequests = response.data.data;
                    console.log($scope.seeRequests);
                    $scope.deleteid=$stateParams.subjectid;

                }
            })
        }
        

         $scope.addSubject = function () {
             console.log($scope.addsubject);
           
            service.save({addSubject: $scope.addsubject}, "/subject/savedata",
                function (err, response) {


                    if (err) {
                        throw (err);

                    }
                    if (!err) {
                        toaster.pop("success", "added successfully");
                        $state.go('home.addbook');

                    }
                    else {
                        console.log(response);
                    }
                }
            )
        }

$scope.deleteit=function(){
service.delete({deleteItem:$scope.deleteid},'/books/delete',function(err,response){
console.log($scope.deleteid);
    if(err){
        throw(err);
    }

    if(!err){
        toaster.pop("succes","successfully deleted" );
    }
})
}

        $scope.addBooks = function () {

                console.log($scope.addbooks.Subjectid)
            service.save({addBook: $scope.addbooks}, "/books/savedata",
                function (err, response) {


                    if (err) {
                        throw (err);

                    }
                    if (!err) {
                        toaster.pop("success", "added successfully");
                        $state.go('home.welcome');

                    }
                    else {
                        console.log(response);
                    }
                }
            )
        }

        $scope.Requests = function () {
            service.get(null,'/books/Requests', function (err, response) {
                if (err) {
                    throw(err)

                }
                if (!err) {
                    console.log("<<<<<<")
                    $scope.seeRequests = response.data.data;
                   console.log($scope.seeRequests);
                }
            })
        }





}
])