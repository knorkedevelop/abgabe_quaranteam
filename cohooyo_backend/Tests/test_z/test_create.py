import pytest
from Cohooyo.db.models import *
from Cohooyo.db.models import db
from Cohooyo.db.CRUD import create, read

employer_heads = []


@pytest.mark.parametrize(
    ("email", "password", "company_name", "description",
     "image", "logo", "master_certification"),
    (
        ("employer1@mail.de", "Passwort1", "Mecha Nick",
         "Autos waren schon immer dein Hobby? Du bist einer der auch gerne einmal anpackt? Dann zöger nicht lange und mach dein Hobby zum Beruf!", None, None, None),
        ("employer2@mail.de", "Passwort1", "Ziehar Monika",
         None, None, None, None),
        ("employer3@mail.de", "Passwort1", "Schnipp Schnapp",
         None, None, None, None),
        ("employer4@mail.de", "Passwort1", "Flutsch & Weg",
         None, None, None, None),
        ("employer5@mail.de", "Passwort1", "Kabeljau",
         None, None, None, None),
        ("employer6@mail.de", "Passwort1", "Klonk",
         None, None, None, None),
    )
)
def test_create_employer(email, password, company_name, description, image, logo, master_certification, client):
    response = client.post(
        "/api/auth/register", json={"email": email, "password": password, "user_type": "employer", "company_name": company_name}, content_type="application/json")
    head = {"Authorization": "Bearer "+response.json["auth_token"]}
    employer_heads.append(head)
    response = client.post(
        "/api/profile/update_profile", json={"company_name": company_name, "description": description, "logo": logo, "image": image, "master_certificate": master_certification}, content_type="application/json", headers=head)


@pytest.mark.parametrize(
    ("title", "type", "description", "location",
     "hashtags", "must_have", "nice_have", "employer_nr"),
    (
        ("Ziehharmonika-Bauer/in", "Azubistelle", "Lass eine alte Tradition wieder auferleben.", "Ludwigshafen",
         "#handwerk #international #kunst #großunternehmen #instrumentenbauer #holz", "Begeisterung für Ziehharmonikas", "Musikalisches Interesse", 1),
        ("Dekorationsnäher/in", "Azubistelle", "Wir nehmen auch Farbenblinde", "Ludwigshafen",
         "#kreativität #feingefühl #schönheit #drinnen #tags #saubererarbeitsplatz #kollaboration", "Feinmotorik", "Grobmotorik", 2),
        ("Kanalreiniger/in", "Azubistelle", "Mögen Sie Dreck?", "Ludwigshafen",
         "#mittelstand #familienunternehmen #dreck #gutebezahlung #mindestlohn #tagundnacht #karriere", "Hohe Arbeitsmoral", "Liebe für dreckiges", 3),
        ("Kraftfahrzeugtechniker/in", "Azubistelle", "Hast du Spaß daran, Rätsel zu lösen und Dingen auf den Zahn zu fühlen? Dann ist eine Ausbildung bei uns das Richtige für dich!",
         "Ludwigshafen", "#techniker #vollzeit #handarbeit #hausbesuche #großunternehmen", "Hauptschulabschluss Deutschkenntnisse Freude am Werkeln Führerschein", "gute Erdung", 0),
        ("Kabelverleger/in im Hochbau", "Studentenjob", "Schockierend guter Job", "Ludwigshafen",
         "#kabel #familienunternehmen #karriere #elektrik #höhenangst", "Technisches Interesse", "gute Balance", 4),
        ("KFZ-Mechatroniker/in", "Azubistelle", "Wir lieben Autos!", "Ludwigshafen",
         "#familienunternehmen #mittelstand #motoröl #dreck #tagundnacht #schichtarbeit #karriere #kfz #mechanik #elektrik", "Hauptschulabschluss", "Interesse für Fahrzeuge", 0),
        ("Metallbildner", "Azubistelle", "Metall ist dein Material, aber deine künstlerische Seite überwiegt?", "Ludwigshafen",
         "#metall #kunst #basteln #sonderanfertigungen", "Realschulabschluss", "Interesse für Mechanik", 5),
    ),
)
def test_create_jobs(title, type, description, location, must_have, hashtags, nice_have, client, employer_nr):
    head = employer_heads[employer_nr]
    response = client.post(
        "/api/profile/create_job", json={"title": title, "type": type, "description": description, "location": location, "must_have": must_have, "hashtags": hashtags, "nice_have": nice_have}, content_type="application/json", headers=head)


@pytest.mark.parametrize(
    ("email", "password", "first_name", "last_name", "location", "image",
     "cv", "hashtags", "birth_day", "birth_month", "birth_year"),
    (
        #("j.tschaik@mail.de", "Passwort1", "Jaime", "Tschaik", "Ludwigshafen",None,None,None,17,1,2007),
        ("worker0@mail.de", "Passwort1", "Katrin", "Werfel", "Ludwigshafen",
         None, None, "#draußen #dreck #tagundnacht", 17, 2, 2007),
        ("worker1@mail.de", "Passwort1", "Martin", "Feierabend", "Ludwigshafen",
         None, None, "#drinnen #sauber #musik #holz #instrumente", 15, 3, 2005),
    )
)
def test_create_worker(client, email, password,  first_name, last_name, birth_day, birth_month, birth_year, location, image, cv, hashtags):
    response = client.post("/api/auth/register", json={"email": email, "password": password, "user_type": "worker", "first_name": first_name,
                                                       "last_name": last_name, "birth_day": birth_day, "birth_month": birth_month, "birth_year": birth_year}, content_type="application/json")
    head = {"Authorization": "Bearer "+response.json["auth_token"]}
    response = client.post(
        "/api/profile/update_profile", json={"first_name": first_name, "last_name": last_name, "birth_day": birth_day, "birth_month": birth_month, "birth_year": birth_year, "location": location, "image": image, "cv": cv, "hashtags": hashtags}, content_type="application/json", headers=head)
