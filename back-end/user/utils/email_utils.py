import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_email_with_token(email, token, subject):
    """
    Função para enviar um e-mail com token usando SendGrid.
    :param email: Destinatário do e-mail
    :param token: Token a ser incluído no e-mail
    :param subject: Assunto do e-mail
    :return: None
    """
    # Renderizar o conteúdo HTML e texto do e-mail
    html_content = render_to_string('token.html', {'email': email, 'token': token})
    text_content = strip_tags(html_content)

    # Criar o e-mail
    message = Mail(
        from_email="nao-responder@ness.dev.br",
        to_emails=email,
        subject=subject,
        html_content=html_content,
        plain_text_content=text_content
    )

    # Enviar e-mail usando SendGridAPIClient
    try:
        sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))
        sg.send(message)
    except Exception as e:
        raise e
