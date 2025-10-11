"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { 
  Home, 
  Wallet, 
  Send, 
  Building2, 
  ChevronDown,
  ChevronRight,
  FileText,
  ChevronLeft,
  Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  submenu?: SubMenuItem[]
}

interface SubMenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/home"
  },
  {
    id: "business",
    label: "Business",
    icon: Briefcase,
    submenu: [
      {
        id: "payroll",
        label: "Payroll",
        icon: Wallet,
        href: "/payroll"
      },
      {
        id: "orgs",
        label: "Orgs",
        icon: Building2,
        href: "/organizations"
      },
      {
        id: "reports",
        label: "Reports",
        icon: FileText,
        href: "/reports"
      }
    ]
  },
  {
    id: "ezcash",
    label: "Ez Cash",
    icon: Send,
    href: "/payments"
  }
]

interface ModernSidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function ModernSidebar({ collapsed = false, onToggleCollapse }: ModernSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["business"])
  const router = useRouter()
  const pathname = usePathname()

  const toggleExpanded = (itemId: string) => {
    if (collapsed) return
    
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const isActive = (href?: string, submenu?: SubMenuItem[]) => {
    if (href) {
      if (href === "/payments") {
        return pathname === "/payments"
      }
      return pathname === href || pathname.startsWith(href + "/")
    }
    if (submenu) {
      return submenu.some(item => pathname === item.href || pathname.startsWith(item.href + "/"))
    }
    return false
  }

  const isSubmenuItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 bg-white/95 backdrop-blur-md border-r border-slate-200/80 transition-all duration-300 ease-in-out h-screen z-40",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Collapse Toggle Button */}
      {onToggleCollapse && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-20 z-[60] h-6 w-6 rounded-full border border-slate-200 bg-white shadow-md hover:bg-slate-50 hover:shadow-lg transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3 text-slate-600" />
          ) : (
            <ChevronLeft className="h-3 w-3 text-slate-600" />
          )}
        </Button>
      )}

      {/* Sidebar Content */}
      <div className="flex flex-col h-full overflow-hidden pt-16">
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isExpanded = expandedItems.includes(item.id)
            const itemIsActive = isActive(item.href, item.submenu)

            return (
              <div key={item.id} className="space-y-1">
                {/* Main Item */}
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleExpanded(item.id)
                    } else if (item.href) {
                      handleNavigation(item.href)
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group",
                    "hover:bg-slate-50/80 hover:shadow-sm",
                    itemIsActive 
                      ? "text-blue-700" 
                      : "text-slate-600 hover:text-slate-900",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    itemIsActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-700",
                    collapsed ? "h-5 w-5" : "h-5 w-5"
                  )} />
                  
                  {!collapsed && (
                    <>
                      <span className="font-medium text-sm flex-1">{item.label}</span>
                      {hasSubmenu && (
                        <div className={cn(
                          "transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )}>
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        </div>
                      )}
                    </>
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && !collapsed && (
                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="ml-8 space-y-1 py-1">
                      {item.submenu?.map((subItem) => {
                        const SubIcon = subItem.icon
                        const subIsActive = isSubmenuItemActive(subItem.href)

                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigation(subItem.href)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group text-sm",
                              "hover:bg-slate-50/60",
                              subIsActive 
                                ? "bg-blue-50/60 text-blue-700 font-medium" 
                                : "text-slate-500 hover:text-slate-700"
                            )}
                          >
                            <SubIcon className={cn(
                              "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                              subIsActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                            )} />
                            <span>{subItem.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
