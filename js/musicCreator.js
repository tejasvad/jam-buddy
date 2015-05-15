var getCheckBox = function(note){
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('class', 'notesCheck');
    check.setAttribute('value', note);
    var checkLabel = document.createElement('label');
    checkLabel.textContent = note;

    var wrap = $('<div />',{
        css :{
            'display':'inline-block',
            'margin-right':'10px'
        }
    });
    wrap.append(check).append(checkLabel);
    return wrap;
}

var getRandom = function(array){
    var rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

$(function(){
    populateKeys();
    var array = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    var timeArray = [8,4,4,4,2,2,2,1];
    var parent = $('#notes');
    for(var i=0;i<array.length;i++){
        var nodeCheck = getCheckBox(array[i]);
        parent.append(nodeCheck);
    }
    $('#create').on('click',function(){
        var checkedValues = [];
        var keysArray = [];
        $.each($('.notesCheck:checked'),function(i,obj){
            checkedValues.push($(obj).val() + '3');
        });
        if(checkedValues.length>0){
            checkedValues.push('MT');
            for(var i=0;i<200;i++){
                var randNote = getRandom(checkedValues);
                var randTime = getRandom(timeArray);
                keysArray.push({n : randNote, t: randTime})
            }
            playArray(keysArray);
        }
    });
    $('#stop').on('click',function(){
        if(currentAudio){
            currentAudio.pause();
        }
        isStopped = true;
        setTimeout(function(){
            isStopped = false
        },2000);
    });
    $('#playSong').on('click',function(){
        copyNPlay(muskurane);
    });
});