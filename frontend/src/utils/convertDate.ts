export const convertDate = (date: Date | null) => {
    const dateString = String(date);
    const dateLabel = new Date(dateString).toISOString().split("T")[0];
    return dateLabel;
  };
  