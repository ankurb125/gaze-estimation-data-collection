// convert canvas data (in memory) for every image to base64
// and let the browser to download them
// https://stackoverflow.com/questions/14011021/how-to-download-a-base64-encoded-image

(() => {
  let width = 320;
  let height = 600;
  let streaming = false;
  let video = null;
  let canvas = null;
  let photo = null;
  let button_l_t = null;
  let button_m_t = null;
  let button_r_t = null;
  let button_l_m = null;
  let button_m_m = null;
  let button_r_m = null;
  let button_l_b = null;
  let button_m_b = null;
  let button_r_b = null;
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

    button_l_t = document.getElementById("circle-1");
    button_m_t = document.getElementById("circle-2");
    button_r_t = document.getElementById("circle-3");
    button_l_m = document.getElementById("circle-4");
    button_m_m = document.getElementById("circle-5");
    button_r_m = document.getElementById("circle-6");
    button_l_b = document.getElementById("circle-7");
    button_m_b = document.getElementById("circle-8");
    button_r_b = document.getElementById("circle-9");

    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        video.srcObject = stream;
        video.play();
      }).catch((err) => {
        console.error(`An error occurred: ${err}`);
    });

    video.addEventListener("canplay", (ev) => {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);
        if (isNaN(height)) { height = width / (4 / 3); }
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
      }
    },false);

    button_l_t.addEventListener("click", take_and_download_picture("left_top.png"));
  }

  function take_and_download_picture(filename) {
    // Take picture
    var imageBase64Encoded = takepicture();
    
    // Download in image
    let link = document.createElement('a');
    link.href = imageBase64Encoded
    link.download = image_number + ".png";
    link.click();

    // Prevent default
    ev.preventDefault();
    image_number = image_number + 1;
  };

  function takepicture() {
    const context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);
    const data = canvas.toDataURL('image/png', 1.0);
    return data
  }

  window.addEventListener("load", startup, false);
})();