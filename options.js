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

