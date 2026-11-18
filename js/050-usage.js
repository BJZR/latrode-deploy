const usage = async (repo) => {
  const h = (await api("/git/ref/heads/" + BR, {}, repo)).object.sha,
    b = (await api("/git/commits/" + h, {}, repo)).tree.sha;
  return (await api("/git/trees/" + b + "?recursive=1", {}, repo)).tree.reduce(
    (a, x) => a + (x.size || 0),
    0,
  );
};
