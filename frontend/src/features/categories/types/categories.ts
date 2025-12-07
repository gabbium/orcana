import type { CategoryColor, CategoryIcon, CategoryKind, CategoryStatus } from "../constants/enums";

export type Category = {
  id: string;
  name: string;
  description: string;
  kind: CategoryKind;
  icon: CategoryIcon;
  color: CategoryColor;
  status: CategoryStatus;
};
