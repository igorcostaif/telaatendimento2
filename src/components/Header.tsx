import { Heart, Menu } from 'lucide-react';
import logo from '@/assets/logo.png';

type HeaderProps = {
  onMenuClick?: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <div className="h-14 md:h-16 bg-[#252526] border-b border-[#333333] flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3 flex-1">
      <img 
          src={logo} 
          alt="Logo" 
          className="h-10 w-auto"
        />
      </div>
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
}

