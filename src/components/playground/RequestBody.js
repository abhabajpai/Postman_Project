import { useContext, useState } from "react";
import { Context } from "../../contexts/Store";
import styles from "./playground.module.css";
import RawPayload from "./RawPayload";

const RequestBody = () => {
  const { state, dispatch } = useContext(Context);
  const [bodyType, setBodyType] = useState(state.formData.payload ? "raw" : "");
  const [rawBodyType, setRawBodyType] = useState("json");

  const BodyTypeOption = ({
    id,
    value,
    checked,
    onChange,
    name,
    label,
    disabled,
  }) => (
    <label htmlFor={id} className={disabled ? styles.disabled_radio : ""}>
      <input
      className="m-1"
        type="radio"
        value={value}
        checked={checked}
        id={id}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
      {label}
    </label>
  );

  const handleChange = (event) => {
    setBodyType(event.target.value);
    if(event.target.value != "raw") dispatch({type: "SET_PAYLOAD", payload: event.target.value})
  };

  return (
    <div
      className={
        state.responsePanelMinimized || state.splitView === "V"
          ? styles.payload_wrapper_full
          : styles.payload_wrapper
      }
      style={{ borderColor: "transparent" }}
    >
      <div className="flex flex-row items-center justify-start pl-3 text-xs">
        <div className="m-2">
          <BodyTypeOption
            id="radio-body-none"
            value=""
            checked={bodyType === ""}
            onChange={handleChange}
            name="bodyType"
            label="None"
          />
        </div>
        <div className="m-2">
          <BodyTypeOption
            id="radio-body-form-data"
            value="form-data"
            checked={bodyType === "form-data"}
            onChange={handleChange}
            name="bodyType"
            label="form-data"
            disabled
          />
        </div>
        <div className="m-2">
          <BodyTypeOption
            id="radio-body-urlencoded"
            value="url-encoded"
            onChange={handleChange}
            name="bodyType"
            label="x-www-form-encoded"
            disabled
          />
        </div>
        <div className="m-2">
          <BodyTypeOption
            id="radio-body-raw"
            value="raw"
            checked={bodyType === "raw"}
            onChange={handleChange}
            name="bodyType"
            label="raw"
          />
        </div>
        <div className="m-2">
          <BodyTypeOption
            id="radio-body-binary"
            value="binary"
            onChange={handleChange}
            name="bodyType"
            label="binary"
            disabled
          />
        </div>
        <div className="m-2">
          <BodyTypeOption
            id="radio-body-gql"
            value="graphql"
            onChange={handleChange}
            name="bodyType"
            label="GraphQL"
            disabled
          />
        </div>
        {bodyType === "raw" && (
          <div className="">
            <select
              className={styles.raw_body_formats}
              value={rawBodyType}
              onChange={(e) => setRawBodyType(e.target.value)}
            >
              <option value="text" disabled>
                Text
              </option>
              <option value="auto" disabled>
                Javascript
              </option>
              <option value="json">JSON</option>
              <option value="html" disabled>
                HTML
              </option>
              <option value="xml" disabled>
                XML
              </option>
            </select>
          </div>
        )}
      </div>
      <div>
        {bodyType === "" && (
          <div className={styles.no_body_panel}>
            This request does not have a body
          </div>
        )}
        {bodyType === "form-data" && (
          <div className={styles.no_body_panel}>form data</div>
        )}
        {bodyType === "raw" && (
          <div className={styles.raw_body_panel}>
            <RawPayload mode={rawBodyType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestBody;