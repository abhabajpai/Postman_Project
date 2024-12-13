import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Context } from "../../contexts/Store";
import { HistoryContext } from "../../contexts/History";
import styles from "./playground.module.css";

axios.interceptors.request.use((request) => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  return request;
});

function updateEndTime(response) {
  if (response.config && response.config.customData) {
    response.customData = response.customData || {};
    response.customData.time =
      new Date().getTime() - response.config.customData.startTime;
  }
  return response;
}

axios.interceptors.response.use(updateEndTime, (error) => {
  // Check if the error is due to a failed response
  if (error.response) {
    return Promise.reject(updateEndTime(error.response));
  }

  // Handle errors where the response is undefined (like network errors)
  return Promise.reject("Request failed or was blocked (CORS, Network, etc.)");
});

const AutoGrowInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  return (
    <div
      className="auto-grow-input"
      style={{
        display: "inline-grid",
        alignItems: "center",
        justifyItems: "start",
        maxWidth: "1300px",
      }}
    >
      <input
        ref={inputRef}
        placeholder="Enter URL or paste text"
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        style={{
          gridArea: "1 / 1 / 2 / 2",
          width: "100%",
          padding: 0,
          border: "none",
          maxWidth: "1300px",
        }}
      />
      <span
        style={{
          gridArea: "1 / 1 / 2 / 2",
          visibility: "hidden",
        }}
      >
        {props.value}
      </span>
    </div>
  );
});

const URLBox = () => {
  const { state, dispatch } = useContext(Context);
  const { dispatch: dispatchAPIEntry } = useContext(HistoryContext);

  const [url, setUrl] = useState(state.formData.url);
  const [queryParams, setQueryParams] = useState(state.formData.params);
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    let qp = state.formData.params;
    if (state.authLocation === "qp") {
      const header = state.authHeader.split(":");
      if (header.length === 2) {
        qp = qp
          ? `${qp}&${header[0]}=${header[1]}`
          : `${header[0]}=${header[1]}`;
      }
    } else {
      qp = state.formData.params;
    }
    setQueryParams(qp);

    let headerObject = {},
      authHeader = {};
    if (state.requestHeaders.length) {
      headerObject = {};
      state.requestHeaders.forEach((header) => {
        const { key, value } = header;
        headerObject[key] = value;
      });
    }

    if (state.auth) {
      authHeader = {};
      const auth = state.authHeader.split(":");
      if (state.authLocation === "header") {
        authHeader[auth[0]] = auth[1];
      } else {
        delete authHeader[auth[0]];
      }
    }
    setHeaders({ ...headerObject, ...authHeader });
  }, [state]);

  const [method, setMethod] = useState("GET");
  const [btnDisabled, setBtnDisabled] = useState(
    state.formData.url.length === 0
  );

  const inputboxRef = useRef();

  const handleChange = (e) => {
    setBtnDisabled(e.length <= 0);
    if (method === "") setMethod("GET");
    dispatch({ type: "SET_URL", payload: e });
    setUrl(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!method || !url) return;

    // Ensure URL starts with https://
    let fullUrl = url;
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = `https://${fullUrl}`;
    }

    // Append query parameters correctly
    let queryString = queryParams ? `?${queryParams}` : "";
    if (fullUrl.includes("?")) {
      // If the URL already contains a query string, use `&` to append
      queryString = queryParams ? `&${queryParams}` : "";
    }

    const finalUrl = `${fullUrl}${queryString}`;

    if (!state.responseUI) {
      dispatch({ type: "SET_RESPONSE_UI", payload: true });
    }
    dispatch({
      type: "SET_FORM_SUBMIT",
      payload: {
        method,
        url: fullUrl,
        params: state.formData.params,
        payload: state.formData.payload,
      },
    });

    // Proxy URL
    const proxyUrl = "http://localhost:3005/proxy"; // Point to your proxy server

    axios({
      method: "POST",
      url: proxyUrl,
      data: {
        url: finalUrl, // Target API URL with query parameters
        method, // HTTP method (GET, POST, etc.)
        headers, // Headers if any
        body: state.formData.payload, // Request payload (if applicable)
      },
    })
      .catch((e) => e)
      .then((res) => {
        if (typeof res === "string" || typeof res === "undefined") {
          dispatch({
            type: "SET_API_ERROR",
            payload: res,
          });
        } else {
          dispatch({
            type: "SET_API_RESPONSE",
            payload: res, // Access the data returned from your proxy
          });
        }
        console.log(res);
        const reqUrl = `${new Date().getTime()} : ${method} ${finalUrl}`;
        dispatchAPIEntry({ type: "ADD_NEW_ENTRY", payload: reqUrl });
      });
  };

  const methodColors = {
    GET: "#16a34a",
    POST: "#AD7A03",
    PUT: "#4c51bf",
    PATCH: "#784FA9",
    DELETE: "#8E1A10",
  };

  return (
    <div className={styles.url_box}>
      <form onSubmit={handleSubmit}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ color: methodColors[method] }}
        >
          <option className="text-green-500" value="GET">
            GET
          </option>
          <option className="text-[#AD7A03]" value="POST">
            POST
          </option>
          <option className="text-indigo-600" value="PUT">
            PUT
          </option>
          <option className="text-[#784FA9]" value="PATCH">
            PATCH
          </option>
          <option className="text-[#8E1A10]" value="DELETE">
            DELETE
          </option>
        </select>
        <div
          onClick={() => {
            inputboxRef.current.focus();
          }}
        >
          <AutoGrowInput
            value={queryParams ? `${url}?${queryParams}` : url}
            ref={inputboxRef}
            onChange={handleChange}
            qp={queryParams}
          />
        </div>
        <button type="submit" disabled={btnDisabled || state.formSubmitted}>
          {state.formSubmitted ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default URLBox;
