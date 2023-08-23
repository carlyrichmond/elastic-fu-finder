import React from 'react';
import styles from './query-code-editor.module.scss';
import CodeMirror from "@uiw/react-codemirror";
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

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

  const [currentQuery, setCurrentQuery] = React.useState(initialQuery);

  const onQueryUpdate = (value: string, viewUpdate: any) => {
    setCurrentQuery(value);
  }

  const onQuerySubmit = () => {
    const query = currentQuery.replace(comment, '');
    let queryJSON;

    try {
      queryJSON = JSON.parse(query);
      props.getResults(queryJSON.query);
    } catch(error) {
      console.log('Invalid query. Please try again!');
      return;
    }
  }

  return (
    <div className={styles['code-editor-container']}>
      <CodeMirror
        className={styles['code-editor']}
        value={comment + initialQuery}
        onChange={onQueryUpdate}
        extensions={[langs.json()]}
        theme={vscodeDark}
        height="15rem"
        width="30rem"
      />
      <button className={styles['query-button']} onClick={onQuerySubmit}>Submit</button>
    </div>
  );
}

export default QueryCodeEditor;