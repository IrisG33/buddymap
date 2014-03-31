
window.fbAsyncInit = function() {
    FB.init({
        appId: '170511353150528', // Set YOUR APP ID
//      channelUrl : '//localhost/channel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true  // parse XFBML
    });

    // check whether or not users are logged into Facebook
    // check whether or not they have previously logged into my app
    FB.Event.subscribe('auth.authResponseChange', function(response)
    {
        if (response.status === 'connected')
        {
            
        }
        else if (response.status === 'not_authorized')
        {
            // In this case, the person is logged into Facebook, but not into the app, so we call
            // FB.login() to prompt them to do so. 
            // In real-life usage, you wouldn't want to immediately prompt someone to login 
            // like this, for two reasons:
            // (1) JavaScript created popup windows are blocked by most browsers unless they 
            // result from direct interaction from people using the app (such as a mouse click)
            // (2) it is a bad experience to be continually prompted to login upon page load.
            FB.login();
        } else
        {
            // In this case, the person is not logged into Facebook, so we call the login() 
            // function to prompt them to do so. Note that at this stage there is no indication
            // of whether they are logged into the app. If they aren't then they'll see the Login
            // dialog right after they log in to Facebook. 
            // The same caveats as above apply to the FB.login() call here.
            FB.login();
        }
    });
};

function Login()
{
    // invoke login dialog 
    FB.login(function(response) {
        
        /* person using the app clicks OK in the login dialog
         * means they've grante access to their public profile, friend list,
         * and any additional permissions 
        */
        
        if (response.authResponse)
        {
            /**
             * At this point, the person is authenticated and logged in . the buddy map is now 
             * ready to make API calls on their behalf
             * SDK for javascript automatically handles access token storagea and tracking of login
             * status
             */
            getUserInfo();
        } else
        {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'email,user_photos,user_videos'});

}

function getUserInfo() {
    FB.api('/me', function(response) {

        var str = "<b>User Name</b> : " + response.name + "<br>";
        document.getElementById("status").innerHTML = str;

    });

    FB.api('/me/picture?type=normal', function(response) {
        var str = "<img src='" + response.data.url + "'" + "class=\"img-rounded\"/><br>";
        document.getElementById("user_photo").innerHTML = str;
    });

    var friends_list = "<br><button type='button' class=\"btn btn-info\" onclick='getBudLocation();'>Get locations</button><br>";
    document.getElementById("friends_list").innerHTML = friends_list;

    document.getElementById("friends_dropdown").innerHTML = "";
    var logout_str = "<br><button type='button' class = \"btn btn-primary\" onclick='Logout();'>Log out</button><br>";
    document.getElementById("logout").innerHTML = logout_str;
}


function getBudLocation() {
    FB.api('/me/friends', {fields: 'name,id,picture, location'}, function(response) {

        //String url = "https://graph.facebook.com/me/friends?fields=id,name,location";

        console.log(response);
        if (response.error == null) {
            var friendsList = response.data;
            var len = friendsList.length;
            var friendsNames = new Array(len);
            var friendsLoc = new Array(len);
            var friendsIDs = new Array(len);

            //create friends list dropdown
            var friends_dropdown = "<select class=\"form-control\" id=\"friends_dropdown\" onchange=\"locate_f()\">";

            for (var i = 0; i < len; i++) {

                //get friends' names
                friendsNames[i] = friendsList[i].name;
                friendsIDs[i] = friendsList[i].id;
                // friends_dropdown +="<option>" +friendsNames[i]+"</option>";
                //console.log(friendsNames[i]);
                //get friends' locations
                if (friendsList[i].location != null) {
                    friendsLoc[i] = friendsList[i].location.name;
                } else
                    friendsLoc[i] = "";
                friends_dropdown += "<option value=\"" + friendsLoc[i] + "#" + friendsIDs[i] + "\">" + friendsNames[i] + "</option>";
                console.log(friendsLoc[i]);
            }
            friends_dropdown += "</select>";
            document.getElementById("friends_dropdown").innerHTML = friends_dropdown;
            var map = new google.maps.Map(document.getElementById("map_canvas"), {
                zoom: 10,
                //center: new google.maps.LatLng(-33.92, 151.25),
                mapTypeId: google.maps.MapTypeId.RoadMap
            });

            var marker, i;
            for (var i = 0; i < friendsLoc.length; i++) {
                // use google api to get city's latitude 
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': friendsLoc[i]
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        //console.log("$$$$" + results[0].geometry.location);
                        new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map
                        });
                        map.setCenter(results[0].geometry.location);
                    }
                });
            }
        }

    });
}

function getPhoto()
{
    FB.api('/me/picture?type=normal', function(response) {

        var str = "<br/><b>Pic</b> : <img src='" + response.data.url + "'/>";
        document.getElementById("status").innerHTML += str;

    });
}

function locate_f() {
//    var e = document.getElementById("friends_dropdown");
    var infoStr = $("#friends_dropdown :selected").val();
    console.log(infoStr);
    var info = infoStr.split("#");
    var loc = info[0];
    var id = info[1];

    var map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 10,
        //center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.RoadMap
    });

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': loc
    },
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log("$$$$" + results[0].geometry.location);
            new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                icon: "http://graph.facebook.com/" + id + "/picture"
            });
            map.setCenter(results[0].geometry.location);
        }
    });
    console.log("reach here already");
}


function Logout()
{
    FB.logout(function() {
        document.location.reload();
    });
}

// Load the SDK asynchronously
(function(d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


