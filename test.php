<?php
$apiUrl = 'http://cautious-maize-windflower.glitch.me/mcdonalds-locations';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5');
$response = curl_exec($ch);

if ($response !== false) {
    $data = json_decode($response);

    if ($data !== null) {
        $locations = array();
        foreach ($data->features as $location) {
            $locationData = array(
                'addressLine1' => $location->properties->addressLine1,
                'addressLine4' => property_exists($location->properties, 'addressLine4') ? $location->properties->addressLine4 : 'Not available',
                'addressLine3' => $location->properties->addressLine3,
                'latitude' => $location->geometry->coordinates[1],
                'longitude' => $location->geometry->coordinates[0]
            );
            $locations[] = $locationData;
            echo '<div class="location">';
            echo '<p>Address Line 1: ' . $locationData['addressLine1'] . '</p><br>';
            echo '<p>Address Line 4: ' . $locationData['addressLine4'] . '</p><br>';
            echo '<p>Address Line 3: ' . $locationData['addressLine3'] . '</p><br>';
            echo '<p>Latitude: ' . $locationData['latitude'] . '</p><br>';
            echo '<p>Longitude: ' . $locationData['longitude'] . '</p><br>';
            echo '<br>';
            echo '</div>';
        }
    } else {
        $error = 'Invalid JSON response from the API.';
    }
} else {
    echo 'Error: ' . curl_error($ch);
}

curl_close($ch);
?>