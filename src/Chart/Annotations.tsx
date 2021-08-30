import React from 'react';

interface AnnotationsProps {
  xScale: any;
  yScale: any;
  data: {
    date: Date;
    temperature: number;
    alert: boolean;
  }[];
}

export const Annotations: React.FC<AnnotationsProps> = ({
  xScale,
  yScale,
  data,
}) => {
  return (
    <g>
      {data.map((el, i) => (
        <g key={i}>
          <circle
            cx={xScale(el.date)}
            cy={yScale(el.temperature) - 50}
            r="9"
            stroke={el.alert ? 'red' : 'white'}
            strokeWidth="2"
            fill="none"
          />
          <text
            x={xScale(el.date) - 2}
            y={yScale(el.temperature) - 45}
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              fill: el.alert ? 'red' : 'white',
            }}
          >
            {'!'}
          </text>
        </g>
      ))}
    </g>
  );
};
