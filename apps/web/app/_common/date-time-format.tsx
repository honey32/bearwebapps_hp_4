import type { ComponentPropsWithRef } from "react";

export const dateTimeFormat = {
  default: new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
  }),
};

export const isoStringToFormattedDateTime = (
  isoString: string,
  formatter: Intl.DateTimeFormat = dateTimeFormat.default,
) => {
  return formatter.format(new Date(isoString));
};

type TimeProps = ComponentPropsWithRef<"time">;

type Props = TimeProps & {
  dateTime: NonNullable<TimeProps["dateTime"]>;
  formatter?: Intl.DateTimeFormat;
};

export function Time({ dateTime, formatter, ...props }: Props) {
  return (
    <time dateTime={dateTime} {...props}>
      {isoStringToFormattedDateTime(dateTime, formatter)}
    </time>
  );
}
