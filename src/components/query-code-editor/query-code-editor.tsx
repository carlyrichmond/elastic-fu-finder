import React, { useState } from 'react';
import styles from './query-code-editor.module.scss';
import CodeMirror from "@uiw/react-codemirror";
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface QueryCodeEditorProps {
  getResults: (query: string) => void;
}

export function QueryCodeEditor(props: QueryCodeEditorProps) {
  const comment = '// fields: url, title, body_content'
  const initialQuery = `
  {
    "query": {
      "match": {
        "title": "My page query"
      }
    }
  }`

  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  const [isError, setIsError] = useState(false);

  const onQueryUpdate = (value: string, viewUpdate: any) => {
    setCurrentQuery(value);
  }

  const onQuerySubmit = () => {
    const query = currentQuery.replace(comment, '');
    setIsError(false);

    let queryJSON;

    try {
      queryJSON = JSON.parse(query);
      props.getResults(queryJSON.query);
    } catch(error) {
      // what about 404 case?
      console.log('Invalid or malformed query. Try again!');
      setIsError(true);
      return;
    }
  }

  return (
    <div className={isError ? styles['code-editor-container-error'] : styles['code-editor-container']}>
      <CodeMirror
        className={styles['code-editor']}
        value={comment + initialQuery}
        onChange={onQueryUpdate}
        extensions={[langs.json()]}
        theme={vscodeDark}
        height="15rem"
        width="30rem"/>
      <p className={isError ? styles['error-message'] : styles['hidden-error-message'] }><FontAwesomeIcon icon={faCircleExclamation} />Invalid or malformed query. Try again!</p>
      <button className={styles['primary-button']} onClick={onQuerySubmit}>Submit</button>
    </div>
  );
}

export default QueryCodeEditor;