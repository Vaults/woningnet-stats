/**
 * Created by Marcel on 9-12-2016.
 */
var statsApp = angular.module('statsApp', []);
statsApp.controller('statsController', function($scope){
    $scope.hello = 'it\'s me';
    var page = 1;
    $.ajax({
        method:'GET',
        url: 'woningnet.php',
    }).done(function(data){

        data = JSON.parse(data);
        data = data["Verantwoordingen"];
        $scope.total = data.length;
        $scope.aY = 0;
        //console.log(data);
        data = data.map(o => {
            //console.log(o);
            if(o.Omschrijving != null) {
                var date = o.Omschrijving.match(/[0-3][0-9]-[01][0-9]-[[0-9]{4}/);
                if (date) {
                    return date[0].split('-');
                }

            }
            return "REMOVE";
        });
        data = data.filter(o=>o!="REMOVE")
        console.log(data);
        $scope.nodate = $scope.total - data.length;
        $scope.avg = data.reduce((p,n)=> [p[0] + +n[0], p[1] + +n[1], p[2] + +n[2]], [0,0,0]).map(o => Math.round(o/data.length));

        $scope.yearly = {}
        data.forEach(o => {
            var yGroup = Math.floor(o[2]/5)*5;
            if(!$scope.yearly[yGroup]){
                $scope.yearly[yGroup] = {count:1};
            }else{
                $scope.yearly[yGroup].count++;
            }
        });
        for(key in $scope.yearly){
            $scope.yearly[key].perc = Math.round(($scope.yearly[key].count / data.length)*1000)/10 + '%';
        }




        $scope.$apply();
    });
})