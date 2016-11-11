/**
 * Basic Mapbox GL JS map component for your AngularJS apps.
 * (c) 2016, CleverAnalytics, s.r.o. https://cleveranalytics.com
 * Version: 0.0.1
 * License: MIT
 */
(function() {
    'use strict';

    angular.module('mapbox-ng-map-component', []);
})();

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

(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .factory('mbxNgHelpers', mbxNgHelpers);

    mbxNgHelpers.$inject = ['$q', '$log'];

    function mbxNgHelpers($q, $log) {
        return {
            getMapId: getMapId,
            getDefer: getDefer,
            getUnresolvedDefer: getUnresolvedDefer,
            setResolvedDefer: setResolvedDefer
        };

        function getMapId(d, mapId) {
            if (!angular.isDefined(mapId)) {
                var mapIds = Object.keys(d);
                if (mapIds.length === 1) {
                    mapId = mapIds[0];
                } else if (mapIds.length === 0) {
                    mapId = 'map';
                } else {
                    $log.error('[Mapbox Ng Map Component] - You have more than 1 map on the' +
                               ' DOM, you must provide the map ID to the mbxNgMapService.getMap call');
                }
            }
            return mapId;
        }

        function getDefer(d, mapId) {
            var id = getMapId(d, mapId),
                defer;
            if (!angular.isDefined(d[id]) || d[id].resolvedDefer === false) {
                defer = getUnresolvedDefer(d, id);
            } else {
                defer = d[id].defer;
            }
            return defer;
        }

        function getUnresolvedDefer(d, mapId) {
            var defer;
            if (!angular.isDefined(d[mapId]) || d[mapId].resolvedDefer === true) {
                defer = $q.defer();
                d[mapId] = {
                    defer: defer,
                    resolvedDefer: false
                };
            } else {
                defer = d[mapId].defer;
            }
            return defer;
        }

        function setResolvedDefer(d, mapId) {
            d[mapId].resolvedDefer = true;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .component('mbxNgMap', {
            controller: 'MbxNgMapCtrl',
            bindings: {
                options: '<mbxNgOptions'
            }
        });
})();

(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .controller('MbxNgMapCtrl', MbxNgMapCtrl);

    MbxNgMapCtrl.$inject = [
        'mbxNgMapService',
        'mbxNgDefaults',
        'mbxNgHelpers',
        '$attrs'
    ];

    function MbxNgMapCtrl(mbxNgMapService, mbxNgDefaults, mbxNgHelpers, $attrs) {
        var id = mbxNgHelpers.getMapId({}, $attrs.id);

        this.options.container = id;
        var mapDefaults = mbxNgDefaults.setMapDefaults(this.options, id);
        var map = new mapboxgl.Map(mapDefaults);

        // Resolve the map object to the promises
        map.on('load', function() {
            mbxNgMapService.setMap(map, id);
        });

        this.$onDestroy = function() {
            map.remove();
            mbxNgMapService.unresolveMap(id);
        };
    }
})();

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
