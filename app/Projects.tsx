import Image from "next/image";
import { AppWindowMac } from "lucide-react";
export default function Projects() {
  return (
    <section className="scroll-mt-10 max-w-7xl mx-auto px-6 py-24" id="projects">
      <h2 className="font-['Manrope'] text-lg font-bold tracking-[0.3em] text-[#7bd0ff] uppercase mb-12 flex items-center gap-4 opacity-0 animate-fadeUp">
        <span className="w-8 h-[1px] bg-[#7bd0ff]" />
        02 // PROJECTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Large Card */}
        <div className="md:col-span-2 p-8 bg-[#171f33] rounded-lg border border-[#45464d]/10 relative group
          opacity-0 animate-fadeUp animate-delay-1
          transition-all duration-300
          hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(123,208,255,0.15)]
          hover:border-[#7bd0ff]/30"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-['Manrope'] text-2xl sm:text-3xl font-bold text-[#dae2fd] mb-2">
                NEURAL_STREAM V4
              </h3>
              <p className="text-[#b8c1ec] max-w-md">
                Real-time processing engine for high-frequency trading data, utilizing Kafka and
                specialized Go routines for{" "}
                <span className="font-['JetBrains_Mono'] text-[#7bd0ff]">2ms latency</span>.
              </p>
            </div>

            <span className="material-symbols-outlined text-4xl text-[#7bd0ff]/20 
              group-hover:text-[#7bd0ff] transition-all duration-300 
              group-hover:scale-110">
              <AppWindowMac/>
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {["GO_1.21", "APACHE_KAFKA", "KUBERNETES", "PROMETHEUS"].map((tag) => (
              <span
                key={tag}
                className="font-['JetBrains_Mono'] text-[10px] bg-[#2d3449] px-2 py-1 rounded text-[#b9c7e0] border border-[#45464d]/20
                transition-all duration-300 hover:bg-[#7bd0ff]/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 opacity-40 group-hover:opacity-100 transition-all duration-500">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFnFENQU0NR8aPNKiyAw1wuRK_NYFlORooBAWmefvkfdNmUu5Pl3sIskvp90mE9VmniCK5yaPuZemu3RPD-Ku_QRsADj3S8Cw95Tg1jO_tvFstkVcid-0fwFydYzJmPZs9qFccUvyhxJ9RAQnimyD38zQUxo5nV17suakN4Sz3QWzQHNNpm-cwO3kV-iOWXBo6TUsNehh90031AVeOp9VO8JS9xezRdDKu5jGKeJd5UN6cUjhVLK7xLwiAEZ75bP1A3-8eOWFmL9uQ"
              alt=""
              width={800}
              height={192}
              className="w-full h-48 object-cover rounded grayscale 
              group-hover:grayscale-0 group-hover:scale-[1.03]
              transition-all duration-500"
              unoptimized
            />
          </div>
        </div>

        {/* Small Card 1 */}
        <div className="p-8 bg-[#131b2e] rounded-lg border border-[#45464d]/10 flex flex-col justify-between
          opacity-0 animate-fadeUp animate-delay-2
          transition-all duration-300
          hover:-translate-y-2 hover:bg-[#1b2336]
          hover:border-[#7bd0ff]/30 hover:shadow-[0_0_25px_rgba(123,208,255,0.12)]"
        >
          <div>
            <span className="text-[10px] text-[#7bd0ff]/60 tracking-widest uppercase mb-4 block">
              SaaS_Product
            </span>
            <h3 className="text-xl font-bold text-[#dae2fd] mb-4">
              SENTINEL_AUTH
            </h3>
            <p className="text-sm text-[#9aa4d4] mb-6">
              Zero-trust authentication provider built as a sidecar proxy for microservices.
              Integrated with AWS KMS.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["RUST", "AWS_SDK"].map((tag) => (
              <span key={tag} className="text-[10px] bg-[#2d3449] px-2 py-1 rounded text-[#b9c7e0]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Small Card 2 */}
        <div className="p-8 bg-[#131b2e] rounded-lg border border-[#45464d]/10 flex flex-col justify-between
          opacity-0 animate-fadeUp animate-delay-3
          transition-all duration-300
          hover:-translate-y-2 hover:bg-[#1b2336]
          hover:border-[#7bd0ff]/30 hover:shadow-[0_0_25px_rgba(123,208,255,0.12)]"
        >
          <div>
            <span className="text-[10px] text-[#7bd0ff]/60 tracking-widest uppercase mb-4 block">
              Open_Source
            </span>
            <h3 className="text-xl font-bold text-[#dae2fd] mb-4">
              PY_FLOW_GEN
            </h3>
            <p className="text-sm text-[#9aa4d4] mb-6">
              A minimalist Python library for generating DAG-based workflows with native typing
              and async support.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["PYTHON_3.11", "PYPI"].map((tag) => (
              <span key={tag} className="text-[10px] bg-[#2d3449] px-2 py-1 rounded text-[#b9c7e0]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Medium Card */}
        <div className="md:col-span-2 p-8 bg-[#171f33] rounded-lg border border-[#45464d]/10 relative flex gap-8 items-center overflow-hidden
          opacity-0 animate-fadeUp animate-delay-4
          transition-all duration-300
          hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(123,208,255,0.15)]
          hover:border-[#7bd0ff]/30"
        >
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#dae2fd] mb-4">
              GRAPH_SCHEMA_VIZ
            </h3>
            <p className="text-[#b8c1ec] mb-6">
              Interactive schema visualizer for GraphQL and Neo4j. Handles schemas with 500+
              nodes without UI lag.
            </p>

            <div className="flex flex-wrap gap-3">
              {["REACT", "D3.JS", "NEO4J"].map((tag) => (
                <span key={tag} className="text-[10px] bg-[#2d3449] px-2 py-1 rounded text-[#b9c7e0] border border-[#45464d]/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="w-1/3 hidden lg:block">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTN9g-vA3Xp41ec2ZnLK-zF2R2321YbMuqBCGXn-Ror6cujTazBkx2YhTqoN2zp8C0aQfBHlA3gbqJsO-wMZzW6p4nJ54UXLlqGhOZCjOviwyvYBTLclfQM5arPd-gHZQT-dU8xfLbyFpl6ttEXaFTPVgY4L8EmRoi7STznUJ5T1f_aRvgH6MMWIiFrHHEJYNAba57T0ounn1rUgKdcM9OiOvVsCWj-n62FFQqEFsX8vex1ibpa4A24lfw9s0hru-mGCXGsNyLJU0B"
              alt=""
              width={400}
              height={160}
              className="w-full h-40 object-cover rounded opacity-20 
              group-hover:opacity-40 transition-all duration-500"
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
}