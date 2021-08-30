import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const YAxis = ({ yScale }) => {
  const yRef = useRef();

  useEffect(() => {
    d3.select(yRef.current).call(d3.axisLeft(yScale).ticks(15));
  }, [yScale]);

  return (
    <g ref={yRef} style={{ color: 'white' }}>
      <text fill="#fff" y={15} transform="rotate(-90)">
        Temperature
      </text>
    </g>
  );
};
