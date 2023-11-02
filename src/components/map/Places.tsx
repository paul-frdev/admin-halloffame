import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { cn } from '../../lib/utils';
import { FieldError } from 'react-hook-form';


type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
  setSelectedAddress: (e: string) => void;
  name?: string;
  error?: FieldError;
};

export const Places = ({ setOffice, setSelectedAddress, name, error }: PlacesProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    setSelectedAddress(val)
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setOffice({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={cn(`w-full p-2 outline-none rounded-md shadow-lg border-[1.5px]`, error ? 'border-[#ef090d] placeholder:text-[#ef090d]' : 'border-transparent')}
        placeholder={cn(``, error ? 'Address field is required' : 'Search location')}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
