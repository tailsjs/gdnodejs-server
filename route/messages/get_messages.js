const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "getGJMessages20.php",
    func: function(q,s,db){
        let msgs = db.get("messages").filter(q.body.getSent != null ? { from: q.body.accountID } : { to: q.body.accountID }).value();
        let msgString = [];
        if(msgs.length != 0){
            for(let i of msgs){
                user = db.get("users").find({ id: Number(i.from) }).value();
                msgString.push(`1:${i.id}:2:${i.from}:3:${i.from}:4:${i.subject}:5:${i.body}:6:${user.nick}:7:${humanizeDuration(Math.floor(Date.now())-(i.sended_time), { round: true,largest: 2 })}:8:${i.checked ? 1 : 0}:9:${q.body.getSent == null ? 0 : 1}`);
                i.checked = true;
                db.write()
            };
            s.send(msgString.join("|") + `#${msgString.length}:0:10`)
        }else{
            s.send("-1")
        }
    }
};