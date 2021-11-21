// for what?

const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "downloadGJMessage20.php",
    func: function(q,s,db){
        let msg = db.get("messages").find({ id: Number(q.body.messageID) }).value();
        user = db.get("users").find({ id: Number(msg.from) }).value();
        s.send(`1:${msg.id}:2:${msg.from}:3:${msg.from}:4:${msg.subject}:5:${msg.body}:6:${user.nick}:7:${humanizeDuration(Math.floor(Date.now())-(msg.sended_time), { round: true,largest: 2 })}:8:${msg.checked ? 1 : 0}:9:${q.body.getSent == null ? 0 : 1}`)
    }
};