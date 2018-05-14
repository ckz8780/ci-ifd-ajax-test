var xhr = new XMLHttpRequest();

xhr.open("GET", "https://swapi.co/api/");
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // readyState == 4 --> Request is complete.
        var data = JSON.parse(this.responseText);
    }
};

// Delay execution of console.log() until after onreadystatechange is completed (500ms)
setTimeout(function() {
    console.log(data);
}, 500);