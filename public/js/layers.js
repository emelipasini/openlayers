const map = new ol.Map({
    view: new ol.View({
        center: [-6811085.98576325, -3648502.3140921486],
        zoom: 4,
        maxZoom: 10,
        minZoom: 2,
        // rotation: 0.5
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: "js-map"
});

const openStreetStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: "OSMStandard"
});

const stamenTerrain = new ol.layer.Tile({
    source: new ol.source.OSM({
        url: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
        attributions: "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL. <COPY HTML>"
    }),
    visible: false,
    title: "StamenTerrain"
});

const stamenToner = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
        attributions: "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL. <COPY HTML>"
    }),
    visible: false,
    title: "StamenToner"
});

const style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: '#eeeeee',
    }),
});
const ecoRegions = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "https://openlayers.org/data/vector/ecoregions.json",
        format: new ol.format.GeoJSON()
    }),
    visible: false,
    title: "EcoRegions",
    background: '#1a2b39',
    style: function (feature) {
        const color = feature.get('COLOR_BIO') || '#eeeeee';
        style.getFill().setColor(color);
        return style;
    },
});

const baseLayerGroup = new ol.layer.Group({
    layers: [
        openStreetStandard, stamenTerrain, stamenToner, ecoRegions
    ]
});
map.addLayer(baseLayerGroup);

// Layer change
const baseLayerElements = document.querySelectorAll(".baseLayer");
for (const baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener("change", function (ev) {
        const baseLayerElementValue = this.value;
        baseLayerGroup.getLayers().forEach(function (element, index, array) {
            const baseLayerTitle = element.get("title");
            element.setVisible(baseLayerTitle === baseLayerElementValue)
        });
    });
}

