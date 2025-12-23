export type AnalyticsTab = "general" | "users";
export type StatusHeaderProps = {
  value: AnalyticsTab;
  onChange: (val: AnalyticsTab) => void;
};
