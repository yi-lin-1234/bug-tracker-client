import { Bug, GroupedAttribute } from "../type";

export function groupBugs(bugs: Bug[]) {
  if (!Array.isArray(bugs)) {
    throw new Error("Input should be an array");
  }

  const categoryCounts = bugs.reduce((acc: GroupedAttribute, bug) => {
    const category = bug.category;

    // Validate that the category property exists and is a string
    if (typeof category !== "string") {
      throw new Error(
        "Each bug should have a category property of type string"
      );
    }

    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(categoryCounts).map((category) => ({
    category: category,
    count: categoryCounts[category],
  }));
}
