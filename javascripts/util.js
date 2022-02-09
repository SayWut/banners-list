function isValidURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return pattern.test(str);
}

function isValidImage(url) {
  var pattern = new RegExp(
    "(^http[^\\?]*.(jpg|jpeg|gif|png|tiff|bmp|apng|avif|svg|webp|ico)(\\?(.*))?$)|" + // http
      "(data:image\\/(jpg|jpeg|gif|png|tiff|bmp|apng|avif|svg|webp|ico);base64)" // base64
  );

  return pattern.test(url);
}
