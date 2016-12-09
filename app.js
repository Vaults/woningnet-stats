/**
 * Created by Marcel on 9-12-2016.
 */
var statsApp = angular.module('statsApp', []);
statsApp.controller('statsController', function($scope){
    $scope.hello = 'it\'s me';
    var simpleDateRegex = /[0-3][0-9]-[01][0-9]-[[0-9]{4}/;
    $.ajax({
        method:'GET',
        url: 'woningnet.php',
    }).done(function(data){
        var d = (o) => +(new Date(parseInt(o[2]), parseInt(o[1]-1), parseInt(o[0])));
        var median = (o) => (o.length % 2 == 0)?(o[~~(o.length/2)]+o[~~(o.length/2 - 1)])/2:o[~~(o.length/2)];
        var prc = (o) => Math.round(o*1000)/10 + '%';
        data = JSON.parse(data);
        data = data["Verantwoordingen"];
        $scope.total = data.length;
        //console.log(data);
        data = data.map(o => {
            //console.log(o);
            if(o.Omschrijving != null) {
                var date = o.Omschrijving.match(simpleDateRegex);
                if (date) {
                    return date[0].split('-');
                }

            }
            return "REMOVE";
        });

        data = data.filter(o=>o!="REMOVE").sort((a,b) => {
            return d(a) - d(b);
        });
        $scope.nodate = $scope.total - data.length;
        $scope.avg = data.reduce((p,n)=> [p[0] + +n[0], p[1] + +n[1], p[2] + +n[2]], [0,0,0]).map(o => Math.round(o/data.length));
        $scope.median = median(data);
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
            $scope.yearly[key].perc = prc($scope.yearly[key].count / data.length);
        }
        
        $scope.$watch('cusDate', (n, o) => {
            if(n) {
                console.log(n.match(simpleDateRegex));
                if (n.match(simpleDateRegex)) {
                    //console.log(data.length, data.filter((a)=>d(a) > d(n.split('-'))).length);
                    $scope.percentile = prc(1 - data.filter((a)=>d(a) <= d(n.split('-'))).length/data.length);
                }
            }else{
                $scope.percentile = 'N/A';
            }
        })



        $scope.$apply();
    });
})