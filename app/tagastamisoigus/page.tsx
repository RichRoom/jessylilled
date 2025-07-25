import type { Metadata } from 'next';
import PageLayout from '../../components/PageLayout';

export const metadata: Metadata = {
  title: 'Tagastamisõigus - Jessylilled',
  description: 'Jessylilled tagastamisõigus ja tingimused. Kuidas tagastada või vahetada tooteid.',
};

export default function TagastamisoigusPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Tagastamisõigus</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8">
              Siin on &quot;Lillede tagastamis- ja taganemistingimused&quot; Eesti floristile.
              <strong> Õigussätted (VÕS) on all toodud täpsete tsitaatidena; ülejäänu on sõnastatud ümber</strong>, et eristuda konkurendist.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Õiguslik alus (täpsed tsitaadid seadusest)</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">VÕS § 56 lõige 4</h3>
              <p className="text-gray-700 mb-2">(sidevahendi abil – nt e-poes – sõlmitud lepingute erandid):</p>
              
              <blockquote className="border-l-4 border-pink-500 pl-4 py-2 bg-gray-50 text-gray-700 mb-4">
                <p>2) sellise asja üleandmine, mis on valmistatud, arvestades lepingupooleks oleva tarbija isiklikke vajadusi;</p>
                <p>3) sellise asja üleandmine, mis on valmistatud tarbija esitatud tingimuste kohaselt;</p>
                <p>4) sellise asja üleandmine, mis rikneb või vananeb kiiresti;</p>
                <p>5) sellise suletud pakendis asja üleandmine, mis ei ole kõlblik tagasisaatmiseks tervisekaitse või hügieenilistel põhjustel ning kui see on pärast kohaletoimetamist avatud;</p>
                <p>6) sellise asja üleandmine, mis oma olemuse tõttu segatakse või ühendatakse pärast üleandmist muu asjaga selliselt, et neid ei saa enam teineteisest eraldada.</p>
              </blockquote>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">VÕS § 49 lõige 3</h3>
              <p className="text-gray-700 mb-2">(väljaspool äriruume sõlmitud lepingute erandid – nt kulleriga ukse taga sõlmitud müük):</p>
              
              <blockquote className="border-l-4 border-pink-500 pl-4 py-2 bg-gray-50 text-gray-700 mb-4">
                <p>4) sellise asja üleandmine, mis rikneb või vananeb kiiresti.</p>
              </blockquote>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">VÕS § 56 lõige 1</h3>
              <p className="text-gray-700 mb-2">(üldreegel, millest ülaltoodud erandid teevadki erandi):</p>
              
              <blockquote className="border-l-4 border-pink-500 pl-4 py-2 bg-gray-50 text-gray-700 mb-4">
                <p>&quot;Tarbija võib sidevahendi abil sõlmitud lepingust taganeda põhjust avaldamata 14 päeva jooksul.&quot;</p>
              </blockquote>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Mida see lillede puhul tähendab</h2>

            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li><strong>Kiiresti riknev kaup</strong> – Lõikelilled ja kimbud kuuluvad selgesõnaliselt kiiresti riknevate asjade hulka, mistõttu 14‑päevane taganemisõigus neile <strong>ei laiene</strong>.</li>
              <li><strong>Personaalsed tellimused</strong> – Kui seade on tehtud vastavalt kliendi soovidele (värvid, sordid, kompositsiooni stiil jms), kuulub see erandi alla ka siis, kui kaup teoreetiliselt ei rikneks.</li>
              <li><strong>Hügieeni- ja tervisekaitse põhjused</strong> – Avatud pakendis lilleseaded ei ole pärast üleandmist tagastamiseks sobilikud.</li>
              <li><strong>Segatud/ühendatud kaubad</strong> – Kui lilled on kombineeritud muu esemega (nt söödavad lisandid, dekoratsioonid), mida pole võimalik hiljem eraldada, ei saa tarbija ka neid tagastada.</li>
            </ol>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Meie poe tagastamis- ja kaebuse kord</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1. Kui saaja keeldub kimbu vastuvõtmisest</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Teeme ühe tasuta korduskatse kokkulepitud päeval (või lepime kokku, et tellija tuleb tellimusele meie salongi järele).</li>
                  <li>Kui tellija otsustab siiski ostust loobuda, tagastame <strong>50% lillede hinnast</strong> (töö ja logistika kulud ning lilleseade väärtuse vähenemine jäävad meie kanda).</li>
                  <li>Raha tagastame 5 tööpäeva jooksul alates hetkes, kui oleme kauba tagasi saanud või kokkulepitud viisil käitunud.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2. Vigane või mittesobiv kvaliteet</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Kui lilled jõuavad kohale nähtava defektiga (murenenud õied, närbumine saabudes jne), anna meile teada <strong>24 tunni</strong> jooksul alates kättesaamisest ja lisa fotod. Lahendame olukorra asenduse, hinnalanguse või tagasimaksega – vastavalt VÕS üldistele puuduste regulatsioonidele.</li>
                  <li>Kaebused esita kirjalikult (e-post), et saaksime olukorra fikseerida ja tõendeid säilitada.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3. Vale aadress / kättesaamatus</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Kui tellija esitab eksliku aadressi või saaja ei vasta telefonile ning lilli ei õnnestu üle anda, säilitame kimbu kuni 24 h. Pärast seda võib lilleseade olla oluliselt vähenenud väärtusega; kokkuleppel saab tellija tulla ise järele. Rahatagastus järgib p‑s 3.1 toodud loogikat.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3.4. Tšekk ja tellimuse info</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Palume säilitada arve/tellimuse kinnitus, et saaksime teid tuvastada ja pretensiooni kiirelt lahendada.</li>
                </ul>
              </div>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Mis siiski kehtib: tarbija muud õigused</h2>

            <p className="text-gray-700 mb-4">
              Kuigi 14‑päevane taganemisõigus ei laiene, <strong>ei kao tarbija õigused puudustega kauba korral</strong> (nt kui lilled on saabudes juba kahjustunud). Sellisel juhul tugineme VÕS üldistele müügilepingu sätetele (puuduse kõrvaldamine, hinna alandamine, lepingu lõpetamine jms).
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Kuidas taganemisest/kaebusest teatada</h2>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Saada meile e-kiri või täida meie veebivormi vastav avaldus.</li>
              <li>Kui kasutad meie veebilehel taganemisavalduse tüüpvormi, saadame sulle kinnituse selle kättesaamise kohta püsival andmekandjal.</li>
            </ul>

            <div className="mt-8 p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Kontakt:</strong> Kui teil on küsimusi tagastamistingimuste kohta, võtke meiega ühendust e-posti või telefoni teel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
