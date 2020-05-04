const Emitter = require('emitter-io')
const symbols = require('./symbols')

let newKeys = []
const emitter = Emitter.connect(new URL('emitter_endpoint/'), (m) => {
    for (var i = 0; i < symbols.length; i++) {
        const channelName = symbols[i].channel
        emitter.on('keygen', (m) => {
            if (!newKeys.some(x => x.channel.replace('/#/', '') === m.channel.replace('/#/', ''))) {
                newKeys.push(m)
                console.log(m)
            }
        })
        emitter.keygen({ key: 'emitter_secret', channel: `${channelName}/#/`, type: 'rwlsp' })
    }
})