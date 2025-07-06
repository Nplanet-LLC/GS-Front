import React from "react";
import Select from "react-select";
import { Controller, Control } from "react-hook-form";

interface Country {
  id: number;
  countryName: string;
}

interface Props {
  control: Control<any>;
  name: `countries.${number}`;
  error?: any;
  countries: Country[];
}

const customSingleValue = ({ data }: any) => (
  <div className="flex items-center gap-2">{data.label}</div>
);

const customOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
    >
      {data.label}
    </div>
  );
};

function SelectCountry({ control, name, error, countries }: Props) {
  const options = countries.map((country) => ({
    value: country.id,
    label: country.countryName,
  }));

  return (
    <div>
      <label
        htmlFor="country"
        className="block font-semibold text-[#0A3161] mb-1"
      >
        Choose countries of interest for webinar delivery
      </label>

      <Controller
        name={name}
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
            isSearchable
            onChange={(val) =>
              field.onChange({ id: val?.value, name: val?.label })
            }
            value={
              field.value
                ? options.find((option) => option.value === field.value.id)
                : null
            }
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 48,
                cursor: "pointer",
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
              option: (base) => ({
                ...base,
                cursor: "pointer",
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
