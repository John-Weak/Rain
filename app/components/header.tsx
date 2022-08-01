export default function Header() {
  return (
    <>
      <header
        className={`w-full sticky z-20 top-0 flex items-center justify-between py-4  ${
          true ? "border-none" : "border-b border-gray-800"
        } bg-black bg-opacity-30 dark:bg-opacity-30 backdrop-filter backdrop-saturate-150 backdrop-blur-md firefox:bg-opacity-100 dark:firefox:bg-opacity-100`}
      >
        <nav className="flex items-center justify-between w-full max-w-2xl px-4 mx-auto sm:px-6 sm:py-2 xl:max-w-3xl xl:px-0">
          <div className="text-base sm:text-2xl text-white font-mono font-bold">
            Rain
          </div>
          <a
            href="https://rain.johnweak.dev"
            className="flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-base sm:text-2xl text-white font-mono font-bold">
              Live
            </div>
          </a>

          <a
            href="https://github.com/John-Weak/Rain"
            className="flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-base sm:text-2xl text-white font-mono font-bold">
              Code
            </div>
          </a>
        </nav>
      </header>
    </>
  );
}
