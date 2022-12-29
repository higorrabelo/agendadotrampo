
jQuery("document").ready(function(){
    jQuery.ajax("submit",function(e){
        e.preventDefault()
        alert("Parei o submit")
    })

});