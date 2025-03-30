import { getServerSession } from 'next-auth'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Filter } from 'lucide-react'

import { FilterDocumentsForm } from './form'

export const FilterAdvertisements = async () => {
  const session = await getServerSession(authOptions)
  const userIsAdmin = session?.user.role === 'ADMIN'

  const users = userIsAdmin
    ? await prisma.user.findMany({
        select: {
          id: true,
          name: true,
        },
      })
    : []

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hidden md:flex">
          <Button className="flex items-center gap-2">
            <Filter /> Filtrar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <ScrollArea className="max-h-screen w-full p-1">
            <FilterDocumentsForm users={users} />
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer>
        <DrawerTrigger asChild className="block sm:hidden">
          <Button className="flex items-center gap-2">
            <Filter /> Filtrar
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filtrar anúncios</DrawerTitle>
            <DrawerDescription>Selecione os filtros para encontrar os anúncios desejados.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">
                <FilterDocumentsForm users={users} />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const FilterAdvertisementsSkeleton = () => {
  return (
    <>
      <div className="hidden max-h-screen min-w-fit rounded-md border p-1 py-2 md:grid">
        <ScrollArea className="max-h-screen w-full p-1">
          <Button className="flex items-center gap-2">
            <Filter /> Filtrar
          </Button>
        </ScrollArea>
      </div>

      <div className="block sm:hidden">
        <Button className="flex items-center gap-2">
          <Filter /> Filtrar
        </Button>
      </div>
    </>
  )
}
