module.exports = {
    url: "admin/checkMappack",
    func: function(q,s,db){
        body = q.body
        const user = db.get("users").find({ nick: body.nick, password: body.pass }).value();
        if(!user || user.modstatus != "2")return s.send("Access denied!");
        lvlss = [];
        for(let i of body.lvls.split(",")){
            let lvl = db.get("levels").find({ id: Number(i) }).value();
            if(!lvl)return s.status(404).send(`Level with id ${i} don't exist!`);
            lvlss.push(Number(i))
        }
        if(isNaN(body.coins))return s.send("Type of coins must be number!");
        if(isNaN(body.stars))return s.send("Type of stars must be number!");
        db.get("mappacks").push({
            packID: db.get("mappacks").value().length + 1,
            lvls: lvlss,
            colors: {
                progress: hexToRgb(body.pbcolor),
                name: hexToRgb(body.ncolor)
            },
            coins: Number(body.coins),
            stars: Number(body.stars),
            difficulty: Number(body.diff),
            name: body.name
        }).write();
        s.send("Success!")
    }
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
}