export function restyleDashboard() {
    let elements = document.getElementsByTagName('h3')
    for (let i = 0; i < elements.length; ++i) {
        elements[i].remove();
    }
}