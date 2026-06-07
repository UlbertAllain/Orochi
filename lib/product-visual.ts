export function getProductVisual(slug?: string) {
  const value = slug?.toLowerCase() ?? "";

  if (value.includes("kaminari")) {
    return {
      image: "/assets/product/kaminari.png",
      kanji: "雷",
    };
  }

  if (value.includes("suigetsu")) {
    return {
      image: "/assets/product/suigetsu.png",
      kanji: "水",
    };
  }

  if (value.includes("kaen")) {
    return {
      image: "/assets/product/kaen.png",
      kanji: "火",
    };
  }

  return {
    image: "/assets/product/kaminari.png",
    kanji: "蛇",
  };
}
