var slide = {       
    down : function(ul,gao){
        ul.style.height=`${gao}px`;
        ul.style.display="block";
    },              
    up : function(ul){
        ul.style.height='0';
        ul.style.display="none"
    }
}
function toggleSlide(id,s,h){
    var gao=h;
    var ul = document.getElementById(id);
    ul.style.transition='height'+s+'ms';
    ul.style.overflow='hidden';                    
    if(ul.style.display==="none"){
        slide.down(ul,gao);
    }else{
        slide.up(ul);
    }
}
export {toggleSlide}