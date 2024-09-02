<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Spatial Data App</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="map"></div>
    <div id="data-list"></div>
    <div class="buttons">
        <label>Radius:</label>
        <input type="radio" name="radius" value="5" checked> 5
        <input type="radio" name="radius" value="10"> 10
        <input type="radio" name="radius" value="20"> 20
        <input type="radio" name="radius" value="50"> 50
    </div>
    <div id="locationsContainer"></div>

    <script src="app.js"></script>
</body>
