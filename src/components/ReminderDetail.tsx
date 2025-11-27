import { X, Calendar, Clock, User, MapPin } from 'lucide-react';

type Reminder = {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  type: 'meeting' | 'document' | 'appointment';
  participants?: string[];
  location?: string;
};

type ReminderDetailProps = {
  reminder: Reminder;
  onClose: () => void;
};

export function ReminderDetail({ reminder, onClose }: ReminderDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-[#252526] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-[#333333]">
        {/* Header */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-b border-[#333333] flex items-center justify-between">
          <h2 className="text-lg md:text-xl pr-2 line-clamp-1">{reminder.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Descrição */}
            <div>
              <label className="text-sm text-[#858585] mb-2 block">Descrição</label>
              <p className="text-[#cccccc]">{reminder.description}</p>
            </div>

            {/* Data e Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#858585] mb-2 block flex items-center gap-2">
                  <Calendar size={16} />
                  Data
                </label>
                <p className="text-[#cccccc]">{reminder.date}</p>
              </div>
              {reminder.time && (
                <div>
                  <label className="text-sm text-[#858585] mb-2 block flex items-center gap-2">
                    <Clock size={16} />
                    Horário
                  </label>
                  <p className="text-[#cccccc]">{reminder.time}</p>
                </div>
              )}
            </div>

            {/* Localização */}
            {reminder.location && (
              <div>
                <label className="text-sm text-[#858585] mb-2 block flex items-center gap-2">
                  <MapPin size={16} />
                  Local
                </label>
                <p className="text-[#cccccc]">{reminder.location}</p>
              </div>
            )}

            {/* Participantes */}
            {reminder.participants && reminder.participants.length > 0 && (
              <div>
                <label className="text-sm text-[#858585] mb-2 block flex items-center gap-2">
                  <User size={16} />
                  Participantes
                </label>
                <div className="space-y-2">
                  {reminder.participants.map((participant, index) => (
                    <div key={index} className="bg-[#1e1e1e] px-3 py-2 rounded border border-[#333333]">
                      <p className="text-sm text-[#cccccc]">{participant}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tipo */}
            <div>
              <label className="text-sm text-[#858585] mb-2 block">Tipo</label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                reminder.type === 'meeting' ? 'bg-blue-500/20 text-blue-400' :
                reminder.type === 'document' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {reminder.type === 'meeting' ? 'Reunião' :
                 reminder.type === 'document' ? 'Documento' :
                 'Compromisso'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 border-t border-[#333333] flex justify-end gap-2 md:gap-3">
          <button
            onClick={onClose}
            className="px-3 md:px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg transition-colors text-sm md:text-base"
          >
            Fechar
          </button>
          <button
            className="px-3 md:px-4 py-2 bg-[#0e639c] hover:bg-[#1177bb] rounded-lg transition-colors text-sm md:text-base"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}
