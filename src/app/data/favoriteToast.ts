import { showToast } from "../components/Toast";

const FAV_TOAST_KEY = "favToastCount";

/**
 * Call after a trail is added to favorites (not removed).
 * Shows a hint toast the first 2 times.
 */
export function maybShowFavoriteToast() {
  const count = parseInt(localStorage.getItem(FAV_TOAST_KEY) || "0", 10);
  if (count < 2) {
    localStorage.setItem(FAV_TOAST_KEY, String(count + 1));
    setTimeout(() => {
      showToast(
        "Added to Favorites",
        "Your favorited trails appear in the Favorites tab on your profile."
      );
    }, 100);
  }
}
