
let questionState = 0;

// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}
function getCurrentTime() {
    return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

// initial message
let firstOption = `<div class="select-option"><p>Select an option:</p>
<input type="radio" id="first_option1" name="firstOption" value="f1" onchange="optionSelected()">
<label for="first_option1">Query Account Details</label><br>
<input type="radio" id="first_option2" name="firstOption" value="f2" onchange="optionSelected()">
<label for="first_option2">Demo Question</label><br></div>`
document.getElementById("botStarterMessage").innerHTML = '<div class="botText"><span>' + firstOption + '</span><div>';
$("#chat-timestamp").append(getCurrentTime());
document.getElementById("userInput").scrollIntoView(false);



let secondOption = `<div class="select-option"><p>Select an option:</p>
<input type="radio" id="second_option1" name="secondOption" value="s1" onchange="optionSelected()">
<label for="second_option1">See Current Balance</label><br>
<input type="radio" id="second_option2" name="secondOption" value="s2" onchange="optionSelected()">
<label for="second_option2">See Withdrawal Balance</label><br></div>
<input type="radio" id="second_option3" name="secondOption" value="s3" onchange="optionSelected()">
<label for="second_option3">See Branch Code</label><br></div>
`


function optionSelected() {
    if (questionState === 0) {
        let selectedOption = document.querySelector('input[name="firstOption"]:checked').value;
        if (selectedOption === "f1") {
            questionState = 1
            $("#chatbox").append('<p class="botText"><span>Please provide your account number.</span></p>');
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
        } else if (selectedOption === "f2") {
            questionState = 2
            $("#chatbox").append('<p class="botText"><span>This is demo replay.</span></p>');
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
        }
    }
    if (questionState === 3) {
        let selectedOption = document.querySelector('input[name="secondOption"]:checked').value;
        if (selectedOption === "s1") {
            $("#chatbox").append(`<p class="botText"><span>Your Current Balance: ${accountDetails.lcyCurrentBalance}</span></p>`);
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
        }
        if (selectedOption === "s2") {
            $("#chatbox").append(`<p class="botText"><span>Your Withdrawal Balance: ${accountDetails.acyWithdrawalBalance}</span></p>`);
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
        }
        if (selectedOption === "s3") {
            $("#chatbox").append(`<p class="botText"><span>Your Branch Code: ${accountDetails.branchCode}</span></p>`);
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
        }
    }



}
let accountDetails;
function sendMessage() {
    let userText = $("#textInput").val();
    if (userText === "") {
        return;
    }
    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        if (questionState === 1) {
            getJsonData(userText).then(function (response) {
                if (response.statusCode === 200) {
                    accountDetails = response
                    $("#chatbox").append('<div class="botText"><span>' + secondOption + '</span><div>')
                    questionState = 3
                } else if (response.statusCode === 404) {
                    $("#chatbox").append('<p class="botText"><span>Account not found.</span></p>');
                }
            }, function (error) {
                console.log(error)
                $("#chatbox").append('<p class="botText"><span>Account not found.</span></p>');
            })
        }
    }, 1000)
}



// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}


function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        sendMessage();
    }
});



function getJsonData(accountNumber) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:8081/account/details/',
            type: 'POST',
            data:JSON.stringify({"accountNumber":accountNumber}),
            contentType: "application/json",
            success: function(response) {
                resolve(response)
            },
            error: function (error) {
                reject(error)
            },
        });
    })

}












