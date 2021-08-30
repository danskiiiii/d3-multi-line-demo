import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const XAxis = ({ xScale, height, margin }) => {
  const xRef = useRef();

  useEffect(() => {
    d3.select(xRef.current).call(d3.axisBottom(xScale).ticks(12));
  }, [xScale]);

  return (
    <g
      ref={xRef}
      transform={`translate(0, ${height - margin})`}
      style={{ color: 'white' }}
    />
  );
};
