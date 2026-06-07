type HomeNavbarProps = {
  onShowOtherSeries: () => void;
};

export function HomeNavbar({ onShowOtherSeries }: HomeNavbarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold tracking-[0.25em]">
          OROCHI
        </a>

        <div className="hidden items-center gap-8 text-sm text-white/50 md:flex">
          <a href="#godai" className="hover:text-white">
            Godai
          </a>

          <button onClick={onShowOtherSeries} className="hover:text-white">
            Other Series
          </button>

          <a href="/admin/login" className="hover:text-white">
            Admin
          </a>
        </div>
      </nav>
    </header>
  );
}