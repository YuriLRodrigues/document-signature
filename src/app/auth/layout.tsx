export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="from-background via-background/60 relative min-h-screen overflow-hidden bg-gradient-to-br to-blue-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.3),transparent_70%)]" />
      <section className="relative z-[50]">{children}</section>
    </div>
  )
}
