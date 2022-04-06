const blured = document.getElementById('blur');
const radius = document.getElementById('radius');

const vector = new ol.layer.Heatmap({
    source: new ol.source.Vector({
        url: "../data/2012_Earthquakes_Mag5.kml",
        format: new ol.format.KML({
            extractStyles: false,
        }),
    }),
    visible: true,
    blur: parseInt(blured.value, 10),
    radius: parseInt(radius.value, 10),
    weight: function (feature) {
        const name = feature.get('name');
        const magnitude = parseFloat(name.substr(2));
        return magnitude - 5;
    },
});
map.addLayer(vector);

const blurHandler = function () {
    vector.setBlur(parseInt(blured.value, 10));
};
blured.addEventListener('input', blurHandler);
blured.addEventListener('change', blurHandler);
  
const radiusHandler = function () {
    vector.setRadius(parseInt(radius.value, 10));
};
radius.addEventListener('input', radiusHandler);
radius.addEventListener('change', radiusHandler);