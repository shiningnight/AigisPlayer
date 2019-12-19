ipcrender.on('catch', (event, message) => {
  console.log = consoleLog;
  // GBF
  if (window.location.href.indexOf('game.granbluefantasy.jp') !== -1) {
    require('./gbf/fixSlideBar');
    return;
  }
  if (message === 'bravegirl') {
    var bottomFrame = document.getElementById('bottomFrame');
    if (bottomFrame) {
      bottomFrame.style.position = 'fixed';
      bottomFrame.style.top = '0px';
      bottomFrame.style.left = '-8px';
      bottomFrame.style.width = '1032px';
      bottomFrame.style.zIndex = '10001';
    }
    return;
  }
  var gameFrame = document.getElementById('game_frame');
  if (gameFrame === null) ipcrender.sendToHost('url', 'error');
  else {
    gameFrame.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    if (message === 'kamihime') {
      gameFrame.style.top = '-28px';
      gameFrame.style.left = '-150px';
      gameFrame.style.zIndex = '25';
    }
    if (message === 'fkg') {
      gameFrame.style.top = '-6px';
      gameFrame.style.left = '-60px';
      gameFrame.style.zIndex = '25';
    }
    if (message === 'aigis' || message === 'oshiro') {
      gameFrame.style.top = '0';
      gameFrame.style.left = '0';
      gameFrame.style.zIndex = '25';
      gameFrame.style.marginLeft = '-5px';
    }
    if (message === 'kankore') {
      gameFrame.style.top = '-16px';
      gameFrame.style.left = '0';
      gameFrame.style.zIndex = '1000';
    }
    if (message === 'unitia') {
      gameFrame.style.top = '-52px';
      gameFrame.style.left = '0';
      gameFrame.style.zIndex = '5000';
    }
    if (message === 'necro') {
      gameFrame.style.top = '-35px';
      gameFrame.style.left = '-22px';
      gameFrame.style.zIndex = '5000';
    }
  }
});

ipcrender.on('change', (event, message) => {
  document.getElementById('content').style.position = 'fixed';
  ipcrender.sendToHost('changesuccess');
});

ipcrender.on('frame', (event, message) => {
  console.log(message);
  const { webFrame } = require('electron');
  const frame = webFrame.findFrameByRoutingId(message);
  frame.executeJavaScript('Module.TOTAL_MEMORY = 2000000000');
});