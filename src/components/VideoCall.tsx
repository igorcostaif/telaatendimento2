import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor } from 'lucide-react';
import { useState } from 'react';
import type { Person } from '../App';

type VideoCallProps = {
  person: Person;
  onEndCall: () => void;
};

export function VideoCall({ person, onEndCall }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#333333] flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-sm md:text-base">Chamada com {person.name}</h2>
        </div>
        <div className="text-xs md:text-sm text-[#858585]">00:03:24</div>
      </div>

      <div className="flex-1 relative bg-[#000000] flex items-center justify-center">
        {/* Vídeo principal */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-2 md:border-4 border-[#333333]"
          />
        </div>

        {/* Vídeo local (miniatura) */}
        <div className="absolute bottom-20 md:bottom-4 right-2 md:right-4 w-28 h-20 md:w-48 md:h-36 bg-[#2a2a2a] rounded-lg border border-[#333333] flex items-center justify-center">
          <div className="text-xs md:text-sm text-[#858585]">Você</div>
        </div>

        {/* Controles da chamada */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 bg-[#252526] px-4 md:px-6 py-2 md:py-3 rounded-full border border-[#333333]">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-[#3c3c3c] hover:bg-[#4c4c4c]'
            }`}
            title={isMuted ? 'Ativar microfone' : 'Desativar microfone'}
          >
            {isMuted ? <MicOff size={18} className="md:w-5 md:h-5" /> : <Mic size={18} className="md:w-5 md:h-5" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${
              !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-[#3c3c3c] hover:bg-[#4c4c4c]'
            }`}
            title={isVideoOn ? 'Desativar vídeo' : 'Ativar vídeo'}
          >
            {isVideoOn ? <Video size={18} className="md:w-5 md:h-5" /> : <VideoOff size={18} className="md:w-5 md:h-5" />}
          </button>

          <button
            className="hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#3c3c3c] hover:bg-[#4c4c4c] items-center justify-center transition-colors"
            title="Compartilhar tela"
          >
            <Monitor size={18} className="md:w-5 md:h-5" />
          </button>

          <button
            onClick={onEndCall}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
            title="Encerrar chamada"
          >
            <PhoneOff size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
