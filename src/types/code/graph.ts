interface Attributes {
  [key: string]: string | number | boolean;
}

interface Node {
  id: string;
  label?: string;
  attributes?: Attributes;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
  attributes?: Attributes;
}

interface Subgraph {
  id?: string;
  label?: string;
  attributes?: Attributes;
  nodes?: Node[];
  edges?: Edge[];
}

interface Graph {
  name?: string;
  strict?: boolean;
  directed?: boolean;
  graphAttributes?: Attributes;
  nodeAttributes?: Attributes;
  edgeAttributes?: Attributes;
  nodes?: Node[];
  edges?: Edge[];
  subgraphs?: Subgraph[];
}

export type { Attributes, Edge, Graph, Node, Subgraph };
