import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const customSingleValue = ({ data }: any) => (
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

function SelectCountry() {
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState<any>(null);

  const handleChange = (val: any) => {
    setValue(val);
    console.log("Selected country:", val);
  };

  return (
    <div>
      <label htmlFor="Country">Country</label>
      {/* <Select
        // isSearchable={!value}
        options={options}
        value={value}
        onChange={handleChange}
        components={{
          SingleValue: customSingleValue,
          Option: customOption,
        }}
        placeholder="Select a country"
      /> */}
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        components={{
          SingleValue: customSingleValue,
          Option: customOption,
        }}
        placeholder="Select a country"
        isSearchable={!value}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: 48, // ⬅️ ارتفاع ثابت
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
