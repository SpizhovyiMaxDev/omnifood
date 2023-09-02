

class App{
    heroSection = document.querySelector('#section-hero');
    navigationList = document.querySelector('header');
    btn = document.querySelector('.btn-mobile-nav');
    heroSection = document.querySelector('.section-hero');
    section = document.querySelector('.section-hero');
    #stickyNav;

    constructor(){
        this._checkFlexGap();
   
        this.navigationList.addEventListener('click', this._scrollNav.bind(this));
        this.btn.addEventListener('click', this._animateNavigation.bind(this));
        this.heroSection.addEventListener('click', this._animateScrollBtn.bind(this));
        this.#stickyNav = new IntersectionObserver(
            this._animateStickyNav,
            {
                root:null,
                rootMatgin:`-${this.navigationList.getBoundingClientRect().height}px`,
                threshold:0.15
            }
        )
        this.#stickyNav.observe(this.section);
    }

    _scrollNav(e){
         const link = e.target.closest('.main-nav-link');

         if(!link)return;
         const id = link.getAttribute('href');
         if(!id.includes('htttp')){
            e.preventDefault();
            this.navigationList.classList.toggle('nav-open');
            window.innerWidth <= 950 ? 
            setTimeout(() => {
                document.querySelector(id).scrollIntoView({behavior:'smooth'})
            }, 700) :
             document.querySelector(id).scrollIntoView({behavior:'smooth'}) 
            
         }
    }

    _animateNavigation(e){
       this.navigationList.classList.toggle('nav-open');
       /* For a Case */
       e.stopPropagation();
    }

    _animateScrollBtn(e){
        e.preventDefault();
        const btn = e.target.closest('.btn');
        if(!btn)return;
        const id = btn.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }

    _animateStickyNav(entries){
     const [entry] = entries;
     document.body.classList.toggle('sticky', !entry.isIntersecting);
    }

    _checkFlexGap(){
        const flex = document.createElement("div");
        flex.style.display = "flex";
        flex.style.flexDirection = "column";
        flex.style.rowGap = "1px";
      
        flex.appendChild(document.createElement("div"));
        flex.appendChild(document.createElement("div"));
      
        document.body.appendChild(flex);
        const isSupported = flex.scrollHeight === 1;
        flex.parentNode.removeChild(flex);
        console.log(isSupported);
      
        if (!isSupported) document.body.classList.add("no-flexbox-gap");
    }
}

const app = new App();