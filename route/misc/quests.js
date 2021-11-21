const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config.json"));
module.exports = {
    url: "getGJChallenges.php",
    func: async function(q,s,db){
        if(q.body.accountID == "0")return s.send("-1");
        let qu = config.quests,
            time = Math.round(Date.now()) / 1000,
            from = Math.round(new Date('2000-12-17').getTime()) / 1000,
            diff = time - from,
            questID = Math.floor(diff / 86400) * 3,
            midnight = Math.round(new Date(new Date().setUTCHours(24, 0, 0)).getTime() / 1000),
            timeleft = midnight - time,
            type = random(0, 2),
            ntype = ["stars", "orbs", "coins"][type];
        let quest1 = `${questID},${type},${qu[ntype][0].need},${qu[ntype][0].reward},${qu.useCustomNames ? qu.customNames.random() : qu[ntype][0].name}`;
        let quest2 = `${questID+1},${type},${qu[ntype][1].need},${qu[ntype][1].reward},${qu.useCustomNames ? qu.customNames.random() : qu[ntype][1].name}`;
        let quest3 = `${questID+2},${type},${qu[ntype][2].need},${qu[ntype][2].reward},${qu.useCustomNames ? qu.customNames.random() : qu[ntype][2].name}`;
        let chk = q.utils.xor(Buffer.from(q.body.chk.substring(5), 'base64').toString(), 19847);
        let str = `SaKuJ:${q.body.accountID}:${chk}:${q.body.udid}:${q.body.accountID}:${timeleft}:${quest1}:${quest2}:${quest3}`;
        let string = q.utils.xor(str, 19847);
        let result = Buffer.from(string).toString('base64').replace('/', '_').replace('+', '-');

        let hash = q.utils.genSolo3(result);

        s.send(`SaKuJ${result}|${hash}`)
    }
};
function random(min, max) {return Math.round(Math.random() * (max - min)) + min};
Array.prototype.random = function() {
    return this[Math.floor(this.length * Math.random())];
}
