db = connect("URL");

printjson(db.User.find().limit(2).pretty());
printjson(db.Product.find().limit(2).pretty());

printjson(
  db.Contact.aggregate([
    { $match: { name: "Tim Barr" } },
    {
      $lookup: {
        from: "Opportunity",
        localField: "opportunities",
        foreignField: "_id",
        as: "optyData",
      },
    },
    {
      $lookup: {
        from: "Case",
        localField: "cases",
        foreignField: "_id",
        as: "caseData",
      },
    },
  ]).pretty()
);
