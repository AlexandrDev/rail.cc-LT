/*
 * Click event detection
 */
const isTouch = ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);

global.clickEvent = isTouch ? 'touchend' : 'click';
global.isMobile = () => window.innerWidth < 992;
