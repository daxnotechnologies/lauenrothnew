import React from 'react';
import { Typography, Container, List } from '@mui/material';
import LoginHeader from 'src/components/LoginHeader';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/layouts/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title> Privacy Policy | Lauenroth </title>
      </Helmet>
      <LoginHeader />
      <Container style={{ marginTop: '100px' }} className="py-5">
        <Typography className="text-start my-2" variant="h3" gutterBottom>
          Datenschutzerklärung
        </Typography>
        <p className="text-muted">
          In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung personenbezogener Daten bei Nutzung
          der Resilienz-App der <b>Lauenroth GmbH</b>. Die App dient der übergreifenden Unternehmenskommunikation und
          ermöglicht das Teilen von Inhalten, insbesondere Videos, zu den Themen Bewegung, Entspannung und
          Selbstmanagement. Inhalte können von autorisierten Benutzern geteilt und von allen Benutzern aufgerufen
          werden.
        </p>
        <p className="text-muted">
          Personenbezogene Daten sind Informationen, die sich auf eine identifizierte oder identifizierbare Person
          beziehen. Hierzu zählen vor allem Angaben, die Rückschlüsse auf Ihre Identität zulassen, etwa Ihr Name, Ihre
          Telefonnummer, Ihre Anschrift oder Ihre E-Mail-Adresse. Zu den personenbezogenen Daten zählen aber auch
          bestimmte Identifikatoren wie beispielsweise Ihre IP-Adresse oder die Geräte-ID des von Ihnen genutzten
          Endgerätes.
        </p>
        <Typography variant="h5" gutterBottom>
          1. Verantwortlicher und Ansprechpartner
        </Typography>
        <p className="text-muted">
          Ansprechpartner und sogenannter Verantwortlicher für die Verarbeitung Ihrer personenbezogenen Daten bei der
          Nutzung dieser App im Sinne der Datenschutz-Grundverordnung (DSGVO) ist
          <br />
          <br />
          Jörg Lauenroth
          <br />
          Lauenroth GmbH
          <br />
          Schnetzen 1/1Schnetzen 1/1
          <br />
          88276 Berg
          <br />
          <br />
          Telefon: +49 (0) 75 04 - 971 82 42 <br />
          E-Mail: hallo@lauenroth-gmbh.de
          <br />
          <br />
          Wenn Sie Fragen zum Datenschutz im Zusammenhang mit unseren Produkten und Dienstleistungen oder der Nutzung
          unserer App haben, können Sie sich jederzeit unter den angegebenen Kontaktdaten an uns wenden.
        </p>
        {/* <List>
          <Typography variant="h5" className="ms-4" gutterBottom>
            1) Personenbezogene Daten
          </Typography>

          <p className="text-muted ms-4">
            Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare
            natürliche Person (im Folgenden „betroffene Person) beziehen. Als identifizierbar wird eine natürliche
            Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen,
            zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung oder zu einem oder mehreren besonderen
            Merkmalen, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen,
            kulturellen oder sozialen Identität dieser natürlichen Person sind, identifiziert werden kann.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            2) Betroffene Person
          </Typography>

          <p className="text-muted ms-4">
            Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene
            Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            3) Verarbeitung
          </Typography>

          <p className="text-muted ms-4">
            Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche
            Vorgangsreihe im Zusammenhang mit personenbezogenen Daten, wie das Erheben, das Erfassen, die Organisation,
            das Ordnen, die Speicherung, die Anpassung oder Veränderung, das Auslesen, das Abfragen, die Verwendung, die
            Offenlegung durch Übermittlung, Verbreitung oder eine andere Form der Bereitstellung, den Abgleich oder die
            Verknüpfung, die Einschränkung, das Löschen oder die Vernichtung.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            4) Einschränkung der Verarbeitung
          </Typography>

          <p className="text-muted ms-4">
            Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre
            künftige Verarbeitung einzuschränken.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            5) Profiling
          </Typography>

          <p className="text-muted ms-4">
            Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass
            diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine
            natürliche Person beziehen, zu bewerten, insbesondere, um Aspekte bezüglich Arbeitsleistung,
            wirtschaftlicher Lage, Gesundheit, persönlicher Vorlieben, Interessen, Zuverlässigkeit, Verhalten,
            Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            6) Pseudonymisierung
          </Typography>

          <p className="text-muted ms-4">
            Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die
            personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen
            betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt
            werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die
            personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen
            werden.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            7) Verantwortlicher oder für die Verarbeitung Verantwortlicher
          </Typography>

          <p className="text-muted ms-4">
            Verantwortlicher oder für die Verarbeitung Verantwortlicher ist die natürliche oder juristische Person,
            Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel
            der Verarbeitung von personenbezogenen Daten entscheidet. Sind die Zwecke und Mittel dieser Verarbeitung
            durch das Unionsrecht oder das Recht der Mitgliedstaaten vorgegeben, so kann der Verantwortliche
            beziehungsweise können die bestimmten Kriterien seiner Benennung nach dem Unionsrecht oder dem Recht der
            Mitgliedstaaten vorgesehen werden.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            8) Auftragsverarbeiter
          </Typography>

          <p className="text-muted ms-4">
            Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle,
            die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            9) Empfänger
          </Typography>

          <p className="text-muted ms-4">
            Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der
            personenbezogene Daten offengelegt werden, unabhängig davon, ob es sich bei ihr um einen Dritten handelt
            oder nicht. Behörden, die im Rahmen eines bestimmten Untersuchungsauftrags nach dem Unionsrecht oder dem
            Recht der Mitgliedstaaten möglicherweise personenbezogene Daten erhalten, gelten jedoch nicht als Empfänger.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            10) Dritter
          </Typography>

          <p className="text-muted ms-4">
            Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der
            betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der
            unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die
            personenbezogenen Daten zu verarbeiten.
          </p>

          <Typography variant="h5" className="ms-4" gutterBottom>
            11) Einwilligung
          </Typography>

          <p className="text-muted ms-4">
            Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise
            und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen
            bestätigenden Handlung, mit der die betroffene Person zu verstehen gibt, dass sie mit der Verarbeitung der
            sie betreffenden personenbezogenen Daten einverstanden ist.
          </p>
        </List> */}
        <Typography variant="h5" gutterBottom>
          2. Datenverarbeitung in unserer App
        </Typography>
        <p className="text-muted">
          Um unsere App aus einem App-Store herunterzuladen und zu installieren, müssen Sie sich zunächst beim Anbieter
          des jeweiligen App-Stores (z. B. Apple App Store oder Google Play) mit einem Account registrieren und einen
          entsprechenden Lizenzvertrag abschließen. Hierauf haben wir keinen Einfluss; insbesondere sind wir nicht
          Vertragspartei einer solchen Lizenzvereinbarung.
        </p>
        <p className="text-muted">
          Beim Herunterladen und Installieren der App werden die erforderlichen Informationen an den jeweiligen App
          Store übermittelt, insbesondere Ihr Name, Ihre E-Mail-Adresse und Kontonummer, der Zeitpunkt des Downloads,
          Zahlungsinformationen und die individuelle Geräte-ID.
        </p>
        <p className="text-muted">
          Auf diese Datenerhebung haben wir keinen Einfluss und sind dafür nicht verantwortlich. Wir verarbeiten die
          bereitgestellten Daten nur, soweit dies für den Download und die Installation der App auf Ihrem mobilen
          Endgerät (z. B. Smartphone, Tablet) erforderlich ist. Eine darüber hinausgehende Speicherung dieser Daten
          erfolgt nicht.
        </p>
        <p className="text-muted">
          Rechtsgrundlage für die Datenverarbeitung in unserem Verantwortungsbereich ist Art. 6 Abs. 1 lit. f DSGVO.
          Unser berechtigtes Interesse besteht darin, die Bereitstellung der App zu ermöglichen. Die Datenverarbeitung,
          für die ausschließlich der App-Store-Betreiber verantwortlich ist, entnehmen Sie bitte dessen
          Datenschutzerklärung:
        </p>
        <ul className="text-muted ms-4">
          <li>
            Google Play:
            <a href="https://play.google.com/intl/de/about/privacy-security-deception/">
              https://play.google.com/intl/de/about/privacy-security-deception/
            </a>
            und
            <a href="https://policies.google.com/privacy?hl=de">https://policies.google.com/privacy?hl=de</a>
          </li>
          <br />
          <li>
            Apple App Store:
            <a href="https://support.apple.com/de-de/HT208477">https://support.apple.com/de-de/HT208477</a>
            und
            <a href="https://www.apple.com/legal/privacy/de-ww/">https://www.apple.com/legal/privacy/de-ww/</a>
          </li>
        </ul>
        <br />
        <p className="text-muted">Unsere Apps finden Sie unter folgenden Adressen in den App Stores:</p>
        <br />
        <ul className="text-muted ms-4">
          <li>
            Google Play:
            <a href="https://play.google.com/store/apps/details?id=de.u2d.a2e.client.hybrid.ruv">
              https://play.google.com/store/apps/details?id=de.u2d.a2e.client.hybrid.ruv
            </a>
          </li>
          <br />
          <li>
            Apple App Store:
            <a href="https://apps.apple.com/sk/app/r-v-event-app/id1446862912">
              https://apps.apple.com/sk/app/r-v-event-app/id1446862912
            </a>
          </li>
        </ul>
        <br />
        {/* <p className="text-muted">
          <b> Herausgeber: Lauenroth GmbH</b>
          <br />
          Anschrift: In der Au 20, 88263 Horgenzell
          <br />
          Tel.: 07504 - 9718242 <br />
          E-Mail: <a href="mailto:j.lauenroth@lauenroth-pt.de">j.lauenroth@lauenroth-pt.de</a>
          <br /> Website:{' '}
          <a href="http://www.lauenroth-pt.de" target="_blank">
            www.lauenroth-pt.de
          </a>
        </p> */}
        <Typography variant="h5" gutterBottom>
          2.2 Connection data
        </Typography>
        <p className="text-muted">
          Wenn Sie die App nutzen, verarbeiten wir Verbindungsdaten, die Ihre App automatisch übermittelt, um Ihnen die
          Nutzung der App zu ermöglichen. Diese Verbindungsdaten umfassen insbesondere die sogenannten
          HTTP-Header-Informationen, einschließlich des User-Agents
        </p>
        <ul className="text-muted ms-4">
          <li>IP-Adresse des anfragenden Endgerätes</li>
          <br />
          <li>Methode (z. B. GET, POST) sowie Datum und Uhrzeit der Anfrage</li>
          <br />
          <li>Adresse und Pfad der angeforderten Dateien</li>
          <br />
          <li>gegebenenfalls zuvor aufgerufene Adressen (HTTP-Referrer)</li>
          <br />
          <li>
            Informationen zum Betriebssystem (Name und Version, z. B. „Android 11“ oder „iOS 15“) und zum verwendeten
            Endgerät (Geräte-ID und -Name, Build-Nummer und Modell, z. B. „Apple iPhone X“ oder „Samsung Galaxy S9“ )
          </li>
          <br />

          <li>Informationen zur App (Name, Version, App-ID)</li>
          <br />

          <li>Version des HTTP-Protokolls, HTTP-Statuscode, Größe der gelieferten Datei</li>
          <br />

          <li>Fordern Sie Informationen wie Sprache, Art des Inhalts, Codierung des Inhalts und Zeichensätze an.</li>
        </ul>
        <br />
        <p className="text-muted">
          Die Verarbeitung dieser Zugriffsdaten ist zwingend erforderlich, um die Funktionen der App technisch zu
          ermöglichen, die dauerhafte Funktionsfähigkeit, Verfügbarkeit und Sicherheit unserer Systeme zu gewährleisten
          und unsere App allgemein administrativ aufrechtzuerhalten.
        </p>
        <p className="text-muted">
          Darüber hinaus werden von Ihrem Mobilgerät teilweise automatisch Protokolldateien auf Ihrem Gerät erstellt,
          die verschiedene technische Informationen enthalten können (z. B. Art der Nachricht, Datum und Uhrzeit der
          Nachricht, Auslöser der Nachricht (z. B. ein Fehler, ein App-Aufruf). ), verwendete App, Informationen zum
          Inhalt der Nachricht). Dies ist aus technischen Gründen erforderlich, damit die App ordnungsgemäß funktioniert
          und Sie die gewünschten Dienste nutzen können.
        </p>
        <p className="text-muted">
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht darin, die Bereitstellung
          und Funktionen der App zu ermöglichen und die dauerhafte Funktionsfähigkeit und Sicherheit unserer Systeme
          sicherzustellen.
        </p>

        <Typography variant="h5" gutterBottom>
          2.3 App-Berechtigungen
        </Typography>
        <p className="text-muted">
          Bei der Installation oder Nutzung unserer App können auf technischer Ebene Berechtigungen des Endgerätes
          abgefragt werden. Zusätzlich zu den Standardberechtigungen für Apps (z. B. Zugriff auf die Internetverbindung
          über WLAN oder Datenverbindung) sind folgende App-Berechtigungen erforderlich:
        </p>
        <br />
        <ul className="text-muted ms-4">
          <li>
            Zugriff auf Fotos/Medien/Dateien (z. B. erforderlich, wenn Superuser und Admins Inhalte in der App
            bereitstellen oder als Nachricht an Benutzer senden möchten).
          </li>
        </ul>
        <br />
        <p className="text-muted">
          Diese App-Berechtigung ist grundsätzlich für die Bereitstellung unserer App erforderlich. Der Zugriff auf und
          die Speicherung der Informationen im Endgerät ist in diesen Fällen zwingend erforderlich und erfolgt auf
          Grundlage der Umsetzungsgesetze der ePrivacy-Richtlinie der EU-Mitgliedsstaaten, in Deutschland nach § 25 Abs.
          2 TTDSG. Rechtsgrundlage für die Verarbeitung personenbezogener Daten ist dann Art. 6 Abs. 1 lit. f DSGVO.
          Unser berechtigtes Interesse besteht darin, die Bereitstellung und Grundfunktionen der App zu ermöglichen.
        </p>
        <Typography variant="h5" gutterBottom>
          2.4 Registrierung
        </Typography>
        <p className="text-muted">
          Um den vollen Funktionsumfang unserer App nutzen zu können, ist eine Registrierung erforderlich. Superuser und
          Admins registrieren sich mit ihrer E-Mail-Adresse und ihrem Passwort. Rechtsgrundlage für die Verarbeitung der
          für die Registrierung erforderlichen Daten ist Art. 6 Abs. 1 lit. b DSGVO. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p className="text-muted">
          Benutzer können sich an den Administrator wenden und erhalten einen vom Administrator generierten Code zur
          Registrierung in der App. Die Registrierung in der App erfolgt dann allein über den Registrierungscode. Bei
          der Registrierung der Nutzer werden keine personenbezogenen Daten erhoben. Über denselben Admin registrierte
          Benutzer bilden eine Abteilung
        </p>
        <Typography variant="h5" gutterBottom>
          2.5 Kurse
        </Typography>
        <p className="text-muted">
          Admins und Superuser haben im Bereich „Kurse“ die Möglichkeit, Kurse für Benutzer zu erstellen und Kursinhalte
          in Form von Video-, Text- und Audiodateien bereitzustellen.
        </p>
        <p className="text-muted">
          Die bereitgestellten Kursinhalte werden aufbereitet, damit sie den Nutzern in der App angezeigt werden können.
          Rechtsgrundlage für die Verarbeitung der für die Registrierung erforderlichen Daten ist Art. 6 Abs. 1 lit. b
          DSGVO. 6 Abs. 1 lit. b DSGVO.
        </p>
        <Typography variant="h5" gutterBottom>
          2.6 Kommunikation
        </Typography>
        <p className="text-muted">
          Administratoren können mit anderen Benutzern in Kontakt treten, indem sie Nachrichten an alle Benutzer in
          ihrer Abteilung senden. Benutzer können Nachrichten nur lesen und darauf reagieren, indem sie verschiedene
          Reaktionstasten drücken. Die Reaktionen auf die Nachrichten werden gezählt und die Anzahl der Reaktionen
          angezeigt. Die Reaktionen können jedoch nicht einzelnen Benutzern zugeordnet werden.
        </p>
        <p className="text-muted">
          Die Messaging-Funktion ermöglicht auch den Versand von Bildern und anderen Dateien. Der Inhalt der
          Kommunikation und die Anzahl der Antworten werden verarbeitet, um das Senden und Empfangen von Nachrichten zu
          ermöglichen.
        </p>
        <p className="text-muted">Rechtsgrundlage für die Nutzung des Chats ist Art. 6 Abs. 1 lit. b DSGVO.</p>
        <Typography variant="h5" gutterBottom>
          2.7 Einbindung von YouTube-Videos
        </Typography>
        <p className="text-muted">
          Wir nutzen in unserer App Videos von YouTube LLC, 901 Cherry Ave, 94066 San Bruno, CA, USA („YouTube“), einem
          Unternehmen von Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA („Google“) . Es besteht
          die Möglichkeit, YouTube-Videos in unserer App im Bereich Kurse einzubetten. Die Videos werden auf YouTube
          gespeichert und können direkt in unserer App abgespielt werden.
        </p>
        <p className="text-muted">
          Durch die Nutzung unserer App erhalten YouTube und Google die Information, dass Sie den entsprechenden Bereich
          unserer App aufgerufen haben. Darüber hinaus werden bestimmte Ereignisse (Interaktionen und Ereignisse), wie
          beispielsweise die Aktivierung des Vollbildmodus, die Wiedergabe oder die Wiedergabeliste, aufgezeichnet. Dies
          erfolgt unabhängig davon, ob Sie bei YouTube oder Google eingeloggt sind oder nicht.
        </p>
        <p className="text-muted">
          YouTube und Google nutzen diese Daten auch für Zwecke der Werbung, Marktforschung und bedarfsgerechten
          Gestaltung. Wenn Sie YouTube in unserer App aufrufen, während Sie in Ihrem YouTube- oder Google-Profil
          eingeloggt sind, können YouTube und Google dieses Ereignis ebenfalls mit den jeweiligen Profilen verknüpfen.
          Wenn Sie diese Zuordnung nicht wünschen, müssen Sie sich vor Aufruf unserer App bei Google ausloggen.
        </p>
        <p className="text-muted">
          Neben dem Widerruf Ihrer Einwilligung haben Sie auch die Möglichkeit, personalisierte Werbung in den
          Google-Einstellungen für Werbung zu deaktivieren. In diesem Fall zeigt Google ausschließlich nicht
          personalisierte Werbung an:<a href="https://adssettings.google.com/">https://adssettings.google.com/</a>
        </p>
        <p className="text-muted">
          Weitere Informationen finden Sie auch in der Datenschutzerklärung von Google für YouTube:
          <a href="https://policies.google.com/privacy?hl=de&gl=de">https://policies.google.com/privacy?hl=de&gl=de.</a>
        </p>
        <Typography variant="h5" gutterBottom>
          3. Empfänger der Daten
        </Typography>
        <p className="text-muted">
          Eine Weitergabe der von uns erhobenen Daten erfolgt nur, wenn hierfür im Einzelfall eine datenschutzrechtliche
          Rechtsgrundlage besteht, insbesondere wenn:
        </p>
        <br />
        <ul className="text-muted ms-4">
          <li>
            Sie hierzu Ihre ausdrückliche Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO erteilt haben. 6 Abs. 1 lit. a
            DSGVO,
          </li>
          <li>
            die Offenlegung gemäß Art. 6 Abs. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von
            Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes
            schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,
          </li>
          <li>
            Wir sind zur Datenweitergabe gemäß Art. 6 Abs. 1 lit. c DSGVO gesetzlich verpflichtet. 6 Abs. 1 lit. c
            DSGVO, insbesondere wenn dies zur Rechtsverfolgung oder -durchsetzung aufgrund behördlicher Anfragen,
            gerichtlicher Anordnungen und Gerichtsverfahren erforderlich ist, oder
          </li>
          <li>
            dies gesetzlich zulässig und gemäß Art. 6 Abs. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen
            mit Ihnen oder zur Durchführung vorvertraglicher Maßnahmen, die auf Ihre Anfrage erfolgen.
          </li>
        </ul>
        <br />
        <p className="text-muted">
          Ein Teil der Datenverarbeitung kann durch unsere Dienstleister erfolgen. Zur Bereitstellung der in dieser
          Datenschutzerklärung beschriebenen App-Funktionen nutzen wir verschiedene Dienste, beispielsweise von Google
          Firebase.
        </p>
        <p className="text-muted">
          Die Firebase-Dienste werden für Nutzer aus dem Europäischen Wirtschaftsraum und der Schweiz durch Google
          Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland und für alle anderen Nutzer durch Google LLC
          1600 Amphitheatre Parkway Mountain View, CA 94043, USA (zusammen „ Google").
        </p>
        <p className="text-muted">Weitere Informationen zum Datenschutz bei Google und Firebase finden Sie unter</p>
        <br />
        <ul className='ms-4'>
          <li>
            <a href="https://policies.google.com/privacy?gl=de ">https://policies.google.com/privacy?gl=de </a>
          </li>
          <li>
            <a href="https://firebase.google.com/support/privacy/">https://firebase.google.com/support/privacy/</a>
          </li>
        </ul>
        <br />
        <Typography variant="h5" gutterBottom>
          4. Datenübermittlung in Drittländer
        </Typography>
        <p className="text-muted">
          Wie in dieser Datenschutzerklärung erläutert, nutzen wir auch Dienste, deren Anbieter teilweise in sogenannten
          Drittländern (außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums) ansässig sind oder dort
          personenbezogene Daten verarbeiten, also in Ländern, deren Datenschutzniveau nicht diesem entspricht die der
          Europäischen Union. Sofern dies der Fall ist und für diese Länder kein Angemessenheitsbeschluss der
          Europäischen Kommission (Art. 45 DSGVO) vorliegt, haben wir entsprechende Vorkehrungen getroffen, um bei
          etwaigen Datenübermittlungen ein angemessenes Datenschutzniveau sicherzustellen. Hierzu zählen unter anderem
          die Standardvertragsklauseln der Europäischen Union oder verbindliche interne Datenschutzvorschriften.
        </p>
        <p className="text-muted">
          Sofern dies nicht möglich ist, stützen wir die Datenübermittlung auf die Ausnahmen des Art. Art. 49 DSGVO,
          insbesondere Ihre ausdrückliche Einwilligung oder die Erforderlichkeit der Weitergabe zur Vertragserfüllung
          oder zur Durchführung vorvertraglicher Maßnahmen.
        </p>
        <p className="text-muted">
          Sofern eine Übermittlung in ein Drittland geplant ist und kein Angemessenheitsbeschluss oder geeignete
          Garantien vorliegen, ist es möglich und besteht das Risiko, dass Behörden im jeweiligen Drittland (z. B.
          Geheimdienste) Zugriff auf die übermittelten Daten erhalten, um diese zu erheben verarbeiten und analysieren
          und dass die Durchsetzbarkeit Ihrer Betroffenenrechte nicht gewährleistet werden kann. Auch hierüber werden
          Sie bei Einholung Ihrer Einwilligung informiert.
        </p>
        <Typography variant="h5" gutterBottom>
          5. Speicherdauer
        </Typography>
        <p className="text-muted">
          Grundsätzlich speichern wir personenbezogene Daten nur so lange, wie es zur Erfüllung der Zwecke, für die wir
          die Daten erhoben haben, erforderlich ist. Anschließend löschen wir die Daten unverzüglich, es sei denn, wir
          benötigen die Daten noch bis zum Ablauf der gesetzlichen Verjährungsfristen zu Beweiszwecken für
          zivilrechtliche Ansprüche, aufgrund gesetzlicher Aufbewahrungspflichten oder es besteht eine sonstige
          datenschutzrechtliche Grundlage für die weitere Verarbeitung Ihrer Daten den konkreten Einzelfall
        </p>

        <Typography variant="h5" gutterBottom>
          6. Ihre Rechte, insbesondere Widerrufs- und Widerspruchsrechte
        </Typography>
        <p className="text-muted">
          Es stehen Ihnen die in Art. 11 DSGVO formulierten Betroffenenrechte zu. 7 Abs. 3, Kunst. 15 - 21, Kunst. Gemäß
          Art. 77 DSGVO jederzeit bei Vorliegen der jeweiligen gesetzlichen Voraussetzungen:
        </p>
        <br />
        <ul className='ms-4'>
          <li>Recht auf Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO) </li>
          <li>Recht auf Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten (Art. 21 DSGVO) </li>
          <li>Recht auf Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten (Art. 15 DSGVO)</li>
          <li>
            Recht auf Berichtigung Ihrer bei uns gespeicherten unrichtigen personenbezogenen Daten (Art. 16 DSGVO)
          </li>
          <li>Recht auf Löschung Ihrer personenbezogenen Daten (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung Ihrer personenbezogenen Daten (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit Ihrer personenbezogenen Daten (Art. 20 DSGVO)</li>
          <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
        <br />
        <p className="text-muted">
          Zur Geltendmachung Ihrer hier beschriebenen Rechte können Sie sich jederzeit unter den oben angegebenen
          Kontaktdaten an uns wenden. Dies gilt auch, wenn Sie Kopien von Garantien zum Nachweis eines angemessenen
          Datenschutzniveaus erhalten möchten. Sofern die entsprechenden gesetzlichen Voraussetzungen vorliegen, werden
          wir Ihrem datenschutzrechtlichen Anliegen nachkommen.
        </p>
        <p className="text-muted">
          Ihre Anfragen zur Geltendmachung datenschutzrechtlicher Ansprüche und unsere Antworten darauf werden zu
          Dokumentationszwecken für die Dauer von bis zu drei Jahren, im Einzelfall auch darüber hinaus gespeichert,
          wenn Gründe für die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen vorliegen Ansprüche.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, basierend auf unserem Interesse an der Abwehr etwaiger
          zivilrechtlicher Ansprüche gem. Art. 6 Abs. 1 lit. f DSGVO. Art. 82 DSGVO, die Vermeidung von Bußgeldern gemäß
          Art. Art. 83 DSGVO und der Erfüllung unserer Rechenschaftspflicht gemäß Art. 5 Abs. 2 DSGVO.
        </p>
        <p>
          Sie haben das Recht, Ihre Einwilligung jederzeit zu widerrufen. Wir werden daher die Datenverarbeitung, die
          auf dieser Einwilligung beruhte, künftig nicht mehr fortführen. Durch den Widerruf der Einwilligung wird die
          Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.
        </p>
        <p>
          Sofern wir Ihre Daten auf Grundlage berechtigter Interessen verarbeiten, haben Sie das Recht, aus Gründen, die
          sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen die Verarbeitung Ihrer Daten
          einzulegen. Sofern es sich um einen Widerspruch gegen die Datenverarbeitung zu Zwecken der Direktwerbung
          handelt, steht Ihnen ein generelles Widerspruchsrecht zu, das wir auch ohne Angabe von Gründen umsetzen.
        </p>
        <p>
          Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine formlose Nachricht an die
          oben genannten Kontaktdaten.
        </p>
        <p className="text-muted">
          Schließlich haben Sie das Recht, eine Beschwerde bei einer Datenschutz-Aufsichtsbehörde unter der Adresse
          einzureichen. Dieses Recht können Sie beispielsweise bei einer Aufsichtsbehörde in dem Mitgliedstaat Ihres
          Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes geltend machen. Die zuständige
          Aufsichtsbehörde für unseren Sitz Horgenzell ist der Landesbeauftragte für Datenschutz und
          Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.
        </p>
        <Typography variant="h5" gutterBottom>
          7. Änderungen der Datenschutzbestimmungen
        </Typography>
        <p className="text-muted">
          Wir aktualisieren diese Datenschutzerklärung gelegentlich, beispielsweise wenn wir unsere App anpassen oder
          wenn sich gesetzliche oder behördliche Anforderungen ändern.
        </p>
        {/* <p className="text-muted">
          Entfällt der Speicherungszweck oder läuft eine vom europäischen Richtlinien- und Verordnungsgeber oder einem
          anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten
          routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.
        </p>
        <Typography variant="h5" gutterBottom>
          10. Rechte der betroffenen Person
        </Typography>
        <Typography variant="h5" className="ms-4" gutterBottom>
          1) Recht auf Bestätigung
        </Typography>
        <p className="text-muted ms-4">
          Jede betroffene Person hat das vom europäischen Richtlinien- und Verordnungsgeber eingeräumte Recht, von dem
          für die Verarbeitung Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende
          personenbezogene Daten verarbeitet werden. Möchte eine betroffene Person dieses Bestätigungsrecht in Anspruch
          nehmen, kann sie sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          2) Recht auf Auskunft
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, jederzeit von dem für die Verarbeitung Verantwortlichen unentgeltliche
          Auskunft über die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu
          erhalten.
        </p>
        <p className="text-muted ms-4">
          Ferner hat der Europäische Richtlinien- und Verordnungsgeber der betroffenen Person Auskunft über folgende
          Informationen zugestanden:
        </p>
        <ul className=" text-muted ms-5 ps-3">
          <li>die Verarbeitungszwecke</li>
          <li>die Kategorien personenbezogener Daten, die verarbeitet werden</li>
          <li>
            die Empfänger oder Kategorien von Empfängern, gegenüber denen die personenbezogenen Daten offengelegt wurden
            oder noch offengelegt werden, insbesondere bei Empfängern in Drittländern oder bei internationalen
            Organisationen
          </li>
          <li>
            Falls möglich die geplante Dauer, für die die personenbezogenen Daten gespeichert werden, oder, falls dies
            nicht möglich ist, die Kriterien für die Festlegung dieser Dauer
          </li>
          <li>
            das Bestehen eines Rechts auf Berichtigung oder Löschung der sie betreffenden personenbezogenen Daten oder
            auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese
            Verarbeitung
          </li>
          <li>das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde</li>
          <li>
            wenn die personenbezogenen Daten nicht bei der betroffenen Person erhoben werden: Alle verfügbaren
            Informationen über die Herkunft der Daten
          </li>
          <li>
            das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling gemäß Artikel 22 Abs.1 und
            4 DSGVO und — zumindest in diesen Fällen — aussagekräftige Informationen über die involvierte Logik sowie
            die Tragweite und die angestrebten Auswirkungen einer derartigen Verarbeitung für die betroffene Person
          </li>{' '}
        </ul>
        <p className="text-muted ms-4">
          Ferner steht der betroffenen Person ein Auskunftsrecht darüber zu, ob personenbezogene Daten an ein Drittland
          oder an eine internationale Organisation übermittelt wurden. Sofern dies der Fall ist, so steht der
          betroffenen Person im Übrigen das Recht zu, Auskunft über die geeigneten Garantien im Zusammenhang mit der
          Übermittlung zu erhalten. Möchte eine betroffene Person dieses Auskunftsrecht in Anspruch nehmen, kann sie
          sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          3) Recht auf Berichtigung
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener
          Daten zu verlangen. Ferner steht der betroffenen Person das Recht zu, unter Berücksichtigung der Zwecke der
          Verarbeitung, die Vervollständigung unvollständiger personenbezogener Daten — auch mittels einer ergänzenden
          Erklärung — zu verlangen.Möchte eine betroffene Person dieses Berichtigungsrecht in Anspruch nehmen, kann sie
          sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          4) Recht auf Löschung (Recht auf Vergessenwerden)
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden
          personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der folgenden Gründe zutrifft und soweit
          die Verarbeitung nicht erforderlich ist:
        </p>
        <ul className=" text-muted ms-5 ps-3">
          <li>
            Die personenbezogenen Daten wurden für solche Zwecke erhoben oder auf sonstige Weise verarbeitet, für welche
            sie nicht mehr notwendig sind.
          </li>
          <li>
            Die betroffene Person widerruft ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1
            Buchstabe a DSGVO oder Art. 9 Abs. 2 Buchstabe a DSGVO stützte, und es fehlt an einer anderweitigen
            Rechtsgrundlage für die Verarbeitung.
          </li>
          <li>
            Die betroffene Person legt gemäß Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein, und es liegen
            keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder die betroffene Person legt gemäß Art.
            21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein.
          </li>
          <li>Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.</li>
          <li>
            Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem
            Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.
          </li>
          <li>
            Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8
            Abs. 1 DSGVO erhoben.
          </li>
        </ul>
        <p className="text-muted ms-4 mt-2">
          Sofern einer der oben genannten Gründe zutrifft und eine betroffene Person die Löschung von personenbezogenen
          Daten, die bei der Lauenroth GmbH gespeichert sind, veranlassen möchte, kann sie sich hierzu jederzeit an
          einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </p>
        <p className="text-muted ms-4">
          Der Mitarbeiter der Lauenroth GmbH wird veranlassen, dass dem Löschverlangen unverzüglich nachgekommen wird.
          Wurden die personenbezogenen Daten von der Lauenroth GmbH öffentlich gemacht und ist unser Unternehmen als
          Verantwortlicher gemäß Art. 17 Abs. 1 DSGVO zur Löschung der personenbezogenen Daten verpflichtet, so trifft
          die Lauenroth GmbH unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten
          angemessene Maßnahmen, auch technischer Art, um andere für die Datenverarbeitung Verantwortliche, welche die
          veröffentlichten personenbezogenen Daten verarbeiten, darüber in Kenntnis zu setzen, dass die betroffene
          Person von diesen anderen für die Datenverarbeitung Verantwortlichen die Löschung sämtlicher Links zu diesen
          personenbezogenen Daten oder von Kopien oder Replikationen dieser personenbezogenen Daten verlangt hat, soweit
          die Verarbeitung nicht erforderlich ist. Der Mitarbeiter der Lauenroth GmbH wird im Einzelfall das Notwendige
          veranlassen.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          5) Recht auf Einschränkung der Verarbeitung
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, von dem Verantwortlichen die Einschränkung der Verarbeitung zu verlangen,
          wenn eine der folgenden Voraussetzungen gegeben ist:
        </p>
        <p className="text-muted ms-4">
          Die Richtigkeit der personenbezogenen Daten wird von der betroffenen Person bestritten, und zwar für eine
          Dauer, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen.
        </p>
        <p className="text-muted ms-4">
          Die Verarbeitung ist unrechtmäßig, die betroffene Person lehnt die Löschung der personenbezogenen Daten ab und
          verlangt stattdessen die Einschränkung der Nutzung der personenbezogenen Daten.
        </p>
        <p className="text-muted ms-4">
          Der Verantwortliche benötigt die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger, die
          betroffene Person benötigt sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
        </p>
        <p className="text-muted ms-4">
          Die betroffene Person hat Widerspruch gegen die Verarbeitung gem. Art. 21 Abs. 1 DSGVO eingelegt und es steht
          noch nicht fest, ob die berechtigten Gründe des Verantwortlichen gegenüber denen der betroffenen Person
          überwiegen.
        </p>
        <p className="text-muted ms-4">
          Sofern eine der oben genannten Voraussetzungen gegeben ist und eine betroffene Person die Einschränkung von
          personenbezogenen Daten, die bei der Lauenroth GmbH gespeichert sind, verlangen möchte, kann sie sich hierzu
          jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden. Der Mitarbeiter der Lauenroth
          GmbH wird die Einschränkung der Verarbeitung veranlassen.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          6) Recht auf Datenübertragbarkeit
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, die sie betreffenden personenbezogenen Daten, welche durch die betroffene
          Person einem Verantwortlichen bereitgestellt wurden, in einem strukturierten, gängigen und maschinenlesbaren
          Format zu erhalten. Sie hat außerdem das Recht, diese Daten einem anderen Verantwortlichen ohne Behinderung
          durch den Verantwortlichen, dem die personenbezogenen Daten bereitgestellt wurden, zu übermitteln, sofern die
          Verarbeitung auf der Einwilligung gemäß Art. 6 Abs. 1 Buchstabe a DSGVO oder Art. 9 Abs. 2 Buchstabe a DSGVO
          oder auf einem Vertrag gemäß Art. 6 Abs. 1 Buchstabe b DSGVO beruht und die Verarbeitung mithilfe
          automatisierter Verfahren erfolgt, sofern die Verarbeitung nicht für die Wahrnehmung einer Aufgabe
          erforderlich ist, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, welche dem
          Verantwortlichen übertragen wurde. Ferner hat die betroffene Person bei der Ausübung ihres Rechts auf
          Datenübertragbarkeit gemäß Art. 20 Abs. 1 DSGVO das Recht, zu erwirken, dass die personenbezogenen Daten
          direkt von einem Verantwortlichen an einen anderen Verantwortlichen übermittelt werden, soweit dies technisch
          machbar ist und sofern hiervon nicht die Rechte und Freiheiten anderer Personen beeinträchtigt werden. Zur
          Geltendmachung des Rechts auf Datenübertragbarkeit kann sich die betroffene Person jederzeit an einen
          Mitarbeiter der Lauenroth GmbH wenden.{' '}
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          7) Recht auf Widerspruch
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen
          die Verarbeitung sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 Buchstaben e oder f
          DSGVO erfolgt, Widerspruch einzulegen. Dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die
          Lauenroth GmbH verarbeitet die personenbezogenen Daten im Falle des Widerspruchs nicht mehr, es sei denn, wir
          können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die den Interessen, Rechten und
          Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen. Verarbeitet die Lauenroth GmbH personenbezogene Daten, um Direktwerbung zu
          betreiben, so hat die betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung der
          personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen. Dies gilt auch für das Profiling, soweit es
          mit solcher Direktwerbung in Verbindung steht. Widerspricht die betroffene Person gegenüber der Lauenroth GmbH
          der Verarbeitung für Zwecke der Direktwerbung, so wird die Lauenroth GmbH die personenbezogenen Daten nicht
          mehr für diese Zwecke verarbeiten. Zudem hat die betroffene Person das Recht, aus Gründen, die sich aus ihrer
          besonderen Situation ergeben, gegen die sie betreffende Verarbeitung personenbezogener Daten, die bei der
          Lauenroth GmbH zu wissenschaftlichen oder historischen Forschungszwecken oder zu statistischen Zwecken gemäß
          Art. 89 Abs. 1 DSGVO erfolgen, Widerspruch einzulegen, es sei denn, eine solche Verarbeitung ist zur Erfüllung
          einer im öffentlichen Interesse liegenden Aufgabe erforderlich. Zur Ausübung des Rechts auf Widerspruch kann
          sich die betroffene Person direkt jeden Mitarbeiter der Lauenroth GmbH oder einen anderen Mitarbeiter wenden.
          Der betroffenen Person steht es ferner frei, im Zusammenhang mit der Nutzung von Diensten der
          Informationsgesellschaft, ungeachtet der Richtlinie 2002/58/EG, ihr Widerspruchsrecht mittels automatisierter
          Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          8) Automatisierte Entscheidungen im Einzelfall, einschließlich Profiling
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung —
          einschließlich Profiling — beruhenden Entscheidung unterworfen zu werden, die ihr gegenüber rechtliche Wirkung
          entfaltet oder sie in ähnlicher Weise erheblich beeinträchtigt, sofern die Entscheidung (1) nicht für den
          Abschluss oder die Erfüllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen
          erforderlich ist, oder (2) aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten, denen der
          Verantwortliche unterliegt, zulässig ist und diese Rechtsvorschriften angemessene Maßnahmen zur Wahrung der
          Rechte und Freiheiten sowie der berechtigten Interessen der betroffenen Person enthalten oder (3) mit
          ausdrücklicher Einwilligung der betroffenen Person erfolgt. Ist die Entscheidung (1) für den Abschluss oder
          die Erfüllung eines Vertrags zwischen der betroffenen Person und dem Verantwortlichen erforderlich oder (2)
          erfolgt sie mit ausdrücklicher Einwilligung der betroffenen Person, trifft die Lauenroth GmbH angemessene
          Maßnahmen, um die Rechte und Freiheiten sowie die berechtigten Interessen der betroffenen Person zu wahren,
          wozu mindestens das Recht auf Erwirkung des Eingreifens einer Person seitens des Verantwortlichen, auf
          Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung gehört. Möchte die betroffene Person
          Rechte mit Bezug auf automatisierte Entscheidungen geltend machen, kann sie sich hierzu jederzeit an einen
          Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </p>
        <Typography variant="h5" className="ms-4" gutterBottom>
          9) Recht auf Widerruf einer datenschutzrechtlichen Einwilligung{' '}
        </Typography>
        <p className="text-muted ms-4">
          Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das vom europäischen Richtlinien- und
          Verordnungsgeber gewährte Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu
          widerrufen. Möchte die betroffene Person ihr Recht auf Widerruf einer Einwilligung geltend machen, kann sie
          sich hierzu jederzeit an einen Mitarbeiter des für die Verarbeitung Verantwortlichen wenden.
        </p>
        <Typography variant="h5" gutterBottom>
          11. Verwendung von Google Analytics
        </Typography>
        <p className="text-muted">
          Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (folgend: Google). Google
          Analytics verwendet sog. „Cookies", also Textdateien, die auf Ihrem Computer gespeichert werden und die eine
          Analyse der Benutzung der Website durch Sie ermöglichen. Die durch das Cookie erzeugten Informationen über
          Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort
          gespeichert. Aufgrund der Aktivierung der IP-Anonymisierung auf diesen Webseiten, wird Ihre IP-Adresse von
          Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des
          Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt.
        </p>
        <p className="text-muted">
          Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort
          gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung
          der Website auszuwerten, um Reports über die Webseitenaktivitäten zusammenzustellen und um weitere mit der
          Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Webseitenbetreiber zu
          erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen
          Daten von Google zusammengeführt.
        </p>
        <p className="text-muted">
          Die Zwecke der Datenverarbeitung liegen in der Auswertung der Nutzung der Website und in der Zusammenstellung
          von Reports über Aktivitäten auf der Website. Auf Grundlage der Nutzung der Website und des Internets sollen
          dann weitere verbundene Dienstleistungen erbracht werden. Die Verarbeitung beruht auf dem berechtigten
          Interesse des Webseitenbetreibers.
        </p>
        <p className="text-muted">
          Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern;
          wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser
          Website vollumfänglich werden nutzen können. Sie können darüber hinaus die Erfassung, der durch das Cookie
          erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die
          Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare
          Browser-Plugin herunterladen und installieren: Browser Add On zur Deaktivierung von Google Analytics.
        </p>
        <p className="text-muted">
          Zusätzlich oder als Alternative zum Browser-Add-On können Sie das Tracking durch Google Analytics auf unseren
          Seiten unterbinden, indem Sie diesen Link anklicken. Dabei wird ein Opt-Out-Cookie auf Ihrem Gerät
          installiert. Damit wird die Erfassung durch Google Analytics für diese Website und für diesen Browser
          zukünftig verhindert, so lange das Cookie in Ihrem Browser installiert bleibt.
        </p>
        <Typography variant="h5" gutterBottom>
          12. Analyse durch Wireminds{' '}
        </Typography>
        <p className="text-muted">
          Unsere Website nutzt die Zählpixeltechnologie der WiredMinds AG (
          <a href="http://www.wiredminds.de" target="_blank">
            www.wiredminds.de
          </a>
          ) zur Analyse des Besucherverhaltens.
        </p>
        <p className="text-muted">
          Dabei werden Daten erhoben, verarbeitet und gespeichert, aus denen unter einem Pseudonym Nutzungsprofile
          erstellt werden. Wo möglich und sinnvoll werden diese Nutzungsprofile vollständig anonymisiert. Hierzu können
          Cookies zum Einsatz kommen. Cookies sind kleine Textdateien, die im Internet-Browser des Besuchers gespeichert
          werden und zur Wiedererkennung des Internet-Browsers dienen. Die erhobenen Daten, die auch personenbezogene
          Daten beinhalten können, werden an WiredMinds übermittelt oder direkt von WiredMinds erhoben. WiredMinds darf
          Informationen, die durch Besuche auf den Webseiten hinterlassen werden, nutzen, um anonymisierte
          Nutzungsprofile zu erstellen. Die dabei gewonnenen Daten werden ohne die gesondert erteilte Zustimmung des
          Betroffenen nicht benutzt, um den Besucher dieser Webseite persönlich zu identifizieren und sie werden nicht
          mit personenbezogenen Daten über den Träger des Pseudonyms zusammengeführt. Soweit IP-Adressen erfasst werden,
          erfolgt deren sofortige Anonymisierung durch Löschen des letzten Nummernblocks.
        </p>
        <p className="text-muted">
          Der Datenerhebung, -verarbeitung und -speicherung kann jederzeit mit Wirkung für die Zukunft unter folgendem
          Link widersprochen werden: Vom Website-Tracking ausschließen.
        </p>
        <Typography variant="h5" gutterBottom>
          13. Verwendung von Bibliotheken (Webfonts){' '}
        </Typography>
        <p className="text-muted">
          Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend darzustellen, verwenden wir auf dieser
          Websitebibliotheken und Schriftbibliotheken wie z. B. Google Webfonts ({' '}
          <a href="https://www.google.com/webfonts/" target="_blank">
            https://www.google.com/webfonts/
          </a>{' '}
          ). Google Webfonts werden zur Vermeidung mehrfachen Ladens in den Cache Ihres Browsers übertragen. Falls der
          Browser die Google Webfonts nicht unterstützt oder den Zugriff unterbindet, werden Inhalte in einer
          Standardschrift angezeigt.
        </p>
        <p className="text-muted">
          Der Aufruf vonbibliotheken oder Schriftbibliotheken löst automatisch eine Verbindung zum Betreiber der
          Bibliothek aus. Dabei ist es theoretisch möglich – aktuell allerdings auch unklar ob und ggf. zu welchen
          Zwecken – dass Betreiber entsprechender Bibliotheken Daten erheben.
        </p>
        <p className="text-muted">
          Die Datenschutzrichtlinie des Bibliothekbetreibers Google finden Sie hier:
          <a href="https://www.google.com/policies/privacy/" target="_blank">
            {' '}
            https://www.google.com/policies/privacy/
          </a>
        </p>
        <Typography variant="h5" gutterBottom>
          14. Verwendung von Adobe Typekit
        </Typography>
        <p className="text-muted">
          Wir setzen Adobe Typekit zur visuellen Gestaltung unserer Website ein. Typekit ist ein Dienst der Adobe
          Systems Software Ireland Ltd. der uns den Zugriff auf eine Schriftartenbibliothek gewährt. Zur Einbindung der
          von uns benutzten Schriftarten, muss Ihr Browser eine Verbindung zu einem Server von Adobe in den USA aufbauen
          und die für unsere Website benötigte Schriftart herunterladen. Adobe erhält hierdurch die Information, dass
          von Ihrer IP-Adresse unsere Website aufgerufen wurde. Weitere Informationen zu Adobe Typekit finden Sie in den
          Datenschutzhinweisen von Adobe, die Sie hier abrufen können:{' '}
          <a href="http://www.adobe.com/privacy/typekit.html" target="_blank">
            www.adobe.com/privacy/typekit.html
          </a>
        </p>
        <Typography variant="h5" gutterBottom>
          15. Social Media Plug-ins
        </Typography>
        <p className="text-muted">
          Auf unseren Webseiten werden Social Plugins der unten aufgeführten Anbieter eingesetzt. Die Plugins können Sie
          daran erkennen, dass sie mit dem entsprechenden Logo gekennzeichnet sind.
        </p>
        <p className="text-muted">
          Über diese Plugins werden unter Umständen Informationen, zu denen auch personenbezogene Daten gehören können,
          an den Dienstebetreiber gesendet und ggf. von diesem genutzt. Wir verhindern die unbewusste und ungewollte
          Erfassung und Übertragung von Daten an den Diensteanbieter durch eine 2-Klick-Lösung. Um ein gewünschtes
          Social Plugin zu aktivieren, muss dieses erst durch Klick auf den entsprechenden Schalter aktiviert werden.
          Erst durch diese Aktivierung des Plugins wird auch die Erfassung von Informationen und deren Übertragung an
          den Diensteanbieter ausgelöst. Wir erfassen selbst keine personenbezogenen Daten mittels der Social Plugins
          oder über deren Nutzung.
        </p>
        <p className="text-muted">
          Wir haben keinen Einfluss darauf, welche Daten ein aktiviertes Plugin erfasst und wie diese durch den Anbieter
          verwendet werden. Derzeit muss davon ausgegangen werden, dass eine direkte Verbindung zu den Diensten des
          Anbieters ausgebaut wird sowie mindestens die IP-Adresse und gerätebezogene Informationen erfasst und genutzt
          werden. Ebenfalls besteht die Möglichkeit, dass die Diensteanbieter versuchen, Cookies auf dem verwendeten
          Rechner zu speichern. Welche konkreten Daten hierbei erfasst und wie diese genutzt werden, entnehmen Sie bitte
          den Datenschutzhinweisen des jeweiligen Diensteanbieters. Hinweis: Falls Sie zeitgleich bei Facebook
          angemeldet sind, kann Facebook Sie als Besucher einer bestimmten Seite identifizieren.
        </p>
        <p className="text-muted">
          Wir haben auf unserer Website die Social-Media-Buttons folgender Unternehmen eingebunden:
        </p>
        <Typography variant="h5" gutterBottom>
          16. Google Ads
        </Typography>
        <p className="text-muted">
          Diese Website verwendet Google Ads. Google Ads ist ein Online- Werbeprogramm der Google Ireland Limited
          („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p className="text-muted">
          Im Rahmen von Google Ads nutzen wir das so genannte Conversion- Tracking. Wenn Sie auf eine von Google
          geschaltete Anzeige klicken wird ein Cookie für das Conversion-Tracking gesetzt. Bei Cookies handelt es sich
          um kleine Textdateien, die der Internet-Browser auf dem Computer des Nutzers ablegt. Diese Cookies verlieren
          nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung der Nutzer. Besucht der Nutzer
          bestimmte Seiten dieser Website und das Cookie ist noch nicht abgelaufen, können Google und wir erkennen, dass
          der Nutzer auf die Anzeige geklickt hat und zu dieser Seite weitergeleitet wurde.
        </p>
        <p className="text-muted">
          Jeder Google Ads-Kunde erhält ein anderes Cookie. Die Cookies können nicht über die Websites von Google
          Ads-Kunden nachverfolgt werden. Die mithilfe des Conversion-Cookies eingeholten Informationen dienen dazu,
          Conversion-Statistiken für Google Ads-Kunden zu erstellen, die sich für Conversion-Tracking entschieden haben.
          Die Kunden erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige geklickt haben und zu einer mit einem
          Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden. Sie erhalten jedoch keine Informationen, mit
          denen sich Nutzer persönlich identifizieren lassen. Wenn Sie nicht am Tracking teilnehmen möchten, können Sie
          dieser Nutzung widersprechen, indem Sie das Cookie des Google Conversion-Trackings über ihren Internet-Browser
          unter Nutzereinstellungen leicht deaktivieren. Sie werden sodann nicht in die Conversion-Tracking Statistiken
          aufgenommen.
        </p>
        <p className="text-muted">
          Die Speicherung von „Conversion-Cookies" und die Nutzung dieses Tracking-Tools erfolgen auf Grundlage von Art.
          6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des
          Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren. Sofern eine entsprechende
          Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung
          ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
        </p>
        <p className="text-muted">
          Mehr Informationen zu Google Ads und Google Conversion-Tracking finden Sie in den Datenschutzbestimmungen von
          Google:{' '}
          <a href="https://policies.google.com/privacy?hl=de" target="_blank">
            https://policies.google.com/privacy?hl=de.
          </a>
        </p>
        <p className="text-muted">
          Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur
          im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das
          automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies
          kann die Funktionalität dieser Website eingeschränkt sein.
        </p>
        <Typography variant="h5" gutterBottom>
          17. Google Remarketing
        </Typography>
        <p className="text-muted">
          Diese Website verwendet die Remarketing-Funktion der Google Inc. Die Funktion dient dazu, Webseitenbesuchern
          innerhalb des Google- Werbenetzwerks interessenbezogene Werbeanzeigen zu präsentieren. Im Browser des
          Webseitenbesuchers wird ein sog. „Cookie" gespeichert, der es ermöglicht, den Besucher wiederzuerkennen, wenn
          dieser Webseiten aufruft, die dem Werbenetzwerk von Google angehören. Auf diesen Seiten können dem Besucher
          Werbeanzeigen präsentiert werden, die sich auf Inhalte beziehen, die der Besucher zuvor auf Webseiten
          aufgerufen hat, die die Remarketing Funktion von Google verwenden.
        </p>
        <p className="text-muted">
          Nach eigenen Angaben erhebt Google bei diesem Vorgang keine personenbezogenen Daten. Sollten Sie die Funktion
          Remarketing von Google dennoch nicht wünschen, können Sie diese grundsätzlich deaktivieren, indem Sie die
          entsprechenden Einstellungen unter{' '}
          <a href="http://www.google.com/settings/ads" target="_blank">
            http://www.google.com/settings/ads
          </a>{' '}
          vornehmen. Alternativ können Sie den Einsatz von Cookies für interessenbezogene Werbung über die
          Werbenetzwerkinitiative deaktivieren, indem Sie den Anweisungen unter{' '}
          <a href="http://www.networkadvertising.org/managing/opt_out.asp" target="_blank">
            http://www.networkadvertising.org/managing/opt_out.asp
          </a>{' '}
          folgen.
        </p>
        <Typography variant="h5" gutterBottom>
          18. Rechtsgrundlage der Verarbeitung
        </Typography>
        <p className="text-muted">
          Art. 6 I lit. a DSGVO dient unserem Unternehmen als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir
          eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener
          Daten zur Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, wie dies
          beispielsweise bei Verarbeitungsvorgängen der Fall ist, die für eine Lieferung von Waren oder die Erbringung
          einer sonstigen Leistung oder Gegenleistung notwendig sind, so beruht die Verarbeitung auf Art. 6 I lit. b
          DSGVO. Gleiches gilt für solche Verarbeitungsvorgänge die zur Durchführung vorvertraglicher Maßnahmen
          erforderlich sind, etwa in Fällen von Anfragen zur unseren Produkten oder Leistungen. Unterliegt unser
          Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten
          erforderlich wird, wie beispielsweise zur Erfüllung steuerlicher Pflichten, so basiert die Verarbeitung auf
          Art. 6 I lit. c DSGVO. In seltenen Fällen könnte die Verarbeitung von personenbezogenen Daten erforderlich
          werden, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen.
          Dies wäre beispielsweise der Fall, wenn ein Besucher in unserem Betrieb verletzt werden würde und daraufhin
          sein Name, sein Alter, seine Krankenkassendaten oder sonstige lebenswichtige Informationen an einen Arzt, ein
          Krankenhaus oder sonstige Dritte weitergegeben werden müssten. Dann würde die Verarbeitung auf Art. 6 I lit. d
          DSGVO beruhen. Letztlich könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DSGVO beruhen. Auf dieser
          Rechtsgrundlage basieren Verarbeitungsvorgänge, die von keiner der vorgenannten Rechtsgrundlagen erfasst
          werden, wenn die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines
          Dritten erforderlich ist, sofern die Interessen, Grundrechte und Grundfreiheiten des Betroffenen nicht
          überwiegen. Solche Verarbeitungsvorgänge sind uns insbesondere deshalb gestattet, weil sie durch den
          europäischen Gesetzgeber besonders erwähnt wurden. Er vertrat insoweit die Auffassung, dass ein berechtigtes
          Interesse anzunehmen sein könnte, wenn die betroffene Person ein Kunde des Verantwortlichen ist
          (Erwägungsgrund 47 Satz 2 DSGVO).
        </p>
        <Typography variant="h5" gutterBottom>
          19. Berechtigte Interessen an der Verarbeitung, die von dem Verantwortlichen oder einem Dritten verfolgt
          werden{' '}
        </Typography>
        <p className="text-muted">
          Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DSGVO ist unser berechtigtes Interesse
          die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer
          Anteilseigner.
        </p>
        <Typography variant="h5" gutterBottom>
          20. Dauer, für die die personenbezogenen Daten gespeichert werden
        </Typography>
        <p className="text-muted">
          Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche
          Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie
          nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.
        </p>
        <Typography variant="h5" gutterBottom>
          21. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten;
          Erforderlichkeit für den Vertragsabschluss; Verpflichtung der betroffenen Person, die personenbezogenen Daten
          bereitzustellen; mögliche Folgen der Nichtbereitstellung{' '}
        </Typography>
        <p className="text-muted">
          Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben
          ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner)
          ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns
          personenbezogene Daten zur Verfügung stellt, die in der Folge durch uns verarbeitet werden müssen. Die
          betroffene Person ist beispielsweise verpflichtet uns personenbezogene Daten bereitzustellen, wenn unser
          Unternehmen mit ihr einen Vertrag abschließt. Eine Nichtbereitstellung der personenbezogenen Daten hätte zur
          Folge, dass der Vertrag mit dem Betroffenen nicht geschlossen werden könnte. Vor einer Bereitstellung
          personenbezogener Daten durch den Betroffenen muss sich der Betroffene an einen unserer Mitarbeiter wenden.
          Unser Mitarbeiter klärt den Betroffenen einzelfallbezogen darüber auf, ob die Bereitstellung der
          personenbezogenen Daten gesetzlich oder vertraglich vorgeschrieben oder für den Vertragsabschluss erforderlich
          ist, ob eine Verpflichtung besteht, die personenbezogenen Daten bereitzustellen, und welche Folgen die
          Nichtbereitstellung der personenbezogenen Daten hätte.
        </p>
        <Typography variant="h5" gutterBottom>
          22. Änderung der Datenschutzbestimmung
        </Typography>
        <p className="text-muted">
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen
          Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B.
          bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
        </p>
        <Typography variant="h5" gutterBottom>
          23. Bestehen einer automatisierten Entscheidungsfindung{' '}
        </Typography>
        <p className="text-muted">
          Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein
          Profiling.
        </p> */}
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
