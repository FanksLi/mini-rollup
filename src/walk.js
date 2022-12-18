/**
 * 访问者：遍历树
 * @param {*} node
 * @param {*} parent
 * @param {*} enter 进入时回调函数
 * @param {*} leave 退出时回调函数
 * @returns
 */
 function walk(node,{enter, leave}) {
   if(node === null) return;
    enter && enter(node);
    const children = Object.values(node).filter(node => typeof node === 'object');
    children.forEach((c) => {
      walk(c, {enter, leave});
    });
    leave && leave(node);
    return;
  }
  
  // const ast = {
  //   a: [{ b: "2" }],
  // };
  
  // walk(ast, {
  //   enter: (node) => console.log(node),
  //   leave: (node) => console.log(node),
  // });
  
  module.exports = walk;
  