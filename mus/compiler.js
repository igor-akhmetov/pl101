function visit(expr, time, notes) {
    if (expr.tag === 'seq') {
        return visit(expr.right,
                     visit(expr.left, time, notes),
                     notes);
    } else if (expr.tag === 'par') {
        left_endtime = visit(expr.left, time, notes);
        right_endtime = visit(expr.right, time, notes);
        if (left_endtime < right_endtime)
            return right_endtime;
        else
            return left_endtime;
    } else if (expr.tag === 'rest') {
        return time + expr.dur;
    } else {
        notes.push({tag: 'note',
                    pitch: expr.pitch,
                    start: time,
                    dur: expr.dur});
        return time + expr.dur;
    }        
}

var compile = function (musexpr) {
    result = [];
    visit(musexpr, 0, result);
    return result;
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));