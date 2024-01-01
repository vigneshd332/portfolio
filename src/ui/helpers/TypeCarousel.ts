export default class TxtRotate {
  toRotate: string[];
  el: Element;
  loopNum: number;
  period: number;
  txt: string;
  isDeleting: boolean;
  constructor(el: Element, toRotate: string[], period: number | null) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = period ? period : 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick(): void {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];
    if (!this.isDeleting) this.txt = fullTxt.substring(0, this.txt.length + 1);
    else this.txt = fullTxt.substring(0, this.txt.length - 1);

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    const that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      that.tick();
    }, delta);
  }
}
