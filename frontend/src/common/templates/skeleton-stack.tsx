export const skeletonStack = (length: number) => {
  if (!length || length === 0) return [];
  let array = [];
  for (let index = 0; index < length; index++) {
    array.push({
      id: index + 1,
      name: "Featching Skill....",
      icon: "/icons/default_skill.svg",
      showOnPortfolio: true,
    });
  }
  return array;
};
