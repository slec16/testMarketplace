const sort_by = (field, reverse) => {

    const key = (x) => {
        return x[field]
    };

    reverse = !reverse ? 1 : -1 ; 

    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }

}

export default sort_by