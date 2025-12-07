export const CATEGORY_KIND = {
  EXPENSE: "expense",
  INCOME: "income",
} as const;

export type CategoryKind = (typeof CATEGORY_KIND)[keyof typeof CATEGORY_KIND];

export const CATEGORY_ICON = {
  DOLLAR_SIGN: "dollar-sign",
  HOME: "home",
  BRIEFCASE: "briefcase",
  SHOPPING_CART: "shopping-cart",
} as const;

export type CategoryIcon = (typeof CATEGORY_ICON)[keyof typeof CATEGORY_ICON];

export const CATEGORY_COLOR = {
  GREEN: "green",
  BLUE: "blue",
  PURPLE: "purple",
  ORANGE: "orange",
} as const;

export type CategoryColor = (typeof CATEGORY_COLOR)[keyof typeof CATEGORY_COLOR];

export const CATEGORY_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type CategoryStatus = (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];
