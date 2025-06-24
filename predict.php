

<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    die("Please login to use this feature");
}
header('Content-Type: application/json');

// Get POST data
$gender = $_POST['gender'] ?? '';
$currentAge = intval($_POST['currentAge'] ?? 0);
$currentHeight = intval($_POST['currentHeight'] ?? 0);
$motherHeight = intval($_POST['motherHeight'] ?? 0);
$fatherHeight = intval($_POST['fatherHeight'] ?? 0);
$nutrition = intval($_POST['nutrition'] ?? 3);

// Validate input
$errors = [];
if (!in_array($gender, ['male', 'female'])) {
    $errors[] = 'Invalid gender';
}
if ($currentAge < 1 || $currentAge > 25) {
    $errors[] = 'Invalid age';
}
if ($currentHeight < 50 || $currentHeight > 250) {
    $errors[] = 'Invalid current height';
}
if ($motherHeight < 140 || $motherHeight > 210) {
    $errors[] = 'Invalid mother height';
}
if ($fatherHeight < 140 || $fatherHeight > 210) {
    $errors[] = 'Invalid father height';
}
if ($nutrition < 1 || $nutrition > 5) {
    $errors[] = 'Invalid nutrition level';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit;
}

// Calculate mid-parental height
if ($gender === 'male') {
    $midParentalHeight = ($fatherHeight + $motherHeight + 13) / 2;
} else {
    $midParentalHeight = ($fatherHeight + $motherHeight - 13) / 2;
}

// Adjust for current age and height
$ageFactor = 1 + (25 - $currentAge) * 0.02;
$currentHeightFactor = $currentHeight * 0.3;

// Nutrition factor (1-5 scale)
$nutritionFactor = 1 + ($nutrition - 3) * 0.03;

// Calculate final prediction (this is a simplified model)
$predictedHeight = round(
    ($midParentalHeight * 0.7 + $currentHeightFactor * 0.3) * $ageFactor * $nutritionFactor
);

// Return prediction
echo json_encode([
    'predictedHeight' => $predictedHeight,
    'gender' => $gender,
    'message' => 'Prediction successful'
]);
?><?php
header('Content-Type: application/json');

$data = [
    'gender' => $_POST['gender'],
    'age' => (int)$_POST['currentAge'],
    'current_height' => (int)$_POST['currentHeight'],
    'mother_height' => (int)$_POST['motherHeight'],
    'father_height' => (int)$_POST['fatherHeight'],
    'nutrition' => (int)$_POST['nutrition'],
    'physical_activity' => 3, // Default value
    'sleep_hours' => 8        // Default value
];

$options = [
    'http' => [
        'header' => "Content-type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents('http://localhost:5000/predict', false, $context);

echo $result;
?>