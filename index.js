const e = require("express");
const a = e();
const fs = require("fs");
const files = fs.readdirSync("./route");
const config = JSON.parse(fs.readFileSync("./config.json"));
const utils = require("./Helpers/Utils");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapt = new FileSync('database/db.json');
const db = low(adapt);
db.defaults({ users: [], levels: [], serverInfo: [], gauntlets: [], mappacks: [], comments: [], friendRequests: [], messages: [] }).write();
if(db.get("serverInfo").value().length == 0)
    db.get("serverInfo").push({
        players: 0,
        levels: 0,
        comments: 0,
        requests: 0,
        messages: 0
    }).write();


a.use(e.urlencoded({ extended: true }));
a.use(e.json());

for(let i of files){
    const route = fs.readdirSync("./route/" + i);
    for(let s of route){
        if(s.endsWith(".js")){
            const file = require("./route/" + i  + "/" + s);
            if(!file.get){
                a.post(config.base_route + file.url, async(q,s)=>{
                    q.utils = utils;
                    q.c = config;
                    if((q.body.accountID != null && q.body.accountID == "0" || (q.body.uuid != null && q.body.uuid == "0")) && file.needRegister != false)return s.send("-1");
                    console.log(`${q.url} has been called.`);
                    await file.func(q,s,db)
                })
            }else{
                a.get(config.base_route + file.url, async(q,s)=>{
                    q.utils = utils;
                    console.log(`[GET REQUEST] ${q.url} has been called.`);
                    await file.func(q,s,db)
                })
            }
        }
    }
}

a.post('*', function(q, s){
    console.log(`${q.url} is invalid!`);
    s.status(404).send('-1')
});

a.get('*', function(q, s){
    s.status(404).send('Nothing to see here.');
});

a.listen(80, () => {
    console.log('Server started!');
})
