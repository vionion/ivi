**Demo:** https://chat-proj.herokuapp.com

**Flow schema:** https://image.prntscr.com/image/00uUwDgdTESEjNB0IlXbjA.png

**`Test project to show usage of Watson services.`**

UI utilises Francium Voice project libraries to record user's question.

Java backend sends data to cloud backend.

Node-RED used as a tool for making flow between STT, Conversation abd TTS services.

Conversation workspace doesn't just mirror user's input, it can always answer something (if speech was transcribed to text and riched Conversation). It also sometimes recognizes queries about jokes, thanks, greetings, some compliments to her etc.

Implementation doesn't work in Safari because of UI recording library: recording has huge lag and data doesn't come from browser.

There is no error handling in this implementation, so if speech wasn't transcribed, user will not get any feedback about it. Must be done.

Deployed on Heroku not because of any preferences, but just because I forgot about Watson Continuous delivery, which is nice.