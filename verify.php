<?php
// Database connection
$servername = "localhost";
$username = "u687106556_dbadmin";
$password = "dbAdmin@123";
$dbname = "u687106556_contact_form";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    // Verify token
    $stmt = $conn->prepare("SELECT id, name, email, message FROM users WHERE token = ? AND is_verified = 0");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Update the user record to mark as verified
        $stmt->bind_result($id, $name, $email, $message);
        $stmt->fetch();

        $updateStmt = $conn->prepare("UPDATE users SET is_verified = 1 WHERE id = ?");
        $updateStmt->bind_param("i", $id);

        if ($updateStmt->execute()) {
            // Send email to admin with the user's message
            $adminEmail = "contactus@ultras-sagesse.com";  // Replace with the actual admin email
            $subject = "New Message from Ultras Sagesse Website";
            $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
            $headers = "From: $email";  // Replace with the actual sender email

            if (mail($adminEmail, $subject, $body, $headers)) {
                $statusMessage= '<div class="message success">Your email has been verified. Thank you! Your message has been sent to the admin.</div>';
            }else {
                $statusMessage= '<div class="message error">Your email has been verified, but the message failed to send to the admin.</div>';
            }
        } else {
            $statusMessage= '<div class="message error">Failed to verify email.</div>';
        }

        $updateStmt->close();
    } else {
        $statusMessage= '<div class="message error">Invalid or expired verification link.</div>';
    }

    $stmt->close();
}

$conn->close();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link rel="stylesheet" href="styles.css"> <!-- Link to your CSS file -->
</head>
<body>
    <?php
    // Display the status message if it's set
    if (isset($statusMessage)) {
        echo $statusMessage;
    }
    ?>
</body>
</html>
