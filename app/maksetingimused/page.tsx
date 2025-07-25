import type { Metadata } from 'next';
import PageLayout from '../../components/PageLayout';

export const metadata: Metadata = {
  title: 'Maksetingimused - Jessylilled',
  description: 'Jessylilled maksetingimused ja võimalused. Turvaliselt tasuda krediitkaardiga või pangalingiga.',
};

export default function MaksetingimusedPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Maksetingimused</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ÜLDINE</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>1.1.</strong> Käesolevad tingimused reguleerivad <a href="http://www.jessylilled.ee" className="text-pink-600 hover:underline">www.jessylilled.ee</a> (edaspidi <strong>E‑pood</strong>) omaniku <strong>Jessy OÜ</strong> (edaspidi <strong>Kaupmees</strong>), aadress Õismäe tee 107, Tallinn, registrikood <strong>11123800</strong>, e-post <a href="mailto:jessylilled107@gmail.com" className="text-pink-600 hover:underline">jessylilled107@gmail.com</a>, ja E‑poest ostu sooritanud isiku (edaspidi <strong>Klient</strong>) vahelisi õigussuhteid toodete ostmisel.
              </p>
              <p className="text-gray-700">
                <strong>1.2.</strong> Lisaks käesolevatele tingimustele juhinduvad osapooled Eesti Vabariigis kehtivatest õigusaktidest.
              </p>
              <p className="text-gray-700">
                <strong>1.3.</strong> Kaupmehel on õigus muuta üldtingimusi ning toodete/teenuste hindu. Muudatustest teavitatakse E‑poes; konkreetsele tehingule kohaldatakse tehingu tegemise hetkel kehtinud tingimusi ja hindu.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. HIND</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>2.1.</strong> Kõik hinnad on toodud koos Eestis kehtiva 20% käibemaksuga.
              </p>
              <p className="text-gray-700">
                <strong>2.2.</strong> Tellimusele lisandub ostuprotsessis valitud tarneviisi tasu. Tarneviisi valik ja lõplik kohaletoimetamiskulu kuvatakse ostukorvis.
              </p>
              <p className="text-gray-700">
                <strong>2.3.</strong> Sooduskoodi olemasolul arvutatakse allahindlus pärast koodi sisestamist ostukorvis.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. TELLIMUSE KOOSTAMINE</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>3.1.</strong> Tellimuse alustamiseks vali sobivad lilled või kimp ja lisa need ostukorvi nupuga "Osta".
              </p>
              <p className="text-gray-700">
                <strong>3.2.</strong> Soovi korral lisa kaardile tervitus või õnnitlus: vali kaart, klõpsa sellel ning sisesta avanenud tekstikasti soovitud sõnum. <strong>Jessylilled.ee ei lisa omaalgatuslikult saatjaandmeid</strong> – kaardil olev tekst on ainus info, mis Saajani jõuab.
              </p>
              <p className="text-gray-700">
                <strong>3.3.</strong> Kui kõik soovitu on ostukorvis, jätka kassasse nupust "Kassa".
              </p>
              <p className="text-gray-700">
                <strong>3.4.</strong> Kassas näed kõiki tellimuse ridu: toote nimetus, hind, kogus ja rea kogusumma. Koguseid saad muuta vastavas lahtris "Kogus".
              </p>
              <p className="text-gray-700">
                <strong>3.5.</strong> Makselehel täida kõik nõutud (tärniga) väljad ning vali sobiv tarne- ja makseviis.
              </p>
              <p className="text-gray-700">
                <strong>3.6.</strong> Meie tarne tingimused leiad lehelt <a href="/kattetoimetamine" className="text-pink-600 hover:underline font-medium">"Kättetoimetamine"</a>.
              </p>
              <p className="text-gray-700">
                <strong>3.7.</strong> Kuna tooted valmivad loominguliselt, ei saa Kaupmees garanteerida, et valmistoode on täpselt sama mis fotol. E‑poes esitatud fotod on illustratiivsed.
              </p>
              <p className="text-gray-700">
                <strong>3.8.</strong> Kui tellitud värvitoonis lilli pole, võib Kaupmees asendada need teist värvi õitega tingimusel, et tellimuse rahaline väärtus ei vähene.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. TASUMINE</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>4.1.</strong> Tellimuse eest saab tasuda pangalingiga või krediitkaardiga. Pärast makset vajuta kindlasti "Tagasi kaupmehe juurde". Kui jõuad uuesti Jessylilled.ee lehele, on tellimus edastatud edukalt.
              </p>
              <p className="text-gray-700">
                <strong>4.2.</strong> Pärast ostu ja makse sooritamist saadetakse e‑posti teel kinnitus tellimuse kättesaamise kohta. Kui kinnitust ei tule, võta ühendust telefonil <strong>+372 5380 2101</strong>.
              </p>
              <p className="text-gray-700">
                <strong>4.3.</strong> Kui brauser hangub või tekib muu tõrge, palume võtta ühendust <strong>Jessylilled.ee</strong> klienditoega (<a href="mailto:jessylilled107@gmail.com" className="text-pink-600 hover:underline">jessylilled107@gmail.com</a>, tel <strong>+372 5380 2101</strong>) ja kontrollida, kas tellimus jõudis Kaupmeheni. Panga poolt edastatud makseinfo laekumisel alustame tellimuse täitmist.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. TELLIMUSE TÄITMINE</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>5.1.</strong> Suuremate tähtpäevade (nt sõbrapäev, naistepäev, emadepäev) ajal ei teosta me kiir- ega täpsel kellaajal toimuvaid kullerteenuseid; tellimused täidetakse jooksvalt päeva jooksul.
              </p>
              <p className="text-gray-700">
                <strong>5.2.</strong> Lilled on hooajalised ning kõiki sorte/värvitoone ei pruugi alati saadaval olla. Seetõttu jätab <strong>Jessylilled.ee</strong> endale õiguse asendada materjale võrdväärses maksumuses. Suuremate muudatuste korral võtame Saatjaga ühendust (telefon/e‑post), et asendus kooskõlastada.
              </p>
              <p className="text-gray-700">
                <strong>5.3.</strong> Saajaga võetakse <strong>ALATI</strong> eelnevalt telefoni teel ühendust, et kokku leppida üleandmise aeg ja koht, mis sobib kõigile osapooltele.
              </p>
              <p className="text-gray-700">
                <strong>5.4.</strong> Kui Saajaga ei õnnestu kontakti saada, pöördume Saatja poole e‑posti või telefoni teel.
              </p>
              <p className="text-gray-700">
                <strong>5.5.</strong> Saadetise annab üle kullerteenuse pakkuja, mitte florist.
              </p>
              <p className="text-gray-700">
                <strong>5.8.</strong> Tellimuse tühistamise soovi korral palume sellest teada anda <strong>1 tööpäev</strong> enne tellimuse täitmise kuupäeva või kokkuleppel klienditeenindusega (kontakt <a href="mailto:jessylilled107@gmail.com" className="text-pink-600 hover:underline">jessylilled107@gmail.com</a> või tel <strong>+372 5380 2101</strong>).
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. TELLIMUSE TÜHISTAMINE</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>6.1.</strong> Kui tellitud kaupa ei ole ning asendus ei sobi, võib Kaupmees tellimuse tühistada täielikult või osaliselt. Sellest teavitatakse Klienti koheselt. Osalise tühistamise korral küsime Kliendi soovi ülejäänud tellimuse osas (kas saata või samuti tühistada).
              </p>
              <p className="text-gray-700">
                <strong>6.2.</strong> Tellimuse tühistamisel tagastatakse Kliendile tasutud summa niipea kui võimalik, kuid hiljemalt 14 päeva jooksul tühistamise kinnitamisest.
              </p>
              <p className="text-gray-700">
                <strong>6.3.</strong> 14‑päevase taganemisõiguse kasutamisel ei tohi toodet kasutada muul viisil, kui on vajalik selle olemuses, omadustes ja toimimises veendumiseks. Kui toodet on kasutatud enam, on Kaupmehel õigus vähendada tagastatavat summat vastavalt kauba väärtuse vähenemisele.
              </p>
              <p className="text-gray-700">
                <strong>6.4.</strong> Kaupmees võib vajadusel tehingust loobuda, tagastades Ostjale kogu laekunud summa.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. TOODETE TAGASTAMINE</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <span className="mr-2">⚠️</span>
                Oluline märkus lillede kohta
              </h3>
              <p className="text-yellow-700 text-sm">
                <strong>Lilled on kiiresti riknev kaup – neid tagastada ei saa.</strong>
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>7.1.</strong> Ostjal on õigus e‑poes sõlmitud lepingust taganeda 14 päeva jooksul alates kauba kättesaamisest. Tagastatavate toodete hulka kuuluvad joogid, maiustused ja kaardid.
              </p>
              <p className="text-gray-700">
                <strong>7.2.</strong> Tagastamiseks esita taganemisavaldus ning saada see e‑posti aadressile <a href="mailto:jessylilled107@gmail.com" className="text-pink-600 hover:underline">jessylilled107@gmail.com</a> hiljemalt 14 päeva jooksul kauba kättesaamisest.
              </p>
              <p className="text-gray-700">
                <strong>7.3.</strong> Tagastamise kulud kannab Ostja, välja arvatud juhul, kui tagastamise põhjuseks on mittevastavus tellitule (näiteks vale või defektne toode).
              </p>
              <p className="text-gray-700">
                <strong>7.4.</strong> Taganemisõigus ei kehti, kui Ostja on juriidiline isik.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. PRETENSIOONI ESITAMISE ÕIGUS</h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                <strong>8.1.</strong> E‑pood vastutab Ostjale müüdud kauba lepingutingimustele mittevastavuse või puuduse eest, mis oli olemas üleandmise hetkel ning ilmneb kuni kahe aasta jooksul alates üleandmisest.
              </p>
              <p className="text-gray-700">
                <strong>8.2.</strong> Puuduse ilmnemisel peab Ostja pöörduma E‑poe poole hiljemalt kahe kuu jooksul, saates e‑kirja aadressile <a href="mailto:jessylilled107@gmail.com" className="text-pink-600 hover:underline">jessylilled107@gmail.com</a> või helistades numbril <strong>+372 5380 2101</strong>.
              </p>
              <p className="text-gray-700">
                <strong>8.3.</strong> E‑pood ei vastuta puuduste eest, mis on tekkinud kauba üleandmise järel. Kui tootel esineb puudus, mille eest E‑pood vastutab, parandab või asendab E‑pood kauba; kui see pole võimalik, tagastatakse kõik lepinguga seotud tasud.
              </p>
              <p className="text-gray-700">
                <strong>8.4.</strong> Tarbija kaebusele vastatakse kirjalikult või kirjalikku taasesitamist võimaldavas vormis 15 päeva jooksul.
              </p>
            </div>

            <div className="mt-8 p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="text-pink-700 text-sm">
                <strong>Kontakt küsimuste korral:</strong> <a href="mailto:jessylilled107@gmail.com" className="text-pink-600 hover:underline">jessylilled107@gmail.com</a> või telefon <strong>+372 5380 2101</strong>
              </p>
            </div>

            <div className="mt-8 p-4 bg-gray-100 border border-gray-200 rounded-lg">
              <p className="text-gray-600 text-sm">
                <strong>Viimati uuendatud:</strong> {new Date().toLocaleDateString('et-EE')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}