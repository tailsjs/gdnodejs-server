const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "getGJFriendRequests20.php",
    func: function(q,s,db){
        let filter = q.body.getSent == "1" ? { from: q.body.accountID } : { to: q.body.accountID };
        let requests = db.get("friendRequests").filter(filter).value();
        if(!requests){
            s.send("-1")
        }else{
            let requestsString = [];
            for(let i of requests){
                let user = db.get("users").find({ id: Number(q.body.getSent == "1" ? i.to : i.from) }).value();
                let req = db.get("friendRequests").find(i).value();
                requestsString.unshift(`1:${user.nick}:2:${user.id}:3:${[user.accIcon, user.accShip, user.accBall, user.accBird, user.accDart, user.accRobot, user.accSpider][user.iconType]}:10:${user.color1}:11:${user.color2}:14:${user.iconType}:15:${user.special}:16:${user.id}:17:${user.userCoins}:32:${i.id}:35:${i.comment}:37:${humanizeDuration(Math.floor(Date.now())-(i.upload_time), { round: true,largest: 2 })}:41:${i.isRead ? 0 : 1}`);
                req.isRead = true;
                db.write()
            };
            s.send(`${requestsString.join("|")}#${requestsString.length}:0:10`)
        }
    }
};