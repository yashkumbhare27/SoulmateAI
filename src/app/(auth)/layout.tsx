export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FCFAF7] to-[#E8A0BF]/30 dark:from-[#0F0B13] dark:to-[#8B5FBF]/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          {/* Logo Placeholder */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B5FBF] to-[#E8A0BF] shadow-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl font-serif">S</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white">SoulMate AI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-sans">Find your perfect match</p>
        </div>
        {children}
      </div>
    </div>
  );
}
