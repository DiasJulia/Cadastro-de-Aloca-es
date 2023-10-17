import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as d3 from "d3";
import "d3-time-format/locale/pt-BR";

import "./OperationLineChart.css";

import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";

import { useDimensions } from "@/hooks/useDimensions";

interface Data {
  id: number;
  CNPJ: string;
  razao_social: string;
  data: string;
  tipo: string;
  valor: number;
  quantidade: number;
}

interface PreparedData {
  data: string;
  quantidade: number;
  valor: number;
}

d3.timeFormatDefaultLocale({
  dateTime: "%a %b %e %X %Y",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
  shortDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
  months: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  shortMonths: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
});

function OperationLineChart(props: any) {
  const { cnpj } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<
    { data: string; quantidade: number; valor: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const dimensions = useDimensions(cardRef);

  const prepareData = (data: Data[]) => {
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

    return Array.from(dataMap.entries()).map((d) => ({
      data: d[0],
      quantidade: d[1][0],
      valor: d[1][1],
    }));
  };

  useEffect(() => {
    axios
      .get(
        ("https://z1ba3a963-z9eb75d7a-gtw.z1304890a.xmx.sh" ||
          "http://localhost:3001") + "/api/operacao"
      )
      .then((response) => {
        if (cnpj) {
          setData(
            prepareData(response.data.filter((d: Data) => d.CNPJ === cnpj))
          );
          console.log(data);
          renderLineChart({
            width: cardRef.current ? cardRef.current.offsetWidth : 0,
            height: cardRef.current ? cardRef.current.offsetHeight : 0,
          });
        } else {
          setData(prepareData(response.data));
          renderLineChart({
            width: cardRef.current ? cardRef.current.offsetWidth : 0,
            height: cardRef.current ? cardRef.current.offsetHeight : 0,
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [cnpj]);

  const renderLineChart = (dimensions: { width: number; height: number }) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(data, (d) => new Date(d.data))!,
        d3.max(data, (d) => new Date(d.data))!,
      ])
      .range([0, dimensions.width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.valor * d.quantidade)!,
        d3.max(data, (d) => d.valor * d.quantidade)!,
      ])
      .nice()
      .range([dimensions.width / 2, 0]);

    svg
      .append("g")
      .attr("transform", `translate(${30}, ${dimensions.width / 2 + 15})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "center");

    svg
      .append("g")
      .attr("transform", `translate(${30}, ${15})`)
      .call(d3.axisLeft(yScale));

    const line = d3
      .line<PreparedData>()
      .x((d) => xScale(new Date(d.data))! + 30)
      .y((d) => yScale(d.valor * d.quantidade) + 15);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(new Date(d.data))! + 30)
      .attr("cy", (d) => yScale(d.valor * d.quantidade) + 15)
      .attr("r", 5)
      .attr("fill", "white")
      .attr("stroke", "steelblue");
  };

  useEffect(() => {
    renderLineChart({
      width: (cardRef.current ? cardRef.current.offsetWidth : 0) - 60,
      height: cardRef.current ? cardRef.current.offsetHeight : 0,
    });
  }, [dimensions, data]);

  return (
    <Card sx={{ p: 2 }}>
      {isLoading ? (
        <div className="progress-container">
          <CircularProgress />
        </div>
      ) : (
        <div ref={cardRef} className="card-container">
          <svg
            ref={svgRef}
            width={(cardRef.current ? cardRef.current.offsetWidth : 0) + 60}
            height={
              (cardRef.current ? cardRef.current.offsetWidth / 2 : 0) + 60
            }
          ></svg>
        </div>
      )}
    </Card>
  );
}

export default OperationLineChart;

OperationLineChart.propTypes = {
  cnpj: PropTypes.string,
};
