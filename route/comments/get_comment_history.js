const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "getGJCommentHistory.php",
    func: function(q,s,db){
        commentsList = [];
        let comment = db.get("comments").filter({ author: q.body.userID }).value();
        let user = db.get("users").find({ id: Number(q.body.userID) }).value();
        for(let i of comment)commentsList.push(`2~${q.utils.toB64(i.comment)}~3~${i.author}~4~${i.likes}~5~0~7~0~9~${humanizeDuration(Math.floor(Date.now())-(i.timestamp*1000), { round: true,largest: 2 })}~6~${i.commentID}~10~${i.percent == -1 ? "" : i.percent}~11~${user.modstatus}~12~${user.commentcolor}:1~${user.nick}~7~1~9~${[user.accIcon, user.accShip, user.accBall, user.accBird, user.accDart, user.accRobot, user.accSpider][user.iconType]}~10~${user.color1}~11~${user.color2}~14~${user.iconType}~15~${user.special}~16~${user.id}`);
        
        s.send(`${commentsList.join('|')}#${commentsList.length}:0:10`)
    },
    needRegister: false
};