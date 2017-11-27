~async function(){
    var url =await getOpenUrl();
    var openNewTabUrlInputElt =document.querySelector('#openNewTabUrl');
    var saveOpenNewTabUrlButtonElt =document.querySelector('#saveOpenNewTabUrl');


    openNewTabUrl.value =url;

    saveOpenNewTabUrlButtonElt.addEventListener('click',async function(){
        openNewTabUrlInputElt.disabled =true;
        await setOpenUrl(openNewTabUrlInputElt.value);
        openNewTabUrlInputElt.disabled =false;
    });

    renderI18N('#main');

}();
~async function (){
    var setValue =await getSensitivity();
    var judgeSensitivityIpt =document.querySelector('#judgeSensitivity');
    var autoGenerateBtn =document.querySelector('#autoGenerate');
    var saveJudgeSensitivityBtn =document.querySelector('#saveJudgeSensitivity');


    judgeSensitivityIpt.value =setValue;
    autoGenerateBtn.addEventListener('click',function(){
        judgeSensitivityIpt.value =screen.width*0.2;
    });
    saveJudgeSensitivityBtn.addEventListener('click',async function(){
        judgeSensitivityIpt.disabled =true;
        await setSensitivity(judgeSensitivityIpt.value);
        judgeSensitivityIpt.disabled =false;
    });

}();
