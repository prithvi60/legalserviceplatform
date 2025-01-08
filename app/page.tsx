import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Link
        href={"/api/auth/signin"}
        className="px-4 py-2 bg-blue-600 text-white text-2xl"
      >
        Login
      </Link>
    </div>
  );
}
