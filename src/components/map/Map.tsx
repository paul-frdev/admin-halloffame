import { useLoadScript } from '@react-google-maps/api'
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import { Places } from './Places';
import { Distance } from './Distance';
import { DirectionsResult, LatLngLiteral, MapOptions } from '../../types/map';
import { closeOptions, generateHouses } from './config';


export const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })

  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43.45, lng: -80.49 }), []);
  const options = useMemo<MapOptions>(() => ({
    mapId: "b181cac70f27f5e6",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const houses: any = useMemo(() => generateHouses(center), [center]);

  // console.log('center', center);

  // console.log('houses', houses, 'onLoad', onLoad, 'options', options, 'center', center, 'office', office, 'directions', directions, 'isLoaded', isLoaded);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          console.log('result', result, 'status', status);
          setDirections(result);
        } else {
          console.log('result', result);

        }
      }
    );
  };


  if (!isLoaded) {
    return <span>Loading...</span>
  }
  return (
    <div className=" relative flex w-full h-[500px]">
      <div className=" absolute top-0 left-0 w-[400px] h-[100px] z-10  p-4 bg-transparent text-black border-none">
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="w-[100%] h-full">
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="w-full h-full"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <MarkerClusterer>
                {(clusterer) =>
                  houses.map((house: LatLngLiteral) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => { fetchDirections(house) }}
                    />
                  ))
                }
              </MarkerClusterer>

              <Circle center={office} radius={50} options={closeOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
