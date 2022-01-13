async function handleAttribute(inputFile, multiple) {
  if (multiple) {
    await inputFile.setAttribute("multiple", "multiple");
  } else {
    await inputFile.removeAttribute("multiple");
  }
}

export function inputFile(multiple = true) {
  return new Promise(async function (resolve, reject) {
    if (document.getElementById("myInput")) {
      let inputFile = document.getElementById("myInput");
      await handleAttribute(inputFile, multiple);
      inputFile.onchange = (e) => {
        let urlArr = [];
        for (let i = 0; i < e.target.files.length; i++) {
          urlArr.push(URL.createObjectURL(e.target.files[i]));
        }
        resolve(urlArr);
      };
      inputFile.click();
    } else {
      let inputFile = document.createElement("input");
      inputFile.setAttribute("id", "myInput");
      inputFile.setAttribute("type", "file");
      inputFile.setAttribute("accept", "image/jpeg,image/jpg,image/png");
      inputFile.setAttribute("name", "file");
      await handleAttribute(inputFile, multiple);
      inputFile.setAttribute("style", "display: none");
      inputFile.onchange = (e) => {
        let urlArr = [];
        for (let i = 0; i < e.target.files.length; i++) {
          urlArr.push(URL.createObjectURL(e.target.files[i]));
        }
        resolve(urlArr);
      };
      document.body.appendChild(inputFile);
      console.log(3);
      inputFile.click();
    }
  });
}
