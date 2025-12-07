import { AlertCircleIcon } from "lucide-react";

import type { CategoryColor, CategoryIcon, CategoryKind, CategoryStatus } from "./enums";
import {
  CATEGORY_COLOR_MAP,
  CATEGORY_ICON_MAP,
  CATEGORY_KIND_MAP,
  CATEGORY_STATUS_MAP,
} from "./maps";

export function getCategoryKind(kind: string) {
  const mapping = CATEGORY_KIND_MAP[kind as CategoryKind];

  if (!mapping) {
    console.warn(`Unknown category kind: ${kind}`);
    return {
      label: "Desconhecido",
      icon: AlertCircleIcon,
      className: "text-slate-400",
    };
  }

  return mapping;
}

export function getCategoryIcon(icon: string) {
  const mapping = CATEGORY_ICON_MAP[icon as CategoryIcon];

  if (!mapping) {
    console.warn(`Unknown category icon: ${icon}`);
    return {
      label: "Ícone desconhecido",
      icon: AlertCircleIcon,
    };
  }

  return mapping;
}

export function getCategoryColor(color: string) {
  const mapping = CATEGORY_COLOR_MAP[color as CategoryColor];

  if (!mapping) {
    console.warn(`Unknown category color: ${color}`);
    return {
      label: "Cor desconhecida",
      className: "text-slate-400",
    };
  }

  return mapping;
}

export function getCategoryStatus(status: string) {
  const mapping = CATEGORY_STATUS_MAP[status as CategoryStatus];

  if (!mapping) {
    console.warn(`Unknown category status: ${status}`);
    return {
      label: "Status desconhecido",
      className: "text-slate-400",
    };
  }

  return mapping;
}
