import Link from 'next/link'

import { FileSignature } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-background w-full border-t px-4">
      <div className="flex flex-col items-center justify-between gap-4 py-4 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <FileSignature className="text-primary h-6 w-6" />
          <span className="text-lg font-bold">DocSign</span>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6">
          <ul className="flex gap-4 sm:gap-6">
            <li>
              <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline">
                Termos
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline">
                Privacidade
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 text-center text-sm">
        &copy; {new Date().getFullYear()} DocSign - Yuri Leite Rodrigues. Todos os direitos reservados.
      </p>
    </footer>
  )
}
