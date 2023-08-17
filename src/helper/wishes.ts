const existWishes = localStorage.getItem('wishlist')
  ? JSON.parse(localStorage.getItem('wishlist') || '')
  : [];

export const storeRecipe = (data: any) => {
  const wishesList = [...existWishes, data];
  localStorage.setItem('wishlist', JSON.stringify(wishesList));
};
export const removeRecipe = (id: number) => {
  let removeIndex = existWishes.map((item: any) => item.id).indexOf(id);
  existWishes.splice(removeIndex, 1);
  localStorage.setItem('wishlist', JSON.stringify(existWishes));
};
export const readFavoritesWishes = () => {
  return existWishes;
};
