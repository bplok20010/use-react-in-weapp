"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var react_1 = __importDefault(require("react"));
var render_1 = require("./render");
var MAX_EXPAND_NUM = 5;
function connect(inst) {
    var updater = function (root) {
        if (!root) {
            return;
        }
        // 简单处理
        var iter = function (node) {
            var len = node.children.length;
            var wxTagName = (0, render_1.getNameTag)(node.nodeName);
            if (wxTagName === "view" && len < MAX_EXPAND_NUM) {
                node.template = node.originTemplate + "_c" + len;
            }
            else {
                node.template = node.originTemplate;
            }
            for (var i = 0; i < len; i++) {
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
    inst.$bindtap = function (e) {
        var _a, _b;
        var uid = e.currentTarget.id;
        var node = (0, render_1.getNode)(uid);
        if (node) {
            (_b = (_a = node.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        }
    };
    return function (Component, props) {
        if (props === void 0) { props = {}; }
        return (0, render_1.render)(react_1.default.createElement(Component, __assign({}, props)), updater);
    };
}
exports.connect = connect;
