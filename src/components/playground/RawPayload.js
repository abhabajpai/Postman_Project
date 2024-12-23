import { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import 'brace/theme/twilight';
import { Context } from "../../contexts/Store";
// import '/monokai';

const RawPayload = () => {
  const { state, dispatch } = useContext(Context);
  const [dark, setDark] = useState(false);
  const [input, setInput] = useState(state.formData.payload);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark(true);
    }
  }, []);

  const handleChange = (e) => {
    setInput(e);
    dispatch({ type: "SET_PAYLOAD", payload: e });
  };

  return (
    <AceEditor
      mode="json"
      fontSize={13}
      theme={dark ? "twilight" : "tomorrow"}
      value={input}
      onChange={handleChange}
      // onPaste={handleChange}
      name="rawPayloadInput"
      width="100%"
      tabSize={2}
      editorProps={{
        $blockScrolling: true,
      }}
    />
  );
};

export default RawPayload;