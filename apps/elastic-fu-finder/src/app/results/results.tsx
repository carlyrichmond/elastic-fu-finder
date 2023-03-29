import { connectHits } from 'react-instantsearch-dom';

interface HitProps {
  hits: Hit[]
}

export interface Hit {
  objectID: string;
  title: string;
  url: string;
}

export function Results(props: HitProps) {
  const { hits }  = props;
  return (
    <ol>
    {hits.map(hit => (
      <li data-testid="result-element" key={hit.objectID}>{hit.title}</li>
    ))}
  </ol>
  )
}

export const PageHits = connectHits(Results);