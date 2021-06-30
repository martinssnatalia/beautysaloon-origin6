/*Abrir e fechar o menu quando clicar no ícone*/
//dentro do documento (html) procura o seletor header nav e atribiu ele a constante nav/ = significa recebendo.//
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

//alternativa ao f12 no navegador, para conferir se está certo o que está sendo buscado etc.//
//console.log(toggle)

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show') //troca da classe show dentro de nav. se tiver a classe show, tirar, se não tiver, colocar//
  })
}

/*esconder o menu quando clicar em uma das opções*/
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show') //aqui não importa se a classe show existe ou não, ela será removida de nav//
  })
}

/* mudar o header da página quando der scroll */
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    // scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    // menor que a altura do header
    header.classList.remove('scroll')
  }
}

/* Testimonials carousel slider swiper */
const swiper = new Swiper('.swiper-container', {
  /*parametros retirados de https://swiperjs.com/swiper-api, Mayk leu e viu quais seriam os mais interessantes */
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true /*pra passar com a bolinha do mouse */,
  keyboard: true /*pra passar com as setas do teclado */,
  breakpoints: {
    767: {
      /*quando a tela for >= a 767 px, colocar 2 slides */ slidesPerView: 2,
      setWrapperSize: true /*Enabled this option and plugin will set width/height on swiper wrapper equal to total size of all slides. */
    }
  }
})

/*Scroll reveal: mostrar elementos quando der scroll na pag */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700 /*ms*/,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials,
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)

/* back to top buttom - pra aparecer só depois que começar a rolar a página*/
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
  /*esse 560 foi uma altura arbritária escolhida*/
}

/*Menu ativo conforme seção visível da página */
const sections =
  document.querySelectorAll(
    'main section[id]'
  ) /*seleciona todas as seções, dentro do main, que possuírem algum id*/
function activateMenuAtCurrentSection() {
  const checkpoint =
    window.pageYOffset +
    (window.innerHeight / 8) *
      4 /*Mayk foi testando até chegar nesses números, dividir a página em 8frações e pegar 4 delas*/

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}
/*When scroll */
window.addEventListener('scroll', function () {
  backToTop()
  changeHeaderWhenScroll()
  activateMenuAtCurrentSection()
})
