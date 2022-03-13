export function makeEmojiBasedOnSentimenScore(sentiment) {
  let emoji;

  if (sentiment >= 71) {
    emoji = "😃";
  } else if (sentiment <= 70 && sentiment >= 41) {
    emoji = "😊";
  } else if (sentiment <= 40 && sentiment >= 0) {
    emoji = "🙂";
  } else if (sentiment <= -1 && sentiment >= -40) {
    emoji = "🙁";
  } else if (sentiment <= -41 && sentiment >= -70) {
    emoji = "😢";
  } else if (sentiment <= -71) {
    emoji = "😭";
  }

  return emoji;
}
