const RuWords = (
    num = 0,
    stage = []
) => {
    const
        txt = `${num}`,
        firstChar = Number(txt[txt.length - 1]),
        secondChar = Number(txt[txt.length - 2]);

    if (num === 1 || (firstChar === 1 && secondChar != 1)) return stage[0];
    else if (
        (firstChar === 1 && secondChar === 1) ||
        firstChar === 0 ||
        secondChar === 1
    )
        return stage[2] || stage[1];
    else if (firstChar < 5) return stage[1];
    else return stage[2] || stage[1];
};