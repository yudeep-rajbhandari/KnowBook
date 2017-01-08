

var app = angular.module('knowbooks', ['ui.router', 'BackendService', 'toaster', 'service.authorization', 'angular-filepicker','angular.filter']);

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

        .state('home.routine', {

            url: '/routine',
            templateUrl: 'templates/routine.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })
         .state('home.routineviewer', {

            url: '/routineviewer',
            templateUrl: 'templates/routineviewer.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })

         .state('home.navbar2', {

            url: '/navbarRoutine',
            templateUrl: 'templates/navbar2.html',
            controller: "booksController",
            data: {
                roles: ['user']
            }
        })


 filepickerProvider.setKey('AxiX0R0guSJ6hMqeH2yNdz');

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
        $scope.booktypes=["text","reference","other"];
        $scope.availabilities=["yes","no"];
        $scope.addroutine={};
        $scope.times=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        $scope.view={};
        
$rootScope.val="hello";        
        $scope.days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
         
         
         $scope.upload = function(){
        filepickerService.pick(
            {
               mimetype: 'text/*',
                //extension: 'txt',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE'],
                //openTo: 'IMAGE_SEARCH'
            },
            function(Blob){
                console.log(JSON.stringify(Blob));
                $scope.addsubject.picture = Blob;
                $scope.$apply();
            }
        );
    };

     $scope.upload1 = function(){
        filepickerService.pick(
            {
                extension: 'pdf',
                language: 'en',
                services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE'],
                //openTo: 'IMAGE_SEARCH'
            },
            function(Blob){
                console.log(JSON.stringify(Blob));
                $scope.addbooks.pdf = Blob;
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


       $scope.deleteroutine=function(deleteid){
           console.log(deleteid);
service.delete({deleteItem:deleteid},'/routine/deleteone',function(err,response){

    if(err){
        throw(err);
    }

    if(!err){
        toaster.pop("succes","successfully deleted" );
        $state.reload();
        
    }
})


       }

        $scope.requestfun=function(){
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
       if ($stateParams.subjectid) {
            console.log($stateParams.subjectid);
            $scope.requestfun();
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

$scope.deleteit=function(id){
    console.log(id);
service.delete({deleteItem:id},'/books/delete',function(err,response){

    if(err){
        throw(err);
    }

    if(!err){
        toaster.pop("succes","successfully deleted" );
        $scope.requestfun();
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

    /*    $scope.Requests = function () {
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
*/
        
        $scope.saveroutine=function(){

            service.save({routine:$scope.addroutine},'/routine/addroutine',function(err,data){

                if(err){
                    throw (err)
                }
if(!err){
    console.log($scope.addroutine);
    toaster.pop("success","added successfully");
    $state.go("home.routine");
}
            })
        }

        $scope.showroutine=function(faculty,semester){
            console.log("routine123");

            service.get(null,'/routine/getroutine',function(err,response){

                if(err){
                    throw(err);
                }
        if(!err){
                $state.go("home.routineviewer");
                
            $rootScope.routine=response.data.data.filter(val=>{
                return (val.Subjectid.Faculties==faculty && val.Subjectid.Semester==semester)
            });
    console.log($rootScope.routine); 
    }    
        })


        }





}
])