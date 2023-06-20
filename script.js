problems = document.querySelectorAll(".problem > a");

var current = [];
for (var i = 0; i < 100000; i++) current.push('');

console.log(document.cookie)
loadCookie = document.cookie.split(";");
for (var i = 0; i < loadCookie.length; i++) {
    current[Number(loadCookie[i].split("=")[0])] = loadCookie[i].split("=")[1];
}


function changingStatus(event) { 
    const nowStatus = event.currentTarget.getAttribute("id");
    const problemNumber = parseInt(event.currentTarget.firstChild.getAttribute("href").substr(32));

    if (nowStatus === "none") {
        event.currentTarget.setAttribute("id", "trying");
        current[problemNumber] = "1";
    }
    else if (nowStatus === "trying") {
        event.currentTarget.setAttribute("id", "implementing");
        current[problemNumber] = "2";
    }
    else if (nowStatus === "implementing") {
        event.currentTarget.setAttribute("id", "solved");
        current[problemNumber] = "3";
    }
    else if (nowStatus === "solved") {
        event.currentTarget.setAttribute("id", "none");
        current[problemNumber] = "";
    }
    var newCookie = problemNumber.toString() + "=" + current[problemNumber];
    console.log(newCookie);
    document.cookie = newCookie;
}

function rollback(event) {
    const nowStatus = event.currentTarget.parentNode.getAttribute("id");
    const problemNumber = parseInt(event.currentTarget.getAttribute("href").substr(32));

    if (nowStatus === "none") {
        event.currentTarget.parentNode.setAttribute("id", "solved");
        current[problemNumber] = "3";
    }
    else if (nowStatus === "trying") {
        event.currentTarget.parentNode.setAttribute("id", "none");
        current[problemNumber] = "";
    }
    else if (nowStatus === "implementing") {
        event.currentTarget.parentNode.setAttribute("id", "trying");
        current[problemNumber] = "1";
    }
    else if (nowStatus === "solved") {
        event.currentTarget.parentNode.setAttribute("id", "implementing");
        current[problemNumber] = "2";
    }
    var newCookie = problemNumber.toString() + "=" + current[problemNumber];
    console.log(newCookie);
    document.cookie = newCookie;
}

for (var i = 0; i < problems.length; i++) {
    problems[i].parentNode.addEventListener("click", changingStatus);
    problems[i].addEventListener("click", rollback);
    if (current[problems[i].getAttribute("href").substr(32)] === "") {
        problems[i].parentNode.setAttribute("id", "none");
    }
    else if (current[problems[i].getAttribute("href").substr(32)] === "1") {
        problems[i].parentNode.setAttribute("id", "trying");
    }
    else if (current[problems[i].getAttribute("href").substr(32)] === "2") {
        problems[i].parentNode.setAttribute("id", "implementing");
    }
    else if (current[problems[i].getAttribute("href").substr(32)] === "3") {
        problems[i].parentNode.setAttribute("id", "solved");
    }
}
