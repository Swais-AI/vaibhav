"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggleSidebar", handleToggle);

    return () => {
      window.removeEventListener("toggleSidebar", handleToggle);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <div>
          <h2>SWAIS-VANIJYA</h2>
          <p>SWAIS Demo Warehouse</p>
        </div>

        <button
          className="sidebar-close-btn"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="sidebar-line"></div>

      <nav className="sidebar-menu">
        <Link href="/">🏠 Dashboard</Link>
        <Link href="/truck-schedule">🚚 Truck Schedule</Link>
        <Link href="/ai-recommendations">🤖 AI Recommendations</Link>
        <Link href="/arrival-predictions">📈 Arrival Predictions</Link>
        <Link href="/dock-utilization">🏭 Dock Utilization</Link>
        <Link href="/congestion">⚠️ Congestion</Link>
        <Link href="/alerts">🔔 Alerts</Link>
      </nav>
    </aside>
  );
}
