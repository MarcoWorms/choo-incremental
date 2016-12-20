var html = require('choo/html')
var choo = require('choo')
var app = choo()

app.model({
  state: {
    eggs: 0,
    money: 0,
  },
  reducers: {
    addEgg: function (state) {
      return {
        eggs: state.eggs + 1,
      }
    },
    addMoney: function (state) {
      return {
        money: state.money + state.eggs/20,
      }
    }
  },
  subscriptions: {
    makeMoney: (send, done) => {
      setInterval(() => {
        send('addMoney', (err) => err && done(err))
      }, 100)
    },
  }
})

function mainView (state, prev, send) {
  return html`
    <main>
      <h3>Eggs: ${state.eggs}</h3>
      <h3>Money: ${Math.floor(state.money)} (+${state.eggs/2}/s)</h3>
      <button onclick=${addEgg}>+</button>
    </main>
  `

  function addEgg () {
    send('addEgg')
  }
}

app.router(['/', mainView])

var tree = app.start()
document.body.appendChild(tree)
