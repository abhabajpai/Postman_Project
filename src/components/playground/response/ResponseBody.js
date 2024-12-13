import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/json';
import 'brace/theme/tomorrow';
import 'brace/theme/twilight';
import style from './response.module.css';

const ResponseBody = ({ data, viewAs, wrap }) => {
  const [dark, setDark] = useState(false);

  console.log();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDark(true);
    }
  }, []);

  return (
    <div className={style.response_body}>
      {viewAs === 'preview' && (
        <>
          {typeof data === 'object' ? (
            <div className={style.res_preview}>{JSON.stringify(data)}</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
          )}
        </>
      )}
      {viewAs === 'raw' && (
        <div className={style.res_raw}>
          <pre>
            {typeof data === 'object' ? JSON.stringify(data, null, 2) : data}
          </pre>
        </div>
      )}
      {viewAs === 'pretty' && (
        <div className="pretty_response">
          {typeof data === 'object' ? (
            <AceEditor
              mode="json"
              width=''
              fontSize={13}
              theme={dark ? 'twilight' : 'tomorrow'}
              value={JSON.stringify(data, null, 2)}
              name="prettyJsonOutput"
              tabSize={2}
              editorProps={{
                $blockScrolling: true,
              }}
              readOnly={true}
              wrapEnabled={wrap}
              highlightActiveLine={false}
            />
          ) : (
            <AceEditor
              mode="html"
              width=''
              fontSize={13}
              theme={dark ? 'twilight' : 'tomorrow'}
              value={data}
              name="prettyJsonOutput"
              tabSize={2}
              editorProps={{
                $blockScrolling: true,
              }}
              readOnly={true}
              wrapEnabled={wrap}
              highlightActiveLine={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseBody;
