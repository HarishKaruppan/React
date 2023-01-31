import { useState } from "react";
import "./select.css";

export const Select = ({
  selectValue,
  selected,
  handleChange,
  schema,
  localSchema,
}) => {
  const styles = { display: "none" };
  const place = selectValue.current.value;
  console.log(place);
  return (
    // <select name="" id="">
    //   <option value="">{selected}</option>
    // </select>
    <select name="schema" id="schema" value={selected} onChange={handleChange}>
      <option value="0" disabled>
        Add Schema to segment
      </option>
      {schema.map((item, i) =>
        i === 0 ? (
          <option
            value={item.Value}
            key={item.Value}
            style={{ display: "none" }}
          >
            {item.Label}
          </option>
        ) : (
          <option value={item.Value} key={item.Value}>
            {item.Label}
          </option>
        )
      )}
    </select>
  );
};
