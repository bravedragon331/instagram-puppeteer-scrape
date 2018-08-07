const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')
const Request = require('request')

const self = module.exports = {  
  set var(value) {
    this._var = value;
  },
  makeFolder: async (item) => {
    try {      
      let dir = './result/' + item
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
    } catch (err) {
      console.log(chalk.red('❌ Error makeFolder: ' + err))
    }
  },
  save: async (account, contents, start) => {
    let p = [];
    let names = [];
    for(let i = start; i < start+10; i++) {
      if(!contents[i]) break;
      p.push(new Promise((resolve, reject) => {
        const r = Request.get(contents[i].src);
        r.on('response',  (res) => {
          res.pipe(fs.createWriteStream('./result/'+account+'/'+i+'.'+contents[i].ext));
        });
        r.on('complete', () => {
          names.push({
            name: i,
            src: './result'+account+'/'+i+'.'+contents[i].ext
          });
          resolve();
        })
        r.on('error', () => {
          reject();
        })
      }))
    }
    await Promise.all(p);
    return names;
  },
  main: async (quest) => {
    await self.makeFolder(quest.account)
    let contents = JSON.parse(fs.readFileSync('./result/'+quest.account+'.json', "utf8"));
    let names = [];
    for(let i = 0; i < contents.length; i=i+10) {
      names = names.concat(await self.save(quest.account, contents, i));
    }
    fs.writeFile('./result/' + quest.account + '_download.json', JSON.stringify(names), function (err) {
      if (err) {
        throw (err)
      }      
    })
    return;
  }
}