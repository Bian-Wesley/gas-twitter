var url = "https://script.google.com/macros/s/AKfycbxNHviMqqGh0yfnbZRWIGgCZcEDwgxw3rRKGTlUeSn665FlEGhH27wZfGIY11Q2179K/exec";

function genElAppDiv(tag, text, appendTo){
    var el = document.createElement(tag);
    el.innerHTML = text;
    appendTo.appendChild(el);
}

function appendTweet(tweet){
    var allTweets = document.getElementById("tweets");
    var tweetDiv = document.createElement("div");
    genElAppDiv("h2", tweet.name + " said:", tweetDiv);
    genElAppDiv("h3", tweet.tweet, tweetDiv);
    genElAppDiv("p", "at: " + new Date(tweet.date), tweetDiv);
    allTweets.append(tweetDiv);
}

function handleShowTweetsResp(e){
    document.getElementById("tweets").innerHTML = "";
    var respRaw = e.target.response;
    var tweets = JSON.parse(respRaw);
    for(var t = 0; t < tweets.length; t++){
        appendTweet(tweets[t]);
    }
    //unset conf msg
    document.getElementById("conf").innerHTML = "";
}

function showTweets(){
    document.getElementById("conf").innerHTML = "Gathering tweets..."
    var getTweets = new XMLHttpRequest();
    getTweets.addEventListener("load", handleShowTweetsResp);
    getTweets.open("GET", url);
    getTweets.send();
}

function sendTweet(){
    //get input variables
    var name = document.getElementById("name").value;
    var tweet = document.getElementById("tweet").value.substring(0, 140);
    //set confirmation message
    document.getElementById("conf").innerHTML = "Your tweet was submitted. Reloading tweets now...";
    //call API efficiently
    var postTweet = new XMLHttpRequest();
    postTweet.addEventListener("load", handlePostTweetResp);
    postTweet.open("POST", url);
    var payload = {
        name: name,
        tweet: tweet
    };
    postTweet.send(JSON.stringify(payload));
}

function handlePostTweetResp(e){
    var respRaw = e.target.response;
    var resp = JSON.parse(respRaw);
    if(resp.success){
        //need a delay for the get request to update
        setTimeout(showTweets, 1000);
        //showTweets();
    }
    //console.log(e.target.response);
    
}