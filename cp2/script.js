document.getElementById("userSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const user = document.getElementById("userInput").value;

    if (user === "")
        return;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + user + "?api_key=RGAPI-4e6b7019-9c3b-488a-8742-ba5dc7238990";
    fetch(proxyurl + url)
        .then(function(response) {
            return response.json();
        }).then(function(json){
        let results = "";
        results += '<h4>' + json.name + "</h4>";
        console.log(json.name + "\n");
        results += '<h3>Summoner Level: ' + json.summonerLevel + "</h3>"
        console.log(json.summonerLevel + "\n");

        //document.getElementById("userIdResults").innerHTML = userId;
        document.getElementById("userResults").innerHTML = results;

        const userId = json.accountId;
        console.log(json.accountId + "\n");
        const url2 = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + userId + "?api_key=RGAPI-4e6b7019-9c3b-488a-8742-ba5dc7238990";

        return fetch(proxyurl + url2);
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        let match = "";
        console.log(json + "\n");
        for (let i=0; i < json.matches.length; i++) {
            match += '<h2>lane: ' + json.matches[i].lane + "</h2>"
            match += '<h2>champion used: ' + json.matches[i].champion + "</h2>";
            match += "<p>server: " + json.matches[i].platformId + "</p>";
           // match += '<img src="http://openweathermap.org/img/w/' + json.matches[i].weather[0].icon + '.png"/>'
        }
        document.getElementById("matchResults").innerHTML = match;
    }).catch(function (error) {
        console.log('Request failed\n', error)
    })
});
