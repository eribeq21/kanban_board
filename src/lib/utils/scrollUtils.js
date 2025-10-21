// Check if an element has scrollable content and its scroll position
export function checkScrollPosition(element, bottomThreshold = 20) {
    if (!element) {
        return { hasScroll: false, isAtBottom: false, showIndicator: false };
    }

    const hasScroll = element.scrollHeight > element.clientHeight;
    const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - bottomThreshold;
    const showIndicator = hasScroll && !isAtBottom;

    return { hasScroll, isAtBottom, showIndicator };
}

//  Create a scroll event handler that checks scroll position
export function createScrollHandler(callback, bottomThreshold = 20) {
    return (event) => {
        const element = event.target;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;
        
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - bottomThreshold;
        const showIndicator = !isAtBottom;

        callback({ scrollTop, scrollHeight, clientHeight, isAtBottom, showIndicator });
    };
}

// Smoothly scroll an element down by a percentage of its client height
export function smoothScrollDown(element, percentage = 0.8) {
    if (!element) return;

    element.scrollBy({
        top: element.clientHeight * percentage,
        behavior: 'smooth'
    });
}