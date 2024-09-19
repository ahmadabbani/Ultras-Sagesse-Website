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
            $adminEmail = "contactus@ultras-sagesse.com
";  // Replace with the actual admin email
            $subject = "New Message from Ultras Sagesse Website";
            $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
            $headers = "From: $email";  // Replace with the actual sender email

            if (mail($adminEmail, $subject, $body, $headers)) {
                echo "Your email has been verified. Thank you! Your message has been sent to the admin.";
            } else {
                echo "Your email has been verified, but the message failed to send to the admin.";
            }
        } else {
            echo "Failed to verify email.";
        }

        $updateStmt->close();
    } else {
        echo "Invalid or expired verification link.";
    }

    $stmt->close();
}

$conn->close();
