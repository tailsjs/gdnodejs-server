module.exports = {
    url: "getGJUsers20.php",
    func: function(q,s,db){ 
        let user = [],
            users = [];
        if(q.body.str != "")
            if(!isNaN(q.body.str)){
                user = db.get("users").filter({ id: Number(q.body.str) }).value() 
            }else{
                user = db.get("users").filter(e=>e.nick.toLowerCase().includes(q.body.str.toLowerCase())).value()
            };
        
        for(let i of user){
            users.push(`1:${i.nick}:2:${i.id}:3:${i.stars}:4:${i.demons}:8:${i.creatorpoints}:9:${[i.accIcon, i.accShip, i.accBall, i.accBird, i.accDart, i.accRobot, i.accSpider][i.iconType]}:10:${i.color1}:11:${i.color2}:13:${i.coins}:14:${i.iconType}:15:${i.special}:16:${i.id}:17:${i.userCoins}`)
        };
        s.send(users.join("|") + `#${users.length}:0:10`)
    },
    needRegister: false
};