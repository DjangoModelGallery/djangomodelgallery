import { Graph } from "@viz-js/viz";

export const mockGraph: Graph = {
  name: "mockGraph",
  strict: false,
  directed: true,
  graphAttributes: {
    rankdir: "LR", // Left to right directed graph
  },
  nodes: [
    { name: "A", attributes: { label: "Node A" } },
    { name: "B", attributes: { label: "Node B" } },
    { name: "C", attributes: { label: "Node C" } },
    { name: "D", attributes: { label: "Node D" } },
    { name: "E", attributes: { label: "Node E" } },
  ],
  edges: [
    { tail: "A", head: "B" },
    { tail: "B", head: "C" },
    { tail: "C", head: "D" },
    { tail: "D", head: "E" },
    { tail: "E", head: "A" },
  ],
  subgraphs: [
    {
      name: "subgraph1",
      nodes: [
        { name: "F", attributes: { label: "Node F" } },
        { name: "G", attributes: { label: "Node G" } },
      ],
      edges: [{ tail: "F", head: "G" }],
    },
  ],
};
