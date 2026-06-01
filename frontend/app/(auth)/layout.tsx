export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full">{children}</div>
    </div>
  );
}
