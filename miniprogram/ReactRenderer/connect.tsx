
import React from 'react'

import { render, Node, getNode } from './render'

export function connect(inst: any) {

  const updater = (root: Node) => {
    if (!root) {
      return
    }
    inst.setData({
      $root: {
        template: root.template,
        uid: root.uid,
        children: root.children,
        parentId: root.parentId,
        nodeName: root.nodeName
      }
    })
  }

  inst.$bindtap = (e) => {
    const uid = e.currentTarget.id

    const node = getNode(uid)

    if (node) {
      node.props.onClick?.(e)
    }

  }

  return (Component: React.ComponentType, props: any = {}) => {
    return render(<Component {...props} />, updater)
  }
}