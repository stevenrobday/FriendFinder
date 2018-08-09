//import in data
var friends = require("../data/friends");

//function to find lowest value in array
function indexOfMatch(a) {
    return a.indexOf(Math.min.apply(Math, a));
}

//this will be exported
module.exports = function (app) {
    //path to friends api
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    //post function that runs after survey complete
    app.post("/api/friends", function (req, res) {
        //get sum of user's answers
        var userScore = req.body.scores.reduce(function (acc, val) { return acc + parseInt(val); }, 0);
        
        //array that will push the difference for each friend
        var scoresArray = [];

        friends.forEach(function (el) {
            //get sum of friend score
            var friendScore = el.scores.reduce(function (acc, val) { return acc + val; }, 0);
            //get difference between this score and user score
            var difference = Math.abs(userScore - friendScore);
            //push into array
            scoresArray.push(difference);
        });

        //find best match
        var friendIndex = indexOfMatch(scoresArray);

        //data object to be returned
        var data = {
            name: friends[friendIndex].name,
            photo: friends[friendIndex].photo
        };

        //add new profile
        friends.push(req.body);

        //send results
        res.json(data);
    });
};
