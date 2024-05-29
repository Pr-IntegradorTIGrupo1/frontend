import Link from "next/link";

export default function GoBackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 w-full">
        <Link href="/user/dashboard/">
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
                Volver
            </button>
        </Link>
        {children}
    </div>
  );
}