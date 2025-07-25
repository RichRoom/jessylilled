import type { Metadata } from 'next';
import PageLayout from '../../components/PageLayout';

export const metadata: Metadata = {
  title: 'Privaatsuseeskirjad - Jessylilled',
  description: 'Jessylilled privaatsuseeskirjad ja andmekaitse põhimõtted. Kuidas me teie andmeid kasutame ja kaitseme.',
};

export default function PrivaatsuseeskirjadPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privaatsuseeskirjad</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-8 leading-relaxed">
              Veebisaidi <strong>www.jessylilled.ee</strong>, millele pääseb juurde aadressilt www.jessylilled.ee, 
              üks peamisi prioriteete on külastajate privaatsus. Käesolevad privaatsuseeskirjad määratlevad, 
              millist tüüpi teavet veebisait www.jessylilled.ee kogub ja salvestab, ning seda, kuidas me seda teavet kasutame.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-700">
                <strong>Kontakt:</strong> Kui teil on lisaküsimusi või vajate lisateavet meie privaatsuseeskirjade kohta, 
                võtke meiega kindlasti ühendust.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Logifailid</h2>
            <p className="text-gray-700 mb-6">
              Veebisait www.jessylilled.ee järgib logifailide kasutamise tavapärast protseduuri. Need failid registreerivad 
              külastajaid veebisaitide külastamisel. Kõik veebihostingu ettevõtted teevad seda ja see on osa hostinguteenuste 
              analüüsist.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Logifailidesse kogutud teave sisaldab:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                <li>Internetiprotokolli (IP) aadresse</li>
                <li>Brauseri tüüpi</li>
                <li>Internetiteenuse pakkujat (ISP)</li>
                <li>Kuupäeva- ja ajatemplit</li>
                <li>Viitavaid / väljumislehti</li>
                <li>Võib-olla ka klikkide arvu</li>
              </ul>
            </div>
            
            <p className="text-gray-700 mb-6">
              Need ei ole seotud mitte mingi isikut tuvastava teabega. Selle teabe eesmärgiks on trendide analüüsimine, 
              saidi haldamine, kasutajate liikumise jälgimine veebisaidil ja demograafilise teabe kogumine.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Küpsised ja veebimajakad</h2>
            <p className="text-gray-700 mb-4">
              Nagu iga teinegi veebisait, kasutab ka www.jessylilled.ee &quot;küpsiseid&quot;. Neid küpsiseid 
              kasutatakse teabe, sealhulgas külastajate eelistuste ja nende veebisaidi lehtede salvestamiseks, 
              millele külastajal oli juurdepääs või mida nad külastasid.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Küpsiste kasutamise eesmärk:</h3>
              <p className="text-green-700 text-sm">
                Teavet kasutatakse kasutajakogemuse optimeerimiseks, kohandades meie veebilehe sisu vastavalt 
                külastajate brauseritüübile ja/või muule teabele.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kolmandate osapoolte reklaamid</h2>
            <p className="text-gray-700 mb-4">
              Kolmandate osapoolte reklaamiserverid või reklaamivõrgustikud kasutavad veebisaidil www.jessylilled.ee 
              kuvatavates reklaamides ja linkides selliseid tehnoloogiaid nagu küpsised, JavaScript või veebimajakad, 
              mis saadetakse otse kasutajate brauserile.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Oluline märkus:</h3>
              <p className="text-yellow-700 text-sm">
                Veebisaidil www.jessylilled.ee puudub juurdepääs kolmandatest osapooltest reklaamijate küpsistele 
                ja kontroll nende üle. Sel juhul saavad nad automaatselt teie IP-aadressi.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kolmandate osapoolte privaatsuseeskirjad</h2>
            <p className="text-gray-700 mb-4">
              Veebisaidi www.jessylilled.ee privaatsuseeskirjad ei kehti teistele reklaamijatele ega veebisaitidele. 
              Seega soovitame teil üksikasjalikuma teabe saamiseks tutvuda kolmandate osapoolte reklaamiserverite 
              vastavate privaatsuseeskirjadega.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Küpsiste haldamine:</h3>
              <p className="text-blue-700 text-sm">
                Te võite küpsised oma brauseri valikute kaudu keelata. Täpsema teabe küpsiste haldamise kohta 
                konkreetsete veebibrauserite kasutamisel leiate vastavate brauserite veebisaitidelt.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lastega seonduv teave</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                <span className="mr-2">🛡️</span>
                Laste turvalisus
              </h3>
              <p className="text-red-700 text-sm mb-3">
                Meie teine prioriteet on laste turvalisuse suurendamine interneti kasutamisel. 
                Julgustame vanemaid ja eestkostjaid jälgima laste veebitegevust, selles osalema 
                ja/või seda monitoorima ja juhendama.
              </p>
              <p className="text-red-700 text-sm">
                <strong>Veebisait www.jessylilled.ee ei kogu teadlikult isikut tuvastavat teavet alla 13-aastastelt lastelt.</strong> 
                Kui arvate, et teie laps esitas sellist teavet meie veebisaidil, soovitame tungivalt meiega 
                viivitamatult ühendust võtta ja teeme kõik endast oleneva, et selline teave oma dokumentidest 
                kiiresti eemaldada.
              </p>
            </div>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ainult veebipõhised privaatsuseeskirjad</h2>
            <p className="text-gray-700 mb-6">
              Käesolevad privaatsuseeskirjad kehtivad ainult meie veebitegevuste kohta ja meie veebisaidi 
              külastajatele seoses teabega, mida nad jagasid ja/või mida koguti veebisaidil www.jessylilled.ee. 
              Need eeskirjad ei kehti teabe kohta, mida on kogutud veebiväliselt või muude kanalite kaudu kui see veebisait.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nõusolek</h2>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <p className="text-pink-700 font-medium">
                Meie veebisaiti kasutades nõustute käesolevaga meie privaatsuseeskirjadega ja nendega seotud tingimustega.
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