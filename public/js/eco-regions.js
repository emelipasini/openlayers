const selectedStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new ol.style.Stroke({
        color: [46,45, 45, 1],
        width: 2
    }),
});

const select = new ol.interaction.Select({
    style: function (feature) {
        const color = feature.get('COLOR_BIO') || '#eeeeee';
        selectedStyle.getFill().setColor(color);
        return selectedStyle;
    },
});
map.addInteraction(select);

const selectedFeatures = select.getFeatures();

const dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.platformModifierKeyOnly,
});
map.addInteraction(dragBox);

dragBox.on('boxstart', function () {
    selectedFeatures.clear();
});
  
const regionBox = document.getElementById('region-box');
const regionInfo = document.getElementById('region-info');

baseLayerGroup.on("change", function (ev) {
    const ecoRegiosIsVisible = ecoRegions.getVisible();
    if(ecoRegiosIsVisible) {
        regionBox.style.display = "block";
    } else {
        regionBox.style.display = "none";
    }
})
  
selectedFeatures.on(['add', 'remove'], function () {
    const names = selectedFeatures.getArray().map(function (feature) {
        return feature.get('ECO_NAME');
    });
    if (names.length > 0) {
        regionInfo.innerHTML = names.join(', ');
    } else {
        regionInfo.innerHTML = 'None';
    }
});
