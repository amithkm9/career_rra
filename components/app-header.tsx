"use client"

import Link from "next/link"
import Image from "next/image"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export function AppHeader() {
  const router = useRouter()
  const { signOut, user } = useAuth()

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-without-name.png" alt="ClassMent Logo" width={40} height={40} />
          <span className="text-xl font-bold">ClassMent</span>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden md:block text-right mr-4">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground">Logged in</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
