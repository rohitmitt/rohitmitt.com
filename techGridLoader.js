
const techStack = {
    "Web": [
      {
        name: "JavaScript",
        src: "assets/tech/JavaScript.svg",
      },
      {
        name: "React",
        src: "assets/tech/React.svg",
      },
      {
        name: "CSS3",
        src: "assets/tech/CSS3.svg",
      },
      {
        name: "HTML5",
        src: "assets/tech/HTML5.svg",
      },
      
    ],
    "Backend": [
    {
        name: "NodeJS",
        src: "assets/tech/NodeJS.svg",
        },
        {
        name: "Flask",
        src: "assets/tech/Flask.png",
        },
    ],

    "Data": [
      {
        name: "Python",
        src: "assets/tech/Python.svg",
      },
      {
          name: "PostgreSQL",
          src: "assets/tech/PostgreSQL.svg",
        },
        {
          name: "Pandas",
          src: "assets/tech/Pandas.svg",
        },
  ],
    "Cloud": [
        {
            name: "AWS",
            src: "assets/tech/AWS.svg",
          },
      ],
    "AI & ML": [

          {
          name: "PyTorch",
          src: "assets/tech/PyTorch.svg",
          },
      ],
  };
  

document.addEventListener("DOMContentLoaded", function () { 
  
  const techGrid = document.querySelector('.tech-grid-container');

  function handleTechClick(event) {
    const category = event.currentTarget.getAttribute('data-category');
    const tech = event.currentTarget.getAttribute('data-tech');
    console.log(`Category: ${category}, Technology: ${tech}`);
    
    const targetElement = document.getElementById(category);
    const navbarOffset = getNavbarOffset();
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    function handleTechKeypress(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        handleTechClick(event);
      }
    }
    
    // Add your tracking logic here (e.g., send data to analytics)
  }

  Object.entries(techStack).forEach(([category, technology]) => {
      const categoryContainer = document.createElement('div');
      categoryContainer.className = 'project-category';

      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = category; 
      categoryContainer.appendChild(categoryTitle);

      const techStackGrid = document.createElement('div');
      techStackGrid.className = 'tech-stack-grid';

      techStackGrid.appendChild(categoryContainer);

      technology.forEach(tech => {
          const techContainer = document.createElement('button');
          techContainer.className = 'tech-container';
          techContainer.setAttribute('onclick', `handleTechClick('${tech.name.toLowerCase()}')`);
          techContainer.setAttribute('onkeypress', `handleTechKeypress(event, '${tech.name.toLowerCase()}')`);
          techContainer.setAttribute('data-category', category);
          techContainer.setAttribute('data-tech', tech.name);
          techContainer.setAttribute('data-tooltip', tech.name);
          techContainer.setAttribute('aria-label', `Click to learn how I used ${tech.name}`);
          techContainer.setAttribute('tabindex', '0');
          techContainer.addEventListener('click', handleTechClick);

          const img = document.createElement('img');
          img.className = 'tech-icon';
          img.src = tech.src;
          img.alt = tech.name.toLowerCase();
      
          const span = document.createElement('span');
          span.className = 'tech-label';
          span.textContent = tech.name;

          techContainer.appendChild(img);
          techContainer.appendChild(span);

          techStackGrid.appendChild(techContainer);
      });
      
      techGrid.appendChild(techStackGrid); // Append grid to category

  });

});