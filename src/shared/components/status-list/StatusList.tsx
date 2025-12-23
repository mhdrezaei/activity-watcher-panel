import { StatusItem, StatusFooter } from "./types";
import { StatusListItem } from "./StatusListItem";
import { StatusListFooter } from "./StatusListFooter";

type Props = {
  items: StatusItem[];
  footer?: StatusFooter;
};

export function StatusList({ items, footer }: Props) {
  return (
    <div className="space-y-6 text-sm">
      {items.map((item) => (
        <StatusListItem key={item.id} item={item} />
      ))}

      {footer && <StatusListFooter {...footer} />}
    </div>
  );
}
