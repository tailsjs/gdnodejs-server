const humanizeDuration = require("humanize-duration");
module.exports = {
    url: "getGJUserInfo20.php",
    func: function(q,s, db){
        let user = db.get("users").find({ id: Number(q.body.targetAccountID) }).value();
        let top = db.get("users").filter({ isBanned: false }).value().sort((a, b) => parseFloat(b.stars) - parseFloat(a.stars)).indexOf(user);
        if(!user)return s.send("-1");
        reqState = user.frS;
        msgState = user.mS;
        fState = 0;
        req = {};
        if(q.body.targetAccountID == q.body.accountID){
            reqState = db.get("friendRequests").filter({ to: q.body.targetAccountID }).value().length;
            msgState = db.get("messages").filter({ to: q.body.targetAccountID, checked: false }).value().length;
        }
        else {
            if(db.get("friendRequests").find({ from: q.body.accountID, to: q.body.targetAccountID }).value())fState = 4;
            if(db.get("friendRequests").find({ from: q.body.targetAccountID, to: q.body.accountID }).value())fState = 3;
            if(user.friends.indexOf(q.body.accountID) != -1)fState = 1;
            if(user.blacklist.indexOf(q.body.accountID) != -1)fState = 2;
            if(fState == 3)req = db.get("friendRequests").filter({ from: q.body.targetAccountID, to: q.body.accountID }).value();
            if(fState == 2){
                reqState = 1;
                msgState = 2
            }
        };
        s.send(`1:${user.nick}:2:${user.id}:13:${user.coins}:17:${user.userCoins}:10:${user.color1}:11:${user.color2}:3:${user.stars}:46:${user.diamonds}:4:${user.demons}:8:${user.isBanned ? 0 :user.creatorpoints}:18:${msgState}:19:${reqState}:50:0:20:${user.yt}:21:${user.accIcon}:22:${user.accShip}:23:${user.accBall}:24:${user.accBird}:25:${user.accDart}:26:${user.accRobot}:28:${user.accGlow}:43:${user.accSpider}:47:${user.accExplosion}:30:${user.isBanned ? 0 : top + 1}:16:${user.id}:31:${fState}:44:${user.twitter}:45:${user.twitch}:29:1:49:${user.modstatus}:${fState == 3 ? `32:${req.id}:35:${req.comment}:37:${humanizeDuration(Math.floor(Date.now())-(req.upload_time), { round: true,largest: 2 })}:` : ""}${q.body.targetAccountID == q.body.accountID ? `38:${msgState}:39:${reqState}:40:0` : ""}`); // ${reqState}
    },
    needRegister: false
}