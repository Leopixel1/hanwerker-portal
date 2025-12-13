export function Header({ title }: { title: string }) {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-8">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
    </header>
  )
}
