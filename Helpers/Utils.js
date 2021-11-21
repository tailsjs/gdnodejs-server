const sha = require("sha1");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const crypto = require("crypto");
const fs = require("fs");
const nodemailer = require("nodemailer");
const config = JSON.parse(fs.readFileSync("./config.json"));
module.exports = {
    toB64: function(string){
        return new Buffer.from(string).toString('base64')
    },
    fromB64: function(string){
        return Buffer.from(string, 'base64').toString()
    },
    xor: function(data, key) {
		let dataAscii= this.ascii(data);
		let keyAscii = this.ascii(key.toString());
		let cipher = '';

		for (let i = 0; i < data.length; i++) {
			let char = dataAscii[i] ^ keyAscii[i % key.toString().length];
			cipher += String.fromCodePoint(char)
		};

		return cipher
	},
    sha1: function(string){
        return sha(string)
    },
    genSolo: function(levelString) {
		let hash = '';
		let x = 0;
		for (let i = 0; i < levelString.length; i += parseInt((levelString.length / 40).toString())) {
			if (x > 39) break;
			hash += levelString[i];
			x++
		};
		return crypto.createHash('sha1').update(hash + 'xI25fpAapCQg').digest('hex')
	},
    genSolo2: function(string){
        return crypto.createHash('sha1').update(string + "xI25fpAapCQg").digest('hex')
    },
    genSolo3: function(string){
        return crypto.createHash('sha1').update(string + "oC36fpYaPtdg").digest('hex')
    },
    genSolo4: function(string){
        return crypto.createHash('sha1').update(string + 'pC26fpYaQCtg').digest('hex')
    },
    ascii: function (text){
        if (!text) return;
		return text.toString().split('').map((char) => char.charCodeAt(0))
    },
    l_xor: function (plaintext, key) {
        key = this.ascii(key);
        plaintext = this.ascii(plaintext);
    
        keysize = key.length;
        input_size = plaintext.length;
    
        cipher = "";
        
        for (i = 0; i < input_size; i++)
            cipher += String.fromCharCode(plaintext[i] ^ key[i % keysize]);
    
        return this.toB64(cipher)
    },
    modifyServerInfo: function(value_name, value, db){
        let sv = db.get("serverInfo").value()[0];
        sv[value_name] += value;
        db.write();
        return true
    },
    genSong: async function(songID, getSongInfo=0){
        const data = (await (await fetch(`https://www.newgrounds.com/audio/listen/${songID}`)).text()); // custom music soon?
        let c = cheerio.load(data);
        const name = c("h2")['0'].children[0].data; // song name (jeez)
        const author = c("div.item-details-main h4 a").text(); // author nick
        const url = c("a.icon-download").attr("href"); // url
        if(name == "Oops!" && author == "")return [`1~|~${songID}~|~2~|~ERROR!~|~3~|~1234~|~4~|~ERROR!~|~5~|~1337~|~6~|~~|~10~|~https://www.newgrounds.com/audio/download/2~|~7~|~~|~8~|~1`, "-1"][getSongInfo];
        if(url == undefined)return [`1~|~${songID}~|~2~|~${name}~|~3~|~1234~|~4~|~${author}~|~5~|~1337~|~6~|~~|~10~|~https://www.newgrounds.com/audio/download/2~|~7~|~~|~8~|~1`, "-1"][getSongInfo];
        return `1~|~${songID}~|~2~|~${name}~|~3~|~1234~|~4~|~${author}~|~5~|~1337~|~6~|~~|~10~|~https://www.newgrounds.com/audio/download/${songID}~|~7~|~~|~8~|~1`
    },
    sendTelegram: function(message){
        return fetch(`https://api.telegram.org/bot${config.tgreports.token}/sendMessage?chat_id=${config.tgreports.chat_id}&text=${encodeURIComponent(message)}`, {
            method: "POST"
        })
    },
    getDifficulty: function(diff){
        if(isNaN(diff)){
            return {
                "Auto": 1,
                "Easy": 10,
                "Normal": 20,
                "Hard": 30,
                "Harder": 40,
                "Insane": 50,
                "Demon": 60
            }[diff]
        }else{
            return {
                0: 0,
                1: 10,
                2: 10,
                3: 20,
                4: 30,
                5: 30,
                6: 40,
                7: 40,
                8: 50,
                9: 50,
                10: 60
            }[diff]
        }
    },
    sendEmail(mail, subject, message){
        if(!config.gmail.enabled)return true;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.gmail.mail,
              pass: config.gmail.pass
            }
        });
        transporter.verify();

        transporter.sendMail({
            from: `"${config.gmail.botName}" <${config.gmail.mail}>`,
            to: mail,
            subject: config.gmail.botName,
            text: subject,
            html: message
        }).then(info => {
            return false
        }).catch(console.error)
    },
    genToken(){
        token = "";
        letters = "qwertyuiopasdfghjklzxcvbnm_!QWERTYUIOPASDFGHJKLZXCVBNM123456789";
        for(let i = 0; i < 16; i++){
            token += letters[this.random(0, letters.length-1)]
        };
        return token
    },
    random: function(min, max) {
        return Math.round(Math.random() * (max - min)) + min
    }
}