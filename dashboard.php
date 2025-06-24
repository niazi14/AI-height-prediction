<?php
session_start();
include 'includes/auth-check.php'; // Checks if user is logged in
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard | Height Predictor</title>
    <link rel="stylesheet" href="website/style.css">
</head>
<body>
    <header>
        <h1>Welcome, <?= htmlspecialchars($_SESSION['username']) ?>!</h1>
        <a href="auth/logout.php" class="logout-btn">Logout</a>
    </header>
    
    <main>
        <!-- Your existing prediction form here -->
        <?php include 'website/index.html'; ?>
        
        <div class="prediction-history">
            <h3>Your Prediction History</h3>
            <!-- Will show user's past predictions -->
        </div>
    </main>
</body>
</html>