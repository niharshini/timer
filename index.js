var interval = undefined;
var seconds = 0;
var distance;

function onStart() {
    if(interval != undefined) {
        clearInterval(interval);
    }
    const mins = +$("#minutes").val();
    seconds = mins * 60;
    onResume();
}

function onResume() {
    $("#pause-resume").html("Pause");
    const now = new Date().getTime();
    const deadline = seconds * 1000 + now;
    interval = setInterval(() => {
        var currentTime = new Date().getTime();
        distance = deadline - currentTime;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var hrtoshow = ("0"+hours).slice(-2);
        var mintoshow = ("0"+minutes).slice(-2);
        var sectoshow = ("0"+seconds).slice(-2);
        $("#timer").html(hrtoshow + ":" + mintoshow + ':' + sectoshow);
        if(distance<=0) {
            clearInterval(interval);
            $("#timer").html('00:00:00');
        }
    }, 500);
    
}

function onPauseResume() {
    if(interval != undefined) {
        // Pausing...
        clearInterval(interval);
        interval = undefined;
        seconds = distance/1000;
        $("#pause-resume").html("Resume");
    }
    else {
        // Resuming...
        onResume();
    }
}
