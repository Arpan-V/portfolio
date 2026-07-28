export default function Footer() {
  return (
    <footer className="bg-[#0b1326] border-t border-[#bec6e0]/5 w-full py-12 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
        <div className="font-['JetBrains_Mono'] text-[#7bd0ff] font-medium text-xs">
          SYSTEM_LOG:{" "}
          <span className="text-[#c6c6cd]/50">SUCCESSFUL_RENDER</span>
        </div>
        <div className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-[0.2em] text-[#bec6e0]/50">
          © 2024 SYSTEM_ARCHITECT. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          <a
            href="#"
            className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-[0.2em] text-[#bec6e0]/50 hover:text-[#7bd0ff] hover:tracking-[0.3em] transition-all duration-500"
          >
            GITHUB
          </a>
          <a
            href="#"
            className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-[0.2em] text-[#bec6e0]/50 hover:text-[#7bd0ff] hover:tracking-[0.3em] transition-all duration-500"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}