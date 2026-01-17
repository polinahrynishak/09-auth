export default function NotesRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="notes-container">{children}</div>;
}
