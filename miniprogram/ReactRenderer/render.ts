import ReactReconciler from "react-reconciler";
import { noop, filter } from "../utils/util";

const NAME_MAPS = {
  "#text": "text",
  div: "view",
};

export function getNameTag(name: string) {
  return NAME_MAPS[name] || name;
}

let uid = 1;
export const NodeCollect = Object.create(null);

export function getNode(uid) {
  return NodeCollect[uid];
}

export interface Node {
  uid: number;
  template: string;
  nodeName: string;
  children: Node[];
  parentId: null | string | number;
  text?: string;
  props: Record<string | number, any>;
  [x: string]: any;
}

export function render(reactElement, callback?) {
  const root = createNode("root");

  const updater = () => {
    callback?.(root);
  };

  function createNode(name: string): Node {
    return {
      uid: uid++,
      template: "root",
      nodeName: name,
      children: [],
      parentId: null,
      props: {},
    };
  }
  function updateNodeTemplate(node: Node) {
    const nodeName = node.nodeName;
    let depth = 0;
    let parentId: string | null | number;
    const originNode = node;

    while ((parentId = node.parentId)) {
      const parentNode = NodeCollect[parentId];
      node = parentNode;
      if (getNameTag(parentNode.nodeName) === getNameTag(nodeName)) {
        depth++;
      }
    }

    originNode.template = `tpl_${getNameTag(nodeName)}_${depth}`;
    originNode.originTemplate = `tpl_${getNameTag(nodeName)}_${depth}`;
  }

  NodeCollect[root.uid] = root;

  const rootHostContext = {};
  const childHostContext = {};

  const hostConfig = {
    getRootHostContext() {
      return rootHostContext;
    },
    getChildHostContext: () => {
      return childHostContext;
    },
    shouldSetTextContent() {},
    clearContainer(node) {
      if (node.children.length > 0) {
        node.text = "";
      }
    },
    createInstance(type, props) {
      const node = createNode(type);

      node.props = props;

      NodeCollect[node.uid] = node;

      return node;
    },
    createTextInstance(text) {
      const node = createNode("#text");
      node.text = text;

      NodeCollect[node.uid] = node;

      return node;
    },
    appendInitialChild(parent: Node, child: Node) {
      child.parentId = parent.uid;
      updateNodeTemplate(child);

      parent.children.push(child);

      updater();
    },
    appendChild(parent, child) {
      child.parentId = parent.uid;
      updateNodeTemplate(child);

      parent.children.push(child);

      updater();
    },
    appendChildToContainer(parent, child) {
      child.parentId = parent.uid;
      updateNodeTemplate(child);

      parent.children.push(child);

      updater();
    },
    finalizeInitialChildren(node, _, props) {
      Object.assign(node.props, props);
      return false;
    },
    removeChildFromContainer(parent, child) {
      parent.children = filter(parent.children, (node) => {
        return node.uid !== child.uid;
      });

      updater();
    },
    insertBefore(parent, child) {
      child.parentId = parent.uid;
      updateNodeTemplate(child);

      parent.children.unshift(child);

      updater();
    },
    removeChild(parent, child) {
      parent.children = filter(parent.children, (node) => {
        return node.uid !== child.uid;
      });

      updater();
    },
    prepareUpdate() {
      return true;
    },
    commitUpdate(node: Node, _updatePayload, _type, _oldProps, newProps) {
      node.props = newProps;

      updater();
    },
    commitTextUpdate(node: Node, _oldText, newText) {
      node.text = newText;

      updater();
    },
    resetAfterCommit: noop,
    commitMount: noop,
    prepareForCommit() {
      return null;
    },
    supportsMutation: true,
  };
  const ReactReconcilerInst = ReactReconciler(hostConfig as any) as any;

  // Create a root Container if it doesnt exist
  if (!root._rootContainer) {
    root._rootContainer = ReactReconcilerInst.createContainer(root, false);
  }

  // update the root Container
  return ReactReconcilerInst.updateContainer(
    reactElement,
    root._rootContainer,
    null,
    updater
  );
}
