"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
var react_1 = __importDefault(require("react"));
var util_1 = require("../utils/util");
function Logs() {
    var _a = react_1.default.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.default.useState([]), logs = _b[0], setLogs = _b[1];
    react_1.default.useEffect(function () {
        var logs = (wx.getStorageSync('logs') || []).map(function (log) {
            return {
                date: util_1.formatTime(new Date(log)),
                timeStamp: log,
            };
        });
        setLogs(logs.slice(0, 20));
        setLoading(false);
    }, []);
    if (loading) {
        return react_1.default.createElement("div", null, "\u52A0\u8F7D\u4E2D...");
    }
    return (react_1.default.createElement("div", { className: "container log-list" }, logs.length ? (logs.map(function (log, index) {
        return (react_1.default.createElement("div", { className: "log-item" },
            index + 1,
            ". ",
            log.date));
    })) : (react_1.default.createElement("div", { className: "log-item" }, "\u6682\u65E0\u65E5\u5FD7"))));
}
exports.Logs = Logs;
