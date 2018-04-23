$("#templates").load("template.html #template1",function(){
          var template = document.getElementById('template1').innerHTML;
          var output = Mustache.render(template, view);
          $("#person").html(output);
        });
