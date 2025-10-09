"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Bell,
  Plus,
  Landmark,
  Send,
  ArrowDownLeft,
  Wallet,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ModernSidebar } from "@/components/modern-sidebar"
import { AppBar } from "@/components/app-bar"
import { cn } from "@/lib/utils"

const quickActions = [
  {
    id: "deposit",
    label: "Deposit",
    description: "Add USDC from connected wallets or bank",
    icon: Plus,
  },
  {
    id: "bank",
    label: "To bank",
    description: "Bridge USDC to traditional rails",
    icon: Landmark,
  },
  {
    id: "send",
    label: "Send",
    description: "Transfer to team members instantly",
    icon: Send,
  },
  {
    id: "get-paid",
    label: "Get Paid",
    description: "Generate deposit requests or share link",
    icon: ArrowDownLeft,
  },
] as const

const recentTransfers = [
  {
    id: 1,
    direction: "out",
    counterparty: "Orbit Design Studio",
    amount: "-1,250.00",
    descriptor: "Milestone payout",
    time: "2h ago",
    status: "Completed",
  },
  {
    id: 2,
    direction: "in",
    counterparty: "LayerZero Ops",
    amount: "+4,500.00",
    descriptor: "Treasury top-up",
    time: "Yesterday",
    status: "Cleared",
  },
  {
    id: 3,
    direction: "out",
    counterparty: "Velocity Labs",
    amount: "-820.00",
    descriptor: "Bonus stream",
    time: "2 days ago",
    status: "Pending",
  },
]

export function Payments() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* App Bar */}
      <AppBar />

      {/* Modern Sidebar */}
      <ModernSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen pt-24 px-8 pb-8 space-y-8 transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-72"
        )}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-900">Payments & Treasury</h1>
          <p className="text-slate-600">Manage USDC liquidity, pay teams, and monitor programmable payouts.</p>
        </div>

        {/* Balance Overview */}
        <section className="grid gap-6 xl:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 shadow-2xl backdrop-blur-xl xl:col-span-2">
            <div className="pointer-events-none absolute right-[-8%] top-[-15%] h-64 w-64 opacity-30">
              <Image src="/usdc.png" alt="USDC token" fill className="object-contain" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100/60 via-white/50 to-white/20"></div>

            <div className="relative z-10 flex flex-col gap-8 p-8 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overall Balance</p>
                  <h2 className="mt-4 text-5xl font-semibold text-slate-900">$128,450.12</h2>
                  <p className="mt-2 text-sm text-slate-600">Balance on Solana (USDC)</p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Button variant="neo" size="sm" className="px-4">
                    <Wallet className="mr-2 h-4 w-4" />
                    Manage Wallets
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Streaming Out (24h)</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">$12,900</p>
                  <p className="text-xs text-emerald-500">+4.1% vs yesterday</p>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Available to Deploy</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">$42,730</p>
                  <p className="text-xs text-slate-500">Ready for one-click payroll</p>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Yield Vault</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">$18,400</p>
                  <p className="text-xs text-sky-500">Earning 3.8% APY</p>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Compliance Buffer</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">$8,420</p>
                  <p className="text-xs text-slate-500">Segregated for tax & filings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-900/20 bg-slate-900 text-slate-100 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900/90"></div>
            <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-40">
              <Image src="/usdc.png" alt="USDC icon" fill className="object-contain" />
            </div>
            <div className="relative z-10 flex h-full flex-col gap-6 p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-200">Settlement Guard</p>
              </div>
              <h3 className="text-2xl font-semibold text-white">Automated Compliance</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Corridor continuously monitors every transfer, ensures travel rule compliance, and prepares audit-ready exports for tax filings.
              </p>
              <Button variant="neoOutline" size="sm" className="self-start border-white/30 bg-white/10 text-white hover:bg-white/20">
                Review Controls
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                className="group flex flex-col gap-4 rounded-2xl border border-white/60 bg-white/75 p-6 text-left shadow transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center rounded-full bg-sky-100 p-3 text-sky-600 shadow-inner">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-sky-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{action.label}</h4>
                  <p className="mt-1 text-sm text-slate-500">{action.description}</p>
                </div>
              </button>
            )
          })}
        </section>

        {/* Recent Transfers */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Recent USDC Activity</h3>
                <p className="text-sm text-slate-500">Streaming settlements, reimbursements, and treasury moves.</p>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                View all
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              {recentTransfers.map((transfer) => (
                <div
                  key={transfer.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-full",
                        transfer.direction === "in" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {transfer.direction === "in" ? <ArrowDownLeft className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{transfer.counterparty}</p>
                      <p className="text-sm text-slate-500">{transfer.descriptor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "font-semibold",
                      transfer.direction === "in" ? "text-emerald-600" : "text-slate-700"
                    )}>
                      ${transfer.amount}
                    </p>
                    <div className="flex items-center justify-end gap-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {transfer.time}
                      <Badge
                        variant="secondary"
                        className={cn(
                          "border-none bg-slate-100 text-slate-600",
                          transfer.status === "Completed" && "bg-emerald-100 text-emerald-600",
                          transfer.status === "Pending" && "bg-amber-100 text-amber-600"
                        )}
                      >
                        {transfer.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-slate-900">Counterparty Health</h3>
            <p className="text-sm text-slate-500">Monitor counterparties, their verification status, and velocity caps.</p>

            <div className="space-y-3">
              {["Orbit Design Studio", "LayerZero Ops", "Velocity Labs"].map((name) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/70 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-medium">
                        {name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">Verified • Limit $50k / 24h</p>
                    </div>
                  </div>
                  <Badge className="border-none bg-emerald-100 text-emerald-600">Trusted</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
