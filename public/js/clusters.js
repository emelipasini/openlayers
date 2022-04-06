const distanceInput = document.getElementById('distance');
const minDistanceInput = document.getElementById('min-distance');

const provinces = [
    {
        name: "Buenos Aires",
        coordinate: [-6744290.101160739, -4331201.557854395],
    },
    {
        name: "Cordoba",
        coordinate: [-7099093.4489201605, -3786324.988080996],
    },
    {
        name: "Santa Fe",
        coordinate: [-6791750.648599241, -3601905.1456465693]
    },
    {
        name: "Mendoza",
        coordinate: [-7628721.199880298, -4072146.5507832766]
    },
    {
        name: "Tucuman",
        coordinate: [-7276779.519306284, -3116876.2749395254]
    },
    {
        name: "Entre Rios",
        coordinate: [-6601420.441697959, -3763728.01352558]
    },
    {
        name: "Salta",
        coordinate: [-7164734.909248577, -2883315.9980160045]
    },
    {
        name: "Misiones",
        coordinate: [-6064219.889861607, -3122071.7988321604]
    },
    {
        name: "Chaco",
        coordinate: [-6739451.139044799, -3084766.2049546363]
    },
    {
        name: "Corrientes",
        coordinate: [-6444736.947412356, -3338444.243321802]
    },
    {
        name: "Santiago del Estero",
        coordinate: [-7060279.246391509, -3189221.8678117045]
    },
    {
        name: "San Juan",
        coordinate: [-7672090.985982909, -3614505.6380154826]
    },
    {
        name: "Jujuy",
        coordinate: [-7361104.368108181, -2603844.0506206453]
    },
    {
        name: "Rio Negro",
        coordinate: [-7478669.165255881, -4919541.956185862]
    },
    {
        name: "Neuquen",
        coordinate: [-7779492.837112269, -4636871.436941498]
    },
    {
        name: "Formosa",
        coordinate: [-6674743.835294851, -2863049.095995206]
    },
    {
        name: "Chubut",
        coordinate: [-7631674.30870008, -5443390.074418534]
    },
    {
        name: "San Luis",
        coordinate: [-7349003.789455712, -3988544.5579406586]
    },
    {
        name: "Catamarca",
        coordinate: [-7491635.702835903, -3112006.617531527]
    },
    {
        name: "La Rioja",
        coordinate: [-7454778.3922843505, -3462394.8896474787]
    },
    {
        name: "La Pampa",
        coordinate: [-7314739.786420172, -4460818.283308764]
    },
    {
        name: "Santa Cruz",
        coordinate: [-7802281.599428793, -6203520.934063015]
    },
    {
        name: "Tierra del Fuego",
        coordinate: [-7550730.770376471, -7209724.250272312]
    }
]

const features = [];
for (let i = 0; i < provinces.length; i++) {
    const province = provinces[i];
    const coordinate = new ol.geom.Point(province.coordinate);
    features[i] = new ol.Feature(coordinate);
}

const source = new ol.source.Vector({
    features: features,
});

const clusterSource = new ol.source.Cluster({
    distance: parseInt(distanceInput.value, 10),
    minDistance: parseInt(minDistanceInput.value, 10),
    source: source,
});

const styleCache = {};
const clustersLayer = new ol.layer.VectorImage({
  source: clusterSource,
  style: function (feature) {
    const size = feature.get('features').length;
    let style = styleCache[size];
    if (!style) {
        style = new ol.style.Style({
            image: new ol.style.Circle({
            radius: 10,
            stroke: new ol.style.Stroke({
                color: '#fff',
            }),
            fill: new ol.style.Fill({
                color: '#3399CC',
            }),
        }),
        text: new ol.style.Text({
            text: size.toString(),
            fill: new ol.style.Fill({
                color: '#fff',
            }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});
map.addLayer(clustersLayer);

const toggleClusters = document.getElementById("toggle-clusters");
toggleClusters.addEventListener("click", function (ev) {
    const isVisible = clustersLayer.getVisible();
    if(isVisible) {
        clustersLayer.setVisible(false);
    } else {
        clustersLayer.setVisible(true);
    }
})

const distanceHandler = function () {
    clusterSource.setDistance(parseInt(distanceInput.value, 10));
};
distanceInput.addEventListener('input', distanceHandler);
distanceInput.addEventListener('change', distanceHandler);
  
const minDistanceHandler = function () {
    clusterSource.setMinDistance(parseInt(minDistanceInput.value, 10));
};
minDistanceInput.addEventListener('input', minDistanceHandler);
minDistanceInput.addEventListener('change', minDistanceHandler);
