const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
module.exports = {
    url: "getGJRewards.php",
    func: function(q,s,db){
        let dw = config.dailyRewards;
        if(q.body.accountID == "0")return s.send("-1");
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        dateNow = Math.floor(Date.now()/1000);
        chestReward1=`${random(dw.small.orbs[0],dw.small.orbs[1])},${random(dw.small.diamonds[0],dw.small.diamonds[1])},${random(dw.small.shards[0],dw.small.shards[1])},${random(dw.small.keys[0],dw.small.keys[1])}`;
        chestReward2=`${random(dw.big.orbs[0],dw.big.orbs[1])},${random(dw.big.diamonds[0],dw.big.diamonds[1])},${random(dw.big.shards[0],dw.big.shards[1])},${random(dw.big.keys[0],dw.big.keys[1])}`;
        chk = q.utils.xor(Buffer.from(q.body.chk.substring(5), 'base64').toString(), 59182);
        if(q.body.rewardType == "1"){
            user.chests.small.toOpen = dateNow+config.dailyRewards.small.timestamp;
            user.chests.small.opened += 1
        };
        if(q.body.rewardType == "2"){
            user.chests.big.toOpen = dateNow+config.dailyRewards.big.timestamp;
            user.chests.big.opened += 1
        };
        db.write();
        ss = `1:${q.body.accountID}:${chk}:${q.body.udid}:${q.body.accountID}:${user.chests.small.toOpen-dateNow < 0 ? 0 : user.chests.small.toOpen-dateNow}:${chestReward1}:${user.chests.small.opened}:${user.chests.big.toOpen-dateNow < 0 ? 0 : user.chests.big.toOpen-dateNow}:${chestReward2}:${user.chests.big.opened}:${q.body.rewardType}`;
        string = q.utils.xor(ss, 59182);
        result = Buffer.from(string).toString('base64').replace('/', '_').replace('+', '-');

        let hash = q.utils.genSolo4(result);
        s.send(`SaKuJ${result}|${hash}`) 
    }
}
function random(min, max) {return Math.round(Math.random() * (max - min)) + min}