import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const Lines = ({
  xScale,
  yScale,
  data,
  color,
  setShowPopupPopup,
  width,
  height,
}) => {
  const lineRef = useRef();

  useEffect(() => {
    var line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.temperature));

    let lines = d3.select(lineRef.current);
    var lineOpacity = '0.75';

    lines
      .selectAll('.line-group')
      .data(data)
      .enter()
      .append('g')
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color(i))
      .style('stroke-width', 3)
      .style('opacity', lineOpacity)
      .style('fill', 'none');

    const node = d3.select(lineRef.current);

    // inspired by http://jsfiddle.net/takuan/gakdeL1u/7/
    node
      .append('rect')
      .attr('fill', 'transparent')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        focus.style('visibility', 'visible');
      })
      .on('mousemove', mousemove);

    var focus = lines
      .append('g')
      .attr('class', 'focus')
      .style('visibility', 'hidden');

    for (let i = 0; i < data.length; i++) {
      focus
        .append('g')
        .attr('class', 'focus' + i)
        .append('circle')
        .attr('r', 8)
        .attr('fill', color(i))
        .style('cursor', 'pointer');

      node
        .select('.focus' + i)
        .append('text')
        .attr('x', -14)
        .attr('y', -20)
        .attr('fill', color(i));
    }

    const bisectDate = d3.bisector(d => d.date).left;

    function mousemove(e) {
      const x0 = xScale.invert(d3.pointer(e)[0]);
      const series = data.map(e => {
        let i = bisectDate(e.values, x0, 1);
        i = i >= e.values.length ? e.values.length - 1 : i;

        const d0 = e.values[i - 1];
        const d1 = e.values[i];

        return x0 - d0.date > d1.date - x0 ? d1 : d0;
      });

      for (let i = 0; i < series.length; i++) {
        node
          .selectAll('.focus' + i)
          .attr(
            'transform',
            `translate(${xScale(series[i].date)},${yScale(
              series[i].temperature
            )})`
          )
          .on('click', e => {
            setShowPopupPopup({
              positionX: e.pageX,
              positionY: e.pageY,
              ...series[i],
            });
          })
          .select('text')
          .text(series[i].temperature);
      }
    }

    // todo figure out a way to clear svg content on rerenders
  }, []);

  return <g ref={lineRef} />;
};
