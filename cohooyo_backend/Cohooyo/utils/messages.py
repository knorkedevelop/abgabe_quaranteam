
class Error(Exception):
    codes = {
        # auth
        "EMAIL_EXIST_ALREADY": "Diese E-Mail existiert bereits.",
        "NO_EMAIL": "Bitte geben Sie eine E-Mail an.",
        "NO_PASSWORD": "Bitte geben Sie ein Passwort ein.",
        "NO_FIRST_NAME": "Bitte geben Sie einen Vornamen an.",
        "NO_LAST_NAME": "Bitte geben Sie einen Nachnamen an.",
        "NO_COMPANY": "Bitte geben Sie einen Unternehmen an.",
        "PASSWORD_TO_SHORT": "Passwort ist zu kurz (mind. 8 Zeichen).",
        "PASSWORD_HAS_SPACE": "Passwort darf keine Leerzeichen enthalten.",
        "PASSWORD_NEED_LOWER_CASE": "Passwort muss mind. einen Kleinbuchstaben enthalten.",
        "PASSWORD_NEED_UPPER_CASE": "Passwort muss mind. einen Grossbuchstaben enthalten.",
        "PASSWORD_NEED_NUMBER": "Passwort muss mind. eine Zahl enthalten.",
        "EMAIL_INCORRECT": "E-Mail inkorrekt.",
        "COMPANY_TOO_SHORT": "Der Name des Betriebs ist zu kurz (mind. 3 Zeichen).",
        "PASSWORD_INCORRECT": "Passwort inkorrekt.",
        "NO_BIRTHDATE": "Bitte geben Sie ein Alter an.",
        "CANT_VERIFY_EMAIL": "Ihre E-Mail konnte leider nicht verifiziert werden.",
        "VERIFIED": "Sie wurden erfolgreich verifiziert",
        "MUST_LOGGED_IN": "Sie müssen eigeloggt sein, um diesen Inhalt zu sehen.",
        "CANT_RESET_PASSWORD": "Das Passwort konnte leider nicht zurückgesetzt werden.",
        "ENTER_PASSWORD": "Bitte geben Sie ein neues Passwort ein.",
        "PW_RESET_SEND": "Zum Zurücksetzen folgen Sie dem Link in ihrer E-Mail.",
        "REQUEST_INCORRECT": "Es fehlen Attribute in dem Request.",
        # profile
        "NO_JOBS": "Ein Azubi hat keine Jobs.",
        # db
        "UPDATE_INCORRECT": "Die Datenbank konnte nicht upgedated werden.",
        "READ_INCORRECT": "Die Datenbank konnte nicht gelesen werden.",
        "CREATE_INCORRECT": "Fehler beim Erstellen in die Datenbank.",
        "DELETE_INCORRECT": "Der Löschversuch war nicht erfolgreich.",
    }

    def __init__(self, error_code):
        self.error_code = error_code
        self.message = self.codes[error_code]

    def asdict(self):
        return {"error_code": self.error_code, "message": self.message}


class Success(Exception):
    codes = {
        # auth
        "REGISTERED": "Sie haben sich erfolgreich registriert.",
        "LOGGED_IN": "Sie wurden erfolgreich eingeloggt.",
        "LOGGED_OUT": "Sie wurden erfolgreich ausgeloggt.",
        # profile
        "JOB_CREATED": "Das Stellenagebot wurde erfolgreich erstellt.",
        "PROFILE_UPDATED": "Ihr Profil wurde erfolgreich geändert.",
        "JOB_DELETED": "Stellenangebot wurde erfolgreich gelöscht.",
        "JOB_UPDATED": "Ihr Stellenangebot wurde erfolgreich geändert.",
        # chat
        "MESSAGE_SENT": "Ihre Nachricht wurde versendet.",
        # db
        "UPDATE_CORRECT": "Die Datenbank konnte upgedated werden.",
        "READ_CORRECT": "Die Datenbank konnte gelesen werden.",
        "CREATE_CORRECT": "Erstellen erfolgreich.",
        "DELETE_CORRECT": "Der Löschversuch war erfolgreich."
    }

    def __init__(self, succes_code):
        self.message = self.codes[succes_code]

    def asdict(self):
        return {"message": self.message}
