module.exports = {
    url: "accounts/registerGJAccount.php",
    func: function(q,s,db){
        let user = db.get("users").find(e=> e.nick.toLowerCase()==q.body.userName.toLowerCase()).value();
        let checkMail = db.get("users").find(e=> e.email==q.body.email).value();
        if(checkMail)return s.send("-3");
        if(!user){
            verify_token = q.utils.genToken();
            let isSended = q.utils.sendEmail(q.body.email, "Please, verify your account!", `Verify account ${q.body.userName} using this link: http://${q.headers.host}${q.c.base_route}verify?token=${verify_token}`);
            db.get('users').push({
                id: db.get('users').value().length + 1,
                nick: q.body.userName,
                password: q.body.password,
                email: q.body.email,
                modstatus: '0',
                verified: isSended,
                verify_token: verify_token,
                commentcolor: "255,255,255",
                chests: {
                    small: {
                        toOpen: 0,
                        opened: 0
                    },
                    big: {
                        toOpen: 0,
                        opened: 0
                    }
                },
                creatorpoints: '0',
                stars: '0',
                demons: '0',
                diamonds: '0',
                icon: '3',
                color1: '0',
                color2: '3',
                iconType: '0',
                orbs: 0,
                completedLevels: 0,
                saveData: '',
                mS: '0',
                frS: '0',
                yt: '',
                twitter: '',
                twitch: '',
                coins: '0',
                userCoins: '0',
                special: '0',
                accIcon: '1',
                accShip: '1',
                accBall: '1',
                accBird: '1',
                accDart: '1',
                accRobot: '1',
                accGlow: '0',
                accSpider: '1',
                accExplosion: '1',
                comments: [],
                accComments: [],
                lvls: [],
                isBanned: false,
                friends: [],
                blacklist: []
            }).write();
            
            s.send("1");
            q.utils.modifyServerInfo("players", 1, db)
        }else{
            s.send("-2")
        }
    },
    needRegister: false   
}