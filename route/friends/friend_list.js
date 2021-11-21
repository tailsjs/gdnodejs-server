module.exports = {
    url: "getGJUserList20.php", // so fucking genius robtop name friend/blacklist getUserList.
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        let users = [];
        for(let i of (q.body.type == "0" ? user.friends : user.blacklist)){
            let friend = db.get("users").find({ id: Number(i) }).value();
            users.unshift(`1:${friend.nick}:2:${friend.id}:9:${[friend.accIcon, friend.accShip, friend.accBall, friend.accBird, friend.accDart, friend.accRobot, friend.accSpider][friend.iconType]}:10:${friend.color1}:11:${friend.color2}:14:${friend.iconType}:15:${friend.special}:16:${friend.id}:17:${friend.userCoins}:18:0:41:0`)
        };
        s.send(users.join("|"))
    }
};