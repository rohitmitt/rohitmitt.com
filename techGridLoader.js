
const techStack = {
    "Web Development": [
      {
        name: "React",
        src: "assets/tech/React.svg",
      },
      {
        name: "NodeJS",
        src: "assets/tech/Node.js.svg",
      },
    ],

    "AI & ML": [
    {
        name: "React",
        src: "assets/tech/React.svg",
        },
        {
        name: "NodeJS",
        src: "assets/tech/Node.js.svg",
        },
    ],

    "Backend Systems": [
    {
        name: "React",
        src: "assets/tech/React.svg",
        },
        {
        name: "NodeJS",
        src: "assets/tech/Node.js.svg",
        },
    ],

    "Cloud Technologies": [
        {
            name: "React",
            src: "assets/tech/React.svg",
          },
          {
            name: "NodeJS",
            src: "assets/tech/Node.js.svg",
          },
      ],

    "Data Solutions": [
        {
            name: "React",
            src: "assets/tech/React.svg",
          },
          {
            name: "NodeJS",
            src: "assets/tech/Node.js.svg",
          },
    ]
  };
  

document.addEventListener("DOMContentLoaded", function () { 
  
    const projectGrid = document.querySelector('.project-grid');

    const navbar = document.querySelector('.navbar-container');

    function getNavbarOffset() {
      const computedStyle = getComputedStyle(navbar);
      const topValue = computedStyle.top;
      const offset = parseFloat(topValue);
      return offset;
    }

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

        const techStack = document.createElement('div');
        techStack.className = 'tech-stack';


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

            techStack.appendChild(techContainer);
        });
        
        projectGrid.appendChild(categoryContainer);
        projectGrid.appendChild(techStack); // Append grid to category

    });

  });