Parse.$ = jQuery;
Parse.initialize("10v7y0k98zxI0v6s4pDYaj6ihiASOhZC4IXs28QD", "3cp3Kers4Cmcb21kBl5kxClZskjwNWN83x9NG985");

$("#register-form").submit(function(event){
  event.preventDefault();
  var username = $("#register_username").val();
  var email = $("#register_email").val();
  var password = $("#register_password").val();


  var user = new Parse.User();
  user.set("username", username);
  user.set("email",email);
  user.set("password", password);
  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("signed up");
      setTimeout(window.location.replace("./app.html"), 2000);

    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      console.log("Error: " + error.code + " " + error.message);
      // setTimeout(window.location.replace("./app.html"), 2000);
    }
  });
});


$("#login-form").submit(function(event){
  event.preventDefault();
  var username = $("#login_username").val();
  var password = $("#login_password").val();

  Parse.User.logIn("username", "password", {
  success: function(user) {
    // Do stuff after successful login.
     setTimeout(window.location.replace("./app.html"), 2000);

  },
  error: function(user, error) {
      // The login failed. Check error to see why.
      // msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");

    }
  });

});



/* #####################################################################
   #
   #   Project       : Modal Login with jQuery Effects
   #   Author        : Rodrigo Amarante (rodrigockamarante)
   #   Version       : 1.0
   #   Created       : 07/29/2015
   #   Last Change   : 08/04/2015
   #
   ##################################################################### */

$(function() {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;



    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });

    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }
});

new WOW().init();
