const Background = () => (
  <>
    {/* Cyber-themed background elements */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"></div>
    {/* Glowing orb effects */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
  </>
);

export default Background;
