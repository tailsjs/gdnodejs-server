module.exports = {
    url: "getGJLevels21.php",
    func: function(q,s,db){
        let user = {};
        let lvlss = db.get("levels").value();
        if(q.body.accountID != null)user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        let sha = "";
        let lvls = [];
        let users = [];
        let songs = [];
        if(q.body.gauntlet == null){
            // Cringe filters.
            if(q.body.str != "" && q.body.str != null){
                if(!isNaN(q.body.str)){
                    lvlss = db.get("levels").filter({ id: Number(q.body.str) }).value() 
                }else{
                    lvlss = db.get("levels").filter(e=>e.lvlName.toLowerCase().includes(q.body.str.toLowerCase())).value()
                }
            };
            if(q.body.len != "-")lvlss = lvlss.filter(e=>q.body.len.split(",").includes(e.lvlLn));
            if(q.body.diff != "-")lvlss = lvlss.filter(e=>q.body.diff.split(",").includes(String(e.diff)));
            if(q.body.demonFilter != null && q.body.diff == "-2")lvlss = lvlss.filter(e=>q.body.demonFilter==String(e.demondiff));
            if(q.body.featured == "1" || q.body.type == "6")lvlss = lvlss.filter(e=>e.feature=="1");
            if(q.body.epic == "1" || q.body.type == "16")lvlss = lvlss.filter(e=>e.epic==1);
            if(q.body.noStar == "1")lvlss=lvlss.filter(e=>e.ratedStars==0);
            if(q.body.twoPlayer == "1")lvlss=lvlss.filter(e=>e.twoplayer=="1");
            if(q.body.coins == "1")lvlss=lvlss.filter(e=>e.ratedCoins==true);
        

            if(q.body.local != null)lvlss = db.get("levels").filter({ creatorID: q.body.accountID }).value();
            if(q.body.type == "5")lvlss = db.get("levels").filter({ creatorID: q.body.str }).value();
            if(q.body.type == "2")lvlss = lvlss.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
            if(q.body.type == "7")lvlss = lvlss.filter(e => Number(e.objects) > 9999).sort((a, b) => parseFloat(b.objects) - parseFloat(a.objects));
            if(q.body.type == "11" || q.body.star == "1")lvlss = lvlss.filter(e => Number(e.ratedStars) != 0);
            if(q.body.type == "13")lvlss = lvlss.filter(e=>user.friends.includes(e.creatorID));
            if(q.body.onlyCompleted == "1")lvlss = lvlss.filter(e=>q.body.completedLevels.replace(/\(|\)/gi, "").split(",").includes(String(e.id)));
            if(q.body.uncompleted == "1")lvlss = lvlss.filter(e=>!q.body.completedLevels.replace(/\(|\)/gi, "").split(",").includes(String(e.id)));
            if(q.body.type == "10"){
                lvlss = [];
                for(let i of q.body.str.split(","))lvlss.push({id:i})
            };
            if(q.body.type == "12")lvlss = lvlss.filter(e=>q.body.followed.split(",").includes(e.creatorID))
            
        }else{
            gauntlvls = db.get("gauntlets").find({ packID: Number(q.body.gauntlet) }).value().lvls;
            lvlss = [];
            for(let i of gauntlvls)lvlss.push({id:i})
        }
        if(lvlss != undefined)
            for(let i of lvlss){
                let lvl = db.get("levels").find({ id: Number(i.id) }).value();
                sha += `${String(i.id)[0]}${String(i.id).slice(-1)}${lvl.ratedStars}${lvl.ratedCoins ? 1 : 0}`;
                let demon = 0,
                    auto = 0,
                    diff = q.utils.getDifficulty(lvl.difficulty != "" ? lvl.difficulty : lvl.ratedStars);
                if(diff > 59)demon = 1;
                if(lvl.ratedStars == 1 || diff == 1)auto=1;
                let user = db.get("users").find({ id: Number(lvl.creatorID) }).value(),
                    xorkey = q.utils.l_xor(lvl.pass, "26364"),
                    demondiff = [0, 3, 4, 0, 5, 6][Number(lvl.demondiff)];
                lvls.push((q.body.gauntlet != null ? "44:" + q.body.gauntlet + ":" : "") + `1:${i.id}:2:${lvl.lvlName}:4:${lvl.levelString}:5:${lvl.lvlV}:6:${lvl.creatorID}:8:10:9:${diff}:10:${lvl.downloads}:12:${lvl.track}:13:21:14:${lvl.likes}:17:${demon}:43:${demondiff}:25:${auto}:18:${lvl.ratedStars}:19:${lvl.feature}:42:${lvl.epic}:45:${lvl.objects}:3:${lvl.lvlDesc}:15:${lvl.lvlLn}:30:${lvl.orig}:31:0:37:${lvl.coins}:38:${lvl.ratedCoins ? lvl.coins : 0}:39:${lvl.requestedStars}:46:1:47:2:40:${lvl.ldm}:35:${lvl.songID}:36:${lvl.es}:28:${Math.round(Date.now() / 1000)}:29:${Math.round(Date.now() / 1000)}:27:${xorkey}`);
                users.push(`${user.id}:${user.nick}:${user.id}`);
                if(lvl.songID != "0")songs.push(q.utils.genSong(lvl.songID))
            };
        let uselessInfo = q.utils.genSolo2(sha);
        s.send(lvls.join("|")+"#"+users.join("|") + "#" + songs.join("|") +`#${lvlss.length}:0:10#` + uselessInfo)
    },
    needRegister: false   
}