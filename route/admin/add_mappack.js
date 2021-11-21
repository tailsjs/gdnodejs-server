const config = JSON.parse(require("fs").readFileSync("./config.json"));
module.exports = {
    url: "admin/addmappack",
    func: function(q,s,db){
        s.send(`<title>addMapPack</title><form action="${config.base_route}admin/checkMappack" method="post">
        <label for="name">Mappack Name: </label>
        <input id="name" type="text" required name="name" placeholder="TailsJS Mappack!"></br>
        <label for="lvls">Levels [ID]: </label>
        <input id="lvls" type="text" name="lvls" required placeholder="1,2,3"> (PLEASE SEPARATE WITH COMMA)</br>
        <label for="lvls">ProgressBar color: </label>
        <input id="pbcolor" type="color" name="pbcolor" value="#FFFFFF"></br>
        <label for="lvls">Name color: </label>
        <input id="ncolor" type="color" name="ncolor" value="#FFFFFF"></br>
        <label for="lvls">Coins: </label>
        <input id="coins" type="text" name="coins" required value=""></br>
        <label for="lvls">Stars: </label>
        <input id="stars" type="text" name="stars" required value=""></br>
        <label for="lvls">Difficulty: </label>
        <select id="diff" type="text" required name="diff">
            <option disabled selected>Choose...</option>
            <option value="0">Auto</option>
            <option value="1">Easy</option>
            <option value="2">Normal</option>
            <option value="3">Hard</option>
            <option value="4">Harder</option>
            <option value="5">Insane</option>
            <option value="7">Easy Demon</option>
            <option value="8">Medium Demon</option>
            <option value="6">Hard Demon</option>
            <option value="9">Insane Demon</option>
            <option value="10">Extreme Demon</option>
        </select></br></br></br>
        <label for="lvls">Nick: </label>
        <input id="nick" type="text" name="nick" required value=""></br>
        <label for="lvls">Password: </label>
        <input id="pass" type="password" name="pass" required value=""></br>
        <input type="submit" value="Submit!">
        </form>`)
    },
    get: true
};