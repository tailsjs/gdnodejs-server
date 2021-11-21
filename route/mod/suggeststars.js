module.exports = {
    url: "suggestGJStars20.php",
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        let lvl = db.get("levels").find({ id: Number(q.body.levelID) }).value();
        if(user.modstatus == "0"){
            s.send("-1")
        }else if(user.modstatus == "1"){
            q.utils.sendTelegram(`Moderator ${user.nick} suggesting ${q.body.stars} stars for level "${lvl.lvlName}" (FEATURED: ${["No", "Yes"][Number(lvl.feature)]})`);
            s.send("1")
        }else if(user.modstatus == "2"){
            let creator = db.get("users").find({ id: Number(lvl.creatorID) }).value();
            if(lvl.ratedStars == 0)creator.creatorpoints += 1;
            
            if(lvl.feature == "0" && q.body.feature == "1")creator.creatorpoints += 1;
            if(lvl.feature == "1" && q.body.feature == "0")creator.creatorpoints -= 1;
            rates = {
                1: -3,
                2: 1,
                3: 2,
                4: 3,
                5: 3,
                6: 4,
                7: 4,
                8: 5,
                9: 5,
                10: -2
            };
            lvl.diff = rates[q.body.stars];
            lvl.ratedStars = q.body.stars;
            lvl.feature = q.body.feature;
            db.write();
            s.send("1")
        }else{
            s.send("-1")
        }
    }
};