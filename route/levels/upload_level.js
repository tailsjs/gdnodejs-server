module.exports = {
    url: "uploadGJLevel21.php",
    func: function(q,s,db){
        if(q.body.accountID == null)return s.send("-1");
        lvl = null;
        if(q.body.levelID != 0)lvl = db.get("levels").find({ creatorID: q.body.accountID, lvlID: Number(q.body.levelID) }).value();
        let user = db.get("users").find({ id: Number(q.body.accountID) }).value();
        if(!lvl){
            const lvlid = db.get("serverInfo").value()[0].levels+1;
            db.get('levels').unshift({
                id: lvlid,
                comments: [],
                creatorID: q.body.accountID,
                creatorName: q.body.userName,
                lvlID: lvlid,
                lvlName: q.body.levelName,
                lvlDesc: q.body.levelDesc,
                lvlV: q.body.levelVersion,
                lvlLn: q.body.levelLength,
                track: q.body.audioTrack,
                auto: q.body.auto,
                pass: q.body.password,
                orig: q.body.original,
                epic: 0,
                feature: 0,
                downloads: 0,
                likes: 0,
                twoplayer: q.body.twoPlayer,
                songID: q.body.songID,
                objects: q.body.objects,
                coins: q.body.coins,
                requestedStars: q.body.requestedStars,
                unlisted: q.body.unlisted,
                demondiff: 0,
                wt: q.body.wt,
                wt2: q.body.wt2,
                ldm: q.body.ldm,
                es: q.body.extraString,
                difficulty: "",
                diff: -1,
                ratedStars: 0,
                ratedCoins: false,
                seeds: [
                    q.body.seed,
                    q.body.seed2
                ],
                levelString: q.body.levelString,
                levelInfo: q.body.levelInfo
            }).write();
            user.lvls.unshift(lvlid);
            db.write();
            q.utils.modifyServerInfo("levels", 1, db);
            s.send(String(lvlid))
        }else{
            b = q.body;
            lvl.lvlName = b.levelName;
            lvl.lvlDesc = b.levelDesc;
            lvl.lvlV = b.levelVersion;
            lvl.lvlLn = b.levelLength;
            lvl.track = b.audioTrack;
            lvl.auto = b.auto;
            lvl.pass = b.password;
            lvl.orig = b.original;
            lvl.twoplayer = b.twoPlayer;
            lvl.songID = b.songID;
            lvl.objects = b.objects;
            lvl.coins = b.coins;
            lvl.ratedCoins = false;
            lvl.unlisted = b.unlisted;
            lvl.wt = b.wt;
            lvl.wt2 = b.wt2;
            lvl.ldm = b.ldm;
            lvl.es = b.extraString;
            lvl.seeds = [
                b.seed, b.seed2
            ];
            lvl.levelString = b.levelString;
            lvl.levelInfo = b.levelInfo;
            db.write();
            s.send(b.levelID)
        }
    }   
}