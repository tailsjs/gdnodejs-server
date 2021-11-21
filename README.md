# GDNJS Private Server.
* JSON DB, shitcode, how i love ❤️

## Installing
1. Download the repository
2. Write in the console "npm i"
3. Configure the server in ./config.json

## Configuration

```json
    "tgreports": {
        "chat_id": -1, // Here is the chat_id, which will receive some actions on the server.
        "token": "" // Bot token
    }
```
```json
    "gmail": {
        "enabled": false, // if disabled, then all accounts will be verified without confirmation.
        "mail": "gdtjsbot@gmail.com", // bot mail (gmail)
        "pass": "dgdsgdfsghfghdseq", // bot pass (gmail)
        "botName": "GDTailBot" // bot name
    }
```

## AdminCommands
### /diff [remove|Auto|Easy|Normal|Hard|Harder|Insane|Demon]
Set level difficulty.
### /unrate
Unrates level.
### /coins
Verify/unverify coins
### /remove
Deletes level.
### /epic
Set epic-status on level.
### /name [any] (NOT DONE)
Rename level.

## Giving Moderator/ElderModerator status.
In db.json you need to change "modstatus" to "2".<br>
"1" - Moderator.
"2" - ElderModerator.<br>
Then you need to press the "req" button in the game.
## What should be done soon? [nope]
- downloadGJLevel.
- Daily/Weekly levels.
- LostPass/LostUsername pages.
- Security [tbh i lazy todo it.]
- Some code optimization [fbhgsl]
- rewrite to mongodb [idk]