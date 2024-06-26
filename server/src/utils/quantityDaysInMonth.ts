export function getDaysInMonth(month: number, year: number): number {
    const days31 = [1, 3, 5, 7, 8, 10, 12];
    const days30 = [4, 6, 9, 11];
    if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    } else if (days31.includes(month)) {
      return 31;
    } else if (days30.includes(month)) {
      return 30;
    }
  }
