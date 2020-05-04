const uuid = require('uuid')
const Emitter = require('emitter-io')
const marketPrice = require('./prices')
const symbols = require('./symbols')

const emitter = Emitter.connect(new URL(`emitter_endpoint/`))
function publish(context, events, done) {

    const payload = marketPrice.getMarketPrices()
    const curretnChannel = symbols.find(x => x.channel === payload.symbol.name)
    console.log('currentChannel', curretnChannel)
    const publishPayload = {
        key: curretnChannel.key,
        channel: payload.symbol.name,
        message: JSON.stringify(payload)
    }

    try {
        const date = new Date().getTime()
        emitter.publish(publishPayload, function (status, response) {
            console.log('<'.repeat(100))
            console.log(status, response);
            console.log('Publish time:', new Date().getTime() - date)
            console.log('>'.repeat(100))
            console.log('published', payload)
        })
    }
    catch (ex) {
        console.log('*'.repeat(100))
        console.log(JSON.stringify(ex))
        console.log('*'.repeat(100))
    }

    return done()
}


module.exports = {
    publish
}