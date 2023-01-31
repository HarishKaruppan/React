import React, { useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Select } from "../select/Select";
import "./modals.css";

export const Modal = ({ openModal, setShowModal }) => {
  const [schema, setSchema] = useState([
    {
      Label: "First Name",
      Value: "first_name",
    },
    {
      Label: "Last Name",
      Value: "last_name",
    },
    {
      Label: "Gender",
      Value: "gender",
    },
    {
      Label: "Age",
      Value: "age",
    },
    {
      Label: "Account Name",
      Value: "account_name",
    },
    {
      Label: "City",
      Value: "city",
    },
    {
      Label: "State",
      Value: "state",
    },
  ]);
  const [localSchema, setLocalSchema] = useState([
    {
      Label: "First Name",
      Value: "first_name",
    },
    {
      Label: "Last Name",
      Value: "last_name",
    },
    {
      Label: "Gender",
      Value: "gender",
    },
    {
      Label: "Age",
      Value: "age",
    },
    {
      Label: "Account Name",
      Value: "account_name",
    },
    {
      Label: "City",
      Value: "city",
    },
    {
      Label: "State",
      Value: "state",
    },
  ]);
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    // console.log(e.target.value);
    // console.log(selectValue.current);
    console.log(e.target.selectedOptions[0].label);
    setSelected(e.target.selectedOptions[0].label);
    // setSelected(selectValue.current.value);
  };

  const [inputList, setInputList] = useState([]);
  const segmentName = useRef();
  const selectValue = useRef();

  const addComponent = (chosen) => {
    const foundLocal = localSchema.find(
      (local) => local.Label === chosen.current.selectedOptions[0].label
    );

    localSchema.forEach((item, i) => {
      if (item.Label === chosen.current.selectedOptions[0].label) {
        localSchema.splice(i, 1);
        localSchema.unshift(item);
      }
    });
    const [first, ...rest] = localSchema;
    const secondRest = rest;
    setData((prev) => [...prev, first]);
    setLocalSchema(rest);

    schema.forEach((item, i) => {
      if (item.Label === chosen.current.selectedOptions[0].label) {
        schema.splice(i, 1);
        schema.unshift(item);
      }
    });
    setSchema(localSchema);

    setInputList(
      inputList.concat(
        <Select
          key={inputList.length}
          selectValue={selectValue}
          selected={chosen}
          handleChange={handleChange}
          schema={schema}
          localSchema={localSchema}
        />
      )
    );
    console.log(inputList);
  };
  const sendData = async () => {
    console.table(data);
    try {
      let res = await fetch(
        "https://webhook.site/bc24f47d-2756-491e-ad0a-7fb2f3009045",
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            segment_name: segmentName.current.value,
            schema: data,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
    setShowModal(false);
  };
  const change = (e) => {
    setSelected(e.target.selectedOptions[0].label);
  };
  return openModal ? (
    <div className="modal">
      <div className="modalContainer">
        <Navbar title={"Saving Segment"} />
        <div className="formContainer">
          <form className="modalForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Enter the name of the Segment</label>
            <input
              type="text"
              id="name"
              placeholder="Enter the name of segment"
              ref={segmentName}
            />
            <p>
              To save your segment, you need to add the Schemas to build the
              query
            </p>
            <ul className="list">
              <li className="green">User Traits</li>
              <li className="red">Group Traits</li>
            </ul>
            {inputList.length === 0 ? null : (
              <div className="blueContainer">{inputList}</div>
            )}
            <select name="" id="" ref={selectValue} onChange={change}>
              <option value="0" disabled selected>
                Add Schema to segment
              </option>
              {localSchema.map((local, i) => (
                <option key={i} value={local.Value}>
                  {local.Label}
                </option>
              ))}
            </select>
            <p onClick={() => addComponent(selectValue)}>Add new Schema</p>
            <div className="modalButton">
              <button type="submit" className="submit" onClick={sendData}>
                Save Segment
              </button>
              <button type="button" className="cancel" onClick={openModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
        <button type="button" className="closeBtn" onClick={openModal}>
          Close
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};
