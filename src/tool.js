export const _Tool = {
  fomatTime(time) {
    let timeTotalSecond = Math.ceil(time);
    let timeMine = Math.floor(timeTotalSecond / 60);
    let timesecond = timeTotalSecond % 60;

    if (timeMine < 10) {
      timeMine = "0" + timeMine;
    }
    if (timesecond < 10) {
      timesecond = "0" + timesecond;
    }

    return timeMine + ":" + timesecond;
  }
};
