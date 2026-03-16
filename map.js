const placement = {
  id: "deloitte-aspire",
  name: "Deloitte ASPIRE Programme",
  coords: [-0.1067, 51.5165],
};

const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [-2.8, 54.5],
  zoom: 4.7,
  pitch: 52,
  bearing: -12,
  maxPitch: 70,
  projection: "globe",
});

map.addControl(new maplibregl.NavigationControl(), "top-right");

map.on("load", () => {
  map.addSource("placements", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            id: placement.id,
            title: placement.name,
          },
          geometry: {
            type: "Point",
            coordinates: placement.coords,
          },
        },
      ],
    },
  });

  map.addLayer({
    id: "placements-markers",
    type: "circle",
    source: "placements",
    paint: {
      "circle-radius": 8,
      "circle-color": "#e63946",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 2,
    },
  });

  map.addLayer({
    id: "placements-labels",
    type: "symbol",
    source: "placements",
    layout: {
      "text-field": ["get", "title"],
      "text-size": 12,
      "text-offset": [0, 1.2],
    },
    paint: {
      "text-color": "#1c2230",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
    },
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("focus") === placement.id) {
    map.flyTo({ center: placement.coords, zoom: 15, pitch: 60, essential: true });
  }

  const openPlacement = (feature) => {
    const id = feature.properties?.id;
    if (!id) return;
    const url = `placements.html?highlight=${encodeURIComponent(id)}`;
    window.open(url, "_blank", "noopener");
  };

  map.on("click", "placements-markers", (event) => {
    const feature = event.features?.[0];
    if (feature) openPlacement(feature);
  });

  map.on("mouseenter", "placements-markers", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "placements-markers", () => {
    map.getCanvas().style.cursor = "";
  });
});
