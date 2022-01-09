"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.getNode = exports.NodeCollect = void 0;
var react_reconciler_1 = __importDefault(require("react-reconciler"));
var util_1 = require("../utils/util");
var NAME_MAPS = {
    "#text": "text",
    div: "view",
};
function getNameTag(name) {
    return NAME_MAPS[name] || name;
}
var uid = 1;
exports.NodeCollect = Object.create(null);
function getNode(uid) {
    return exports.NodeCollect[uid];
}
exports.getNode = getNode;
function render(reactElement, callback) {
    var root = createNode("root");
    var updater = function () {
        callback === null || callback === void 0 ? void 0 : callback(root);
    };
    function createNode(name) {
        return {
            uid: uid++,
            template: "root",
            nodeName: name,
            children: [],
            parentId: null,
            props: {},
        };
    }
    function updateNodeTemplate(node) {
        var nodeName = node.nodeName;
        var depth = 0;
        var parentId;
        var originNode = node;
        while ((parentId = node.parentId)) {
            var parentNode = exports.NodeCollect[parentId];
            node = parentNode;
            if (getNameTag(parentNode.nodeName) === getNameTag(nodeName)) {
                depth++;
            }
        }
        originNode.template = "tpl_" + getNameTag(nodeName) + "_" + depth;
    }
    exports.NodeCollect[root.uid] = root;
    var rootHostContext = {};
    var childHostContext = {};
    var hostConfig = {
        getRootHostContext: function () {
            return rootHostContext;
        },
        getChildHostContext: function () {
            return childHostContext;
        },
        shouldSetTextContent: function () { },
        clearContainer: function (node) {
            if (node.children.length > 0) {
                node.text = "";
            }
        },
        createInstance: function (type, props) {
            var node = createNode(type);
            node.props = props;
            exports.NodeCollect[node.uid] = node;
            return node;
        },
        createTextInstance: function (text) {
            var node = createNode("#text");
            node.text = text;
            exports.NodeCollect[node.uid] = node;
            return node;
        },
        appendInitialChild: function (parent, child) {
            child.parentId = parent.uid;
            updateNodeTemplate(child);
            parent.children.push(child);
            updater();
        },
        appendChild: function (parent, child) {
            child.parentId = parent.uid;
            updateNodeTemplate(child);
            parent.children.push(child);
            updater();
        },
        appendChildToContainer: function (parent, child) {
            child.parentId = parent.uid;
            updateNodeTemplate(child);
            parent.children.push(child);
            updater();
        },
        finalizeInitialChildren: function (node, _, props) {
            Object.assign(node.props, props);
            return false;
        },
        removeChildFromContainer: function (parent, child) {
            parent.children = util_1.filter(parent.children, function (node) {
                return node.uid !== child.uid;
            });
            updater();
        },
        insertBefore: function (parent, child) {
            child.parentId = parent.uid;
            updateNodeTemplate(child);
            parent.children.unshift(child);
            updater();
        },
        removeChild: function (parent, child) {
            parent.children = util_1.filter(parent.children, function (node) {
                return node.uid !== child.uid;
            });
            updater();
        },
        prepareUpdate: function () {
            return true;
        },
        commitUpdate: function (node, _updatePayload, _type, _oldProps, newProps) {
            node.props = newProps;
            updater();
        },
        commitTextUpdate: function (node, _oldText, newText) {
            node.text = newText;
            updater();
        },
        resetAfterCommit: util_1.noop,
        commitMount: util_1.noop,
        prepareForCommit: function () {
            return null;
        },
        supportsMutation: true,
    };
    var ReactReconcilerInst = react_reconciler_1.default(hostConfig);
    // Create a root Container if it doesnt exist
    if (!root._rootContainer) {
        root._rootContainer = ReactReconcilerInst.createContainer(root, false);
    }
    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, root._rootContainer, null, updater);
}
exports.render = render;
