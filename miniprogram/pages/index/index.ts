// index.ts
import { Index } from '../../components/Index'
import { connect } from '../../ReactRenderer/connect'

Page({
  data: {
    $root: null,
  },

  onLoad() {
    const render = connect(this) as any
    render(Index)
  },

})
