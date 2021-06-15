db = connect("URL");

db.createCollection("User", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "username",
        "email",
        "password",
        "role",
        "createdAt",
        "updatedAt",
      ],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          //pattern: "S+@S+.S+",
          description: "must be a string, required and match the pattern",
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        role: {
          enum: ["USER", "ADMIN"],
          description: "required and from enum",
        },
        createdAt: {
          bsonType: "date",
          description: "must be a date and is required",
        },
        updatedAt: {
          bsonType: "date",
          description: "must be a date and is required",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

db.createCollection("Product", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "code", "listPrice"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        code: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        listPrice: {
          bsonType: "decimal",
          description: "amount 128bit precision",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

db.createCollection("Opportunity", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "stage", "products", "closeDate", "owner", "customer"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        description: {
          bsonType: "string",
          description: "must be a string",
        },
        stage: {
          enum: [
            "PROSPECTING",
            "APPLICATION",
            "CLOSED_WON",
            "CLOSED_LOST",
            "CENCEL",
          ],
          description: "must be from enum and is required",
        },
        products: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
            description: "reference to product",
          },
        },
        closeDate: {
          bsonType: "date",
          description: "Close date for opportunity, required",
        },
        owner: {
          bsonType: "objectId",
          description: "reference to user",
        },
        customer: {
          bsonType: "objectId",
          description: "reference to user",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

db.createCollection("Case", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "caseNumber",
        "description",
        "stage",
        "priority",
        "owner",
        "customer",
      ],
      properties: {
        caseNumber: {
          bsonType: "int",
          description: "must be a integer and is required",
        },
        description: {
          bsonType: "string",
          description: "must be a string",
        },
        stage: {
          enum: ["NEW", "WORKING", "ESCALATED"],
          description: "must be from enum and is required",
        },
        priority: {
          enum: ["HIGH", "MEDIUM", "LOW"],
          description: "Required, from enum",
        },
        owner: {
          bsonType: "objectId",
          description: "reference to user",
        },
        customer: {
          bsonType: "objectId",
          description: "reference to user",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

db.createCollection("Contact", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "gender",
        "name",
        "title",
        "address",
        "phone",
        "owner",
        "createdAt",
        "updatedAt",
      ],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        gender: {
          enum: ["Male", "Female"],
          description: "must be a string and in enum",
        },
        title: {
          enum: ["Mr", "Mrs", "Ms", "Miss"],
          description: "must be a string, and in enum",
        },
        birthdate: {
          bsonType: "date",
          description: "must be a date and is required",
        },
        department: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        address: {
          bsonType: "object",
          required: ["street", "city"],
          properties: {
            street: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            city: {
              bsonType: "string",
              description: "must be a string and is required",
            },
          },
          description: "address document is required",
        },
        phone: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        owner: {
          bsonType: "objectId",
          description: "references User schema",
        },

        cases: {
          bsonType: "array",
          description: "list of cases id",
          items: {
            bsonType: "objectId",
            description: "references cases",
          },
        },

        opportunities: {
          bsonType: "array",
          description: "list of opportunities id",
          items: {
            bsonType: "objectId",
            description: "references opportunity",
          },
        },

        attachments: {
          bsonType: "array",
          description: "list of attachment documents",
          items: {
            bsonType: "object",
            required: ["name", "path"],
            properties: {
              name: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              path: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
        },

        createdAt: {
          bsonType: "date",
          description: "must be a date and is required",
        },
        updatedAt: {
          bsonType: "date",
          description: "must be a date and is required",
        },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});
