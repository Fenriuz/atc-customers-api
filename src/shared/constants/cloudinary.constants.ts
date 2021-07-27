export const cloudinaryFolders = {
  url: `https://res.cloudinary.com/a-tu-casa`,
  restaurants: 'restaurants',
  get restaurantCovers() {
    return this.restaurants + '/covers';
  },
  get restaurantLogos() {
    return this.restaurants + '/logos';
  },
  meals: 'meals',
};
