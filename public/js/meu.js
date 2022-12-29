
$("document").ready(function(){
    console.log($)
    $.ajax("submit",function(e){
        e.preventDefault()
        console.log("Parei o submit")
    })

});