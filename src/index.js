const fs = require('fs');
const os = require('os');
window.board = [];
window.path = "";

function addBoard(board)
{
    if(!window.board.includes(board.board))
    {
        $(".collection").append("<a href='./board.html?i="+board.board+"'><li class='collection-item z-depth-2'><div class='col s6'>"+board.title+"</div></li><hr /></a>");
        window.board.push(board.board);
        fs.appendFile(window.path, board.board+'\n', function(err){
            if(err){throw err;}
        });
    }   
}

$(document).ready(function(){
    $('.modal').modal();
    $('.sidenav').sidenav();
    if(os.platform() === "linux" || os.platform() === "darwin")
    {
        window.path = process.env.HOME + "/.ya4r";
    }

    else
    {
        window.path = process.env.APPDATA + "\\.ya4r";
    }
    
    if(!fs.existsSync(path))
    {
        fs.appendFile(path, "", function(err){
            if(err) {throw err;}
        });

        if(os.platform === "win32") {exec("attrib +h " + path, (err, stdout, stderr) => {
            return;
        });}
    }

    else 
    {
        fs.readFile(path, function read(err, data){
            if(err) {throw err;}
            var content = data.toString();
            window.board = content.split('\n');
            console.log(window.board);
            getJson("https://a.4cdn.org/boards.json", function(boards){
                boards = boards.boards;
                for(var i=0; i<boards.length; i++)
                {
                    for(var j=0; j<window.board.length; j++)
                    {
                        if(boards[i].board == window.board[j])
                        {
                            $(".collection").append("<a href='./board.html?i="+window.board[j]+"'><li class='collection-item z-depth-2'><div class='col s6'>"+boards[i].title+"</div></li><hr /></a>");}
                        }                    
                    }
            });
        });
    }
});

function add() 
{
    var board = document.getElementById("boardInput").value;
    document.getElementById("boardInput").value = "";
    getJson("https://a.4cdn.org/boards.json", function(boards){
        boards = boards.boards;
        for(var i=0; i<boards.length; i++)
        {
            if(boards[i].board == board) {addBoard(boards[i]);}
        }
    });
}

function goNormal()
{
    $(".new").remove();
    $(".float").show();
    $(".brand-logo").show();
}

function removeitem(obj)
{
    if($(obj).attr("id") != "new")
    {
        var toremove = "";
        getJson("https://a.4cdn.org/boards.json", function(boards){
            boards = boards.boards;
            for(var i=0; i<boards.length; i++)
            {
                if(boards[i].title == $(obj).text()) 
                {
                    var index = window.board.indexOf(boards[i].board);
                    window.board.splice(index, 1);
                    console.log(window.board);
                    fs.writeFile(path, window.board.join('\n'), function(err)
                    {
                        if(err) {throw err;}
                    });
                    
                    location.reload();
                }
            }
        });
    }

    else 
    {
        goNormal();
    }
}

function edit()
{
    $(".float").hide();
    $(".brand-logo").hide();
    $("body").append('<a href="#" id="new" onclick="goNormal();" class="new btn-floating btn-large waves-effect waves-light red float"><i class="material-icons">exit_to_app</i></a>')
    $(".nav-wrapper").append('<a href="#" class="new brand-logo center" style="color: red;">Edit mode</a>')
    $("a").removeAttr("onclick");
    $("a").attr("onclick", "removeitem(this);")
}
