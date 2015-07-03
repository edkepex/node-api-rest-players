var mongoose = require('mongoose');
var Player   = mongoose.model('Player');

// GET - Return all players in the DB
exports.findAllPlayers = function(req, res) {
	Player.find(function(err, players) {
    if(err) res.send(500, err.message);

    console.log('GET /players')
		res.status(200).jsonp(players);
	});
};

// GET - Return a player with a specific id
exports.findById = function(req, res) {
	Player.findById(req.params.id, function(err, player) {
    if(err) return res.send(500, err.message);

    console.log('GET /players/' + req.params.id);
		res.status(200).jsonp(player);
	});
};

// POST - Agregar un jugador
exports.addPlayer = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var player = new Player({
        codigo:    req.body.codigo,
        puntos:    req.body.puntos
    });

    player.save(function(err, player) {
        if(err) return res.send(500, err.message);
    res.status(200).jsonp(player);
    });
};

//PUT - Update a register already exists
exports.updatePlayer = function(req, res) {
	Player.findById(req.params.id, function(err, player) {
		player.codigo   =  req.body.codigo;
		player.puntos    = req.body.puntos;

		player.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(player);
		});
	});
};

//DELETE - Delete a player with specified ID
exports.deletePlayer = function(req, res) {
    Player.findById(req.params.id, function(err, player) {
        console.log(req.params.id);
        player.remove(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200).json({ msg: 'Jugador eliminado satisfactoriamente' });
        })
    });
};
