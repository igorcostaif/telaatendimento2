import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PersonList } from './components/PersonList';
import { VideoCall } from './components/VideoCall';
import { Chat } from './components/Chat';
import { PersonInfo } from './components/PersonInfo';
import { Header } from './components/Header';
import { MedicalRecord } from './components/MedicalRecord';
import { Reminders } from './components/Reminders';

export type Person = {
  id: string;
  name: string;
  status: 'waiting' | 'in-call' | 'completed';
  waitTime: string;
  avatar: string;
  history: {
    date: string;
    duration: string;
    notes: string;
  }[];
  medicalRecord: {
    birthDate: string;
    allergies: string[];
    medications: string[];
    vaccines: { name: string; date: string }[];
    consultations: { date: string; diagnosis: string; prescription: string }[];
  };
};

export default function App() {
  const [activeSection, setActiveSection] = useState<'atendimento' | 'historico' | 'configuracoes'>('atendimento');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [inCall, setInCall] = useState(false);
  const [inChat, setInChat] = useState(false);
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const mockPersons: Person[] = [
    {
      id: '1',
      name: 'Maria Silva',
      status: 'waiting',
      waitTime: '5 min',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      history: [
        { date: '15/11/2025', duration: '25 min', notes: 'Consulta de rotina, tudo ok' },
        { date: '03/10/2025', duration: '30 min', notes: 'Acompanhamento mensal' },
      ],
      medicalRecord: {
        birthDate: '15/03/2018',
        allergies: ['Dipirona', 'Lactose'],
        medications: ['Vitamina D - 1 gota/dia'],
        vaccines: [
          { name: 'COVID-19 (1ª dose)', date: '10/05/2025' },
          { name: 'Influenza 2025', date: '15/04/2025' },
        ],
        consultations: [
          { date: '15/11/2025', diagnosis: 'Check-up de rotina', prescription: 'Manter vitamina D' },
          { date: '03/10/2025', diagnosis: 'Resfriado comum', prescription: 'Repouso e hidratação' },
        ]
      }
    },
    {
      id: '2',
      name: 'João Santos',
      status: 'waiting',
      waitTime: '12 min',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      history: [
        { date: '20/11/2025', duration: '20 min', notes: 'Primeira consulta' },
      ],
      medicalRecord: {
        birthDate: '22/08/2020',
        allergies: [],
        medications: [],
        vaccines: [
          { name: 'Tríplice Viral', date: '22/08/2024' },
        ],
        consultations: [
          { date: '20/11/2025', diagnosis: 'Consulta inicial', prescription: 'Acompanhamento em 30 dias' },
        ]
      }
    },
    {
      id: '3',
      name: 'Ana Oliveira',
      status: 'waiting',
      waitTime: '3 min',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      history: [
        { date: '18/11/2025', duration: '35 min', notes: 'Consulta especializada' },
        { date: '05/11/2025', duration: '28 min', notes: 'Retorno - melhora significativa' },
        { date: '22/10/2025', duration: '40 min', notes: 'Avaliação inicial' },
      ],
      medicalRecord: {
        birthDate: '10/01/2019',
        allergies: ['Amendoim'],
        medications: ['Antialérgico - conforme necessário'],
        vaccines: [
          { name: 'COVID-19 (2ª dose)', date: '15/09/2025' },
        ],
        consultations: [
          { date: '18/11/2025', diagnosis: 'Alergia sazonal', prescription: 'Antialérgico conforme orientação' },
        ]
      }
    },
    {
      id: '4',
      name: 'Carlos Ferreira',
      status: 'waiting',
      waitTime: '8 min',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      history: [
        { date: '10/11/2025', duration: '22 min', notes: 'Acompanhamento trimestral' },
      ],
      medicalRecord: {
        birthDate: '05/12/2017',
        allergies: [],
        medications: ['Vitamina C'],
        vaccines: [
          { name: 'HPV (1ª dose)', date: '05/12/2024' },
        ],
        consultations: [
          { date: '10/11/2025', diagnosis: 'Crescimento adequado', prescription: 'Continuar vitamina C' },
        ]
      }
    },
  ];

  const [persons] = useState<Person[]>(mockPersons);

  const handleStartCall = (person: Person) => {
    setSelectedPerson(person);
    setInCall(true);
    setInChat(false);
  };

  const handleStartChat = (person: Person) => {
    setSelectedPerson(person);
    setInChat(true);
    setInCall(false);
  };

  const handleEndCall = () => {
    setInCall(false);
  };

  const handleEndChat = () => {
    setInChat(false);
    setSelectedPerson(null);
  };

  const handleOpenMedicalRecord = () => {
    setShowMedicalRecord(true);
  };

  const handleCloseMedicalRecord = () => {
    setShowMedicalRecord(false);
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden pb-16 md:pb-0">
      {/* Sidebar esquerda */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Área principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header com logo */}
        <Header onMenuClick={() => setShowSidePanel(!showSidePanel)} />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Área de conteúdo principal */}
            <div className="flex-1 overflow-auto">
              {activeSection === 'atendimento' && (
                <>
                  {!inCall && !inChat ? (
                    <PersonList 
                      persons={persons} 
                      onStartCall={handleStartCall}
                      onStartChat={handleStartChat}
                    />
                  ) : inCall ? (
                    <div className="flex flex-col h-full">
                      <VideoCall person={selectedPerson!} onEndCall={handleEndCall} />
                      <Chat 
                        person={selectedPerson!} 
                        onOpenMedicalRecord={handleOpenMedicalRecord}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <Chat 
                        person={selectedPerson!}
                        onOpenMedicalRecord={handleOpenMedicalRecord}
                        onEndChat={handleEndChat}
                        fullScreen
                      />
                    </div>
                  )}
                </>
              )}
              {activeSection === 'historico' && (
                <div className="p-6">
                  <h2 className="mb-4">Histórico de Atendimentos</h2>
                  <p className="text-[#858585]">Visualize todos os atendimentos realizados</p>
                </div>
              )}
              {activeSection === 'configuracoes' && (
                <div className="p-6">
                  <h2 className="mb-4">Configurações</h2>
                  <p className="text-[#858585]">Ajuste as preferências do sistema</p>
                </div>
              )}
            </div>
          </div>

          {/* Painel lateral direito - Desktop */}
          <div className="hidden lg:flex w-80 bg-[#252526] border-l border-[#333333] flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-[#333333]">
              <h2 className="text-lg">{selectedPerson ? 'Informações' : 'Painel'}</h2>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {/* Sempre mostra os lembretes */}
              <Reminders />

              {/* Se tiver pessoa selecionada, mostra as informações dela */}
              {selectedPerson && (
                <>
                  {/* Perfil */}
                  <div className="mb-6 text-center">
                    <img
                      src={selectedPerson.avatar}
                      alt={selectedPerson.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-2 border-[#333333]"
                    />
                    <h3 className="mb-1">{selectedPerson.name}</h3>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#858585] bg-[#1e1e1e] px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      {selectedPerson.status === 'waiting' ? 'Aguardando' : selectedPerson.status}
                    </span>
                  </div>

                  {/* Histórico de atendimentos */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-[18px] h-[18px] text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3>Histórico de Atendimentos</h3>
                    </div>

                    <div className="space-y-3">
                      {selectedPerson.history.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#858585]">{item.date}</span>
                            <div className="flex items-center gap-1 text-xs text-[#858585]">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{item.duration}</span>
                            </div>
                          </div>
                          <p className="text-sm text-[#cccccc]">{item.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Painel lateral direito - Mobile (Drawer) */}
        {showSidePanel && (
          <>
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowSidePanel(false)}
            />
            <div className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#252526] border-l border-[#333333] flex flex-col overflow-hidden z-50">
              <div className="px-6 py-4 border-b border-[#333333] flex items-center justify-between">
                <h2 className="text-lg">{selectedPerson ? 'Informações' : 'Painel'}</h2>
                <button
                  onClick={() => setShowSidePanel(false)}
                  className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-auto p-6">
                {/* Sempre mostra os lembretes */}
                <Reminders />

                {/* Se tiver pessoa selecionada, mostra as informações dela */}
                {selectedPerson && (
                  <>
                    {/* Perfil */}
                    <div className="mb-6 text-center">
                      <img
                        src={selectedPerson.avatar}
                        alt={selectedPerson.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-2 border-[#333333]"
                      />
                      <h3 className="mb-1">{selectedPerson.name}</h3>
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#858585] bg-[#1e1e1e] px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        {selectedPerson.status === 'waiting' ? 'Aguardando' : selectedPerson.status}
                      </span>
                    </div>

                    {/* Histórico de atendimentos */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-[18px] h-[18px] text-[#858585]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3>Histórico de Atendimentos</h3>
                      </div>

                      <div className="space-y-3">
                        {selectedPerson.history.map((item, index) => (
                          <div
                            key={index}
                            className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333333]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-[#858585]">{item.date}</span>
                              <div className="flex items-center gap-1 text-xs text-[#858585]">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{item.duration}</span>
                              </div>
                            </div>
                            <p className="text-sm text-[#cccccc]">{item.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de Prontuário */}
      {showMedicalRecord && selectedPerson && (
        <MedicalRecord 
          person={selectedPerson} 
          onClose={handleCloseMedicalRecord}
        />
      )}
    </div>
  );
}
