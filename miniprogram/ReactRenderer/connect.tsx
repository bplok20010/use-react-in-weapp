import React from "react";

import { render, Node, getNode, getNameTag } from "./render";
const MAX_EXPAND_NUM = 5;

export function connect(inst: any) {
  const updater = (root: Node) => {
    if (!root) {
      return;
    }

    // 简单处理
    const iter = (node) => {
      const len = node.children.length;
      const wxTagName = getNameTag(node.nodeName);

      if (wxTagName === "view" && len < MAX_EXPAND_NUM) {
        node.template = node.originTemplate + "_c" + len;
      } else {
        node.template = node.originTemplate;
      }

      for (let i = 0; i < len; i++) {
        iter(node.children[i]);
      }
    };

    iter(root);

    inst.setData({
      $root: {
        template: root.template,
        uid: root.uid,
        children: root.children,
        parentId: root.parentId,
        nodeName: root.nodeName,
      },
    });
  };

  inst.$bindtap = (e) => {
    const uid = e.currentTarget.id;

    const node = getNode(uid);

    if (node) {
      node.props.onClick?.(e);
    }
  };

  return (Component: React.ComponentType, props: any = {}) => {
    return render(<Component {...props} />, updater);
  };
}
