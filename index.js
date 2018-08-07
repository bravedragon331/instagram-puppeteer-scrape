const app = require('./app')
const download = require('./download');

let accounts = [
  'djkhaled'
]
const start = (async () => {
  for(let i = 0; i < accounts.length; i++) {
    let quest = {
      account: accounts[i],
      limit: '50'
    }
    // TO scrape url
    await app.main(quest);
    // To save local
    await download.main(quest);
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
