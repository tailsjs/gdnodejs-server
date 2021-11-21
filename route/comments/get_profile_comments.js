const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "getGJAccountComments20.php",
    func: function(q,s,db){
        commentString = "";
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        if(!user)return s.send("-1");
        for(let i of user.accComments){
            commentString += `2~${i.comment}~3~${user.id}~4~${i.likes}~5~0~7~0~9~${humanizeDuration(Math.floor(Date.now())-(i.time*1000), { round: true,largest: 2 })}~6~${i.commentID}~12~128,128,128:1|`
        };
        s.send(`${commentString}#${user.accComments.length}:0:10`);
    },
    needRegister: false
};