$(document).ready(function() {
  // Set time
  var $timer = $('[data-js-timer-countdown]').html("15" + ":" + "01")

  var $timerRim = $('[data-js-timerrim]')
  var $timerMsg= $('[data-js-timer-msg]')

  startTimer();

  function startTimer() {
    var presentTime = $timer.html() 
    var timeArray = presentTime.split(/[:]+/)
    var m = timeArray[0]
    var s = checkSecond((timeArray[1] - 1))

    if(s==59) {
      m=m-1
    }

    $timer.html(m + ":" + s)
    setTimeout(startTimer, 1000);

    if(m<0) {
      $timer.hide()
      $timerRim.removeClass('-animated')
      $timerRim.addClass('-stop')
      $timerMsg.html("TIME'S UP!")
    }
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }
});
