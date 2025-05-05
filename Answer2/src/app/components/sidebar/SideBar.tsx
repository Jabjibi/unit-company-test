import { Home, CheckSquare, Clipboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SideBar() {
  return (
    <aside className="bg-[rgba(101,93,124,0.15)] w-[70px] sm:w-[80px] lg:w-[90px] 
        flex flex-col items-center py-6 rounded-3xl shadow-lg 
        ml-4 mt-6 mb-6 min-h-[700px] xl:min-h-[320px]"
    >

      <div className="mb-10">
        <div className="text-2xl font-bold text-black mt-10">
          <Image src="/images/logo-todo.png" alt="Logo" width={64} height={64} />
        </div>
      </div>
      <nav className="flex flex-col gap-20 text-white mt-10">
        <Link href="/">
          <button className="hover:scale-110 transition">
            <Home className="w-8 h-8" />
          </button>
        </Link>

        <Link href="/done">
          <button className="hover:scale-110 transition">
            <CheckSquare className="w-8 h-8" />
          </button>
        </Link>

        <Link href="/edit">
          <button className="hover:scale-110 transition">
            <Clipboard className="w-8 h-8" />
          </button>
        </Link>
      </nav>
    </aside>
  );
}