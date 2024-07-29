'use client'

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1>Home page</h1>
      <button className="border-2" onClick={() => router.push('/create-user')}>Create user</button>
    </>
  );
}
