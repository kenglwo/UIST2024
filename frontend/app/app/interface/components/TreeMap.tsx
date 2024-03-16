import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  UserInfo,
  ConversationData,
  FollowupQuestion,
  TreemapData,
} from "../../types";

import styles from "../styles.module.css";
interface Props {
  userInfo: UserInfo | null;
  conversationData: ConversationData[];
  followupQuestions: FollowupQuestion[];
}

const treemapDataInitial: TreemapData = { name: "root", children: [] };

export default function TreeMap(props: Props) {
  const [questionData, setQuestionData] = useState(treemapDataInitial);
  const [counter, setCounter] = useState<number>(0);
  const [treemapData, setTreemapData] =
    useState<TreemapData>(treemapDataInitial);
  const svgRef = useRef();

  function removeDuplicatesByName(array) {
    const unique = array.reduce(
      (acc, current) => {
        if (!acc.namesFound.includes(current.name)) {
          acc.namesFound.push(current.name);
          acc.newArray.push(current);
        }
        return acc;
      },
      { namesFound: [], newArray: [] },
    ).newArray;

    return unique;
  }

  useEffect(() => {
    const d: TreemapData[] = props.conversationData
      .filter((d) => d.role === "user")
      .map((d) => {
        const question =
          d.content.split(" ").length > 5
            ? d.content.split(" ").slice(0, 5).join(" ")
            : d.content;

        const newTreemapData: TreemapData = {
          name: question,
          category: "question",
          children: [],
          conversationId: d.conversationId,
        };

        return newTreemapData;
      });

    const treemapDataNew: TreemapData = treemapData;

    const newChildren: TreemapData[] = [...treemapData.children!, ...d];
    const newChildrenUnique = removeDuplicatesByName(newChildren);
    treemapDataNew["children"] = newChildrenUnique;
    setTreemapData(treemapDataNew);

    renderTreeMap();
  }, [props.conversationData]);

  useEffect(() => {
    const questionNodes = treemapData.children!
    const questionNodesUpdated = questionNodes.map(question => {
      const followupQuestionsForThisQuestion: TreemapData[] = props.followupQuestions
        .filter(d => d.conversationId === question.conversationId!)
        .map((d, i) => {
          let category = ''
          switch (i) {
            case 0:
              category = 'followup_material'
              break;
            case 1:
              category = 'followup_formal'
              break;
            case 2:
              category = 'followup_efficient'
              break;
            case 3:
              category = 'followup_final'
              break;
            default:
              break;
          }

          return {
            name: d.content,
            category: category, 
          }
        })

      question.children = followupQuestionsForThisQuestion
      return question
    });

    let treemapDataNew = treemapData
    treemapDataNew.children = questionNodesUpdated
    setTreemapData(treemapDataNew)

    renderTreeMap();
  }, [props.followupQuestions]);

  const renderTreeMap = () => {
    const root = d3.hierarchy(treemapData);
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
      // .style("display", (d) => (d.data.name === "root" ? "none" : "block"))
      .style("display", (d) => d.data.name === "root" ? "none" : "block")
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
          if (d.data.category === "followup_material") {
            return "#DDA0A1";
          } else if (d.data.category === "followup_formal") {
            return "#A4CCE3";
          } else if (d.data.category === "followup_efficient") {
            return "#EFCAAC";
          } else if (d.data.category === "followup_final") {
            return "#A5CB93";
          }
          return "none";
        })
        .attr("stroke", "black")
        .style("padding", "5px");
    });

    gNode.attr("transform", `translate(${offsetLeft}, 0)`);
  };

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
