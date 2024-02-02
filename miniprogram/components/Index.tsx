import React from "react";

export function Index() {
  const [count, update] = React.useState(1);

  return (
    <div>
      <div>
        <button onClick={() => update(count + 1)}>+</button>
        <div className="center">{count}</div>
        <button onClick={() => update(count - 1)}>-</button>
        <button
          className="mt10"
          onClick={() => {
            wx.navigateTo({
              url: "../logs/logs",
            });
          }}
        >
          查看启动日志
        </button>
      </div>
      <div>
        <div>测试1</div>
        <div>测试2</div>
        <div>测试3</div>
      </div>
    </div>
  );
}
