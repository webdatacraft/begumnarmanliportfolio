<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
// PHPMailer'ı dahil et
require 'vendor/autoload.php';

// E-posta göndermek için form gönderisi kontrolü
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Formdan gelen verileri al
    $name = htmlspecialchars(trim($_POST['name']));  // Kullanıcı adını al
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);  // E-posta adresini al
    $message = nl2br(htmlspecialchars(trim($_POST['message'])));  // Mesajı al, HTML'yi güvenli hale getir

    // E-posta adresinin geçerli olup olmadığını kontrol et
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Geçersiz e-posta adresi!";
        exit;
    }

    // PHPMailer nesnesi oluştur
    $mail = new PHPMailer(true);
    try {
        // SMTP sunucu ayarları
        $mail->isSMTP();
        $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Ayrıntılı SMTP konuşmasını logla
        $mail->Debugoutput = function ($str, $level) {
            error_log("SMTP[$level] $str");
        };
        $mail->Host = 'smtp.gmail.com';  // Gmail SMTP sunucusu
        $mail->SMTPAuth = true;
        $mail->Username = 'webdatacraft@gmail.com';  // Gmail adresinizi yazın
        $mail->Password = 'qgab fwzl juun pjue';  // Gmail şifrenizi yazın veya uygulama şifresi
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // SMTP debug ayarları
        $mail->SMTPDebug = 2;  // Hata ayıklama seviyesini 2 olarak ayarlayın

        // Gönderen bilgileri
        $mail->setFrom('webdatacraft@gmail.com', 'Web Site İletişim');
        $mail->addAddress('webdatacraft@gmail.com');
        $mail->addReplyTo($email, $name);
        // E-posta içeriği
        $mail->isHTML(true);
        $mail->Subject = 'Yeni İletişim Formu Mesajı';
        $mail->Body    = "Adı: $name<br>E-posta: $email<br><br>Mesaj:<br>$message";

        // Maili gönder
        if ($mail->send()) {
            echo 'Mesajınız başarıyla gönderildi.';
        } else {
            echo 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
        }
    } catch (Exception $e) {
        // Hata mesajı göster
        echo "Mesaj gönderilemedi. Hata: {$mail->ErrorInfo}";
    }
} else {
    echo "Geçersiz istek.";
}
?>
