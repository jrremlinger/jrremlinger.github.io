function HCB() {
    if(copper >= 1000) {
        copper -= 1000;
        user.createKey();
        updateDisplay();
        rand = Math.floor(Math.random() * 81) + 1;
        window.open("raid_data/mages/pCommon/commPrz (" + rand + ").jpg");
    }
    else {
        null;
    }
}
function HRB() {
    if(silver >= 1000) {
        silver -= 1000;
        user.createKey();
        updateDisplay();
        rand = Math.floor(Math.random() * 47) + 1;
        window.open("raid_data/mages/pRare/rarePrz (" + rand + ").gif");
    }
    else {
        null;
    }
}
function HMB() {
    if(gold >= 1000) {
        gold -= 1000;
        user.createKey();
        updateDisplay();
        rand = Math.floor(Math.random() * 5) + 1;
        window.open("raid_data/mages/pMythic/mythicPrz (" + rand + ").mp4");
    }
    else {
        null;
    }
}