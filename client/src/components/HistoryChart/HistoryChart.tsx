import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";

import * as d3 from "d3";

import axios from "axios";

interface Data {
  id: number;
  CNPJ: string;
  razao_social: string;
  data: string;
  tipo: string;
  valor: number;
  quantidade: number;
}

function HistoryChart(props: any) {
  const { cnpj } = props;
  const [data, setData] = useState<Data[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const width = 1200;
  const height = 600;

  const margin = { top: 50, right: 30, bottom: 50, left: 40 };

  useEffect(() => {
    axios
      .get(
        ("https://z1ba3a963-z9eb75d7a-gtw.z1304890a.xmx.sh" ||
          "http://localhost:3001") + "/api/operacao"
      )
      .then((response) => {
        if (cnpj) {
          setData(response.data.filter((d: Data) => d.CNPJ === cnpj));
        } else {
          setData(response.data);
        }
      })
      .catch((err) => {});
  }, [cnpj]);

  useEffect(() => {
    {
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const dataMap = new Map<string, [number, number]>();

      new Set(data.map((d) => d.data).sort()).forEach((d) => {
        const quantidadeTotal = data.reduce((acc, cur) => {
          if (cur.data <= d) {
            if (cur.tipo === "COMPRA") {
              acc += cur.quantidade;
            } else {
              acc -= cur.quantidade;
            }
          }
          return acc;
        }, 0);
        dataMap.set(d, [
          quantidadeTotal,
          data.find((e) => e.data === d)?.valor || 0,
        ]);
      });

      const svg = d3.select(svgRef.current);

      svg.selectAll("*").remove();

      const xScale = d3
        .scaleTime()
        .domain([
          new Date(d3.min(dataMap.keys()) || 0),
          new Date(d3.max(dataMap.keys()) || 0),
        ])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear<number>()
        .domain([
          d3.min(dataMap.values(), (d) => d[0] * d[1]) || 0,
          d3.max(dataMap.values(), (d) => d[0] * d[1]) || 0,
        ])
        .nice()
        .range([innerHeight, 0]);

      svg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left}, ${innerHeight + margin.top})`
        )
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");

      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(yScale));

      const line = d3
        .line<[string, [number, number]]>()
        .x((d) => (xScale(new Date(d[0])) || 0) + margin.left)
        .y((d) => yScale(d[1][1] * d[1][0]));

      svg
        .append("path")
        .datum(dataMap)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

      svg
        .selectAll(".dot")
        .data(dataMap)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => (xScale(new Date(d[0])) || 0) + margin.left)
        .attr("cy", (d) => yScale(d[1][0] * d[1][1]))
        .attr("r", 5);

      // svg
      //   .selectAll(".label")
      //   .data(dataMap)
      //   .enter()
      //   .append("text")
      //   .attr("class", "label")
      //   .attr("x", (d) => xScale(new Date(d[0])) || 0)
      //   .attr("y", (d) => yScale(d[1][0] * d[1][1]))
      //   .text((d) => `R$${d[1][0] * d[1][1]}`)
      //   .attr("transform", `translate(${margin.left}, ${margin.top})`);
    }
  }, [data]);

  return (
    <Card>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}></g>
      </svg>
    </Card>
  );
}

export default HistoryChart;

HistoryChart.propTypes = {
  cnpj: PropTypes.string,
};
