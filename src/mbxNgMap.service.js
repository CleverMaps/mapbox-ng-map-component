(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .factory('mbxNgMapService', mbxNgMapService);

    mbxNgMapService.$inject = ['mbxNgHelpers'];

    function mbxNgMapService(mbxNgHelpers) {
        var maps = {};

        return {
            setMap: setMap,
            getMap: getMap,
            unresolveMap: unresolveMap
        };

        function setMap(mapObject, mapId) {
            var defer = mbxNgHelpers.getUnresolvedDefer(maps, mapId);
            defer.resolve(mapObject);
            mbxNgHelpers.setResolvedDefer(maps, mapId);
        }

        function getMap (mapId) {
            var defer = mbxNgHelpers.getDefer(maps, mapId);
            return defer.promise;
        }

        function unresolveMap(mapId) {
            maps[mapId] = undefined;
        }
    }
})();
