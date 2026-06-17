// 递归的升级版
function dfsPreOrderIter(root) {
    if (!root) return [];
    const stack = [root];
    const res = [];
    while(stack.length) {
        const node = stack.pop();
        res.push(node.val);
        // LIFO
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return res;
}