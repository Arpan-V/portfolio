"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Code, Briefcase, MessageSquare, Send } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="scroll-mt-10 w-full border-t border-[#45464d] bg-[#101415]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-22">
        {/* Section label */}
        {/* <h2 className="mb-6 flex items-center gap-3 font-['Manrope'] text-sm font-bold uppercase tracking-[0.25em] text-[#7bd0ff] sm:mb-8 sm:gap-4 sm:text-lg sm:tracking-[0.3em]">
          <span className="block h-[1px] w-8 bg-[#7bd0ff]" />
          <span>03 // CONTACT</span>
        </h2> */}

        {/* Header */}
        <div className="mb-12 max-w-2xl md:mb-9 lg:mb-9">
          <motion.h2
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: EASE }}
            className="mb-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Let&apos;s build something <span className="text-sky-dim">exceptional.</span> 
          </motion.h2>
          <p className="font-body text-base leading-relaxed text-silver/80 sm:text-lg">
            I&apos;m currently open for new opportunities. Whether you have a
            question or just want to say hi, I&apos;ll try my best to get back
            to you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-9">
          {/* Contact info panel */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-lg border border-[#45464d] bg-[#0f172a] p-6 sm:p-8">
              <div>
                <h3 className="mb-6 font-display text-lg font-bold text-[#dae2fd]">
                  Direct Connect
                </h3>

                <div className="flex flex-col gap-6">
                  <a
                    href="mailto:arpan@example.com"
                    className="group flex items-center gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#45464d] bg-[#131b2e]">
                      <Mail className="h-5 w-5 text-[#7bd0ff]" />
                    </div>
                    <div>
                      <div className="mb-1 font-display text-[10px] uppercase tracking-[0.25em] text-silver/60">
                        Email
                      </div>
                      <div className="font-body text-sm text-silver/90 transition-colors group-hover:text-[#7bd0ff]">
                        arpan@example.com
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#45464d] bg-[#131b2e]">
                      <MapPin className="h-5 w-5 text-[#7bd0ff]" />
                    </div>
                    <div>
                      <div className="mb-1 font-display text-[10px] uppercase tracking-[0.25em] text-silver/60">
                        Location
                      </div>
                      <div className="font-body text-sm text-silver/90">
                        Bengaluru, India (Remote)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-[#45464d] pt-8">
                <h3 className="mb-4 font-display text-[10px] uppercase tracking-[0.25em] text-silver/60">
                  Digital Presence
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/arpan-v"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded border border-[#7bd0ff] md:border-[#45464d] bg-[#131b2e] text-[#7bd0ff] md:text-silver/80 transition-colors hover:text-[#7bd0ff] hover:border-[#7bd0ff]"
                  >
                    <Code className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded border border-[#7bd0ff] md:border-[#45464d] bg-[#131b2e] text-[#7bd0ff] md:text-silver/80 transition-colors hover:text-[#7bd0ff] hover:border-[#7bd0ff]"
                  >
                    <Briefcase className="h-4 w-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="flex h-10 w-10 items-center justify-center rounded border border-[#7bd0ff] md:border-[#45464d] bg-[#131b2e] text-[#7bd0ff] md:text-silver/80 transition-colors hover:text-[#7bd0ff] hover:border-[#7bd0ff]"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-6 rounded-lg border border-[#45464d] bg-[#0f172a] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-display text-xs uppercase tracking-[0.2em] text-silver/70"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="rounded border border-[#45464d] bg-[#1d2022] p-3 font-body text-sm text-foreground placeholder:text-silver/40 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-display text-xs uppercase tracking-[0.2em] text-silver/70"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="rounded border border-[#45464d] bg-[#1d2022] p-3 font-body text-sm text-foreground placeholder:text-silver/40 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="font-display text-xs uppercase tracking-[0.2em] text-silver/70"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  className="rounded border border-[#45464d] bg-[#1d2022] p-3 font-body text-sm text-foreground placeholder:text-silver/40 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-display text-xs uppercase tracking-[0.2em] text-silver/70"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="resize-y rounded border border-[#45464d] bg-[#1d2022] p-3 font-body text-sm text-foreground placeholder:text-silver/40 outline-none focus:border-[#7bd0ff] focus:ring-1 focus:ring-[#7bd0ff]/30"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer mt-2 inline-flex items-center justify-center gap-2 self-start bg-[#7bd0ff] px-8 py-3 font-display text-sm font-bold uppercase tracking-widest text-[#131b2e] transition-all duration-150 hover:bg-[#a8e1ff] active:translate-y-[2px] active:scale-[0.98]"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
