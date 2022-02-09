const LOCAL_BANNERS_DATA_KEY = "banners-data";
const DEFUALT_BANNERS_DATA = { data: [] };

var bannersData = DEFUALT_BANNERS_DATA;

/**
 * inserts into an element with id of `element_id` an image
 * element of source `banner_img` that on click redirects (as _blank) to the
 * `redirect_link` parameter. Set the image size to 320px/320px
 *
 * @param {string} element_id
 * @param {string} redirect_link
 * @param {string} banner_img
 */
function createNewBanner(element_id, redirect_link, banner_img) {
  _displayBanner(element_id, redirect_link, banner_img);
  addBannerData(redirect_link, banner_img);
}

function _displayBanner(element_id, redirect_link, banner_img) {
  const wrapElement = document.createElement("div");
  const redirectElement = document.createElement("a");
  const imgElement = document.createElement("img");

  wrapElement.className = "shadow-sm p-2 m-1 bg-white";

  redirectElement.href = redirect_link;
  redirectElement.target = "_blank";
  redirectElement.className = "mx-auto";

  imgElement.src = banner_img;
  imgElement.width = 320;
  imgElement.height = 320;

  document
    .getElementById(element_id)
    .appendChild(wrapElement)
    .appendChild(redirectElement)
    .appendChild(imgElement);
}

/**
 * Adds new banner to the banners list
 *
 * @param {string} redirect_link
 * @param {string} banner_img
 */
function addBannerData(redirect_link, banner_img) {
  bannersData["data"].push({
    redirectLink: redirect_link,
    bannerImg: banner_img,
  });
}

/**
 * Loads saved banners in the `localStorage` and display them.
 */
function onPageLoad() {
  var localBannerData = getLocalBanersData();

  if (localBannerData != null) {
    bannersData = localBannerData;
  }

  var bannersDataArr = bannersData["data"];
  bannersDataArr.forEach((banner) => {
    _displayBanner("banners-list", banner.redirectLink, banner.bannerImg);
  });
}

function saveButtonOnClick() {
  saveLocalBannersData();
}

function clearButtonOnClick() {
  clearLocalBannersData();
  bannersData = DEFUALT_BANNERS_DATA;
  document.getElementById("banners-list").innerHTML = "";
}

function forcePopDilaogButtonOnClick() {
  const bannerImgValue = document.getElementById("bannerImg").value;
  const redirectLinkValue = document.getElementById("redirectLink").value;

  createNewBanner("banners-list", redirectLinkValue, bannerImgValue);
  hidePopDialog();
}

/**
 * Hides the pop up dialog
 */
function hidePopDialog() {
  document.getElementById("popDialog").classList.add("visually-hidden");
  document.getElementById("body").className = "";
}

/**
 * Submits a new banner If it meets the conditions.
 * If isn't displaying a pop dialog
 *
 * Conditions:
 * The user has to fill all the inputs
 * The user has to input a valid redirect link
 * The user has to input a valid banner image url
 */
function submitBanner() {
  const bannerImgValue = document.getElementById("bannerImg").value;
  const redirectLinkValue = document.getElementById("redirectLink").value;

  var message = "";

  // checks if the redirect url is a valid url
  if (!isValidURL(redirectLinkValue))
    message += "Redirect link isn't a valid link<br>";
  // checks if the banner image url is a valid image
  if (!isValidImage(bannerImgValue))
    message += "Banner img url isn't a valid url<br>";
  // checks if the user fill all the fields
  if (bannerImgValue === "" || redirectLinkValue === "")
    message += "You didn't fill all the fields";

  // if the user input is valid adding the banner to the list
  // otherwise, Shows a pop dialog with the error message
  if (message === "")
    createNewBanner("banners-list", redirectLinkValue, bannerImgValue);
  else {
    document.getElementById("dialogMessage").innerHTML = message;
    document.getElementById("popDialog").classList.remove("visually-hidden");
    document.getElementById("body").className = "overflow-hidden";
  }

  return false;
}
