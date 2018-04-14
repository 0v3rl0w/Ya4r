const shell = require('electron').shell;

$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

function loadPage()
{
    getJson("https://a.4cdn.org/"+window.board+"/"+window.page+".json", function(data)
    {
        thread = data.threads
        for(var i=0; i<thread.length; i++)
        {
            var content = thread[i].posts[0];
            var file = content.tim + content.ext;
            console.log(content.no);
            var text = content.com;
            if(text === undefined){text = "";}
            if(content.ext == ".jpg" || content.ext == ".png" || content.ext == ".gif")
            {
                $(".collection").append("<li class='collection-item z-depth-2'><em>"+content.name+"</em><br /><br /><img width=250 height=166 src='http://i.4cdn.org/"+window.board+"/"+file+"'><em class='title' onclick='showThread(\""+content.no+"\")'>"+text+"</em></li><br />");
            }         
                
            if(content.ext == ".webm")
            {
                $(".collection").append("<li class='collection-item z-depth-2'><em>"+content.name+"</em><br /><br /><video class='video-js' width=250 height=166 controls loop><source src='http://i.4cdn.org/"+window.board+"/"+file+"'></video><em class='title' onclick='showThread(\""+content.no+"\")'>"+text+"</em></li><br />");
            }
        }
    });
}

function backThread()
{
    $("#back").hide();
    $(".sidenav-trigger").show();
    $(".collection").empty();
    loadPage();
}

function showThread(nbr)
{
    $(".collection").empty();
    $("#back").show();
    $(".sidenav-trigger").hide();

    getJson("https://a.4cdn.org/"+window.board+"/thread/"+nbr+".json", function(data)
    {
        for(var i=0; i<data.posts.length; i++)
        {
            var content = data.posts[i];
            var file = content.tim + content.ext;
            var text = content.com;
            if(text === undefined) {text = "";}
            if(content.ext !== undefined)
            {
                if(content.ext == ".jpg" || content.ext == ".png" || content.ext == ".gif")
                {
                    $(".collection").append("<li class='collection-item z-depth-2'><em>"+content.name+"</em><br /><br /><img width=250 height=166 src='http://i.4cdn.org/"+window.board+"/"+file+"'><em class='title'>"+text+"</em></li><br />");
                }         
                
                if(content.ext == ".webm")
                {
                    $(".collection").append("<li class='collection-item z-depth-2'><em>"+content.name+"</em><br /><br /><video class='video-js' width=250 height=166 controls  loop><source src='http://i.4cdn.org/"+window.board+"/"+file+"'></video><em class='title'>"+text+"</em></li><br />");
                }
            }

            else 
            {
                $(".collection").append("<li class='collection-item z-depth-2'><em>"+content.name+"</em><br /><br /><em class='title'>"+text+"</em></li><br />");
            }
        }
    });
}

window.onscroll = function()
{
    if(document.body.scrollTop > 1000 && document.body.scrollTop % 3000 <= 150)
    {
        window.page += 1;
        loadPage();
    }
}

$(document).ready(function()
{
    window.page = 1;
    getJson("https://a.4cdn.org/boards.json", function(board)
    {
        board = board.boards;
        for(var i=0; i<board.length; i++)
        {
            if(board[i].board == window.board) {$('.brand-logo').text(board[i].title);}
        }
    });

    window.board = window.location.href.split('?')[1].split('=')[1].replace('#', '');
    $('.sidenav').sidenav();
    $('.modal').modal();
    loadPage();
});