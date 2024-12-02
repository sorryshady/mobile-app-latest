export const changeTypeToText = (value: string) => {
    const words = value.toLowerCase().split("_").join(" ").split(" ");
    const capitalizedWords = words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };
