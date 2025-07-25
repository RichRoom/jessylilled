import type { Metadata } from 'next';
import PageLayout from '../../components/PageLayout';

export const metadata: Metadata = {
  title: 'Lillede hooldamine - Jessylilled',
  description: 'Kuidas hooldada lilli, et need kauem kestaksid. Praktilised nõuanded lillede hooldamiseks.',
};

export default function LilledeHooldaminePage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Lillede hooldamine</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Värskuse säilitamise soovitused Jessylilledelt</h2>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Igaüks meist tahab, et kallilt kingitud või kodu kaunistamiseks valitud kimp püsiks ilus võimalikult kaua. 
              Lõikelilled on aga elusmaterjal – nad reageerivad kiiresti temperatuuri- ja niiskusekõikumistele. 
              Parim säilitustemperatuur lõikelilledele on <strong>+2…+7 °C</strong>. Erinevatel sortidel on erinev eluiga, 
              seega võivad sama kimbu komponendid närbuda eri aegadel. Et rõõm püsiks pikem, järgi allolevaid nõuandeid:
            </p>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Peamised hooldussoovitused
              </h3>
              
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-500 font-bold mr-3 mt-1">✓</span>
                  <div>
                    <strong>Lõika varsi</strong> iga kord terava noaga 2–3 cm ulatuses kaldu (u 45° nurga all), et suurendada vee imendumispinda.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-pink-500 font-bold mr-3 mt-1">✓</span>
                  <div>
                    <strong>Vee vahetamisel</strong> lõika ots uuesti värskeks. Kui ei kasuta spetsiaalset lõikelillede toitesegu, vaheta vett iga päev ja pese vaas iga kord antibakteriaalse puhastusvahendiga.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-pink-500 font-bold mr-3 mt-1">✓</span>
                  <div>
                    <strong>Veetase:</strong> Vett olgu vaasis nii palju, et umbes 1/3 varrest oleks vees. Vette ulatuvad lehed eemalda – need soodustavad vee riknemist. Võid lisada toitesegu, kuid ära pane suhkrut ega muid koduseid „nippe", need kiirendavad bakterite kasvu.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-pink-500 font-bold mr-3 mt-1">✓</span>
                  <div>
                    <strong>Õige asukoht:</strong> Aseta vaas jahedasse, värske õhuga ruumi, eemal otsesest päikesest, tuuletõmbest, küttekehast ning puu- ja köögiviljadest.
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="text-pink-500 font-bold mr-3 mt-1">✓</span>
                  <div>
                    <strong>Jälgi veetaset.</strong> Mitmed lilled (nt tulbid, pojengid) joovad vett eriti palju.
                  </div>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Erikompositsioonide hooldus</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">🌸</span>
                  Oasis-käsna hooldus
                </h4>
                <p className="text-gray-700 text-sm">
                  Lillekäsna puhul vala vett kompositsiooni keskele iga 1–2 päeva tagant, sest käsn kuivab kiiresti.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">🌺</span>
                  Pikendusalusega kimbud
                </h4>
                <p className="text-gray-700 text-sm">
                  Kui kimp on toruga pikendusalusel, lisa vett kolbi vastavalt sellele, kui palju lilled „joovad".
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Tähtis meeles pidada</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                Hoiatused
              </h4>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Ära jäta kimpu ilma veeta kauemaks kui 15 minutiks</li>
                <li>• Ära hoia kimpe ega kompositsioone töötamatu mootoriga autos pikalt, eriti kuuma või pakasega</li>
                <li>• Väljas liikumisel kata kimp temperatuuril alla +2 °C – ära kanna seda paljana/paberita</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="mr-2">ℹ️</span>
                Kasulik teada
              </h4>
              <p className="text-green-700 text-sm">
                Dekoratiivsed puitelemendid ja lühikesed rohelised oksad kimbus ei vaja eraldi hoolt ega veega turgutamist.
              </p>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h4 className="font-semibold text-pink-800 mb-2 flex items-center">
                <span className="mr-2">🌹</span>
                Probleemide korral
              </h4>
              <p className="text-pink-700 text-sm mb-3">
                Kui kimp närbus ootamatult kiiresti (täielikult või osaliselt), kontrolli palun, kas kõiki soovitusi sai järgitud.
              </p>
              <p className="text-pink-700 text-sm font-medium">
                Jessylillede meeskond jälgib hoolikalt kimpude värskust ja kvaliteeti ning soovib, et need pakuksid rõõmu võimalikult pikalt!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}