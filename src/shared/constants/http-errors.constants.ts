const prefix = 'ATC error: ';

export const httpErrors = {
  findAllRestaurants: `${prefix}could not get the restaurants.`,
  findOneRestaurant: `${prefix}could not get the restaurant`,
  closedRestaurant: `${prefix}restaurant is closed`,

  findAllMeals: `${prefix}could not get the meals`,
  findOneMeal: `${prefix}could not get the meal`,

  findAllSections: `${prefix}could not get the sections`,
  findOneSection: `${prefix}could not get the section`,

  findAllCategories: `${prefix}could not get the categories`,
  findOneCategory: `${prefix}could not get the category`,

  findAllUsers: `${prefix}could not get the users`,
  findOneUser: `${prefix}could not get the user`,
  userDisabled: `${prefix}user disabled`,

  incorrectUserOrPassword: `${prefix} user or password incorrect`,
  disabledUser: `${prefix}this user is disabled`,
  createToken: `${prefix}the token not be created`,
  verifyRefreshToken: `${prefix}the refresh token is invalid`,
  logout: `${prefix}logout failed`,

  findAllDeliveryMen: `${prefix}could not get the delivery men`,
  findOneDeliveryMan: `${prefix}could not get the delivery man`,

  createCustomer: `${prefix}the customer could not be created`,
  updateCustomer: `${prefix}the customer could not be updated`,
  findOneCustomer: `${prefix}could not get the customer`,

  createLike: `${prefix}the like could not be created`,
  deleteLike: `${prefix}the like could not be deleted`,
  getLikes: `${prefix}could not get the likes`,

  createOrder: `${prefix}the order could not be processing`,
  cancelOrder: `${prefix}the order not be canceled`,
};
