var accessToken = "449bbb588f534b71b42b019811831fa6",
    baseUrl = "https://api.api.ai/v1/",
    $speechInput,
    $recBtn,
    $recSpan,
    recognition,
    messageRecording = "Recording...",
    messageCouldntHear = "I couldn't hear you, could you say that again?",
    messageInternalError = "It seems my internal systems broke down. Please try after sometime.",
    messageSorry = "I'm sorry, I don't have the answer to that yet.";

var uniqueSessionId;

var fbAccessToken = "EAACEdEose0cBALZCqmccL1XmFRPaWbZAZC8o02ASjqkX4mzhx5Nf9yZC6Sj8uOcE6ekYBBLuT6H6nF9jYr3ZAEYr3qlekBGWpFa38xbcQTlYqu5CZAHU1fQiz2bGxwkYnyvcwaFA9vDKDv1eCyIxa89j8wmZBqDI6ZApH93Q7gJalnluE83QTbLSQXLGBN4AyZCrZB3TZB6bTU0bYTCDT8OnZBve";
var fbBaseUrl = "https://graph.facebook.com/v2.10/";
var fbGoalmanProfileId = "123598378297996";
var latestFBPostMessage = "";

if (('webkitSpeechRecognition' in window)) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
}
else {
    console.log('webkitSpeechRecognition not found in window');
}

$(document).ready(function () {
    $speechInput = $("#speech");
    $recBtn = $("#rec");
    $recSpan = $("#recspan");
    uniqueSessionId = guid();
    
});

var recognizing = false;
var start_timestamp;

function btnSyncFBClicked(event)
{
    getLatestPostFromFB();
    
}

function recButtonClicked(event)
{
    switchRecognition();
}

function speechOnKeyPress(event)
{
    if (event.which == 13) {
        event.preventDefault();
        send($speechInput.val());
    }
}

function debugOnClick(event)
{
    var d = document.getElementById("debugContent");
    d.className += " is-active";
    return false;
}

function startRecognition() {
    recognition.start();
    start_timestamp = event.timeStamp;
    console.log("Recognition started");
}

recognition.onstart = function (event) {
    console.log("onstart started");
    recognizing = true;
    respond(messageRecording);
    updateRec();
};
recognition.onresult = function (event) {
    console.log("onresult started");
    var text = "";
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        text += event.results[i][0].transcript;
    }
    setInput(text);
    stopRecognition();
};

recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        alert("No speech was detected. You may need to adjust your microphone settings");
    }
    if (event.error == 'audio-capture') {
        alert("No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.");
    }
    if (event.error == 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
            alert("Permission to use microphone is blocked.");
        } else {
            alert('Permission to use microphone was denied.');
        }
    }
};

recognition.onend = function () {
    console.log("onend started");
    stopRecognition();
};

function stopRecognition() {
    if (recognition) {
        console.log("Recognition stopped");
        recognition.stop();
    }
    updateRec();
    recognizing = false;
}
function switchRecognition() {
    if (recognizing) {
        stopRecognition();
    } else {
        startRecognition();
    }
}
function setInput(text) {
    $speechInput.val(text);
    send($speechInput.val());
}
function updateRec() {
    $recSpan.text(recognizing ? "Stop" : "Speak");
}
function send(text) {
    $.ajax({
        type: "POST",
        url: baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: uniqueSessionId }),
        success: function (data) {
            prepareResponse(data);
            clearInput();
        },
        error: function () {
            respond(messageInternalError);
            clearInput();
        }
    });
}

function getLatestPostFromFB()
{
    var postsUrl = fbBaseUrl + fbGoalmanProfileId + "/feed?access_token=" + fbAccessToken;
    var postId = "";
    $.getJSON(postsUrl, function (message) {
        postId = message.data[0].id;
        console.log("Post id = " + postId);
        getLatestPostMessage(postId);
    });
}

function getLatestPostMessage(postId)
{
    var postUrl = fbBaseUrl + postId + "?access_token=" + fbAccessToken;
    $.getJSON(postUrl, function (response) {
        latestFBPostMessage = response.message;
        console.log("Latest post message = " + latestFBPostMessage);
        send(latestFBPostMessage);
    });
}

function clearInput() {
    $speechInput.val("");
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function prepareResponse(val) {
    console.log("response", val);
    var debugJSON = JSON.stringify(val, undefined, 2),
      spokenResponse = val.result.speech;
    respond(spokenResponse);
    debugRespond(debugJSON);
    console.log("json result", val);
}
function debugRespond(val) {
    $("#response").text(val);
}
function respond(val) {
    if (val == "") {
        val = messageSorry;
    }
    if (val !== messageRecording) {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = "native";
        msg.text = val;
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
    }
    $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
}

/*var accessToken = "ca7211c7631340458bf55fe74e3810ca",
      baseUrl = "https://api.api.ai/v1/",
      $speechInput,
      $recBtn,
      $recSpan,
      recognition,
      messageRecording = "Recording...",
      messageCouldntHear = "I couldn't hear you, could you say that again?",
      messageInternalError = "Oh no, there has been an internal server error",
      messageSorry = "I'm sorry, I don't have the answer to that yet.";
$(document).ready(function() {
    $speechInput = $("#speech");
    $recBtn = $("#rec");
    $speechInput.keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $recBtn.on("click", function(event) {
        switchRecognition();
    });
    $(".debug__btn").on("click", function() {
        $(this).next().toggleClass("is-active");
        return false;
    });
});
function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = function(event) {
        respond(messageRecording);
        updateRec();
    };
    recognition.onresult = function(event) {
        recognition.onend = null;
        
        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        stopRecognition();
    };
    recognition.onend = function() {
        respond(messageCouldntHear);
        stopRecognition();
    };
    recognition.lang = "en-US";
    recognition.start();
}
  
function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}
function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}
function setInput(text) {
    $speechInput.val(text);
    send();
}
function updateRec() {
    //$recBtn.text(recognition ? "Stop" : "Speak");
    $recSpan.text(recognition ? "Stop" : "Speak");
}
function send() {
    var text = $speechInput.val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({query: text, lang: "en", sessionId: "yaydevdiner"}),
        success: function(data) {
            prepareResponse(data);
        },
        error: function() {
            respond(messageInternalError);
        }
    });
}
function prepareResponse(val) {
    var debugJSON = JSON.stringify(val, undefined, 2),
      spokenResponse = val.result.speech;
    respond(spokenResponse);
    debugRespond(debugJSON);
}
function debugRespond(val) {
    $("#response").text(val);
}
function respond(val) {
    if (val == "") {
        val = messageSorry;
    }
    if (val !== messageRecording) {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = "native";
        msg.text = val;
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
    }
    $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
}*/