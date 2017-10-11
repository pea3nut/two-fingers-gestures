async function getOpenUrl(){
    var url =(await browser.storage.sync.get('open_tab_url'))['open_tab_url'];
    if(!url){
        url =browser.i18n.getMessage('openTabDefaultUrl');
    };
    return url;
};
async function setOpenUrl(url){
    return browser.storage.sync.set({
        'open_tab_url' :url,
    });
};
function renderI18N(rootElt,mark='i18n:'){
    rootElt =rootElt instanceof Element?rootElt:document.querySelector(rootElt);

    for(let elt of Array.from(rootElt.getElementsByTagName('*'))){
        for(let {name:attrName} of Array.from(elt.attributes)){
            if(!attrName.startsWith(mark))continue;
            let realAttr =attrName.replace(mark,'');
            if(realAttr==='text'){
                elt.textContent =browser.i18n.getMessage(
                    elt.getAttribute(attrName)
                );
            }else{
                elt.setAttribute(
                    realAttr,
                    browser.i18n.getMessage(
                        elt.getAttribute(attrName)
                    )
                );
            };
            elt.removeAttribute(attrName);
        }
    };

}