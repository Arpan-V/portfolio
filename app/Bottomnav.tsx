export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-8 w-full flex justify-center z-50">
      <nav className="bg-[#0b1326]/80 backdrop-blur-lg border border-[#bec6e0]/10 rounded-[0.75rem] px-6 py-3 w-max flex gap-8 shadow-[0_0_40px_rgba(11,19,38,0.5)]">
        <a
          href="#"
          className="text-[#7bd0ff] bg-[#7bd0ff]/10 rounded-full p-2 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined">home</span>
        </a>
        <a
          href="#projects"
          className="text-[#bec6e0]/40 p-2 hover:bg-[#bec6e0]/5 rounded-full transition-all active:scale-90"
        >
          <span className="material-symbols-outlined">rebase_edit</span>
        </a>
        <a
          href="#stats"
          className="text-[#bec6e0]/40 p-2 hover:bg-[#bec6e0]/5 rounded-full transition-all active:scale-90"
        >
          <span className="material-symbols-outlined">code</span>
        </a>
        <a
          href="#contact"
          className="text-[#bec6e0]/40 p-2 hover:bg-[#bec6e0]/5 rounded-full transition-all active:scale-90"
        >
          <span className="material-symbols-outlined">mail</span>
        </a>
      </nav>
    </div>
  );
}