function loadPage()
{
    getJson("https://a.4cdn.org/"+window.board+"/"+window.page+".json", function(data)
    {
        thread = data.threads
        for(var i=0; i<thread.length; i++)
        {
            var content = thread[i].posts[0];
            var file = content.tim + content.ext;
            $(".collection").append("<li class='collection-item z-depth-2'><em>"+content.name+"</em><br /><br /><img width=250 height=166 src='http://i.4cdn.org/"+window.board+"/"+file+"'><em class='title'>"+content.com+"</em></li><br />")
        }
    });
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
    loadPage();
});