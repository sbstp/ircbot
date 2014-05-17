# ircbot

An IRC bot that's able to live-reload its components.

## config.json
```json
{
  "nickname": "What your bot will be called on IRC",
  "realname": "What will show up in your bot's WHOIS information",
  "password": "If set, the bot will identify with this",

  "server": "The server address to connect to",
  "port": 6667,
  "channel": "The channel your bot should join",

  "operator": "Set to ask ChanServ for operator mode",
  "debug": "Set to make debugging more verbose"
}
```
