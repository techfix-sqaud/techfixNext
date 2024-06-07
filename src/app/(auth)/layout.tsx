import PageIllustration from "@/components/UI/page-illustration";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow">
      <PageIllustration />

      {children}
    </main>
  );
}
