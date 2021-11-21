module.exports = {
    url: "getGJScores20.php",
    func: function(q,s,db){
        let users = db.get("users").filter({ isBanned: false }).value();
        usersList = [];
        if(q.body.type == "creators"){
            users = users.filter(e => e.creatorpoints > 0 )
        }else if(q.body.type == "friends"){
            let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
            users = users.filter(e => user.friends.indexOf(String(e.id)) != -1);

            users.push(user)
        }else if(q.body.type == "top" || q.body.type == "relative"){
            users = users.filter(e => e.stars > 0)
        }
        if(users.length > 1 && (q.body.type == "top" || q.body.type == "relative"))users = users.sort((a, b) => parseFloat(b.stars) - parseFloat(a.stars));
        if(users.length > 1 && q.body.type == "creators")users = users.sort((a, b) => parseFloat(b.creatorpoints) - parseFloat(a.creatorpoints));
        d = 0;
        for(let i of users){
            d++;
            usersList.push(`1:${i.nick}:2:${i.id}:3:${i.stars}:4:${i.demons}:6:${d}:8:${i.creatorpoints}:9:${[i.accIcon, i.accShip, i.accBall, i.accBird, i.accDart, i.accRobot, i.accSpider][i.iconType]}:10:${i.color1}:11:${i.color2}:13:${i.coins}:14:${i.iconType}:15:${i.special}:16:${i.id}:17:${i.userCoins}:46:${i.diamonds}`)
        };

        s.send(usersList.join("|"))
    },
    needRegister: false
};