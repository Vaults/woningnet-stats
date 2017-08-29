/**
 * Created by Marcel on 9-12-2016.
 */
const statsApp = angular.module('statsApp', []);

const arrayToDate = (o) => +(new Date(parseInt(o[2]), parseInt(o[1] - 1), parseInt(o[0])));
//Accuracy is not important for this application's purposes, we take the lazy way out so no averaging dates
const lazyMedian = (o) => o[~~(o.length / 2)];
const percentage = (o) => Math.round(o * 1000) / 10 + '%';
const simpleDateRegex = /[0-3][0-9]-[01][0-9]-[[0-9]{4}/;

statsApp.controller('statsController', function ($scope) {

    $scope.yearGroupSize = 4;

    $.ajax({
        method: 'GET',
        url: 'woningnet.php',
    }).done(function (data) {
        //See if we have valid data
        data = JSON.parse(data)["Verantwoordingen"];
        $scope.total = data.length;
        //Map all data by dates, only thing we're interested in now.
        data = data.map(o => {
            const potentialDate = o.Omschrijving;
            if (potentialDate !== null) {
                const date = potentialDate.match(simpleDateRegex);
                if (date) {
                    return date[0].split('-');
                }
            }
            return "REMOVE";
        })
            .filter(o => o != "REMOVE")
            .sort((a, b) => {
                return arrayToDate(a) - arrayToDate(b);
            });
        //Add years to year-groups
        $scope.yearly = {};
        data.forEach(o => {
            const yearGroup = Math.floor(o[2] / $scope.yearGroupSize) * $scope.yearGroupSize;
            if (!$scope.yearly[yearGroup]) {
                $scope.yearly[yearGroup] = {count: 0};
            }
            $scope.yearly[yearGroup].count++;
        });
        //Calculate percentage
        Object.keys($scope.yearly).forEach(key => {
            $scope.yearly[key].perc = percentage($scope.yearly[key].count / data.length);
        });

        //Calculate metadata
        $scope.nodate = $scope.total - data.length;
        $scope.avg = data.reduce((p, n) => [p[0] + +n[0], p[1] + +n[1], p[2] + +n[2]], [0, 0, 0]).map(o => Math.round(o / data.length));
        $scope.median = lazyMedian(data);
        console.log($scope.median);

        //Check for manual date input updates
        $scope.$watch('cusDate', (n, _) => {
            if (n && n.match(simpleDateRegex)) {
                $scope.percentile = percentage(1 - data.filter((a) => arrayToDate(a) <= arrayToDate(n.split('-'))).length / data.length);
            } else {
                $scope.percentile = 'N/A';
            }
        });
        //Pass to angular, we're working outside of its scope
        $scope.$apply();
    });
});
