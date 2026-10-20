import type { ComponentPropsWithRef, FC } from "react";

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

export const Time: FC<Props> = ({ dateTime, formatter, ...props }) => {
  return (
    <time dateTime={dateTime} {...props}>
      {isoStringToFormattedDateTime(dateTime, formatter)}
    </time>
  );
};
