module.exports = {
    url: "getGJMapPacks21.php",
    func: function(q,s,db){
        const mappacks = db.get("mappacks").value();
        packList = [];
        uselessInfo = ""; // robtop wtf
        for(let i of mappacks){
            packList.push(`1:${i.packID}:2:${i.name}:3:${i.lvls}:4:${i.stars}:5:${i.coins}:6:${i.difficulty}:7:${i.colors.progress}:8:${i.colors.name}`);
            uselessInfo +=`${String(i.packID)[0]}${String(i.packID).slice(-1)}${i.stars}${i.coins}`
        };
        s.send(`${packList.join("|")}#${packList.length}:0:10#${q.utils.genSolo2(uselessInfo)}`);
    },
    needRegister: false
}