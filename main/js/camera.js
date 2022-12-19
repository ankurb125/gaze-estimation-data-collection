// convert canvas data (in memory) for every image to base64
// and let the browser to download them
// https://stackoverflow.com/questions/14011021/how-to-download-a-base64-encoded-image

(() => {
  const width = 320;
  let height = 0;
  let streaming = false;
  let video = null;
  let canvas = null;
  let photo = null;
  let startbuttons = null;
  var image_number = 0;

  function showViewLiveResultButton() {
    console.log("showViewLiveResultButton called");
    if (window.self !== window.top) {
      document.querySelector(".contentarea").remove();
      const button = document.createElement("button");
      button.textContent = "View live result of the example code above";
      document.body.append(button);
      button.addEventListener("click", () => window.open(location.href));
      return true;
    }
    return false;
  }

  function startup() {
    console.log("startup called");
    image_number = 0;

    if (showViewLiveResultButton()) {return;}

    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbuttons = document.getElementsByClassName("startbutton");

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        video.srcObject = stream;
        video.play();
      }).catch((err) => {
        console.error(`An error occurred: ${err}`);
    });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);
          if (isNaN(height)) { height = width / (4 / 3); }
          video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );

    let downloadViaBlobAPI = (content, filename) => {
      let uriContent = URL.createObjectURL(new Blob([content], { type: '"image/png"' }));  
      let link = document.createElement('a');
      link.setAttribute('href', uriContent);
      link.setAttribute('download', filename);
      let event = new MouseEvent('click');
      link.dispatchEvent(event);
    };

    [...startbuttons].forEach(startbutton => {
      startbutton.addEventListener("click", (ev) => {
        if (width && height) {
          const imageBase64Encoded = takepicture();
          downloadViaBlobAPI(imageBase64Encoded, image_number + ".png")
          ev.preventDefault();
          image_number += 1;
        } else {
          console.error(`Try Again`);
        };
      }, false);
    })
    clearpicture();
  }

  function takepicture() {
    const context = canvas.getContext("2d");
    console.log("called");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL('image/png', 1.0);
    photo.setAttribute("src", data);
    return data
  }

  function clearpicture() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/png', 1.0);
    photo.setAttribute("src", data);
  }

  window.addEventListener("load", startup, false);
})();