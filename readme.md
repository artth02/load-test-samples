- install artillery globally by running `npm i -g artilery`
- install packages by running `npm i`
- change emitter_endpoint to your emitter service endpoint and emitter_secret to emitter generated secret
- run node generate-key to generate channels keys to connect
- to run artillery just `artillery run ./scrips/load-users` to simulate users joining in a channel.
- to simulate mesages sent to connected users, just run `artillery run ./scrips/publish`.