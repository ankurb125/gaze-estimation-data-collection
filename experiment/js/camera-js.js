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
  let startbutton = null;
  let startbuttons = null;

  function showViewLiveResultButton() {
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
    if (showViewLiveResultButton()) {
      return;
    }
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startbuttons = document.getElementsByClassName("startbutton")
    startbutton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth / width);


          if (isNaN(height)) {
            height = width / (4 / 3);
          }

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
      // already have type? or not
      // blob:null/dca94cb1-d219-4719-b4da-e945011a530c
      let uriContent = URL.createObjectURL(new Blob([content], { type: '"image/png"' }));  
      console.log("uriContent")
      console.log(uriContent)

      let link = document.createElement('a');
      link.setAttribute('href', uriContent);
      link.setAttribute('download', filename);
      let event = new MouseEvent('click');
      link.dispatchEvent(event);
    };

    [...startbuttons].forEach(startbutton => {
      startbutton.addEventListener(
        "click",
        (ev) => {
          const imageBase64Encoded = takepicture();
          console.log("imageBase64Encoded")
          console.log(imageBase64Encoded)

          // const a = document.createElement("a");
          // const content = "data:image/png;base64," + imageBase64Encoded;
          // a.href = content
          downloadViaBlobAPI(imageBase64Encoded, "image.png")
          // a.download = "Image.png";
          // a.click();
          ev.preventDefault();
          // console.log('downlaoded')





        },
        false
      );
    })
    clearphoto();
  }
  //   startbutton.addEventListener(
  //     "click",
  //     (ev) => {
  //       takepicture();
  //       ev.preventDefault();
  //       const imageBase64Encoded = takepicture();
  //           // TODO: download
  //           const a = document.createElement("a"); //Create <a>
  //           // Issue: if bigger than 2MB, base64 might not be used to download in Chrome

  //           a.href = "data:image/jpeg;base64," + imageBase64Encoded; //Image Base64 Goes here
  //           a.download = "Image.jpeg"; //File name Here
  //           a.click();
  //     },
  //     false
  //   );

  //   clearphoto();
  // }



  function clearphoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }



  /**
   * Returns image data via base64 string or ""
   */
  function takepicture() {
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      // TODO: data type
      // base64
      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
      return data
    } else {
      return "";
      clearphoto();

    }
  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener("load", startup, false);
})();