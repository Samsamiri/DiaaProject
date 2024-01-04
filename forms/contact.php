<?php
// Vérifiez si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des champs du formulaire
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Vérifier que les données sont remplies
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Oups! Il y a eu un problème avec votre soumission. Veuillez remplir le formulaire et réessayer.";
        exit;
    }

    // Destinataire de l'email
    $recipient = "contact@egytronics.fr";

    // Contenu de l'email
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // En-têtes de l'email
    $email_headers = "From: $name <$email>";

    // Envoi de l'email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Merci! Votre message a été envoyé.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oups! Quelque chose s'est mal passé et nous n'avons pas pu envoyer votre message.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "Il y a eu un problème avec votre soumission, veuillez réessayer.";
}
?>