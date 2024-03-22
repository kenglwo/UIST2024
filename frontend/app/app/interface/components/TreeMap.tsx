import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  hoveredFollowupQuestion: FollowupQuestion | undefined;
}

const treemapDataInitial: TreemapData = { name: "root", children: [] };

export default function TreeMap(props: Props) {
  const [questionData, setQuestionData] = useState(treemapDataInitial);
  const [counter, setCounter] = useState<number>(0);
  const [treemapData, setTreemapData] =
    useState<TreemapData>(treemapDataInitial);
  const svgRef = useRef();
  const [hoveredFollowupQuestion, setHoveredFollowupQuestion] =
    useState<FollowupQuestion>();
  const parentRef = useRef(null); // Reference to the parent box
  const [childHeight, setChildHeight] = useState<number>(0); // State to hold the child's height
  const [childWidth, setChildWidth] = useState<number>(0); // State to hold the child's height
  const [viewBoxRect, setViewBoxRect] = useState({
    width: 0,
    height: 0,
    minX: 0,
    minY: 0,
  });

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight; // Get the rendered height of the parent
      setChildHeight(`${parentHeight * 0.8}`); // Set the child's height to half of the parent's height
      const parentWidth = parentRef.current.offsetWidth;
      setChildWidth(`${parentWidth * 0.95}`);
      console.log("------------------");
      console.log(`parentWidth: ${parentWidth}, parentHeight: ${parentHeight}`);
    }
  }, []); // Empty dependency array means this runs once on mount

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

  // update conversation data
  useEffect(() => {
    console.log("====== conversation data in tree map ==========");
    console.log(props.conversationData);
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
    treemapDataNew["children"] = newChildrenUnique.sort(
      (a, b) => a.conversationId - b.conversationId,
    );
    console.log(treemapDataNew);
    setTreemapData(treemapDataNew);

    renderTreeMap();
    updateSVGSize();
  }, [props.conversationData]);

  const updateSVGSize = () => {
    const svgElement = document.querySelector("svg");
    const viewBoxRectNew = calculateSvgContentSize(svgElement);
    setViewBoxRect(viewBoxRectNew);

    console.log("======= viewBoxRectNew =========");
    console.log(viewBoxRectNew);
    // console.log(_minX, _minY, _width, _height);

    // const parentHeight = Math.round(parentRef.current.offsetHeight * 0.8); // Get the rendered height of the parent
    // // setChildHeight(`${parentHeight * 0.8}`); // Set the child's height to half of the parent's height
    // const parentWidth = Math.round(parentRef.current.offsetWidth * 0.8);
    // // setChildWidth(`${parentWidth * 0.95}`);
    //
    // // update the svg size
    // const svgElement = document.querySelector("svg");
    // const svgHeight = svgElement.clientHeight;
    // const svgWidth = svgElement.clientWidth;
    // console.log(`parentWidth: ${parentWidth}, parentHeight: ${parentHeight}`);
    // console.log(`svgWidth: ${svgWidth}, svgHeight: ${svgHeight}`);
    // const newChildWidth = svgWidth > parentWidth ? svgWidth : parentWidth;
    // const newChildHeight = svgHeight > parentHeight ? svgHeight : parentHeight;
    // setChildWidth(newChildWidth);
    // setChildHeight(newChildHeight);
  };

  function buildTree(questions) {
    let indexMap = {};

    // Initialize each question with a children array and map them by followupQuestionIndex
    questions.forEach((question) => {
      indexMap[question.followupQuestionIndex] = { ...question, children: [] };
    });

    // Populate the children arrays
    Object.values(indexMap).forEach((question) => {
      // Identify parent index, if present
      let parentIndex = question.followupQuestionIndex.substring(
        0,
        question.followupQuestionIndex.lastIndexOf("_"),
      );
      if (indexMap[parentIndex]) {
        indexMap[parentIndex].children.push(question);
      }
    });

    // Filter out only the top-level questions (those without a parent)
    return Object.values(indexMap).filter((question) => {
      return question.followupQuestionIndex.match(/_/g)
        ? question.followupQuestionIndex.match(/_/g).length === 1
        : true;
    });
  }

  function convertToTreemapData(followupQuestions) {
    // Helper function to recursively transform the data
    function transform(element) {
      // Map the current element to the new structure
      const treemapElement = {
        name: element.content,
        conversationId: element.conversationId,
        followupQuestionIndex: element.followupQuestionIndex,
        children: [],
      };

      // Recursively transform and add children if they exist
      if (element.children && element.children.length > 0) {
        treemapElement.children = element.children.map((child) =>
          transform(child),
        );
      } else {
        delete treemapElement.children; // Remove the children property if there are no children
      }

      return treemapElement;
    }

    // Transform each top-level element
    return followupQuestions.map((question) => transform(question));
  }

  // update followupQuestion data
  useEffect(() => {
    // console.log("=== props.followupQuestions ===");
    // console.log(props.followupQuestions);
    const newFollowupQuestionTreeRawData = buildTree(props.followupQuestions);
    console.log("====   newFollowupQuestionTreeRawData ====");
    console.log(newFollowupQuestionTreeRawData);

    const treemapDataForFollowupQuesitons = convertToTreemapData(
      newFollowupQuestionTreeRawData,
    );
    console.log("====   converted tree map data ====");
    console.log(treemapDataForFollowupQuesitons);

    // combine convationData and treemapDataForFollowupQuesitons
    const questionNodes = treemapData.children!;

    for (let index = 0; index < questionNodes.length; index++) {
      const questionNode = questionNodes[index];

      const followupQuestionsForThisQuestion =
        treemapDataForFollowupQuesitons.filter(
          (d) => d.conversationId === questionNode.conversationId,
        );

      questionNode.children = followupQuestionsForThisQuestion;
    }

    // streo data to a new var to activate setTreemapData
    const treemapDataNew = treemapData;
    setTreemapData(treemapDataNew);

    renderTreeMap();
    updateSVGSize();
  }, [props.followupQuestions]);

  useEffect(() => {
    setHoveredFollowupQuestion(props.hoveredFollowupQuestion);

    // emit click action on the quesiton node if not expanded
    const nodeId = `question_${props.hoveredFollowupQuestion?.conversationId}`;
    const classId = `conversationId_${props.hoveredFollowupQuestion?.conversationId}`;
    const targetNode = document.querySelector(`#${nodeId}`);
    if (targetNode) {
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      const nodes = document.querySelectorAll(`.${classId}`);
      const rectIdToHighlight = `rect#conversationId_${props.hoveredFollowupQuestion.conversationId}_followupQuestionIndex_${props.hoveredFollowupQuestion.followupQuestionIndex}`;
      // highlight the hovered follow-up question in treemap
      if (nodes.length > 1) {
        // already expanded
        const rectToHighlight = document.querySelector(rectIdToHighlight);
        rectToHighlight?.setAttribute("fill", "yellow");
        // reset rect fill of other follow-up questions
        nodes.forEach((d) => {
          const rect = d.querySelector("rect");
          if (rect !== rectToHighlight) {
            rect?.setAttribute("fill", "white");
          }
        });
      } else {
        // expand follow-up quesitons
        targetNode.dispatchEvent(clickEvent);
        const rectToHighlight = document.querySelector(rectIdToHighlight);
        rectToHighlight?.setAttribute("fill", "yellow");
        //TODO: close other follow-up quesitons if expanded
      }
    }
  }, [props.hoveredFollowupQuestion]);

  function calculateSvgContentSize(svgElement) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    const elements = svgElement.querySelectorAll("*");
    elements.forEach((el) => {
      // Use getBoundingClientRect() or other properties depending on element type
      const rect = el.getBoundingClientRect();
      const { left, top, width, height } = rect;

      // Convert to SVG coordinate space if necessary
      // This example assumes the SVG is full-viewport or adjustments are otherwise made
      minX = Math.min(minX, left);
      minY = Math.min(minY, top);
      maxX = Math.max(maxX, left + width);
      maxY = Math.max(maxY, top + height);
    });

    return {
      width: maxX - minX,
      height: maxY - minY,
      minX,
      minY,
    };
  }

  const renderTreeMap = () => {
    // Define main variables and the tree layout
    let root = d3.hierarchy(treemapData);
    const width = childWidth;
    const height = childHeight;
    const marginTop = 20;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 20;
    const dx = 40;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    root.x0 = height / 2;
    root.y0 = 0;

    // Define the SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const svgElement = document.querySelector("svg");
    const svgHeight = svgElement.clientHeight;
    const svgWidth = svgElement.clientWidth;
    console.log(`svgWidth: ${svgWidth}, svgHeight: ${svgHeight}`);
    console.log(`childWidth: ${childWidth}, childHeight: ${childHeight}`);
    const svgRect = svgElement.getBoundingClientRect();
    console.log(
      `svgRectWidth: ${svgRect.width}, svgRectHeight: ${svgRect.height}`,
    );

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr(
        "style",
        `width: ${width}; height: ${height}; font: 10px sans-serif; user-select: none; preserveAspectRatio: xMidYMid meet`,
      );

    // Add groups for links and nodes
    const gLink = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    const gNode = svg
      .append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    // Define the update function
    function update(source) {
      const offsetLeft = -90;
      const duration = 250; // Duration of the animations
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new height
      tree(root); // Compute the new tree layout
      let left = root;
      let right = root;
      root.eachBefore((node) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });
      const height = right.x - left.x + marginTop + marginBottom;

      // Update the nodes
      const node = gNode.selectAll("g").data(nodes, (d) => d.id);

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("id", (d, i) => {
          if (d.data.category === "question") {
            return `question_${d.data.conversationId}`;
          } else {
            return `conversationId_${d.data.conversationId}_followupQuestionIndex_${d.data.followupQuestionIndex}`;
          }
        })
        .attr("class", (d) => {
          return `conversationId_${d.data.conversationId}`;
        })
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .style("display", (d) => (d.data.name === "root" ? "none" : "block"))
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          // d._children = d.children ? null : d._children;
          update(d);
        })
        .on("mouseenter", (event, d) => {
          const id = `g#conversationId_${d.data.conversationId}_followupQuestionIndex_${d.data.followupQuestionIndex}`;
          d3.select(id).selectChild("rect").style("fill", "yellow");
          // TODO: reset highlight other follow-up questions
        })
        .on("mouseleave", (event, d) => {
          const id = `g#conversationId_${d.data.conversationId}_followupQuestionIndex_${d.data.followupQuestionIndex}`;
          d3.select(id).selectChild("rect").style("fill", "white");
        });
      nodeEnter
        .append("circle")
        .attr("r", 2.5)
        .attr("fill", (d) => (d._children ? "#555" : "#999"))
        .attr("stroke-width", 10)
        .style("display", (d) => (d.data.name === "root" ? "none" : "block"));

      const texts = nodeEnter
        .append("text")
        .attr("id", (d, i) => `text_${i}`)
        .attr("dy", "0.31em")
        .attr("x", (d) => (d._children ? -6 : 6))
        .attr("text-anchor", (d) => (d._children ? "end" : "start"))
        .text((d, i) =>
          d.category === "question" ? `Q${i + 1}: ${d.data.name}` : d.data.name,
        )
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("paint-order", "stroke")
        .attr("font-size", (d) =>
          d.data.category === "question" ? "24px" : "18px",
        );

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
          .attr("id", (d) => {
            // console.log(d);
            if (d.data.category !== "question") {
              // return `conversationId_${d.data.conversationId}_followupQuestionIndex_${d.data.followupQuestionIndex}`;
              return d.conversationId;
            } else {
              return d.followupQuestionIndex;
            }
          })
          .attr("class", (d) => {
            if (d.data.category !== "question") {
              return "";
            } else {
              return styles.followup_question_rect;
            }
          })
          .attr("fill", (d) => {
            return "white";
            //   if (d.data.category === "followup_material") {
            //     return "#DDA0A1";
            //   } else if (d.data.category === "followup_formal") {
            //     return "#A4CCE3";
            //   } else if (d.data.category === "followup_efficient") {
            //     return "#EFCAAC";
            //   } else if (d.data.category === "followup_final") {
            //     return "#A5CB93";
            //   }
            //   return "none";
          })
          .attr("stroke", "black")
          .style("padding", "5px");
      });

      // const svgElement = document.querySelector("svg");
      const viewBoxRect = calculateSvgContentSize(svgElement);
      console.log("================");
      console.log(viewBoxRect);
      // console.log(_minX, _minY, _width, _height);
      const svgRect = document.querySelector("svg").getBoundingClientRect();
      // Transition the svg and gLink
      const transition = svg
        .transition()
        .duration(duration)
        .attr("viewBox", [
          Math.round(viewBoxRect.minX),
          Math.round(viewBoxRect.minY),
          Math.round(viewBoxRect.width),
          Math.round(viewBoxRect.height),
        ])
        .tween(
          "resize",
          window.ResizeObserver ? null : () => () => svg.dispatch("toggle"),
        );

      // Transition nodes to their new position
      const nodeUpdate = node
        .merge(nodeEnter)
        .transition(transition)
        .attr("transform", (d) => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position
      const nodeExit = node
        .exit()
        .transition(transition)
        .remove()
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      // Update the links
      const link = gLink
        .selectAll("path")
        .data(links, (d) => d.target.id)
        .style("display", (d) =>
          d.source.data.name === "root" ? "none" : "block",
        );
      // Enter any new links
      const linkEnter = link
        .enter()
        .append("path")
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        })
        .style("display", (d) =>
          d.source.data.name === "root" ? "none" : "block",
        );
      // Transition links to their new position.
      link
        .merge(linkEnter)
        .transition(transition)
        .attr("d", diagonal)
        .style("display", (d) =>
          d.source.data.name === "root" ? "none" : "block",
        );

      // Transition exiting links to the parent's new position.
      link
        .exit()
        .transition(transition)
        .remove()
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .style("display", (d) =>
          d.source.data.name === "root" ? "none" : "block",
        );

      // Stash the old positions for transition.
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Initially display the tree with nodes collapsed, except for the root.
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth > 0) d.children = null; // Collapse all nodes except the root
    });

    update(root); // Call update to render the initial layout
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

  const svgElement = document.querySelector("svg");
  const onClickDown = () => {
    const viewBoxRectNew = viewBoxRect;
    viewBoxRectNew.minY -= 20;
    setViewBoxRect(viewBoxRectNew);
    svgElement.setAttribute("viewBox", [
      viewBoxRectNew.minX,
      viewBoxRectNew.minY,
      viewBoxRectNew.width,
      viewBoxRectNew.height,
    ]);
  };
  const onClickUp = () => {
    const viewBoxRectNew = viewBoxRect;
    viewBoxRectNew.minY += 20;
    setViewBoxRect(viewBoxRectNew);
    svgElement.setAttribute("viewBox", [
      viewBoxRectNew.minX,
      viewBoxRectNew.minY,
      viewBoxRectNew.width,
      viewBoxRectNew.height,
    ]);
  };
  const onClickLeft = () => {
    const viewBoxRectNew = viewBoxRect;
    viewBoxRectNew.minX += 20;
    setViewBoxRect(viewBoxRectNew);
    svgElement.setAttribute("viewBox", [
      viewBoxRectNew.minX,
      viewBoxRectNew.minY,
      viewBoxRectNew.width,
      viewBoxRectNew.height,
    ]);
  };

  const onClickRight = () => {
    const viewBoxRectNew = viewBoxRect;
    viewBoxRectNew.minX -= 20;
    setViewBoxRect(viewBoxRectNew);
    svgElement.setAttribute("viewBox", [
      viewBoxRectNew.minX,
      viewBoxRectNew.minY,
      viewBoxRectNew.width,
      viewBoxRectNew.height,
    ]);
  };

  return (
    <Box ref={parentRef} className={styles.interface_component2}>
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
        {/* {categories} */}
        <Button onClick={onClickDown}>Down</Button>
        <Button onClick={onClickUp}>Up</Button>
        <Button onClick={onClickLeft}>Left</Button>
        <Button onClick={onClickRight}>Right</Button>
      </Stack>
      <Divider sx={{ mt: 1, mb: 2, borderColor: "black", borderWidth: 1 }} />
      <Box
        sx={{
          height: `${childHeight}px`,
          width: `${childWidth}px`,
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <svg ref={svgRef}></svg>
      </Box>
    </Box>
  );
}
