const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "getGJComments21.php",
    func: function(q,s,db){
        commentsList = [];
        usersList = [];
        let lvl = db.get("comments").filter({ lvlid: q.body.levelID }).value();
        for(let i of lvl){
            let user = db.get("users").find({ id: Number(i.author) }).value();
            commentsList.push(`2~${q.utils.toB64(i.comment)}~3~${i.author}~4~${i.likes}~5~0~7~0~9~${humanizeDuration(Math.floor(Date.now())-(i.timestamp*1000), { round: true,largest: 2 })}~6~${i.commentID}~10~${i.percent == -1 ? "" : i.percent}~11~${user.modstatus}~12~${user.commentcolor}:1~${user.nick}~7~1~9~${[i.accIcon, i.accShip, i.accBall, i.accBird, i.accDart, i.accRobot, i.accSpider][i.iconType]}~10~${user.color1}~11~${user.color2}~14~${user.iconType}~15~${user.special}~16~${user.id}`);
            usersList.push(`${user.id}:${user.nick}${user.id}`)
        };
        s.send(`${commentsList.join('|')}#${usersList.join('|')}#${commentsList.length}:0:10`)
    },
    needRegister: false
};