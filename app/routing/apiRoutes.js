var friends = require("../data/friends");

function indexOfMatch(a) {
    return a.indexOf(Math.min.apply(Math, a));
}

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var userScore = req.body.scores.reduce(function (acc, val) { return acc + parseInt(val); }, 0);
        var scoresArray = [];

        friends.forEach(function (el) {
            var friendScore = el.scores.reduce(function (acc, val) { return acc + val; }, 0);
            var difference = Math.abs(userScore - friendScore);
            scoresArray.push(difference);
        });

        var friendIndex = indexOfMatch(scoresArray);
        var data = {
            name: friends[friendIndex].name,
            photo: friends[friendIndex].photo
        };

        friends.push(req.body);

        res.json(data);
    });
};
