import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Lines } from './Lines';
import { Annotations } from './Annotations';
import { Legend } from './Legend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { Popup } from './Popup';
import { ChartData } from './Chart.model';

const width = 1100;
const height = 500;
const margin = 50;
const color = d3.scaleOrdinal(['yellow', 'orange']);

interface ChartProps {
  data: ChartData[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const [showPopup, setShowPopupPopup] = useState<any>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [scales, setScales] = useState<any>();

  useEffect(() => {
    const allValues = [...data[0].values, ...data[1].values];

    var xScale = d3
      .scaleTime()
      .domain(
        // @ts-ignore
        d3.extent(
          [
            // dummy date added to extend x axis to the left
            {
              date: new Date(
                data[0].values[0].date.getFullYear(),
                data[0].values[0].date.getMonth(),
                data[0].values[0].date.getDate() - 5
              ),
            },
            ...data[0].values,
          ],
          d => d.date
        )
      )
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([
        // @ts-ignore
        d3.min(allValues, d => d.temperature) - 50,
        // @ts-ignore
        d3.max(allValues, d => d.temperature) + 50,
      ])
      .range([height - margin, 0]);

    setScales({ xScale, yScale });
  }, [data]);

  return (
    <div>
      <svg width={width + margin} height={height + margin}>
        <g transform={`translate(${margin}, ${margin})`}>
          {scales && <XAxis {...scales} height={height} margin={margin} />}
          {scales && <YAxis {...scales} height={height} margin={margin} />}
          {scales && (
            <Lines
              {...scales}
              width={width}
              height={height}
              color={color}
              data={data}
              annotations={annotations}
              setShowPopupPopup={setShowPopupPopup}
            />
          )}
          {scales && <Annotations data={annotations} {...scales} />}
          <Legend data={data} color={color} />
        </g>
      </svg>
      {showPopup && (
        <Popup
          data={showPopup}
          setShowPopupPopup={setShowPopupPopup}
          setAnnotations={setAnnotations}
        />
      )}
    </div>
  );
};
