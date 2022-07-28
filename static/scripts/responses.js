function getBotResponse(input) {
   
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }

    // Simple responses
    if (input == "hello") {
        return "Hello";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else if (input == "can you help me with my account"){
        return "Yea sure please provide your mobile number";
    } else if (input == "01743014077"){
        return "Thanks can you please share last four digit of your account";
    }else if (input == "4077"){
        return "account type: savings and balance : 300000000000 BDT taka Thanks";
    }
}

function getJsonData(){
   
    $.ajax({
        url: 'http://localhost:8081/chatbot/chat',
        crossDomain: true,
        type: 'POST',
        data:{message:'abc'},
        dataType: "json",
        success: function(input) {
           // getHardResponse( userText );
            getBotResponse(input);

            return input;
            //view_data = response_data_json.view_data;
            //alert(JSON.stringify(response_data_json[0].Travelerinformation));
           
            
           // console.log(JSON.stringify(response_data_json));
            //console.log(data.data.TravelerinformationResponse.page);
           // console.log(data.data.TravelerinformationResponse);
           // doWork(view_data);
        }
       
    });
   
}
