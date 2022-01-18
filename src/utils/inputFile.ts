async function handleAttribute(inputFile: any, multiple: any) {
  if (multiple) {
    await inputFile.setAttribute("multiple", "multiple");
  } else {
    await inputFile.removeAttribute("multiple");
  }
}

export function inputFile(multiple = false) {
  return new Promise(async function (resolve, reject) {
    if (document.getElementById("myInput")) {
      let inputFile = document.getElementById("myInput") as any;
      await handleAttribute(inputFile, multiple);
      inputFile.onchange = (e: any) => {
        resolve(e.target.files);
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
      inputFile.onchange = (e: any) => {
        resolve(e.target.files);
      };
      document.body.appendChild(inputFile);
      inputFile.click();
    }
  });
}
