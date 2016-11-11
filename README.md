# Mapbox Ng Map Component

A basic JavaScript module to embed Mapbox GL JS map in your AngularJS application.

## Usage

Install with NPM and include script in `index.html`:

```bash
npm install mapbox-ng-map-component
```

Include `mapbox-ng-map-component` module in your app dependencies:

```javascript
angular.module('myApp', ['mapbox-ng-map-component']);
```

Components and services of this module are prefixed with `mbx-ng`.
Include the component `<mbx-ng-map>` in your template like this:

```html
<mbx-ng-map id="map" mbx-ng-options="::mapOptions" style="width: 100%; height: 480px; display: block;"></mbx-ng-map>
```

There is one parameter mbx-ng-options which is basically an object with default
Mapbox GL JS map options. Full list of possible options can be found in [Mapbox GL JS Docs](https://www.mapbox.com/mapbox-gl-js/api/).
An example options, that specifies default view and base layer may look like this:

```javascript
$scope.mapOptions = {
    center: [49.2, 16.6],
    zoom: 10,
    style: 'mapbox://styles/mapbox/streets-v9'
};
```

You can include `mbxNgMapService` in your application and use it's `getMap(id)` function
to get the real Mapbox GL JS Map object and play with it.

## Dependencies

This module depends only on AngularJS and Mapbox GL JS. Run `npm install` to install
both dependencies.

## Examples

* [Simple map](examples/simpleMap.html), see in [Plunker](http://plnkr.co/Fii9LW)
* [Using map service](examples/addMarker.html), see in [Plunker](http://plnkr.co/eOrlxq)

To view the examples locally, clone the repo, run `npm install` and open them in your favourite browser.
