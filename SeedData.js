//1 USER
//5 PRODUCTS
//5 CUSTOMERS
//2 CASES, 1 EACH FOR CUSTOMER 1 AND 2
//3 OPPORTUNITIES 1 FOR CUSTOMER 1, 2 FOR CUSTOMER 2

db = connect("URL");

db.User.deleteMany({});
db.Opportunity.deleteMany({});
db.Case.deleteMany({});
db.Contact.deleteMany({});
db.Product.deleteMany({});

var insertedUsers = db.User.insertMany(
  [
    {
      username: "Ashutosh",
      email: "ashutoshkapor1234@gmail.com",
      password: "pass",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  { writeConcern: { w: 1, j: true, wtimeout: 60000 }, ordered: false }
);

printjson(insertedUsers.insertedIds);

var insertedProducts = db.Product.insertMany(
  [
    {
      name: "GenWatt Diesel 1000kW",
      code: "GC1060",
      listPrice: NumberDecimal("100000"),
    },
    {
      name: "GenWatt Diesel 10kW",
      code: "GC1020",
      listPrice: NumberDecimal("5000"),
    },
    {
      name: "GenWatt Diesel 200kW",
      code: "GC1040",
      listPrice: NumberDecimal("25000"),
    },
    {
      name: "GenWatt Gasoline 300kW",
      code: "GC5020",
      listPrice: NumberDecimal("35000"),
    },
    {
      name: "GenWatt Gasoline 100kW",
      code: "GC3020",
      listPrice: NumberDecimal("15000"),
    },
  ],
  { writeConcern: { w: 1, j: true, wtimeout: 60000 }, ordered: false }
);

var insertedContacts = db.Contact.insertMany(
  [
    {
      name: "Jack Rogers",
      gender: "Male",
      title: "Mr",
      birthDate: new Date("Dec 26,1987"),
      department: "Electrical engineer",
      address: {
        street: "Cecil Street",
        city: "Sydney",
      },
      phone: "470000001",
      owner: insertedUsers.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Tim Barr",
      gender: "Male",
      title: "Mr",
      birthDate: new Date("Jan 26,1997"),
      department: "Software engineer",
      address: {
        street: "Market Street",
        city: "Sydney",
      },
      phone: "470000002",
      owner: insertedUsers.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ashley James",
      gender: "Female",
      title: "Mrs",
      birthDate: new Date("Feb 02,1987"),
      department: "Banker",
      address: {
        street: "George Street",
        city: "Melbourne",
      },
      phone: "470000003",
      owner: insertedUsers.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Edna Frank",
      gender: "Female",
      title: "Miss",
      birthDate: new Date("Jan 26,2001"),
      department: "Student",
      address: {
        street: "Kent Street",
        city: "Brisbane",
      },
      phone: "470000004",
      owner: insertedUsers.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Arthur Song",
      gender: "Male",
      title: "Mr",
      birthDate: new Date("Mar 24,1989"),
      department: "Doctor",
      address: {
        street: "Cecil Street",
        city: "Sydney",
      },
      phone: "470000005",
      owner: insertedUsers.insertedIds[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  { writeConcern: { w: 1, j: true, wtimeout: 60000 }, ordered: false }
);

var insertedCases = db.Case.insertMany(
  [
    {
      caseNumber: NumberInt(100),
      description: "Issue with GenWatt Diesel 1000kW",
      stage: "NEW",
      priority: "MEDIUM",
      owner: insertedUsers.insertedIds[0],
      customer: insertedContacts.insertedIds[0],
    },
    {
      caseNumber: NumberInt(101),
      description: "Issue with GenWatt Diesel 10kW",
      stage: "NEW",
      priority: "MEDIUM",
      owner: insertedUsers.insertedIds[0],
      customer: insertedContacts.insertedIds[1],
    },
  ],
  { writeConcern: { w: 1, j: true, wtimeout: 60000 }, ordered: false }
);

var insertedOpty = db.Opportunity.insertMany(
  [
    {
      name: "Buy Product",
      description: "Buy GenWatt Diesel 1000kW",
      stage: "CLOSED_WON",
      products: [insertedProducts.insertedIds[0]],
      closeDate: new Date("Mar 15, 2020"),
      owner: insertedUsers.insertedIds[0],
      customer: insertedContacts.insertedIds[0],
    },
    {
      name: "New Purchase",
      description: "Buy GenWatt Diesel 10kW",
      stage: "CLOSED_WON",
      products: [insertedProducts.insertedIds[1]],
      closeDate: new Date("Mar 15, 2020"),
      owner: insertedUsers.insertedIds[0],
      customer: insertedContacts.insertedIds[1],
    },
    {
      name: "Buy Product",
      description: "Buy GenWatt Diesel 200kW",
      stage: "APPLICATION",
      products: [insertedProducts.insertedIds[2]],
      closeDate: new Date("Mar 15, 2022"),
      owner: insertedUsers.insertedIds[0],
      customer: insertedContacts.insertedIds[1],
    },
  ],
  { writeConcern: { w: 1, j: true, wtimeout: 60000 }, ordered: false }
);

db.Contact.updateOne(
  { _id: insertedContacts.insertedIds[0] },
  {
    $set: {
      opportunities: [insertedOpty.insertedIds[0]],
      cases: [insertedCases.insertedIds[0]],
    },
  }
);

db.Contact.updateOne(
  { _id: insertedContacts.insertedIds[1] },
  {
    $set: {
      opportunities: [insertedOpty.insertedIds[1], insertedOpty.insertedIds[2]],
      cases: [insertedCases.insertedIds[1]],
    },
  }
);
