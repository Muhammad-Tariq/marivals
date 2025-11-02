import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-zinc-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.svg" 
                alt="Marvel Rivals HQ Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">Marvel Rivals HQ</span>
            </div>
            <p className="text-zinc-400 mb-4 max-w-md">
              The ultimate Marvel Rivals hub for guides, tier lists, and competitive insights. 
              Master every hero and climb the ranks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-[#E10600] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-zinc-400 hover:text-[#E10600] transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Game Content */}
          <div>
            <h3 className="text-white font-semibold mb-4">Game Content</h3>
            <ul className="space-y-2">
              <li><Link href="/agents" className="text-zinc-400 hover:text-[#E10600] transition-colors">Agents</Link></li>
              <li><Link href="/maps" className="text-zinc-400 hover:text-[#E10600] transition-colors">Maps</Link></li>
              <li><Link href="/weapons" className="text-zinc-400 hover:text-[#E10600] transition-colors">Weapons</Link></li>
              <li><Link href="/guides" className="text-zinc-400 hover:text-[#E10600] transition-colors">Guides</Link></li>
            </ul>
          </div>

          {/* Community & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/leaderboard" className="text-zinc-400 hover:text-[#E10600] transition-colors">Leaderboard</Link></li>
              <li><Link href="/master-classes" className="text-zinc-400 hover:text-[#E10600] transition-colors">Master Classes</Link></li>
              <li><a href="#" className="text-zinc-400 hover:text-[#E10600] transition-colors">Discord</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-[#E10600] transition-colors">Reddit</a></li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2 text-sm">Contact</h4>
              <div className="text-zinc-400 text-xs space-y-1">
                <p>privacy@marvelrivalz.com</p>
                <p>legal@marvelrivalz.com</p>
                <p className="mt-2">Apt 504, 5th Floor</p>
                <p>Gulberg Heights</p>
                <p>Islamabad, Pakistan 44000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8">
          {/* Copyright and Legal */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="mb-4 md:mb-0">
              <p className="text-zinc-400 text-sm mb-2">
                © 2025 Marvel Rivals HQ. All rights reserved.
              </p>
              <p className="text-zinc-500 text-xs max-w-2xl">
                Marvel Rivals and all related characters, names, and logos are trademarks of NetEase Games and Marvel Entertainment. 
                This site is not affiliated with or endorsed by the trademark holders. Images used under educational fair use provisions.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-zinc-400 hover:text-[#E10600] transition-colors text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-zinc-400 hover:text-[#E10600] transition-colors text-sm">Terms of Service</Link>
              <Link href="/contact" className="text-zinc-400 hover:text-[#E10600] transition-colors text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}