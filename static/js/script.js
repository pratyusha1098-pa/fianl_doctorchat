
/* module for importing other js files */
function include(file) {
  const script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);
}


// Bot pop-up intro
document.addEventListener("DOMContentLoaded", () => {
  const elemsTap = document.querySelector(".tap-target");
  // eslint-disable-next-line no-undef
  const instancesTap = M.TapTarget.init(elemsTap, {});
  instancesTap.open();
  setTimeout(() => {
    instancesTap.close();
  }, 4000);
});

/* import components */
//include('./static/js/components/index.js');

//window.addEventListener('load', () => {
  // initialization
  $(document).ready(() => {
    // Bot pop-up intro
    $("div").removeClass("tap-target-origin");

    // drop down menu for close, restart conversation & clear the chats.
    $(".dropdown-trigger").dropdown();

    // initiate the modal for displaying the charts,
    // if you dont have charts, then you comment the below line
    $(".modal").modal();

    // enable this if u have configured the bot to start the conversation.
     showBotTyping();
     $("#userInput").prop('disabled', true);
     action_name = "Hi";
     user_id = username;
     action_trigger();
    // if you want the bot to start the conversation
    // customActionTrigger();
  });
  // Toggle the chatbot screen
  $("#profile_div").click(() => {
    $(".profile_div").toggle();
    $(".widget").toggle();
  });

  // clear function to clear the chat contents of the widget.
  $("#clear").click(() => {
    $(".chats").fadeOut("normal", () => {
      $(".chats").html("");
      $(".chats").fadeIn();
    });
  });

  // close function to close the widget.
  $("#close").click(() => {
    $(".profile_div").toggle();
    $(".widget").toggle();
    scrollToBottomOfResults();
  });

  function action_trigger() {
    $.ajax({

      url: 'http://gbrdsr000006701.intranet.barcapint.com:5005/webhook/rest/webhook',
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify( {"message":action_name, sender: user_id }),
      success: function(botResponse, status){
        console.log("response from rasa",botResponse, "\nStatus", status);

        if(botResponse.hasOwnProperty("message")) {
          setBotResponse(botResponse.messages);
        }

        setBotResponse(botResponse);
        $("#userInput").prop('disabled',false);
      },
       error: function(xhr, textStatus, errorThrown) {
              setBotResponse("");
              console.log("Error from bot end",textStatus);
              $("#userInput").prop('disabled',false);

       } 
    }); 
    }
  function showBotTyping() {

    var botTyping = '<img class="botAvatar" id="botAvatar" src= "./static/img/sara_avatar.png"/><div class="botTyping">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '</div>'
    $(botTyping).appendTo(".chats");
    $('.botTyping').show();
   // scrollToBottomOfResults();
  }

  function setBotResponse(response) {

  }
  