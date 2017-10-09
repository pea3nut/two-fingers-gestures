const OpenTabUrl =browser.i18n.getMessage('open_tab_url');
/**
 * @param {object} data
 * @param {string} data.type - [up|down|left|right]
 * */
browser.runtime.onMessage.addListener(function(data ,sender){
    if(!(data &&data.type))return;
    else ~async function(type){switch(type){
        case 'up':{
            let [activeTab] =await browser.tabs.query({active:true});
            await browser.tabs.remove(activeTab.id);
            break;
        }case 'down':{
            let [activeTab] =await browser.tabs.query({active:true});
            await browser.tabs.create({
                active :true,
                url :OpenTabUrl,
                index :activeTab.index+1,
            });
            break;
        }case 'left':{
            let tabs =await browser.tabs.query({});
            tabs.sort((tab1,tab2)=>tab2.index-tab1.index);
            let activeTabIndex =tabs.findIndex(tab=>tab.active);
            await browser.tabs.update(
                tabs[activeTabIndex-1].id,
                {active:true}
            );
            break;
        }case 'right':{
            let tabs =await browser.tabs.query({});
            tabs.sort((tab1,tab2)=>tab2.index-tab1.index);
            let activeTabIndex =tabs.findIndex(tab=>tab.active);
            await browser.tabs.update(
                tabs[activeTabIndex+1].id,
                {active:true}
            );
            break;
        }
    };}(data.type);
});
