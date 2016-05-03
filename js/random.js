$(document).ready(function(){
    /** To obtain a YouTube API key, I created a google developer account and started a new project
     ** that uses the YouTube API.  Since the project does not require user authentication,
     ** I can simply create a properly formatted URL to obtain the video I want to display.
     ** The request is then sent via AJAX to YouTube and the result is JSON parsed and used as
     ** input to the JWPlayer setup as well as some page formatting to show the video title
     ** and description.
     **/

     //part=snippet and chart=mostPopular will provide the relevant information for the current
     //most popular video on YouTube
    var reqUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=AIzaSyA3rh7yQcvF3UiITtxyH-V7P3PqEfleepk"
    var xhr = new XMLHttpRequest();
    xhr.open("GET", reqUrl);
    xhr.send();
    xhr.addEventListener("readystatechange", function(){
        if(this.readyState == 4 & this.status== 200){
            res = JSON.parse(this.response);
            vID = res.items[0].id;
            title = res.items[0].snippet.title;
            descrip = res.items[0].snippet.description;
            //use jquery to populate DOM with title and description content
            $('#title').append('<h2>'+title+'</h2>');
            $('#description').append('<p>'+descrip+'</p>');
            //vID tells jwplayer where to look for the video
            var player = jwplayer("playerDiv").setup({
                file: "http://www.youtube.com/watch?v="+vID,
                title: title,
                description: "This is currently the most popular video on YouTube!",
                height: 480,
                width: 640,
                controls:true,
            });

            /** Here is a demonstration of some custom controls that can be coded to work with
             ** JWPlayer - in this case, seek buttons that advance or go back by 20 seconds.
             ** The onTime function gives the current time, and jquery is used to grab the buttons
             ** from the DOM and assign click functions to them that either add or subtract 20 seconds.
             **/
            player.onTime(function(event){
                var time = event.position;
                $('#seekF').click(function(){
                    jwplayer().seek(time+20);
                });
                $('#seekB').click(function(){
                    jwplayer().seek(time-20);
                });
            });
        };
    });
});
