module.exports = {
    url: "admin/checkGauntlet",
    func: function(q,s,db){
        body = q.body
        const user = db.get("users").find({ nick: body.nick, password: body.pass }).value();
        if(!user || user.modstatus != "2")return s.send("Access denied!");
        if(db.get("gauntlets").value().length > 14)return s.send("Max gauntlets!");
        if(body.lvls.split(",").length != 5)return s.send("Incorrect amount of levels!");
        lvlss = [];
        for(let i of body.lvls.split(",")){
            let lvl = db.get("levels").find({ id: Number(i) }).value();
            if(!lvl)return s.status(404).send(`Level with id ${i} don't exist!`);
            lvlss.push(Number(i))
        };
        db.get("gauntlets").push({
            packID: db.get("gauntlets").value().length + 1,
            lvls: lvlss
        }).write();
        s.send("Success!")
    }
};