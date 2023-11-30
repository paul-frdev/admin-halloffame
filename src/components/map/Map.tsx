import { useLoadScript } from '@react-google-maps/api'
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { Places } from './Places';
import { LatLngLiteral, MapOptions } from '../../types/map';
import { FieldError } from 'react-hook-form';
import { Loader } from '../ui/Loader';
import { toast } from 'react-toastify';


interface MapProps {
  setSelectedAddress: (e: string) => void;
  name?: string;
  error?: FieldError;
  className?: string;
  location?: string;
  valueAddress?: string;
}

export const Map: React.FC<MapProps> = ({ setSelectedAddress, name, error, className, location = '', valueAddress }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })
  const [locationCoordinates, setLocationCoordinates] = useState<LatLngLiteral>();
  const [loadingCoords, setLoadingCoords] = useState(true);


  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(() => ({
    mapId: "3f5947443e61e6f9",
    disableDefaultUI: true,
    clickableIcons: false,
  }), []);


  useEffect(() => {

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const encodedLocation = encodeURIComponent(location);

    console.log('encodedLocation', encodedLocation);
    
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0 && data.results[0].geometry) {
          const location = data.results[0].geometry.location;
          setLocationCoordinates({ lat: location.lat, lng: location.lng });
          setLoadingCoords(false);
        } else {
          console.error('Invalid data received from geocoding API:', data);
          setLoadingCoords(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching location coordinates:', error);
        setLoadingCoords(false);
      });
  }, [location]);


  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  if (!isLoaded || loadingCoords) {
    return <Loader />
  }
  return (
    <div className=" relative flex w-full h-[500px] mb-8">
      <div className=" absolute top-0 left-0 w-[400px] h-[50px] z-10  p-4 bg-transparent text-black border-none">
        <Places
          valueAddress={valueAddress}
          error={error}
          name={name}
          setSelectedAddress={setSelectedAddress}
          setOffice={(position) => {
            setLocationCoordinates(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div className="w-[100%] h-full">
        <GoogleMap
          zoom={15}
          center={locationCoordinates}
          mapContainerClassName="w-full h-full"
          options={options}
          onLoad={onLoad}
        >
          {locationCoordinates && <Marker
            position={locationCoordinates}
            icon={{
              url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            }}
          />}
        </GoogleMap>
      </div>
    </div>
  )
}
