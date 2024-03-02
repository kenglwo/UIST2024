import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";
import { UserInfo } from "../types";

import styles from "../styles.module.css";
interface Props {
  userInfo: UserInfo | null;
}

export default function TreeMap(props: Props) {
  const [questionData, setQuestionData] = useState();
  const svgRef = useRef();

  useEffect(() => {
    // TODO: get question data by userInfo.userId

    // TODO: render treemap
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear existing graph area
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const data = [
      { name: "A", value: 10 },
      { name: "B", value: 20 },
    ];
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      // @ts-ignore
      .domain([0, d3.max(data, (d) => d.value)]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top + height})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      // @ts-ignore
      .attr("x", (d) => xScale(d.name))
      // @ts-ignore
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      // @ts-ignore
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", "steelblue");
  }, [props.userInfo]);

  return <svg ref={svgRef} width="460" height="250" />;
}
