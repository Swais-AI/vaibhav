export default function Header() {
  return (
    <div className="header">
      <button
        className="menu-btn"
        onClick={() => window.dispatchEvent(new Event("toggleSidebar"))}
      >
        ☰
      </button>

      <div>
        <h1>Dock Scheduling Optimization</h1>
        <p>AI-powered dock planning, truck prediction, and congestion control</p>
      </div>
    </div>
  );
}
