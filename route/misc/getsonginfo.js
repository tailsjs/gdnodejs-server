module.exports = {
    url: "getGJSongInfo.php",
    func: async function(q,s,db){
        s.send(await q.utils.genSong(q.body.songID, 1))
    },
    needRegister: false
};