"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logs_1 = require("../../components/Logs");
var connect_1 = require("../../ReactRenderer/connect");
Page({
    data: {
        $root: null
    },
    onLoad: function () {
        var render = (0, connect_1.connect)(this);
        render(Logs_1.Logs);
    },
});
