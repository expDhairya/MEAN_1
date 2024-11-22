var stud = angular.module('studApp',[])
stud.controller('studCtrl',function($scope,$http){
    $scope.userData=[]
    $scope.newuser={}
    $scope.stat = 0;
    $scope.editStat=false;
     // Function to read data
     $scope.getUsers = function(){
        $http.get('/api/users').then(function(response){
            $scope.userData=response.data;
        })
    }
    $scope.getUsers() 
    
    $scope.addUser = function(newUser){
        $http.post('/api/addUsers',newUser).then((response)=>{
            $scope.msg = response.data.message
        })
        $scope.getUsers()
    }

    $scope.deleteUser = function(id){
        $http.delete(`/api/deleteUser/${id}`).then((response)=>{
            $scope.msg = response.data.message
        })
        $scope.getUsers()
    }
    $scope.edit = function(item){
        $scope.editStat=true;
        $scope.editItem = item
        $scope.newuser.userID = $scope.editItem.userID
        $scope.newuser.pass = $scope.editItem.pass
        $scope.newuser.role = $scope.editItem.role
        $scope.stat=1
    }

    $scope.updateUser = function(upUser){
        $http.put(`/api/updateUser/${upUser.userID}`,upUser).then((response)=>{
            $scope.msg = response.data.message
        })
        $scope.getUsers()
    }
})