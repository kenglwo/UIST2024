import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { UserInfo } from "../../types";
import { data } from "./concept_graph_data.ts";

import styles from "../styles.module.css";

interface Props {
  userInfo: UserInfo | null;
}

export default function ConceptNetwork(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const svgRef = useRef();
  // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  // const width = 800 - margin.left - margin.right;
  // const height = 300 - margin.top - margin.bottom;

  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);

  //   svg.selectAll("*").remove();

  //   const content = svg
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //   const link = content
  //     .selectAll("line")
  //     .data(data.links)
  //     .enter()
  //     .append("line")
  //     .style("stroke", "#aaa");

  //   // Initialize the nodes
  //   const node = content
  //     .selectAll("circle")
  //     .data(data.nodes)
  //     .enter()
  //     .append("circle")
  //     .attr("r", 15)
  //     .attr("stroke-width", 1)
  //     .attr("stroke", "black")
  //     .style("fill", "white");

  //   const text = content
  //     .selectAll("text")
  //     .data(data.nodes)
  //     .enter()
  //     .append("text")
  //     .text((d) => d.name)
  //     .attr("font-size", "20px")
  //     .attr("stroke-width", 1)
  //     .attr("stroke", "black");

  //   // Let's list the force we wanna apply on the network
  //   const simulation = d3
  //     .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
  //     .force(
  //       "link",
  //       d3
  //         .forceLink() // This force provides links between nodes
  //         // @ts-ignore
  //         .id(function (d) {
  //           // @ts-ignore
  //           return d.id;
  //         }) // This provide  the id of a node
  //         .links(data.links), // and this the list of links
  //     )
  //     .force("charge", d3.forceManyBody().strength(-150)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
  //     .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
  //     .on("end", ticked);

  //   // This function is run at each iteration of the force algorithm, updating the nodes position.
  //   function ticked() {
  //     link
  //       // @ts-ignore
  //       .attr("x1", function (d) {
  //         // @ts-ignore
  //         return d.source.x;
  //       })
  //       // @ts-ignore
  //       .attr("y1", function (d) {
  //         // @ts-ignore
  //         return d.source.y;
  //       })
  //       // @ts-ignore
  //       .attr("x2", function (d) {
  //         // @ts-ignore
  //         return d.target.x;
  //       })
  //       // @ts-ignore
  //       .attr("y2", function (d) {
  //         // @ts-ignore
  //         return d.target.y;
  //       });

  //     node
  //       // @ts-ignore
  //       .attr("cx", function (d) {
  //         // @ts-ignore
  //         return d.x + 6;
  //       })
  //       // @ts-ignore
  //       .attr("cy", function (d) {
  //         // @ts-ignore
  //         return d.y - 6;
  //       });

  //     text
  //       // @ts-ignore
  //       .attr("x", function (d) {
  //         // @ts-ignore
  //         return d.x;
  //       })
  //       // @ts-ignore
  //       .attr("y", function (d) {
  //         // @ts-ignore
  //         return d.y;
  //       });
  //   }

  //   content.attr("transform", "translate(0, 100)");

  //   svg
  //     .append("g")
  //     .selectAll("text")
  //     .data(data.nodes)
  //     .enter()
  //     .append("text")
  //     .text((d) => `${d.name}: ${d.description}`)
  //     .attr("font-size", "12px")
  //     .attr("stroke-width", 1)
  //     .attr("stroke", "black")
  //     .attr("x", width - 100)
  //     .attr("y", (d, i) => 50 + i * 20);
  // }, [data]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
      {/* <svg ref={svgRef}></svg> */}
      <Box
        component="img"
        sx={{
          height: "100%", // You can specify the size
          width: "100%",
        }}
        alt="Concept map of NFT"
        src="/images/concept_map.png"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "70%", // You can specify the size
            width: "70%",
            backgroundColor: "white",
            margin: "10px",
            padding: "10px",
          }}
          alt="Concept map of NFT"
          src="/images/concept_map.png"
          onClick={handleOpen}
        />
      </Modal>
    </Box>
  );
}
