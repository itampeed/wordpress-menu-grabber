<script>
(function(){
  const DEBUG = true;
  const log = (...args) => DEBUG && console.log('[menu-debug]', ...args);

  function restructureMenu() {
    const items = document.querySelectorAll('.custom-menu-items li.menu-item-has-children');
    log('Found menu items with children:', items.length);

    items.forEach(item => {
      const submenu = item.querySelector('ul');
      const link = item.querySelector('a');

      if (!submenu || !link) return;

      // Create toggle button
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'submenu-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '+';

      // Insert toggle right after the link
      link.insertAdjacentElement('afterend', toggle);

      // Create new <li class="submenu"> and move submenu inside it
      const submenuLi = document.createElement('li');
      submenuLi.className = 'submenu';
      submenuLi.appendChild(submenu);
      item.insertAdjacentElement('afterend', submenuLi);

      // Initially hide submenu
      submenu.style.maxHeight = '0';
      submenu.style.overflow = 'hidden';
      submenu.style.transition = 'max-height 0.3s ease';
    });
  }

  function handleToggle(e) {
    const toggle = e.target.closest('.submenu-toggle');
    if (!toggle) return;

    e.preventDefault();
    e.stopPropagation();

    const li = toggle.closest('li.menu-item-has-children');
    if (!li) return;

    const nextLi = li.nextElementSibling;
    if (!nextLi || !nextLi.classList.contains('submenu')) return;

    const submenu = nextLi.querySelector('ul');
    if (!submenu) return;

    const isOpen = nextLi.classList.toggle('open');
    toggle.textContent = isOpen ? '–' : '+';
    toggle.setAttribute('aria-expanded', isOpen);

    submenu.style.maxHeight = isOpen ? submenu.scrollHeight + 'px' : '0';
    log(isOpen ? 'Opened submenu:' : 'Closed submenu:', li.textContent.trim());
  }

  document.addEventListener('DOMContentLoaded', () => {
    restructureMenu();

    // Re-run if Elementor or AJAX updates menu
    const observerTarget = document.querySelector('.product-categories-menu') || document.body;
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        m.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('.custom-menu-items, .menu-item-has-children')) {
            log('Menu mutation detected, restructuring again...');
            restructureMenu();
          }
        });
      }
    });
    observer.observe(observerTarget, { childList: true, subtree: true });

    document.addEventListener('click', handleToggle);
  });
})();
</script>
