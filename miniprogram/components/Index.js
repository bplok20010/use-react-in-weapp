"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
var react_1 = __importDefault(require("react"));
function Index() {
    var _a = react_1.default.useState(1), count = _a[0], update = _a[1];
    return react_1.default.createElement("div", null,
        react_1.default.createElement("button", { onClick: function () { return update(count + 1); } }, "+"),
        react_1.default.createElement("div", { className: "center" }, count),
        react_1.default.createElement("button", { onClick: function () { return update(count - 1); } }, "-"),
        react_1.default.createElement("button", { className: "mt10", onClick: function () {
                wx.navigateTo({
                    url: '../logs/logs',
                });
            } }, "\u67E5\u770B\u542F\u52A8\u65E5\u5FD7"));
}
exports.Index = Index;
