export default function Contact() {
  return (
    <section className="scroll-mt-10 max-w-3xl mx-auto px-6 py-32 text-center" id="contact">
      <h2 className="font-['Manrope'] text-3xl sm:text-4xl font-extrabold text-[#dae2fd] mb-6">
        READY TO SCALE?
      </h2>
      <p className="font-['Manrope'] text-[#c6c6cd] text-lg mb-12">
        I&apos;m currently open to lead engineering roles or high-impact consultancy projects.
        Let&apos;s discuss your architectural challenges.
      </p>
      <div className="flex flex-col items-center gap-6">
        <a
          href="#"
          className="inline-flex items-center gap-4 bg-[#bec6e0] text-[#283044] px-10 py-4 font-['Space_Grotesk'] font-bold text-sm tracking-widest hover:bg-[#7bd0ff] transition-all duration-300 uppercase shadow-lg shadow-[#7bd0ff]/10"
        >
          <span className="material-symbols-outlined">download</span>
          DOWNLOAD RESUME_V2.PDF
        </a>
        <p className="font-['JetBrains_Mono'] text-xs text-[#c6c6cd]/40 uppercase">
          SHA-256: 8e3f9a2c...b4e1
        </p>
      </div>
    </section>
  );
}