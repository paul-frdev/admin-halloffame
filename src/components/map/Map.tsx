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
import { FieldError } from 'react-hook-form';


interface MapProps {
  setSelectedAddress: (e: string) => void;
  name?: string;
  error?: FieldError;
  className?: string;
}

export const Map: React.FC<MapProps> = ({ setSelectedAddress, name, error, className }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })

  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 50.4501, lng: 30.5234 }), []);
  const options = useMemo<MapOptions>(() => ({
    mapId: "3f5947443e61e6f9",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house: LatLngLiteral) => {
    console.log('fetchDirections');

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
    <div className=" relative flex w-full h-[500px] mb-8">
      <div className=" absolute top-0 left-0 w-[400px] h-[50px] z-10  p-4 bg-transparent text-black border-none">
        <Places
          error={error}
          name={name}
          setSelectedAddress={setSelectedAddress}
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
                  houses.map((house) => {
                    return (
                      <Marker
                        key={house.lat}
                        position={house}
                        clusterer={clusterer}
                        onClick={() => { fetchDirections(house) }}
                      />
                    )
                  }) as any
                }
              </MarkerClusterer>

              <Circle center={office} radius={100} options={closeOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  )
}
