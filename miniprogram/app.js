"use strict";
// app.ts
App({
    globalData: {},
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        // 登录
        wx.login({
            success: function (res) {
                console.log(res.code);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        });
    },
});
