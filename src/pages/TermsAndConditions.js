import React from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import LoginHeader from 'src/components/LoginHeader';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/layouts/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title> Privacy Policy | Lauenroth </title>
      </Helmet>
      <LoginHeader />
      <Container style={{ marginTop: '100px' }} className="py-5">
        <Typography variant="h3" className="text-start my-2" gutterBottom>
          Allgemeine Geschäftsbedingungen (AGBs) für die Resilienz-App von Lauenroth GmbH
        </Typography>

        <Typography variant="h5" gutterBottom>
          <strong>1. Geltungsbereich:</strong>
        </Typography>
        <p className='text-muted'>
          Diese Allgemeinen Geschäftsbedingungen („AGB“) gelten zwischen LAUENROTH GMBH, In der Au 20, 88263 Horgenzell
          und Nutzern der von Lauenroth GmbH angebotenen Software für mobile Endgeräte („Apps“). Diese AGB regeln die
          Bedingungen für den Download und die Nutzung der verschiedenen Apps. Durch die Verwendung unserer Apps erklärt
          sich der Nutzer mit diesen AGB einverstanden.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>2. Nutzeranforderungen:</strong>
        </Typography>
        <p className='text-muted'>
          Der Funktionsumfang der Apps kann sich je nach Betriebssystem unterscheiden. Die Funktionen sind im jeweiligen
          App Store wie z. B. iTunes, Google Play etc. (nachfolgend für alle „App Store“) beschrieben. Die Hardware- und
          Firmware-Anforderungen zum Betreiben der App auf Endgeräten sind im App Store aufgeführt. Aktualisierungen von
          Apps wird Lauenroth GmbH im gesetzlich erforderlichen Umfang entsprechend § 327f BGB bereitstellen. Darüber
          hinaus gehende Aktualisierungen behält sich Lauenroth GmbH nach eigenem Ermessen vor. Damit der Nutzer mit
          Hilfe der Apps aktuelle Inhalte auf sein Gerät laden kann, setzt Lauenroth GmbH eine stabile
          Internet-Verbindung des Endgeräts des Nutzers voraus. Nach dem Download von Inhalten innerhalb einer App kann
          der Nutzer die Inhalte unabhängig von einer Internet-Verbindung (offline) nutzen. Lauenroth GmbH behält sich
          das Recht vor, eine App jederzeit in einer dem Nutzer zumutbaren Art und Weise zu ändern, z.B. um diese weiter
          zu entwickeln und qualitativ zu verbessern. Dies gilt sowohl für technische als auch inhaltliche
          Weiterentwicklungen.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>3. In-App-Käufe und Abonnements:</strong>
        </Typography>
        <p className='text-muted'>
          Mit Hilfe der App kann der Nutzer aktuelle Inhalte in Form eines selbstverlängernden In-App-Abonnements
          abrufen („Abonnement“). Die verfügbaren Laufzeiten sind im jeweiligen Angebot enthalten. Ein Abonnement
          beinhaltet die Aktualisierung des Vorschriftenbestandes über einen Updateservice. Die Abrechnung (siehe dazu
          Ziff. 4. Zahlungsabwicklung) und Verwaltung des Abonnements erfolgen ausschließlich über das App Store-Konto
          des Nutzers. Der Vertrag über den (In)App-Kauf und das Abonnement kommt zwischen Nutzer und dem jeweiligen App
          Store Betreiber zustande. Das Abonnement verlängert sich nach Ablauf der Mindestvertragslaufzeit automatisch.
          Die automatische Verlängerung kann bis 24 Stunden vor Ablauf über die Kontoeinstellungen im App Store
          ausgeschaltet werden. Ein Abonnement kann über die Kontoeinstellungen im App Store beendet werden. Nach
          Beendigung des Abonnements kann der bereits heruntergeladene Vorschriftenbestand weiter genutzt werden. Eine
          Aktualisierung der Inhalte findet nach Beendigung des Abonnements nicht mehr statt, ebenso wenig wie der
          Zugriff auf der letzten heruntergeladenen Version vorangehenden Versionen von Inhalten.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>4. Zahlungsabwicklung und Widerrufsrecht:</strong>
        </Typography>
        <p className='text-muted'>
          Die Zahlungsabwicklung bei kostenpflichtigen Apps und In-App-Käufen findet direkt mit dem Betreiber des
          AppStores über das Nutzerkonto statt. Eine Erstattung von im App Store geleisteten Zahlungen seitens Lauenroth
          GmbH ist ausgeschlossen. Es gelten insoweit die Allgemeinen Geschäftsbedingungen/Nutzungsbedingungen der
          Storeanbieter. Ein etwaiges Widerrufsrecht ist ausschließlich bei den Storeanbietern auszuüben. Es gelten
          insoweit die Allgemeinen Geschäftsbedingungen/Nutzungsbedingungen der Storeanbieter.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>5. Sicherung von Inhalten:</strong>
        </Typography>
        <p className='text-muted'>
          Lauenroth GmbH übernimmt keine Gewähr dafür, dass Einträge in der persönlichen Merkliste der App (z. B.
          Anmerkungen, Lesezeichen etc.) dauerhaft gespeichert werden. Insbesondere nach Updates können diese nicht mehr
          verfügbar sein.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>6. Haftungsbeschränkung:</strong>
        </Typography>
        <p className='text-muted'>
          Lauenroth GmbH wendet bei der Auswahl, Pflege und Aktualität der Inhalte die üblicherweise zu erwartende
          Sorgfalt an. Allerdings übernimmt Lauenroth GmbH keine Gewähr für die inhaltliche Richtigkeit, Aktualität und
          Vollständigkeit der zur Verfügung gestellten Inhalte und deren Auswahl sowie Zusammenstellungen. Dies gilt
          insbesondere auch soweit Lauenroth GmbH auf die Zulieferung von Texten Dritter angewiesen ist. Soweit die
          Verfügbarkeit der App von Leistungen Dritter (insbesondere Telekommunikationsanbietern) abhängig ist übernimmt
          Lauenroth GmbH keine Haftung für die Verfügbarkeit. Lauenroth GmbH haftet unbeschränkt
        </p>
        <p className='text-muted'>
          <ul>
            <li>bei Vorsatz oder grober Fahrlässigkeit,</li>
            <li>für die Verletzung von Leben, Leib oder Gesundheit,</li>
            <li>nach den Vorschriften des Produkthaftungsgesetzes sowie</li>
            <li>im Umfang einer vom Auftragnehmer übernommenen Garantie.</li>
          </ul>
        </p>
        <p className='text-muted'>
          Bei einfach fahrlässiger Verletzung einer Pflicht, die wesentlich für die Erreichung des Vertragszwecks ist
          (Kardinalpflicht), ist die Haftung von Lauenroth GmbH der Höhe nach begrenzt auf den Schaden, der nach der Art
          des fraglichen Geschäftes vorhersehbar und typisch ist. Eine weitergehende Haftung von Lauenroth GmbH besteht
          nicht.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>7. Schutzrechte:</strong>
        </Typography>
        <p className='text-muted'>
          Lauenroth GmbH behält sich alle Rechte, insbesondere Urhebernutzungsrechte und Markenrechte, an den Apps und
          sämtlichen innerhalb der Apps bereitgestellten Inhalte vor. Insbesondere handelt es sich bei den
          zusammengestellten Inhalten der App um eigens von Lauenroth GmbH hergestellte Datenbankwerke, speziell um
          Datenbanken i. S. v. §§ 4 Abs. 2, 87a Abs. 1 UrhG sowie ggf. Sprachwerke nach § 2 UrhG. Die zugehörigen
          Programme sind als Code durch §§ 69a ff. UrhG ebenfalls urheberrechtlich geschützt. Der Nutzer erwirbt mit dem
          Download einer App eine zeitlich auf die Dauer der Installation beschränkte, nichtausschließliche und
          nicht-übertragbare Lizenz zum Herunterladen, Installieren und Verwenden der App auf jedem kompatiblen
          Endgerät, dessen Eigentümer er ist bzw. der seiner Kontrolle unterliegt. Das Nutzungsrecht umfasst auch
          etwaige Aktualisierungen (Upgrades, Patches etc.). Der Nutzer erwirbt an den in der App abgerufenen Inhalten
          ein einfaches und nicht-übertragbares Nutzungsrecht. Das Nutzungsrecht berechtigt den Nutzer zum Herunterladen
          der Inhalte auf sein Endgerät sowie dazu, die Inhalte zu konsumieren. Es ist zeitlich auf die für die
          jeweiligen Inhalte vereinbarte Nutzungsdauer beschränkt. Insbesondere endet das Nutzungsrecht an Altversionen
          von Inhalten im Fall von Abonnements mit dem Ende des Abonnements. Dem Nutzer ist es nicht gestattet, eine App
          zu dekompilieren, zurückzuentwickeln, zu disassemblieren, Versuche zur Ableitung des Quellcodes zu
          unternehmen, den Quellcode zu entschlüsseln, zu verändern oder abgeleitete Werke der App oder deren Inhalte zu
          erstellen oder in anderer Software wiederzuverwenden. Davon unberührt bleiben die zwingenden gesetzlichen
          Vorschriften nach § 69a ff. UrhG. Unberührt bleiben die urheberrechtlichen Schrankenbestimmungen.
        </p>

        <Typography variant="h5" gutterBottom>
          <strong>8. Schlussbestimmungen</strong>
        </Typography>
        <p className='text-muted'>
          Nebenabreden, Änderungen oder Ergänzungen bedürfen zu ihrer Wirksamkeit der Textform. Dies gilt auch für die
          Aufhebung der Textform. Es gilt deutsches Sachrecht unter Ausschluss des UNKaufrechts. Erfüllungsort ist der
          Sitz von Lauenroth GmbH. Ist der Nutzer Kaufmann, juristische Person des öffentlichen Rechts oder
          öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Ansprüche im Zusammenhang mit der
          Geschäftsbeziehung der Sitz von Lauenroth GmbH. Lauenroth GmbH ist berechtigt, auch am allgemeinen
          Gerichtsstand des Nutzers zu klagen. Falls der Nutzer nach Vertragsschluss seinen Wohnsitz oder seinen
          gewöhnlichen Aufenthaltsort aus dem Geltungsbereich der Bundesrepublik Deutschland verlegt, ist der
          Gerichtsstand für alle Streitigkeiten aus dieser Vereinbarung der Sitz von Lauenroth GmbH. Gleiches gilt, wenn
          der Nutzer seinen Wohnsitz oder gewöhnlichen Aufenthalt im Ausland hat. Abweichende oder ergänzende
          Geschäftsbedingungen des Nutzers werden nicht Vertragsbestandteil, es sei denn, Lauenroth GmbH hat ihrer
          Geltung ausdrücklich zugestimmt. Die EU-Kommission stellt eine Internetplattform zur Online-Beilegung von
          Streitigkeiten („OS-Plattform“) unter https://ec.europa.eu/consumers/odr/ bereit. Diese Plattform dient als
          Anlaufstelle zur außergerichtlichen Beilegung solcher Streitigkeiten, die Online-Kaufverträgen entspringen.
          Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht
          verpflichtet und nicht bereit.
        </p>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
