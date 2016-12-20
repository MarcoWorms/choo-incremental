var html = require('choo/html')
var choo = require('choo')
var app = choo()

app.model({
  state: {
    gold: 0
  },
  reducers: {
    increment: function (state) {
      return {
        gold: state.gold + 1
      }
    }
  }
})

function mainView (state, prev, send) {
  return html`
    <main>
      <h3>Gold: ${state.gold}</h3>
      <button onclick=${increment}>+</button>
    </main>
  `

  function increment () {
    send('increment')
  }
}

app.router(['/', mainView])

var tree = app.start()
document.body.appendChild(tree)
