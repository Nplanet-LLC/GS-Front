import React, { useMemo, useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Controller, Control, FieldErrors } from "react-hook-form";

interface Props {
  //   control: Control<any>;
  //   //   errors: FieldErrors;
  //   //   name: string;
  //   name: `countries.${number}`;
  //   error?: FieldError;

  control: Control<any>;
  name: `countries.${number}`;
  error?: any;
}

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

function SelectCountry({ control, name, error }: Props) {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div>
      <label
        htmlFor="country"
        className="block font-semibold text-[#0A3161] mb-1"
      >
        Choose countries of interest for newsletter delivery
      </label>

      <Controller
        name={name}
        // name="country"
        control={control}
        rules={{ required: "Country is required" }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            components={{
              SingleValue: customSingleValue,
              Option: customOption,
            }}
            className="text-[#0A3161] !cursor-pointer"
            placeholder="Select a country"
            isSearchable={!field.value}
            onChange={(val) => field.onChange(val)}
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
        )}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
    </div>
  );
}

export default SelectCountry;
