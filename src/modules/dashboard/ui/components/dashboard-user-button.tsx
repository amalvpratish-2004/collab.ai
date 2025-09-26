import { useRouter } from "next/navigation"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import { motion } from "framer-motion"

import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession()

  const onLogout = () => {
    authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                router.push('/sign-in');
            }
        }
    })
  }

  if (isPending || !data?.user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar className="size-9 shrink-0">
            <AvatarImage src={data.user.image || "/placeholder.svg"} />
          </Avatar>
        ) : (
          <GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 shrink-0" />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-medium truncate w-full">{data.user.name}</p>
          <p className="text-xs text-muted-foreground truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.7,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
      <DropdownMenuContent align="start" side="top" className="w-72">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            {data.user.image ? (
              <Avatar className="size-8">
                <AvatarImage src={data.user.image || "/placeholder.svg"} />
              </Avatar>
            ) : (
              <GeneratedAvatar seed={data.user.name} variant="initials" className="size-8" />
            )}
            <div className="flex flex-col gap-1 overflow-hidden flex-1 min-w-0">
              <span className="font-medium truncate">{data.user.name}</span>
              <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => authClient.customer.portal()} className="cursor-pointer p-3 hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-500/10">
              <CreditCardIcon className="size-4 text-blue-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">Billing & Usage</span>
              <span className="text-xs text-muted-foreground">Manage subscription and invoices</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer p-3 hover:bg-red-500/10 transition-colors text-red-600 hover:text-red-700">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500/10">
              <LogOutIcon className="size-4 text-red-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">Sign Out</span>
              <span className="text-xs text-muted-foreground">Log out of your account</span>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </motion.div>
    </DropdownMenu>
  )
}
