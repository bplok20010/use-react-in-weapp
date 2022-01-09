import React from 'react'
import { formatTime } from '../utils/util'

export function Logs() {
  const [loading, setLoading] = React.useState(true)
  const [logs, setLogs] = React.useState<any>([])

  React.useEffect(() => {
    const logs = (wx.getStorageSync('logs') || []).map((log: string) => {
      return {
        date: formatTime(new Date(log)),
        timeStamp: log,
      }
    })

    setLogs(logs.slice(0, 20))

    setLoading(false)
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div className="container log-list">
      {logs.length ? (
        logs.map((log, index) => {
          return (
            <div className="log-item">
              {index + 1}. {log.date}
            </div>
          )
        })
      ) : (
        <div className="log-item">暂无日志</div>
      )}
    </div>
  )
}
