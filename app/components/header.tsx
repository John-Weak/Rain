import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full sticky z-20 top-0 flex items-center justify-between py-4 bg-black bg-opacity-40 backdrop-filter backdrop-saturate-150 backdrop-blur-xl firefox:bg-opacity-100">
      <nav className="flex items-center justify-between w-full max-w-2xl px-4 mx-auto sm:px-6 sm:py-2 xl:max-w-3xl xl:px-0">
        <Link href="/">
          <span className="text-base sm:text-2xl text-white font-mono font-bold cursor-pointer">
            Home
          </span>
        </Link>
        <Link href="/live">
          <span className="text-base sm:text-2xl text-white font-mono font-bold cursor-pointer">
            Live
          </span>
        </Link>
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
  );
}
