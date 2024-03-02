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
    const data = {
      name: "flare",
      children: [
        {
          name: "question 1",
          children: [
            { name: "question1_1" },
            { name: "question1_2" },
            { name: "question1_3" },
            { name: "question1_4" },
          ],
        },
        {
          name: "question 2",
          children: [{ name: "question2_1" }, { name: "question2_2" }],
        },
      ],
    };
    const root = d3.hierarchy(data);
    const width = 928;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 40;
    const dx = 10;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkHorizontal()
      // @ts-ignore
      .x((d) => d.y)
      // @ts-ignore
      .y((d) => d.x);

    // ツリーレイアウトの更新
    tree(root);

    // SVGの設定
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove()

    svg
      .attr("width", width)
      .attr("height", "100px")
      .attr("viewBox", [-marginLeft, -marginTop, width, dx])
      .attr(
        "style",
        "max-width: 100%; height: ; font: 10px sans-serif; user-select: none;",
      );

    // リンクの描画
    const gLink = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);
    const links = root.links();
    gLink.selectAll("path").data(links).join("path").attr("d", diagonal);

    // ノードの描画
    const gNode = svg
      .append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");
    const nodes = root.descendants();
    const node = gNode
      .selectAll("g")
      .data(nodes)
      .join("g")
      // @ts-ignore
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      // @ts-ignore
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 2.5);

    node
      .append("text")
      .attr("dy", "0.31em")
      // @ts-ignore
      .attr("x", (d) => (d.children ? -6 : 6))
      // @ts-ignore
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      // @ts-ignore
      .text((d) => d.data.name)
      .clone(true)
      .lower()
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .attr("stroke", "white");

    // 初期状態の設定
    // @ts-ignore
    root.eachBefore((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }, [props.userInfo]); // データが変わったら再描画

  return (
    <Box className={styles.tree_map}>
      <svg ref={svgRef}></svg>
    </Box>
  );
}
