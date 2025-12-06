export type CategoryKind = "income" | "expense";

export type CategoryStatus = "active" | "inactive";

export type CategoryDto = {
  id: string;
  name: string;
  description: string;
  kind: CategoryKind;
  icon: string;
  color: string;
  status: CategoryStatus;
};
