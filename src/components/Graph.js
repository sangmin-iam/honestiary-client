import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as d3 from "d3";

import useD3 from "../hooks/useD3";

const WIDTH = 1500;
const HEIGHT = 750;
const CIRCLE_SIZE = 20;

function Graph({ data }) {
  const navigate = useNavigate();
  const [currentZoomState, setCurrentZoomState] = useState(null);
  const { searchOptions, diaries } = data;

  const ref = useD3(
    (svg) => {
      const dates = diaries.map((diary) => new Date(diary.createdAt));

      const margin = { top: 20, right: 20, bottom: 20, left: 20 };
      const GRAPH_WIDTH = WIDTH;
      const GRAPH_HEIGHT = HEIGHT;

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(dates))
        .range([margin.left, GRAPH_WIDTH - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([-100, 100])
        .range([GRAPH_HEIGHT - margin.bottom, margin.top]);

      const xAxis = svg
        .select(".x-axis")
        .call(d3.axisBottom(xScale).tickSizeOuter(0).ticks(d3.timeDay))
        .attr("transform", `translate(0, ${GRAPH_HEIGHT / 2})`);

      let newScaleX;

      if (currentZoomState) {
        newScaleX = currentZoomState.rescaleX(xScale);
        xAxis.call(d3.axisBottom(newScaleX).tickSizeOuter(0));
      }

      svg
        .select(".plot-area")
        .attr("clip-path", "url(#graph-area)")
        .selectAll("circle")
        .data(diaries)
        .enter()
        .append("circle")
        .attr("r", CIRCLE_SIZE)
        .attr("cx", (d) => xScale(new Date(d.createdAt)))
        .attr("cy", function (d) {
          if (d.sentiment >= 100) {
            return yScale(100);
          }

          if (d.sentiment <= -100) {
            return yScale(-100);
          }

          return yScale(d.sentiment);
        })
        .attr("fill", function (d) {
          const currentHeightOfCircle = this.cy.baseVal.value;
          const middleHeight = GRAPH_HEIGHT / 2;
          const distanceFromMiddleHeight = middleHeight - currentHeightOfCircle;
          const proportion = 255 / middleHeight;

          if (d.sentiment >= 0) {
            return `rgba(0, ${
              Math.abs(distanceFromMiddleHeight) * proportion
            }, 0, 0.5)`;
          }

          if (d.sentiment < 0) {
            return `rgba(0, 0, ${
              Math.abs(distanceFromMiddleHeight) * proportion
            }, 0.5)`;
          }
        })
        .style("cursor", "pointer")
        .on("mouseover", onMouseOverCircle)
        .on("mousemove", onMouseMoveCircle)
        .on("mouseleave", onMouseLeaveCircle)
        .on("click", onClickCircle);

      const tooltip = d3.select(".tooltip");

      function onMouseOverCircle() {
        d3.select(this)
          .transition()
          .duration(250)
          .style("stroke", "black")
          .attr("r", CIRCLE_SIZE + 4);

        tooltip.transition().duration(200).style("opacity", 0.9);
      }

      function onMouseMoveCircle(e, d) {
        const { script, sentiment } = d;

        const slicedScript = script.slice(0, 30);

        tooltip
          .html(`Score: ${sentiment} <br/> ${slicedScript}...`)
          .style("left", `${e.pageX - 15}px`)
          .style("top", `${e.pageY - 60}px`);
      }

      function onMouseLeaveCircle() {
        d3.select(this)
          .transition()
          .duration(250)
          .style("stroke", "none")
          .attr("r", CIRCLE_SIZE);

        tooltip.transition().duration(500).style("opacity", 0);
      }

      function onClickCircle(_, d) {
        navigate(`/entries/${d._id}`);
      }

      const zoom = d3
        .zoom()
        .scaleExtent([0.5, 10])
        .translateExtent([
          [0, 0],
          [GRAPH_WIDTH, GRAPH_HEIGHT],
        ])
        .on("zoom", onZoom);

      function onZoom() {
        const zoomState = d3.zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
      }

      svg.call(zoom);

      if (currentZoomState) {
        svg.selectAll("circle").attr("cx", (d) => {
          return newScaleX(new Date(d.createdAt));
        });
      }
    },
    [searchOptions, diaries, currentZoomState]
  );

  return (
    <GraphWrapper>
      <svg
        ref={ref}
        style={{
          width: "100%",
          height: `${HEIGHT}`,
        }}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <defs>
          <clipPath id="graph-area">
            <rect x="0" y="0" width="100%" height="100%" />
          </clipPath>
        </defs>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div className="tooltip"></div>
    </GraphWrapper>
  );
}

const GraphWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.25);

  .tooltip {
    position: absolute;
    opacity: 0;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    background: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
    pointer-events: none;
    font-size: 1.5rem;
  }
`;

Graph.propTypes = {
  data: PropTypes.object,
};

export default Graph;
