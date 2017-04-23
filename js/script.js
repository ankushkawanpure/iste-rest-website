/**
 * Created by Ankush on 11/2/16.
 */


/**
 * Document ready function
 */
$(document).ready(function () {

    //Get Header Height
    var headerHeight = $('header').outerHeight();

    //Initialize StellerJS jquery plugin for parallax effect
    $.stellar();

    //GlassyWorms jquery plugin initialization targating the top section
    $('#top').glassyWorms({
        numParticles: 300,
        tailLength: 12,
        maxForce: 8,
        friction: 0.75,
        gravity: 11,
        interval: 3,
        colors: ['#fff'],
        element: $('<canvas class="worms"></canvas>')[0],
        useStyles: true
    });

    //Sticky jquery plugin initialization targating the navigation section to make it stick to top
    $("#navigation").sticky({topSpacing:0});

    //ColorBox jquery plugin initialization use to so box on click on images
    $(".inline").colorbox({inline:true, width:"50%"});

    //Naviation Scrolling
    $('.nav-section').click(function (e) {

        //Listen for click on .nav-section and animate to the current href.
        var href = $(this).attr('href');
        $('html, body').animate({
            //substract the headerHight to remove the navigation section to overlap
            scrollTop: $(href).offset().top - headerHeight
        }, 1000);

        //Prevent the default action of anchor tag
        e.preventDefault();
    });

    //Get About data from the Rest api
    getAboutData();


    // Get Undergraduate degree data for the ugdegree section
    getUgData();

    // Get Graduate degree data for the gdegree section
    getgData();


    //By dafault get he Faculty data
    getFacultydata();

    //Listen for the click event on the swap section on navigation
    $('.swap').click(function (e) {

        var href = $(this).attr('href');

        //if user click on staff load staff data else load faculty data
        if(href == 'staff') {
            getStaffdata();
        } else {
            getFacultydata();
        }

        //prevent the anchor tag default action
        e.preventDefault();
    });

    // Get footer data for the footer section
    getfooterdata();

});

/***
 * Utility function to Get the About data from the Rest API
 */
function getAboutData() {

    //Call myXhr function with path /about to get the data as json object
    myXhr('get',{path:'/about/'},'#about .content').done(function(jsonData){
        var x="<h2>"+jsonData.title+"</h2>";
        x+="<p>"+jsonData.description+"</p>";
        x+="<p> <q>"+jsonData.quote+"</q></p>";
        x+="<p> <i> "+jsonData.quoteAuthor+"</i></p>";

        //Append the data to the about sectiob
        $('#about .content').html(x);

    });
}

/***
 * Get the UnderGraduate data from the Rest API
 */
function getUgData() {

    //Call myXhr function with path /degrees/undergraduate/ to get the data as json object
    myXhr('get',{path:'/degrees/undergraduate/'},'#ug').done(function(json){

        var x='';
        x+='<h2>Our UnderGraduate Courses</h2>';

        $.each(json.undergraduate,function(i, item){

            x+='<aside>';
            // Check for  the different degree name for the different icon and apppend the icon
            if(item.degreeName == 'wmc') {
                x+='<img src="./img/icon/web-page.png" alt="">';

            } else if(item.degreeName == 'hcc') {
                x+='<img src="./img/icon/notepad.png" alt="">';
            } else {
                x+='<img src="./img/icon/data-storage.png" alt="">';
            }

            x+='<h3>'+item.title+'</h3>';
            x+='<h5>'+item.description+'</h5>';

            x+='<div class="panel">';
            x+='<div class="readmore">Read more</div>';

            x+='<div class="panel_container" style="height: 0px">';
            x+='<div class="panel_content">';

            $.each(item.concentrations,function(j, listelement){
                x+='<ul>';
                x+='<li>'+listelement+'</li>';
                x+='</ul>';

            });


            x+='</div>';
            x+='</div>';
            x+='</div>';

            x+='</aside>';

        });

        //Append the formated data to the #ug tah
        $('#ug').html(x);

        //Initialize the selector for the expanding panel for each read more button
        $('#ug .panel .readmore').on('click', function (){

            var new_height = null;
            var selected_panel = $(this).closest('.panel');
            var selected_content = selected_panel.find('.panel_container');

            //Toggle the class open the increase and decrease the height of the section
            selected_panel.toggleClass('open');

            if(selected_panel.hasClass('open')) {
                new_height = selected_panel.find('.panel_content').outerHeight(true);

            } else {
                new_height = 0;
            }

            //Animate the extended panel
            selected_content.animate({'height': new_height+'px'},500);

        });
    });

}

/**
 * Get the Graduate data from the Rest API
 */
function getgData() {

    //Call myXhr function with path /degrees/undergraduate/ to get the data as json object
    myXhr('get',{path:'/degrees/graduate/'},'#g').done(function(json){

        var x='';
        var y='';
        x+='<h2>Our Graduate Courses</h2>';

        var count = 0;

        //iterate over all object in graduate section
        $.each(json.graduate,function(i, item){

            //Append only 3 column to in a row
            if(count < 3) {
                x+='<aside>';

                // Check for  the different degree name for the different icon and apppend the icon
                if(item.degreeName == 'ist') {
                    x+='<img src="./img/icon/clouds.png" alt="">';

                } else if(item.degreeName == 'hci') {
                    x+='<img src="./img/icon/writer.png" alt="">';
                } else {
                    x+='<img src="./img/icon/server.png" alt="">';
                }


                x+='<h3>'+item.title+'</h3>';
                x+='<h5>'+item.description+'</h5>';

                x+='<div class="panel">';
                x+='<div class="readmore">Read more</div>';

                x+='<div class="panel_container" style="height: 0px">';
                x+='<div class="panel_content">';

                $.each(item.concentrations,function(j, listelement){
                    x+='<ul>';
                    x+='<li>'+listelement+'</li>';
                    x+='</ul>';

                });

                x+='</div>';
                x+='</div>';
                x+='</div>';
                x+='</aside>';
                count ++;
            } else {

                //append the rest of the column on second row
                y+='<h3>'+item.degreeName+'</h3>';

                $.each(item.availableCertificates,function(j, listelement){
                    y+='<ul>';
                    y+='<li>'+listelement+'</li>';
                    y+='</ul>';

                });
            }



        });

        $('#g').html(x);
        $('#certificate').html(y);

        //Initialize the selector for the expanding panel for each read more button
        $('#g .panel .readmore').on('click', function (){

            var new_height = null;
            var selected_panel = $(this).closest('.panel');
            var selected_content = selected_panel.find('.panel_container');

            selected_panel.toggleClass('open');

            if(selected_panel.hasClass('open')) {
                new_height = selected_panel.find('.panel_content').outerHeight(true);

            } else {
                new_height = 0;
            }

            //Animate the extended panel
            selected_content.animate({'height': new_height+'px'},500);

        });
    });
}

/**
 * Get the Faculty data from the Rest API
 */
function getFacultydata() {

    myXhr('get',{path:'/people/'},'#gallery').done(function(json){
        var x='';
        var count = 0;

        x+='<h2>'+json.title+'</h2>';
        x+='<p>'+json.subTitle+'</p>';

        //Iterate for the each item in the json data
        $.each(json.faculty,function(i, item){

            count++;
            x+='<a class="inline" href="#inline_content_'+ count+ '">';
            x+='<figure>';
            x+='<img src="'+ item.imagePath +'" width="150px" height="150px" >';
            x+='<span class="grid-overlay grid-text">'+item.name +' </span>';
            x+='</figure>';
            x+='</a>';

            x+='<div style="display:none">';

            //give them different id to identify them easly
            x+='<div id="inline_content_'+count+'" style="margin: auto; text-align: center; padding:10px; background:#fff;">';

            x+='<h3>'+ item.name +'</h3>';
            x+='<p>';
            if(item.tagline) {
                x+= item.tagline +'</br>';
            }
            x+=item.title +'</br>';
            x+='Office: '+ item.office+'</p>';
            x+='<img src="'+item.imagePath+'" alt="" width="150px" height="150px" >';
            x+='<p> Email: '+ item.email+ '</br>' ;

            //check for the key value in the json data if present append the data
            if(item.website) {
                x+= 'Website: <a href="'+ item.website+ '">'+ item.website+'</a></br>';
            }
            if(item.phone) {
                x+= 'Phone: '+ item.phone +'</br>';
            }

            x+='</p>';
            x+='</div>';
            x+='</div>';

        });
        // console.log(x);
        $('#gallery').html(x);
        $('.inline').colorbox({inline:true, width:"50%"});
    });
}

/**
 * Get the staff data from the Rest API
 */
function getStaffdata() {

    myXhr('get', {path: '/people/'}, '#gallery').done(function (json) {

        var x = '';
        var count = 0;

        x += '<h2>' + json.title + '</h2>';
        x += '<p>' + json.subTitle + '</p>';

        //Iterate for the each item in the json data
        $.each(json.staff, function (i, item) {

            count++;
            x += '<a class="inline" href="#inline_content_' + count + '">';
            x += '<figure>';
            x += '<img src="' + item.imagePath + '" width="150px" height="150px" >';
            x += '<span class="grid-overlay grid-text">' + item.name + ' </span>';
            x += '</figure>';
            x += '</a>';

            x += '<div style="display:none">';

            //give them different id to identify them easly
            x += '<div id="inline_content_' + count + '" style="margin: auto; text-align: center; padding:10px; background:#fff;">';

            x += '<h3>' + item.name + '</h3>';
            x += '<p>';

            //check for the key value in the json data if present append the data
            if (item.tagline) {
                x += item.tagline + '</br>';
            }
            x += item.title + '</br>';
            if(item.office) {
                x += 'Office: ' + item.office + '</p>';
            }
            x += '<img src="' + item.imagePath + '" alt="" width="150px" height="150px" >';
            x += '<p> Email: ' + item.email + '</br>';

            if (item.website) {
                x += 'Website: <a href="' + item.website + '">' + item.website + '</a></br>';
            }
            if (item.phone) {
                x += 'Phone: ' + item.phone + '</br>';
            }

            x += '</p>';
            x += '</div>';
            x += '</div>';

        });
        $('#gallery').html(x);
        $('.inline').colorbox({inline: true, width: "50%"});
    });
}

/**
 * Get the Footer data from the Rest API
 */
function getfooterdata() {

    //Get Social Data from the rest api
    myXhr('get', {path: '/footer/'}, '#social').done(function (json) {
        var x = '';
        var social = json.social;

        x += '<h2>' + social.title + '</h2>';
        x += '<p><q>' + social.tweet + '</q></p>';
        x += '<p>' + social.by + '</p>';
        x += '<a href = "'+social.tweet+'">Twitter</a>';
        x += ' ';
        x += '<a href = "'+social.facebook+'">Facebook</a>';

        // append to social section
        $('#social').html(x);
    });


    //QuickLink Data
    myXhr('get', {path: '/footer/'}, '#left').done(function (json) {

        var x = '';
        var links = json.quickLinks;
        x += '<h4> Quick Links </h4>';

        $.each(links,function(i, data){
            x += '<a href = "'+data.href+'">'+data.title+'</a></br>';
        });

        // append to left column
        $('#left').html(x);
    });

    //Copy Right
    myXhr('get', {path: '/footer/'}, '#left').done(function (json) {

        var x = '';
        var copyright = json.copyright;

        x += '<h4>'+ copyright.title+'</h4>';
        x += copyright.html;

        // append to center column
        $('#center').html(x);
    });


    //news Data
    myXhr('get', {path: '/footer/'}, '#right').done(function (json) {

        var x = '';
        var news = json.news;

        x += '<h4>News</h4>';
        x += '<a href = "'+news+'">All NEWS</a>';

        // append to right column
        $('#right').html(x);
    });
}

/**
 * Function to get the data by ajax request
 * @param type
 * @param data
 * @param elementID
 * @returns {*}
 */

function myXhr(type, data, elementID){
    return $.ajax({
        type:type,
        url:'https://people.rit.edu/aak3988/proxy.php',
        // url:'proxy.php',
        dataType:'json',
        data:data,
        cache:false,
        async:true,
        beforeSend:function(){
            $(elementID).append('<div class="spin" style="background:url(./img/background/spin.gif) no-repeat center center;width:100%;height:100px;"> </div>');
        }
    }).always(function(){
        //kill spinner
        $(elementID).find('.spin').fadeOut(500,function(){
            $(this).remove();
        });
    }).fail(function(){
        //handle failure
        $(elementID).append('<div> Failed to get the data Try to put project on gibson sever</div>');
    });
}
