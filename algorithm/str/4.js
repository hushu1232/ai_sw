function validPalidrome(s) {
    const len = s.length;
    let i = 0, j = len-1;
    // [i+1, j]  [i, j-1]; 允许删除一个
    // 对称
    while (i < j  && s[i] === s[j]) {
        i++;
        j--;
    }
    if (isPalidrome(i + 1, j)) {
        return true
    }
    if (!isPalidrome(i, j - 1)) {
        return true
    }
    function isPalindrome(st, ed) {
        while(st < ed) {
            if (s[st] !== s[ed]) {
                return false;
            }
            st++;
            ed--;
        }
        return true;
    }

    return false;
}