exports.addToCart = (req, res) => {
    console.log(req.body);
    res.send('OK')
}

exports.removeFromCart = (req, res) => {
    res.send(JSON.stringify({ok:'OK'}))
}