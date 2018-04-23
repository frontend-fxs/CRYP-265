$("#templates").load("files-to-copy/mustache.html #template1",function(){
          var template = document.getElementById('template1').innerHTML;
          var output = Mustache.render(template, view);
          $("#person").html(output);
        });
