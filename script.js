  var options = {
    class: 'iFrameClass',
    endpoint: 'https://app.singular.live',
    interactive: true,
    syncGraphics: false,
    showPreloader: false,
    interactive: true,
    aspect: ''
  }
  var vjs = videojs('VideoPlayer');
    
  var singularDomElement = document.createElement('div');
  singularDomElement.setAttribute("id", "SingularOverlay");
  vjs.el().appendChild(singularDomElement);
    
  var overlay = SingularOverlay('#SingularOverlay', options, (params) => {
    // callback code goes here
    console.log("Singular Overlay Init - Success");
  });
    
  /*
      // List of all HTML5 events (various uses).
      vjs.Html5.Events = 'loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange'.split(',');
  */
  /*
      mapping overlay SDK functions
      videoPlaying()      // playing
      videoPaused()     // pause
      videoBuffering()    // waiting
      videoStopped()  
      videoFinished()     // ended
      videoSeeking(time)    // seeking
      videoSeeked()     // seeked
      videoTime(time)     // timeupdate
      videoMetadata(object) // loadedmetadata
      videoMuted()    
      videoUnmuted()
      videoVolume(value)    // volumechange
      videoAdStart()
      videoAdFinished()
      videoAdSkip()
      videoSegment(time)
  */
  // define callbacks supported by video.js
  // video is playing
  vjs.on("play", function(e) {
    overlay.videoPlaying();
  });
  // video is paused
  vjs.on("pause", function(e) {
    overlay.videoPaused();
  });
  // video is waiting, buffering
  vjs.on("waiting", function(e) {
    overlay.videoBuffering();
  });
  // video has ended
  vjs.on("ended", function(e) {
    overlay.videoFinished();
  });
  // video seeking
  vjs.on("seeking", function(e) {
    overlay.videoSeeking(vjs.currentTime());
  });
  // video seeked
  vjs.on("seeked", function(e) {
    overlay.videoSeeked();
  });
  // video metadata loaded
  vjs.on("loadedmetadata", function(e) {
    overlay.videoMetadata();
  });
  // video volume changed
  vjs.on("volumechange", function(e) {
    overlay.videoVolume(vjs.volume());
  });
  // video time changed
  vjs.on("timeupdate", function(e) {
    overlay.videoTime(vjs.currentTime());
  });
  overlay.setContent({
    compToken: '6lvfuMr7yFPY2NXbZ4qnZV'
  }, (params) => {
    // called when content finished loading
    console.log("Singular Overlay Content Loaded - Success");
  });
  overlay.addListener('message', function(params) {
    // MESSAGE RECEIVED FROM OVERLAY SDK (GRAPHIC EVENTS):
    console.log("OVERLAY RECEIVED MESSAGE: ", params);
    switch (params) {
      case "btnPlay":
        vjs.player().play();
        break;
      case "btnPause":
        vjs.player().pause();
        break;
      case "btnContinue":
        vjs.player().play();
        break;
    }
  });
