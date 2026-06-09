import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "2026 世界杯 48 队小组地图",
  description: "2026 FIFA World Cup 响应式小组展示、核心看点与比赛时间表",
  manifest: "/manifest.json",
  applicationName: "World Cup 2026 战术地图",
  appleWebApp: {
    capable: true,
    title: "世界杯2026",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <meta name="baidu-site-verification" content="codeva-lrilodarxV" />
      </head>
      <body className="min-h-screen bg-slate-900 text-slate-100 antialiased">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.16),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(248,113,113,0.12),transparent_30%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1))]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
