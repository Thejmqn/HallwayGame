function percentWidth(num) {
    const canvasWidth = window.innerWidth-16;
    return num*0.01*canvasWidth;
}

export default percentWidth;