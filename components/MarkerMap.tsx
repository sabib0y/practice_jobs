import { Map, Marker } from "pigeon-maps"


export function MarkerMap({geoLat, geoLong}:any) {

    return (
      <Map height={300} defaultCenter={[geoLong, geoLat]} defaultZoom={11}>
        <Marker width={50} anchor={[geoLong, geoLat]} />
      </Map>
    )
  }