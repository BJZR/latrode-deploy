const gR = () => {
  if (!GO.includes(gen)) gen = "u";
  $("#gb").innerHTML = IC(GI[gen], 18) + "<span>" + GL[gen] + "</span>";
  $("#gb").title = "Para: " + GL[gen];
};
