export function UserDetailsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-start items-center gap-2">
        <div className="w-5 h-5  bg-gray-200 rounded-lg" />
        <div className="w-2/5 h-10  bg-gray-200 rounded-2xl" />
        <div className="w-8 h-6  bg-gray-200 rounded-2xl mr-auto" />
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="w-5 h-5  bg-gray-200 rounded-lg" />
        <div className="w-2/5 h-10  bg-gray-200 rounded-2xl" />
        <div className="w-8 h-6  bg-gray-200 rounded-2xl mr-auto" />
      </div>
      <div className="flex justify-start items-center gap-2">
        <div className="w-5 h-5  bg-gray-200 rounded-lg" />
        <div className="w-2/5 h-10  bg-gray-200 rounded-2xl" />
        <div className="w-8 h-6  bg-gray-200 rounded-2xl mr-auto" />
      </div>
      <div className="w-full h-12 bg-gray-200 rounded-2xl " />
    </div>
  );
}
