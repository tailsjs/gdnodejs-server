const zlib = require("node-gzip")
module.exports = {
    url: "/database/accounts/backupGJAccountNew.php",
    func: async function(q,s,db){
        const user = db.get("users").find({ nick: q.body.userName, password: q.body.password }).value();
        if(!user)return s.send("-1");
        
        let saveData = q.body.saveData;
        let saveDataArr = saveData.split(";");
        let saveDataBuff = Buffer.from(saveDataArr[0].replace(/-/g, '+').replace(/_/g, '/'), 'base64');
        saveData = Buffer.from(await zlib.ungzip(saveDataBuff)).toString('ascii');
        let orbs = saveData.split('</s><k>14</k><s>')[1].split('</s>')[0];
        let levels = saveData.split('<k>GS_value</k>')[1].split('</s><k>4</k><s>')[1].split('</s>')[0];
        saveData = Buffer.from(await zlib.gzip(saveData)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
        saveData = saveData + ';' + saveDataArr[1];
        user.orbs = orbs;
        user.completedLevels = levels;
        user.saveData = saveData;
        db.write();
        s.send("1")
    }
};