// src/app/page.tsx
import { redirect } from "next/navigation";

export default async function Home() {
  const isAuthed = false;
  if (!isAuthed) redirect("/login");

  return <div>صفحهٔ اصلی</div>;
}
