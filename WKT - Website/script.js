wkd.autoInit();
const appBar = wkd.topAppBar.WkdTopAppBar.attachTo(document.getElementById('app-bar'));
const appNavEl = document.getElementById('app-nav');
const appNav = wkd.drawer.WkdDrawer.attachTo(appNavEl);
const mainContentEl = document.getElementById('wkd-app-page');
appBar.root.addEventListener('WkdTopAppBar:nav', () => {
    document.getElementById('app-nav-initial-focus').setAttribute('tabindex', '0');
    appNav.setOpen(true);
});

const menuApt = wkd.menu.WkdMenu.attachTo(document.getElementById('apt-menu'));
const menuAptBtn = document.getElementById('apt-btn');
menuAptBtn.addEventListener('click', () => menuApt.setOpen(true));
menuApt.setAnchorCorner(4); //TOP_RIGHT
menuApt.setOriginCorner(4);

/*expandable list*/
const list = document.getElementsByClassName('expandable');

for(let i = 0; i < list.length; i++){
    list[i].addEventListener('click', function(){
        const listcontent = this.nextElementSibling;
        const arrow = this.querySelector('.wkd-arrow');

        if (listcontent.style.display === 'block') {
            listcontent.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            listcontent.style.display = 'block';
            arrow.style.transform = 'rotate(90deg)';
        }
    });
} 

/*submenu*/
const arrow_back = document.getElementById('arrow_back');
const submenu = document.getElementById('submenu');
const scrim = document.querySelector('.wkd-drawer-scrim');
let clicked = 0;
arrow_back.addEventListener('click', function(){
  submenu.style.left = '0px';
  arrow_back.innerHTML = 'close';
  if (clicked%2 != 0){
    appNav.setOpen(false);
    submenu.style.left = '-268px';
    arrow_back.innerHTML = 'arrow_back';
  } 
  clicked++;
});
scrim.addEventListener('click', function(){
submenu.style.left = '-268px';
arrow_back.innerHTML = 'arrow_back';
    if (clicked%2 != 0){
        clicked++;
    }
});

/*table of content for every element with classname "mark"*/
const mark = document.querySelectorAll('.mark');
const toclistEmbedded = document.getElementById('toc-list-embedded');
const toclist = document.getElementById('toc-list');

for(let i = 0; i < mark.length; i++){
    const newitem = document.createElement('li');
    const newitem2 = document.createElement('li');
    toclist.appendChild(newitem);
    toclistEmbedded.appendChild(newitem2);
    newitem.innerHTML = '<a class="wkd-toc-list-item">' + mark[i].textContent + '</a>';
    newitem2.innerHTML = '<a class="wkd-toc-list-item">' + mark[i].textContent + '</a>';

    /*scroll to element*/
    function scroll(element){
        element.addEventListener('click', function(){ 
        const posY = mark[i].offsetTop;
        window.scrollTo(0, posY - 112);
    });
    }
    scroll(newitem);
    scroll(newitem2);
}

/*scroll -> tab disapear*/
let prevScrollpos = window.pageYOffset;
const tabbar = document.getElementById('bottom-row');
const drawerlist = document.getElementById('drawer-list');
const toc = document.getElementById('toc'); 

window.addEventListener('scroll', function(){
    let scrollPos = window.pageYOffset;
    if (prevScrollpos > scrollPos & window.innerWidth >= 840) {
        tabbar.style.top = '0px';
        drawerlist.style.padding = '60px 0px 0px 0px';
        toc.style.margin = '80px 0px 0px 0px';
    } else {
        tabbar.style.top = '-48px';
        drawerlist.style.padding = '20px 0px 0px 0px';
        toc.style.margin = '32px 0px 0px 0px';
    }
    prevScrollpos = scrollPos;
});

/*return to top*/
document.getElementById('return').addEventListener('click', () => window.scrollTo(0, 0));

/*search*/
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const searchTxT = document.getElementById('search-txt');

document.addEventListener('click', function(event) {
    if (search.contains(event.target)) {
        search.className = 'search-bar-container--opened';
        searchTxT.className = 'search-bar-txt--opened';
    } else {
        search.className = 'search-bar-container--closed';
        searchTxT.className = 'search-bar-txt--closed';
    }
});

/*handle resize*/
function resize(){
const currentSize = window.innerWidth;
if (currentSize >= 840){
    submenu.style.left = '-268px';
    arrow_back.innerHTML = 'arrow_back';
    if (clicked%2 != 0){
        clicked++;
    } 
        appNav.setOpen(false);
    }
}
window.onresize = resize;