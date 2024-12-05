export const changeTypeToText = (value: string) => {
    const words = value.toLowerCase().split("_").join(" ").split(" ");
    const capitalizedWords = words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  export const isValidDate = (dateString: string) => {
    const regex1 = /^\d{2}\/\d{2}\/\d{4}$/; // Format: DD/MM/YYYY
    const regex2 = /^\d{2}-\d{2}-\d{4}$/; // Format: DD-MM-YYYY
    if (!regex1.test(dateString) && !regex2.test(dateString)) return false;

    const separator = dateString.includes("/") ? "/" : "-";
    const [day, month, year] = dateString.split(separator).map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };
