import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'

function FarmMap({ plots, selectedId, onSelect }) {
    return (
        <MapContainer center={[-0.25, 36.1]} zoom={7} className="h-96 w-full rounded-2xl">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {plots.map((plot) => (
                <CircleMarker
                    key={plot.id}
                    center={[plot.lat, plot.lon]}
                    radius={plot.id === selectedId ? 12 : 8}
                    pathOptions={{
                        color: '#2F4A3A',
                        fillColor: plot.id === selectedId ? '#B7793A' : '#5E7D67',
                        fillOpacity: 0.9,
                    }}
                    eventHandlers={{ click: () => onSelect(plot) }}
                >
                    <Tooltip>{plot.name} · {plot.crop}</Tooltip>
                </CircleMarker>
            ))}
        </MapContainer>
    )
}

export default FarmMap