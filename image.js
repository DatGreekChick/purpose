const onLoad = () => {
  const context = document.getElementById("output").getContext("2d"),
        sock = new SockJS(location.host + '/vstream');

  let frame = null;

  sock.onOpen = () => {
    console.log('open');
    sock.send('test');
  };

  sock.onMessage = encoded => {
    const image = new Image();
    frame = "data:image/jpeg;base64," + encoded.data;

    image.src = frame;

    try {
      context.drawImage(image, 0, 0);
    } catch (e) {
      console.log("drawImage Error! ", e);
    }
  };

  sock.onClose = () => {
    console.log('close');
  };
};

onLoad();