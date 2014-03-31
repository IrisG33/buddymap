<html>
    <head>
        <title>Buddy Map</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="css/bootstrap.min.css" rel="stylesheet" media="screen"></link>
        <script type="text/javascript" src="js/jquery-1.10.2.js"></script>
        <script src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script>
            function initialize() {
                var map_canvas = document.getElementById('map_canvas');
                var map_options = {
                    center: new google.maps.LatLng(44.5403, -78.5463),
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                var map = new google.maps.Map(map_canvas, map_options)
            }
            google.maps.event.addDomListener(window, 'load', initialize);
        </script>
        <script type="text/javascript" language="javascript" src="fb.js"></script>
    </head>
    <body>
        <div class="container">
            <h3>Locate your Facebook friends</h3>
        </div>

        <div class="span10 offset1">

            <div id="map_canvas"  style="height:500px;width:850px"></div> 
        </div>   
        <div class="span2 offset1">
            <div id="fb-root"></div> 
            <div id="status">
                <img src="http://hayageek.com/examples/oauth/facebook/oauth-javascript/LoginWithFacebook.png" style="height: 30px; width: 150px" onclick="Login()"/>
            </div> 
            <div id="user_photo"></div>
            <div id="friends_list"></div>
            <div id="friends_dropdown"></div>
            <div id="logout"></div>
        </div>  

    </body>
</html>
