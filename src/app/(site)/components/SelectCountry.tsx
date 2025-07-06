import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

interface SelectCountryProps {
  value: string | number;
  onCountryChange: (value: string | number) => void;
}
  

interface CountryOption {
  label: string;
  value: string;
}

const customSingleValue = ({ data }: { data: CountryOption }) => (
  <div className="flex items-center gap-2">
    <img
      src={`https://flagcdn.com/w40/${data.value.toLowerCase()}.png`}
      alt={data.label}
      style={{ width: 20, height: 15 }}
    />
    {data.label}
  </div>
);

const customOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 p-2 hover:bg-gray-100"
    >
      <img
        src={`https://flagcdn.com/w40/${data.value.toLowerCase()}.png`}
        alt={data.label}
        style={{ width: 20, height: 15 }}
      />
      {data.label}
    </div>
  );
};

function SelectCountry({ onCountryChange, value }: SelectCountryProps) {
  const options: CountryOption[] = useMemo(() => countryList().getData(), []);

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    value ? options.find((option: CountryOption) => option.value === value) || null : null
  );

  useEffect(() => {
    if (!value) {
      setSelectedCountry(null);
    } else {
      const selected = options.find((option: CountryOption) => option.value === value);
      setSelectedCountry(selected || null);
    }
  }, [value, options]);

  const handleChange = (val: CountryOption | null) => {
    setSelectedCountry(val);

    const countryId = val
      ? options.findIndex((option: CountryOption) => option.value === val.value) + 1
      : 0;

    onCountryChange(countryId);
  };

  return (
    <div>
      <label htmlFor="Country">Country</label>
      <Select
        options={options}
        value={selectedCountry}
        onChange={handleChange}
        components={{
          SingleValue: customSingleValue,
          Option: customOption,
        }}
        placeholder="Select a country"
        isSearchable={!selectedCountry}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: 48,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0 8px",
          }),
          singleValue: (base) => ({
            ...base,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }),
        }}
      />
    </div>
  );
}

export default SelectCountry;
