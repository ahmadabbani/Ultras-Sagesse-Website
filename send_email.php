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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }

    // Generate a unique verification token
    $token = bin2hex(random_bytes(50));

      // Check if the user already exists in the database
      $stmt = $conn->prepare("SELECT id, is_verified FROM users WHERE email = ?");
      $stmt->bind_param("s", $email);
      $stmt->execute();
      $stmt->store_result();

      if ($stmt->num_rows > 0) {
        // User exists, update the token and set is_verified to 0
        $stmt->bind_result($id, $is_verified);
        $stmt->fetch();

        $updateStmt = $conn->prepare("UPDATE users SET name = ?, message = ?, token = ?, is_verified = 0 WHERE id = ?");
        $updateStmt->bind_param("sssi", $name, $message, $token, $id);
        $updateStmt->execute();
        $updateStmt->close();
    } else {
        // User does not exist, insert a new record
        $stmt = $conn->prepare("INSERT INTO users (name, email, message, token) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $message, $token);
        $stmt->execute();
    }

    $stmt->close();

    // Send verification email
    $subject = "Verify your email";
    $verifyLink = "https://ultras-sagesse.com/verify.php?token=$token";
    $body = "Hi $name,\n\nPlease click the link below to verify your email address:\n$verifyLink";
    $headers = "From: contactus@ultras-sagesse.com";

    if (mail($email, $subject, $body, $headers)) {
        $statusMessage=  '<div class="message success">A verification email has been sent to ' . htmlspecialchars($email) . '. Please check your inbox.</div>';
    } else {
        $statusMessage=  '<div class="message error">Failed to send verification email.</div>';
    }
}
$conn->close();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link rel="stylesheet" href="styles.css"> 
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
