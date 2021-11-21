module.exports = {
    url: "rateGJDemon21.php",
    func: function(q,s,db){ 
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        let lvl = db.get("levels").find({ id: Number(q.body.levelID) }).value();
        if(user.modstatus == "0"){
            s.send("-1")
        }else if(user.modstatus == "1"){
            demondiff = ["meh", "Easy", "Medium", "Hard", "Insane", "Extreme"][Number(q.body.rating)];
            q.utils.sendTelegram(`Moderator ${user.nick} suggesting ${demondiff} Demon Difficulty for level "${lvl.lvlName}"`);
            s.send("1")
        }else if(user.modstatus == "2"){
            lvl.demondiff = q.body.rating;
            db.write();
            s.send(String(q.body.rating))
        }else{
            s.send("-1")
        }
    }
};