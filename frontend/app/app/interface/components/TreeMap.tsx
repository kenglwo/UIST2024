import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { UserInfo } from "../../types";

import styles from "../styles.module.css";
interface Props {
  userInfo: UserInfo | null;
}
const data = {
  name: "root",
  children: [
    {
      name: "What is NFT?",
      category: "question",
      children: [
        { name: "Who are the stakeholders of NFT?", category: "material" },
        { name: "When is the best to buy NFT?", category: "formal" },
        { name: "Where is a good place to buy NFT?", category: "efficient" },
        { name: "How to sell NFT?", category: "final" },
      ],
    },
    {
      name: "What is blockchain?",
      category: "question",
      children: [
        { name: "Who uses the technology?", category: "material" },
        { name: "How to learn the technology?", category: "efficient" },
      ],
    },
  ],
};

export default function TreeMap(props: Props) {
  const [questionData, setQuestionData] = useState(data);
  const [counter, setCounter] = useState<number>(0);
  const svgRef = useRef();

  const renderTreeMap = () => {
    const root = d3.hierarchy(questionData);
    const width = 1128;
    const height = 300;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;
    const marginLeft = 40;
    const offsetLeft = 0;
    const dx = 40;
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
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
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

    gLink
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", diagonal)
      // @ts-ignore
      .style("display", (d) =>
        d.source.data.name === "root" ? "none" : "block",
      )
      .attr("transform", `translate(${offsetLeft}, 0)`);

    const gNode = svg
      .append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    const nodes = root.descendants();
    const node = gNode
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("display", (d) => (d.data.name === "root" ? "none" : "block"))
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node
      .append("circle")
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 2.5);

    // First, add text elements
    const texts = node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -6 : 6))
      .attr("id", (d, i) => `text_${i}`)
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d, i) => `Q${i}: ${d.data.name}`)
      .attr("font-size", (d) =>
        d.data.category === "question" ? "24px" : "18px",
      )
      .attr("stroke", "black")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 1)
      .attr("stroke", "black");

    // Then, for each text, add a rect behind it based on its dimensions
    texts.each(function (d, i) {
      const bbox = this.getBBox();
      const padding = 10; // Adjust padding as needed

      // Insert rect behind the text by selecting the parent and inserting before this text element
      d3.select(this.parentNode)
        .insert("rect", `#text_${i}`)
        .attr("x", bbox.x - padding / 2)
        .attr("y", bbox.y - padding / 2)
        .attr("width", bbox.width + padding)
        .attr("height", bbox.height + padding)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", (d) => {
          if (d.data.category === "material") {
            return "#DDA0A1";
          } else if (d.data.category === "formal") {
            return "#A4CCE3";
          } else if (d.data.category === "efficient") {
            return "#EFCAAC";
          } else if (d.data.category === "final") {
            return "#A5CB93";
          }
          return "none";
        })
        .attr("stroke", "black")
        .style("padding", "5px");
    });

    gNode.attr("transform", `translate(${offsetLeft}, 0)`);
  };

  useEffect(() => {
    renderTreeMap();
  }, [questionData]); // データが変わったら再描画

  const categories = ["Material", "Formal", "Efficient", "Final"].map(
    (category, i) => {
      let backgroundColor: string = "";

      if (category === "Material") {
        backgroundColor = "#DDA0A1";
      } else if (category === "Formal") {
        backgroundColor = "#A4CCE3";
      } else if (category === "Efficient") {
        backgroundColor = "#EFCAAC";
      } else if (category === "Final") {
        backgroundColor = "#A5CB93";
      }
      return (
        <Stack direction="row" spacing={1} sx={{ mr: 3 }} key={i}>
          <Box
            className={styles.tree_map_category}
            sx={{ backgroundColor: backgroundColor }}
          />
          <Typography variant="button">{category}</Typography>
        </Stack>
      );
    },
  );

  return (
    <Box className={styles.interface_component}>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Embedded Content Sharp"
          src="/images/tree_map.png"
          variant="square"
          sx={{ mt: 0, mb: 1, mr: 2 }}
        />
        <Typography variant="h5" sx={{ mr: 3 }}>
          Tree Map
        </Typography>
        {categories}
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <Box sx={{ overflowX: "auto" }}>
        <svg ref={svgRef}></svg>
      </Box>
    </Box>
  );
}
