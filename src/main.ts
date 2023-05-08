addEventListener('pointerdown', e => {
    if (e.button !== 1 || !e.altKey) return;

    const text = (e.target as HTMLElement).innerText || (e.target as HTMLInputElement).value;
    if (text)
        handleString(text, e.shiftKey);
}, {capture: true})

addEventListener('keydown', e => {
    if (e.code === 'KeyC' && e.altKey) {
        const str = getSelectedText();
        if (!str) return;

        handleString(str, e.shiftKey);
    }
}, {capture: true});

function handleString(str: string, round: boolean) {
    const pxRegex = /(-?\d+[.|,]*\d*)\W*[px]*/gim
    const match = pxRegex.exec(str);

    const numberInPx = match?.[1];
    if (!numberInPx) return;

    const dotNumber = numberInPx.replace(',', '.');
    const px = Number(dotNumber);

    let rem = px / 16;
    const remStr = round
        ? Math.round(rem).toString()
        : rem.toFixed(2)

    navigator.clipboard.writeText(`${remStr}rem`);
}

function getSelectedText() {
    return window.getSelection()?.toString() ?? '';
}
