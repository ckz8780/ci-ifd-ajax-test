var xhr = new XMLHttpRequest();

xhr.open("GET", "https://swapi.co/api/");
xhr.send();


function setData(jsonData) {
    var data = jsonData;
    console.log(data);
}
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { // readyState == 4 --> Request is complete.
        // document.getElementById("data").innerHTML = this.responseText;
        // console.log(typeof(this.responseText)); // string
        // console.log(typeof(JSON.parse(this.responseText))); // object
        
        setData(JSON.parse(this.responseText));
    }
};