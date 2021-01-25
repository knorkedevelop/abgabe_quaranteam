from flask_mail import Message

mail = None


def send_verification_email(email, last_name, token):
    msg = Message('Aktiviere deinen Cohooyo Account!',
                  sender='quaranteamsep@gmail.com', recipients=[email])
    msg.body = "Account Verifizieren"
    msg.html = '<html> <head> <title> </title> </head> <body> <h1> Hallo Herr {0},  <p> Um Ihren Account zu verifizieren, klicken Sie einfach auf den nachfolgenden Link  </p> <a href = "http://127.0.0.1:5000/api/auth/verify?tk={1}" target="_blank" > Account aktivieren! </a>'.format(
        last_name, token)

    mail.send(msg)
    return "Mail Sent Successfully"


def send_pw_reset_email(email, last_name, token):
    msg = Message('Passwort zurücksetzen.',
                  sender='quaranteamsep@gmail.com', recipients=[email])
    msg.body = "Setze dein Cohoyoo Passwort zurück."
    msg.html = '<html> <head> <title> </title> </head> <body> <h1> Hallo Herr {0},  <p> Um Passwort zurückzusetzen, klicken Sie einfach auf den nachfolgenden Link  </p> <a href = "http://127.0.0.1:5000/api/auth/get_password_reset_page?tk={1}" target="_blank" > Passwort zurücksetzen! </a>'.format(
        last_name, token)

    mail.send(msg)
    return "Mail Sent Successfully"
