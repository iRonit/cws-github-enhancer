function log(message) {
    console.log(`Github Enhancer: ${message}`);
  }
  
  log('Content script is being injected');
  
  function initializeResizablePanels() {
    log('Initializing resizable panels');
  
    // Replace these selectors with the actual selectors for the left and right panels on GitHub
    const leftPanel = document.querySelector('.Layout-sidebar');
    const rightPanel = document.querySelector('.Layout-main');
  
    // Only apply the resizable panels on the files page
    if (leftPanel && rightPanel && window.location.pathname.endsWith('files')) {
      log('Left and right panels found');
  
      // Create a resizable bar ellement
      const resizableBar = document.createElement('div');
      resizableBar.className = 'resizable-bar';
      // Create a container to hold the left panel, resizable bar, and right panel
      const resizableContainer = document.createElement('div');
      resizableContainer.className = 'resizable-container';
      leftPanel.parentNode.insertBefore(resizableContainer, leftPanel);
      resizableContainer.appendChild(leftPanel);
      resizableContainer.appendChild(resizableBar);
      resizableContainer.appendChild(rightPanel);
      // Resolve the width of the panels
      const containerRect = resizableContainer.parentNode.getBoundingClientRect();
      const rightPanelSize = containerRect.right - leftPanel.getBoundingClientRect().right - 5;
      rightPanel.style.width = `${rightPanelSize}px`;
  
      let isResizing = false;
  
      resizableBar.addEventListener('mousedown', function (e) {
        isResizing = true;
        document.body.style.cursor = 'ew-resize';
      });
  
      document.addEventListener('mousemove', function (e) {
        if (!isResizing) return;
        const containerRect = resizableContainer.parentNode.getBoundingClientRect();
        const offsetRight = containerRect.right - e.clientX;
        const offsetLeft = e.clientX - containerRect.left;
  
        leftPanel.style.width = `${offsetLeft}px`;
        rightPanel.style.width = `${offsetRight}px`;
      });
  
      document.addEventListener('mouseup', function () {
        isResizing = false;
        document.body.style.cursor = 'default';
      });
    } else {
      log('Left or right panel not found');
    }
  }
  
  //Add event listener for when Github finishes loading dynamic content
  document.addEventListener('turbo:load', initializeResizablePanels);
  