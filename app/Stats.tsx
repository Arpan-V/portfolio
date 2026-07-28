const repos = [
  {
    name: "main_frame/core-engine",
    language: "Go",
    langColor: "bg-blue-500",
    commits: 412,
    stars: "1.2k",
  },
  {
    name: "open_source/async-task-py",
    language: "Python",
    langColor: "bg-yellow-500",
    commits: 158,
    stars: "842",
  },
  {
    name: "infra/terraform-modules-aws",
    language: "HCL",
    langColor: "bg-purple-500",
    commits: 89,
    stars: "231",
  },
];

const metrics = [
  { label: "Global_Rank", value: "TOP 2%" },
  { label: "Total_PRs", value: "1,482" },
  { label: "Open_Issues", value: "14" },
  { label: "Uptime_Record", value: "99.98%" },
];

export default function Stats() {
  return (
    <section className="scroll-mt-10 bg-[#060e20] py-24 border-y border-[#45464d]/5" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-['Manrope'] text-sm font-bold tracking-[0.3em] text-[#7bd0ff] uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#7bd0ff]" />
              03 // GIT_METRICS
            </h2>
            <h3 className="font-['Manrope'] text-3xl sm:text-4xl font-extrabold text-[#dae2fd]">
              ANALYTICS ENGINE
            </h3>
          </div>
          <div className="text-right">
            <p className="font-['JetBrains_Mono'] text-xs text-[#c6c6cd] mb-2">
              LAST_FETCHED: 2024-05-20_14:30:01
            </p>
            <div className="h-1 w-48 bg-[#2d3449] rounded-full overflow-hidden">
              <div className="h-full bg-[#7bd0ff] w-3/4" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-[#45464d]/20">
                <th className="pb-6 font-['Space_Grotesk'] text-[10px] text-[#7bd0ff] uppercase tracking-widest">
                  Repository_Name
                </th>
                <th className="pb-6 font-['Space_Grotesk'] text-[10px] text-[#7bd0ff] uppercase tracking-widest text-center">
                  Language
                </th>
                <th className="pb-6 font-['Space_Grotesk'] text-[10px] text-[#7bd0ff] uppercase tracking-widest text-center">
                  Commits_2024
                </th>
                <th className="pb-6 font-['Space_Grotesk'] text-[10px] text-[#7bd0ff] uppercase tracking-widest text-right">
                  Stars
                </th>
              </tr>
            </thead>
            <tbody className="font-['JetBrains_Mono'] text-sm">
              {repos.map((repo) => (
                <tr
                  key={repo.name}
                  className="border-b border-[#45464d]/5 hover:bg-[#171f33]/50 transition-colors"
                >
                  <td className="py-6 text-[#dae2fd]">{repo.name}</td>
                  <td className="py-6 text-center text-[#c6c6cd]">
                    <span className={`w-2 h-2 inline-block rounded-full ${repo.langColor} mr-2`} />
                    {repo.language}
                  </td>
                  <td className="py-6 text-center text-[#c6c6cd]">{repo.commits}</td>
                  <td className="py-6 text-right text-[#7bd0ff]">{repo.stars}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="font-['Space_Grotesk'] text-[10px] text-[#c6c6cd]/60 uppercase tracking-widest mb-2">
                {m.label}
              </p>
              <p className="font-['Manrope'] text-2xl sm:text-3xl font-bold text-[#dae2fd]">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}