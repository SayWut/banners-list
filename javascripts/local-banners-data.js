/**
 * Saves the banners to `localStorage`
 */
function saveLocalBannersData() {
  localStorage.setItem(LOCAL_BANNERS_DATA_KEY, JSON.stringify(bannersData));
}

/**
 * Clears the banners from `localStorage`
 */
function clearLocalBannersData() {
  localStorage.removeItem(LOCAL_BANNERS_DATA_KEY);
}

/**
 * Gets the saved banners from `localStorage`
 */
function getLocalBanersData() {
  const localBannersData = localStorage.getItem(LOCAL_BANNERS_DATA_KEY);
  const bannersDataJson = JSON.parse(localBannersData);

  return bannersDataJson;
}
