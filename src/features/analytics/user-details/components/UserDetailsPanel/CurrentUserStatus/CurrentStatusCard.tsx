import { useUserCurrentStatus } from "../../../hooks/useUserCurrentStatus";
import CurrentUserStatus from ".";

export function CurrentStatusCard({ userId }: { userId: string }) {
  const { data, isLoading } = useUserCurrentStatus(userId);

  return <CurrentUserStatus data={data!} isLoading={isLoading} />;
}
