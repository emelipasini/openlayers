const fillStyle = new ol.style.Fill({
    color: [84, 118, 255, 0.5]
});
const strokeStyle = new ol.style.Stroke({
    color: [46,45, 45, 1],
    width: 1.2
});
const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
        color: [245, 49, 5, 1]
    }),
    radius: 7,
    stroke: strokeStyle
})

const provincesGeoJSON = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/provinces.geojson",
        format: new ol.format.GeoJSON()
    }),
    visible: true,
    title: "Provinces",
    style: new ol.style.Style({
        // fill: poligon, stroke: poliline, image: point
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle
    })
});
map.addLayer(provincesGeoJSON);

const toggleVectorButton = document.getElementById("toggle-vector");
toggleVectorButton.addEventListener("click", function (ev) {
    const isVisible = provincesGeoJSON.getVisible();
    if(isVisible) {
        provincesGeoJSON.setVisible(false);
    } else {
        provincesGeoJSON.setVisible(true);
    }
})

const overlayContainer = document.querySelector(".overlay-container")
const overlayLayer = new ol.Overlay({
    element: overlayContainer
})
map.addOverlay(overlayLayer);

const overlayFeatureName = document.getElementById("feature-name");
const overlayFeatureInfo = document.getElementById("feature-info");

map.on("click", function(ev) {
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(ev.pixel, function (feature, layer) {
        const clickedCoordinate = ev.coordinate;
        const clickedFeatureName = feature.get("name");
        const clickedFeatureInfo = feature.get("information");
        overlayLayer.setPosition(clickedCoordinate);

        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureInfo.innerHTML = clickedFeatureInfo;
    },
    // In case with more than one vector layer
    {
        layerFilter: function(layerCandidate) {
            return layerCandidate.get("title") === "Provinces"
        }
    })
});