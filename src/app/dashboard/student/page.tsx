"use client";

const SchuelerDashboard = () => {
  // Demo-Daten
  const vergangeneStunden = [
    {
      id: 1,
      lehrer: "Simon Schäfer",
      datum: "20.03.2025",
      startzeit: "16:00",
      fach: "Mathematik",
      thema: "Gleichungen",
    },
    {
      id: 2,
      lehrer: "Simon Schäfer",
      datum: "18.03.2025",
      startzeit: "14:30",
      fach: "Mathematik",
      thema: "Algebra",
    },
    {
      id: 3,
      lehrer: "Simon Schäfer",
      datum: "15.03.2025",
      startzeit: "17:15",
      fach: "Mathematik",
      thema: "Geometrie",
    },
  ];

  const geplanteStunden = [
    {
      id: 1,
      lehrer: "Simon Schäfer",
      datum: "24.03.2025",
      startzeit: "16:00",
      fach: "Mathematik",
      thema: "Gleichungen lösen",
    },
    {
      id: 2,
      lehrer: "Simon Schäfer",
      datum: "25.03.2025",
      startzeit: "14:30",
      fach: "Mathematik",
      thema: "Quadratische Gleichungen",
    },
    {
      id: 3,
      lehrer: "Simon Schäfer",
      datum: "26.03.2025",
      startzeit: "17:15",
      fach: "Mathematik",
      thema: "Wiederholung",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-white shadow-sm rounded-lg mb-6 p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold text-xl">
              Schäfer Tutoring
            </span>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Hallo, Max Müller</span>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm">
                Ausloggen
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Mein Nachhilfe-Dashboard
          </h2>

          {/* Stunden-Anfragen zur Bestätigung */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
              Offene Anfragen zur Bestätigung
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Datum</th>
                    <th className="py-2 px-4 border-b text-left">Startzeit</th>
                    <th className="py-2 px-4 border-b text-left">Fach</th>
                    <th className="py-2 px-4 border-b text-left">Lehrer</th>
                    <th className="py-2 px-4 border-b text-left">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">28.03.2025</td>
                    <td className="py-2 px-4 border-b">15:00 Uhr</td>
                    <td className="py-2 px-4 border-b">Mathematik</td>
                    <td className="py-2 px-4 border-b">Simon Schäfer</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-col space-y-1">
                        <button className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                          Akzeptieren
                        </button>
                        <button className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                          Ablehnen
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">30.03.2025</td>
                    <td className="py-2 px-4 border-b">16:30 Uhr</td>
                    <td className="py-2 px-4 border-b">Mathematik</td>
                    <td className="py-2 px-4 border-b">Simon Schäfer</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex flex-col space-y-1">
                        <button className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                          Akzeptieren
                        </button>
                        <button className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs w-20 flex justify-center items-center">
                          Ablehnen
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Geplante Stunden */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Geplante Stunden</h3>
            {geplanteStunden.length === 0 ? (
              <p className="text-gray-500">Keine geplanten Stunden.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Datum</th>
                      <th className="py-2 px-4 border-b text-left">
                        Startzeit
                      </th>
                      <th className="py-2 px-4 border-b text-left">Fach</th>
                      <th className="py-2 px-4 border-b text-left">Lehrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geplanteStunden.map((stunde) => (
                      <tr key={stunde.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{stunde.datum}</td>
                        <td className="py-2 px-4 border-b">
                          {stunde.startzeit} Uhr
                        </td>
                        <td className="py-2 px-4 border-b">{stunde.fach}</td>
                        <td className="py-2 px-4 border-b">{stunde.lehrer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Vergangene Stunden */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Vergangene Stunden</h3>
            {vergangeneStunden.length === 0 ? (
              <p className="text-gray-500">Keine vergangenen Stunden.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Datum</th>
                      <th className="py-2 px-4 border-b text-left">
                        Startzeit
                      </th>
                      <th className="py-2 px-4 border-b text-left">Fach</th>
                      <th className="py-2 px-4 border-b text-left">Lehrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vergangeneStunden.map((stunde) => (
                      <tr key={stunde.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{stunde.datum}</td>
                        <td className="py-2 px-4 border-b">
                          {stunde.startzeit} Uhr
                        </td>
                        <td className="py-2 px-4 border-b">{stunde.fach}</td>
                        <td className="py-2 px-4 border-b">{stunde.lehrer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchuelerDashboard;
