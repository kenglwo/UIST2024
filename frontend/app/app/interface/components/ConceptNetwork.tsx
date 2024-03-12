import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { UserInfo } from "../../types";

import styles from "../styles.module.css";

interface Props {
  userInfo: UserInfo | null;
}

export default function ConceptNetwork(props: Props) {
  const svgRef = useRef();
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const data = {
    nodes: [
      {
        id: 1,
        name: "A",
      },
      {
        id: 2,
        name: "B",
      },
      {
        id: 3,
        name: "C",
      },
      {
        id: 4,
        name: "D",
      },
      {
        id: 5,
        name: "E",
      },
      {
        id: 6,
        name: "F",
      },
      {
        id: 7,
        name: "G",
      },
      {
        id: 8,
        name: "H",
      },
      {
        id: 9,
        name: "I",
      },
      {
        id: 10,
        name: "J",
      },
    ],
    links: [
      {
        source: 1,
        target: 2,
      },
      {
        source: 1,
        target: 5,
      },
      {
        source: 1,
        target: 6,
      },

      {
        source: 2,
        target: 3,
      },
      {
        source: 2,
        target: 7,
      },

      {
        source: 3,
        target: 4,
      },
      {
        source: 8,
        target: 3,
      },
      {
        source: 4,
        target: 5,
      },

      {
        source: 4,
        target: 9,
      },
      {
        source: 5,
        target: 10,
      },
    ],
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const link = svg
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "#aaa");

    // Initialize the nodes
    const node = svg
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .style("fill", "#69b3a2");

    // Let's list the force we wanna apply on the network
    const simulation = d3
      .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
      .force(
        "link",
        d3
          .forceLink() // This force provides links between nodes
          // @ts-ignore
          .id(function (d) {
            return d.id;
          }) // This provide  the id of a node
          .links(data.links), // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
      .on("end", ticked);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
      link
        // @ts-ignore
        .attr("x1", function (d) {
          return d.source.x;
        })
        // @ts-ignore
        .attr("y1", function (d) {
          return d.source.y;
        })
        // @ts-ignore
        .attr("x2", function (d) {
          return d.target.x;
        })
        // @ts-ignore
        .attr("y2", function (d) {
          return d.target.y;
        });

      node
        // @ts-ignore
        .attr("cx", function (d) {
          return d.x + 6;
        })
        // @ts-ignore
        .attr("cy", function (d) {
          return d.y - 6;
        });
    }
  }, [data]);

  return (
    <Box className={styles.interface_component}>
      <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Concept Graph"
          src="/images/concept_graph.png"
          variant="square"
          sx={{ mt: 0, mb: 1, mr: 2 }}
        />
        <Typography variant="h5" sx={{ mr: 3 }}>
          Concept Graph
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <svg ref={svgRef}></svg>
    </Box>
  );
}
