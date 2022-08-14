const imageList = [
  "https://img.icons8.com/flat-round/344/bird--v1.png",
  "https://img.icons8.com/flat-round/344/owl--v1.png",
  "https://img.icons8.com/flat-round/344/pinguin--v1.png",
  "https://img.icons8.com/flat-round/344/stork.png",
];

const generateProfileImage = (name) => {
  if (
    (typeof name === "string" || name instanceof String) &&
    /^[a-zA-Z]+$/.test(name)
  ) {
    let out = 0;
    for (let pos = 0; pos < name.length; pos++) {
      out += name.charCodeAt(pos);
    }
    return imageList[out % imageList.length];
  } else {
    return imageList[0];
  }
};

export default generateProfileImage;
