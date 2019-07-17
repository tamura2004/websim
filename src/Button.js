/**
 * p5jsボタンファクトリ
 * @author tamura2004@gmail.com (mitsuhiro tamura)
 */
export default class Button {
  /**
   * @constructor
   * @param {p5js} p5 p5jsインスタンス
   * @param {string} label ボタン名
   * @param {number} x ボタンのX座標
   * @param {number} y ボタンのY座標
   * @param {function} cb マウスクリック時のハンドラ関数
   */
  constructor(p5, label, x, y, cb) {
    this.btn = p5.createButton(label);
    this.btn.position(x, y);
    this.btn.mousePressed(cb);
  }
}
