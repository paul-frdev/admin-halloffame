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
import { useEffect, useState } from 'react';


type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
  setSelectedAddress: (e: string) => void;
  name?: string;
  error?: FieldError;
  valueAddress?: string;
};

export const Places = ({ setOffice, setSelectedAddress, name, error, valueAddress }: PlacesProps) => {

  const [inputValue, setInputValue] = useState(valueAddress || '');

  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setInputValue(valueAddress || ''); // Обновляем значение при изменении valueAddress
  }, [valueAddress]);

  useEffect(() => {
    setValue(inputValue); // Обновляем значение в usePlacesAutocomplete при изменении inputValue
  }, [inputValue, setValue]);

  const handleSelect = async (val: string) => {
    setInputValue(val);
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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
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
