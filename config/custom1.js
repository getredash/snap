'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.restyleDashboard = restyleDashboard;
function restyleDashboard() {
    let elements = document.getElementsByTagName('h3');
    for (let i = 0; i < elements.length; ++i) {
        elements[i].remove();
    }
}

