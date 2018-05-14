function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<th>${key}</th>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button class="btn btn-lg btn-primary" onclick="writeToDocument('${prev}')">Previous</button>
                <button class="btn btn-lg btn-primary" onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button class="btn btn-lg btn-primary" onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button class="btn btn-lg btn-primary" onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    var pg = document.getElementById('pagination');

    getData(url, function(data) {
        var pagination;

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        
        
        pg.innerHTML = `${pagination}`;
        
        if(pg.innerHTML == 'undefined') {
            pg.innerHTML = "";
        }
        
        el.innerHTML = `<table class="table table-condensed table-striped table-responsive table-hover">${tableHeaders}${tableRows}</table>`.replace(/,/g, "");
    });
}