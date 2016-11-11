(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .factory('mbxNgDefaults', mbxNgDefaults);

    function mbxNgDefaults() {
        var defaults = {};

        return {
            getMapDefaults: getMapDefaults,
            setMapDefaults: setMapDefaults
        };

        function getMapDefaults(mapId) {
            return defaults[mapId];
        }

        function setMapDefaults(userDefaults, mapId) {
            defaults[mapId] = angular.copy(userDefaults);
            return defaults[mapId];
        }
    }
})();
