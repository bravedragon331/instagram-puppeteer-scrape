const app = require('./app')

let accounts = [
  'djkhaled', 'benballer', 'frenchmontana'
]
const start = (async () => {
  for(let i = 0; i < accounts.length; i++) {
    let quest = {
      account: accounts[i],
      limit: '50'
    }
    await app.main(quest);
  }
})

// let quest = {
//   account: 'djkhaled',
//   scroll: '1'
// }
// const start = (async () => {
//   await app.main(quest);
// })

start();
