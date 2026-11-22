import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'

function FarmMap({ plots, selected, onSelect }) {
    return (
        // key makes the map start again on the new plot each time a plot is picked
        <MapContainer
            key={selected.id}
            center={[selected.lat, selected.lon]}
            zoom={13}
            className="h-96 w-full rounded-2xl"
        >
            {/* satellite photos, so you can see the fields and vegetation */}
            <TileLayer
                attribution="Tiles &copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            {plots.map((plot) => (
                <CircleMarker
                    key={plot.id}
                    center={[plot.lat, plot.lon]}
                    radius={plot.id === selected.id ? 12 : 8}
                    pathOptions={{
                        color: '#FFFFFF',
                        fillColor: plot.id === selected.id ? '#B7793A' : '#5E7D67',
                        fillOpacity: 0.9,
                    }}
                    eventHandlers={{ click: () => onSelect(plot) }}
                >
                    <Tooltip permanent>{plot.name} · {plot.crop}</Tooltip>
                </CircleMarker>
            ))}
        </MapContainer>
    )
}

export default FarmMap
