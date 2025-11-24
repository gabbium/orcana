import { DayPicker } from "react-day-picker";

import { Button } from "@/components/ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};
