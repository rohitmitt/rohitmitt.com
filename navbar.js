const navbar = document.querySelector('.navbar-container');

function getNavbarOffset() {
    const computedStyle = getComputedStyle(navbar);
    const topValue = computedStyle.top;
    const offset = parseFloat(topValue);
    return offset;
}

function handleNavClick(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href').substring(1);
    
    if(targetId === 'top'){
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } 
    
    else {
      const targetElement = document.getElementById(targetId);
      const navbarOffset = getNavbarOffset();
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

  }


  // Add event listeners to navbar links
  const navbarLinks = document.querySelectorAll('.navbar a');
  navbarLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });