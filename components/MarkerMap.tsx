import { Map, Marker } from "pigeon-maps"


export function MarkerMap({geoLong, geoLat}:any) {
  const NumberLat = [geoLat, geoLong].map(i => Number(i))

    return (
      <Map height={300} defaultCenter={[NumberLat[0], NumberLat[1]]} defaultZoom={16}>
        <Marker width={50} anchor={[NumberLat[0], NumberLat[1]]} />
      </Map>
    )
  }