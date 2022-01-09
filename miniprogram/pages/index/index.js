"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
var Index_1 = require("../../components/Index");
var connect_1 = require("../../ReactRenderer/connect");
Page({
    data: {
        $root: null,
    },
    onLoad: function () {
        var render = connect_1.connect(this);
        render(Index_1.Index);
    },
});
