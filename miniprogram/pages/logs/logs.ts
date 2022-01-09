
import { Logs } from '../../components/Logs'
import { connect } from '../../ReactRenderer/connect'

Page({
  data: {
    $root: null
  },
  onLoad() {
    const render = connect(this)
    render(Logs)
  },
})
