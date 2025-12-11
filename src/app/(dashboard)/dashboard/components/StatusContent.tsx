import { GeneralStatus } from "./GeneralStatus/GeneralStatus";
import { UserStatus } from "./UserStatus";

export function StatusContent({ currentTab }: { currentTab: string }) {
  return (
    <div className="mt-6">
      {currentTab === "general" && <GeneralStatus />}
      {currentTab === "users" && <UserStatus />}
    </div>
  );
}
