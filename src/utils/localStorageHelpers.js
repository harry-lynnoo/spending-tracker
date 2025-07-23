export const saveData = (entries) => {
  localStorage.setItem("spendingEntries", JSON.stringify(entries));
};

export const loadData = () => {
  const raw = localStorage.getItem("spendingEntries");
  return raw ? JSON.parse(raw) : [];
};