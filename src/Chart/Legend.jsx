export const Legend = ({ data, color }) => {
  return data.map((d, i) => (
    <g key={d.name}>
      <text x={30 + i * 180} y={10} style={{ fill: color(i), fontSize: 12 }}>
        {d.name}
      </text>
    </g>
  ));
};
