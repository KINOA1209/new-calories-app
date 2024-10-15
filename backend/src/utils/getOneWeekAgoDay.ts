export function getOneWeekAgo(date: string | Date) {
    // Create a new Date object based on the input date
    const specificDate = new Date(date);
  
    // Subtract 7 days (in milliseconds) from the specific date
    specificDate.setDate(specificDate.getDate() - 7);
  
    return specificDate;
  }
  