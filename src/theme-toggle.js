document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('dark-icon');
  const lightIcon = document.getElementById('light-icon');
  const htmlRoot = document.getElementById('root').firstElementChild;
  const header = document.querySelector('header');
  const footerLogo = document.querySelector('footer img');
  const githubIcon = document.querySelector('nav a[href="https://github.com/OKDP/"] svg');
  const sections = document.querySelectorAll('section.bg-gray-100');
  const footer = document.querySelector('footer');
  const timelineHeadings = document.querySelectorAll('.border-s h3');
  const borderContainer = document.querySelector('.grid.gap-10.rounded-xl.border');
  const logoPanels = document.querySelectorAll('.flex.divide-x.overflow-auto.rounded-lg');
  
  // Check for saved theme preference or use default (light)
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Function to update theme
  function setTheme(mode) {
    if (mode === 'dark') {
      // Switch to dark mode
      htmlRoot.classList.remove('bg-white', 'text-black');
      htmlRoot.classList.add('bg-gris-dark', 'text-white');
      
      header.classList.remove('bg-white');
      header.classList.add('bg-gris-dark');
      
      githubIcon.classList.remove('fill-black');
      githubIcon.classList.add('fill-white');
      
      footerLogo.classList.remove('brightness-0');
      
      sections.forEach(section => {
        section.classList.remove('bg-gray-100');
        section.classList.add('bg-gris-light');
      });
      
      footer.classList.remove('bg-gray-100');
      footer.classList.add('bg-gris-light');
      
      timelineHeadings.forEach(heading => {
        heading.classList.remove('text-black');
        heading.classList.add('text-white');
      });
      
      // Change border color of the rectangle to be visible in dark mode
      if (borderContainer) {
        borderContainer.classList.remove('border-gris-dark');
        borderContainer.classList.add('border-white', 'bg-gris-dark');
      }
      
      // Restore original dark grey background for logo panels
      logoPanels.forEach(panel => {
        panel.classList.remove('bg-gray-200');
        panel.classList.add('bg-gris-lighter');
      });
      
      // Switch icons
      darkIcon.classList.add('hidden');
      lightIcon.classList.remove('hidden');
      lightIcon.classList.remove('fill-black');
      lightIcon.classList.add('fill-white');
      
      localStorage.setItem('theme', 'dark');
    } else {
      // Switch to light mode
      htmlRoot.classList.remove('bg-gris-dark', 'text-white');
      htmlRoot.classList.add('bg-white', 'text-black');
      
      header.classList.remove('bg-gris-dark');
      header.classList.add('bg-white');
      
      githubIcon.classList.remove('fill-white');
      githubIcon.classList.add('fill-black');
      
      footerLogo.classList.add('brightness-0');
      
      sections.forEach(section => {
        section.classList.remove('bg-gris-light');
        section.classList.add('bg-gray-100');
      });
      
      footer.classList.remove('bg-gris-light');
      footer.classList.add('bg-gray-100');
      
      timelineHeadings.forEach(heading => {
        heading.classList.remove('text-white');
        heading.classList.add('text-black');
      });
      
      // Restore original border for light mode
      if (borderContainer) {
        borderContainer.classList.remove('border-white', 'bg-gris-dark');
        borderContainer.classList.add('border-gris-dark');
      }
      
      // Change grey panels to lighter grey in light mode
      logoPanels.forEach(panel => {
        panel.classList.remove('bg-gris-lighter');
        panel.classList.add('bg-gray-200');
      });
      
      // Switch icons
      lightIcon.classList.add('hidden');
      darkIcon.classList.remove('hidden');
      darkIcon.classList.remove('fill-white');
      darkIcon.classList.add('fill-black');
      
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Set initial theme
  setTheme(currentTheme);
  
  // Add click event
  themeToggle.addEventListener('click', function() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });
}); 