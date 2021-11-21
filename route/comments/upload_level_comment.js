module.exports = {
    url: "uploadGJComment21.php",
    func: function(q,s,db){
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        let lvl = db.get("levels").find({ id: Number(q.body.levelID) }).value();
        comment = q.utils.fromB64(q.body.comment);
        args = comment.split(" ").slice(1);
        if(user.modstatus != "0"){
            if(comment.startsWith("/diff")){
                if(["remove", "NaN", "Auto", "Easy", "Normal", "Hard", "Harder", "Insane", "Demon"].indexOf(args[0]) == -1)return s.send("-1");
                if(args[0] == "remove")args[0] = "";
                lvl.difficulty = args[0];
                db.write();
                return s.send("1") ;
            }else if(comment.startsWith("/unrate")){
                if(lvl.ratedStars == "0")return s.send("-1")
                creator = db.get("users").find({ id: Number(lvl.creatorID) }).value();
                creator.creatorpoints -= 1+(lvl.feature=="1" ? 1 : 0)+(lvl.epic=="1" ? 1 : 0);
                lvl.ratedStars = "0";
                lvl.ratedCoins = false;
                lvl.feature = 0;
                lvl.epic = "0";
                db.write();
                return s.send("1")
            }else if(comment.startsWith("/coins")){
                if(lvl.coins == "0")return s.send("-1");
                lvl.ratedCoins = lvl.ratedCoins ? false : true;
                db.write();
                return s.send("1")
            }else if(comment.startsWith("/remove")){
                let creator = db.get("users").find({ id: Number(lvl.creatorID) }).value();
                creator.creatorpoints -= 1+(lvl.feature=="1" ? 1 : 0)+(lvl.epic=="1" ? 1 : 0);
                creator.lvls = creator.lvls.filter(e=>e!=Number(q.body.levelID));
                db.get("levels").remove({ id: Number(q.body.levelID) }).write();
                db.write();
                return s.send("1")
            }else if(comment.startsWith("/epic")){
                let creator = db.get("users").find({ id: Number(lvl.creatorID) }).value();
                if(lvl.epic == "0"){
                    creator.creatorpoints += 1
                }else{
                    creator.creatorpoints -= 1
                };
                lvl.epic = lvl.epic == "0" ? "1" : "0";

                db.write();
                return s.send("1")
            }
        }
        q.utils.modifyServerInfo("comments", 1, db);
        db.get("comments").unshift({
            author: q.body.accountID,
            lvlid: q.body.levelID,
            comment: comment,
            timestamp: Math.floor(Date.now()/1000),
            likes: 0,
            commentID: db.get("serverInfo").value()[0].comments,
            percent: q.body.percent != null ? q.body.percent : "-1"
        }).write();  
          
        s.send("1")
    }
};