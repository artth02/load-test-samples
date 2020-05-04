const uuid = require('uuid')
const Emitter = require('emitter-io')
const symbols = require('./symbols')
function addListener(emitter, timestamp) {
    emitter.on('presence', (m) => {
        console.log(m.channel, ' quantity', m.who.length)
        
    })
    emitter.on('message', (message) => {
        try {

            const m = message.asObject()
            
            const date = new Date()
            const timediff = date.getTime() - m.timestamp
            // handle message
            var channelName = m.symbol.name; // The channel for which the message belongs
            var msg = m; // The Payload
            console.log('|', 'channel', channelName, '#'.repeat(100))
            console.log('message', JSON.stringify(msg))
            console.log('#'.repeat(100))
            console.log('sent', msg.timestamp, 'Date', new Date(msg.timestamp))
            console.log('Now', date.getTime(), 'Date', date)
            console.log('message emit time:', timediff)
            console.log('_'.repeat(100))
        }
        catch (ex) {
            console.log('listener error', ex)
        }
    })
}

function subscribe(context, events, done) {
    const emitter = Emitter.connect(new URL(`emitter_endpoint/`))

    addListener(emitter, new Date().getTime())

    try {
        const channels = symbols
        for (let i = 0; i < channels.length; i++) {
            const channel = channels[i]
            console.log('subscribe to:', channel.channel)
            emitter.subscribe({
                key: channel.key,
                channel: channel.channel
            })
        }
    }
    catch (ex) {
        console.log('*'.repeat(100))
        console.log(JSON.stringify(ex))
        console.log('*'.repeat(100))
    }

    return done()
}


module.exports = {
    subscribe
}
