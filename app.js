const express = require("express");
const Joi = require("joi");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

/*********MIDDLEWARE**********/

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

/*********ROUTES**********/

const products = [
  {
    id: "1",
    name: "Nomad Sofa",
    price: 10.9,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/nomad-sofa.jpg",
    category: "sofa",
    brand: "Nomad",
    color: "grey",
    discount: 20,
  },
  {
    id: "2",
    name: "Range Sofa",
    price: 22.9,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: false,
    productImage: "uploads/range-sofa.jpg",
    category: "sofa",
    brand: "Alto",
    color: "green",
    discount: 20,
  },
  {
    id: "3",
    name: "Sleeper Sofa",
    price: 23.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/sleeper-sofa.jpg",
    category: "sofa",
    brand: "Nomad",
    color: "grey",
    discount: 20,
  },
  {
    id: "4",
    name: "Range Piece Sofa",
    price: 23.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/range-piece-sofa.jpg",
    category: "sofa",
    brand: "Chorus",
    color: "black",
    discount: 30,
  },
  {
    id: "5",
    name: "Piece Sofa",
    price: 23.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/piece-sofa.jpg",
    category: "sofa",
    brand: "Nomad",
    color: "grey",
    discount: 30,
  },
  {
    id: "6",
    name: "Velvet Sofa",
    price: 23.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/velvet-sofa.jpg",
    category: "sofa",
    brand: "Nomad",
    color: "green",
    discount: 30,
  },
  {
    id: "7",
    name: "Union Sofa",
    price: 23.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/union-sofa.jpg",
    category: "sofa",
    brand: "Chorus",
    color: "white",
    discount: 30,
  },
  {
    id: "8",
    name: "Alto Dining Table",
    price: 63.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/alto-dining-table.jpg",
    category: "table",
    brand: "Unionx",
    color: "white",
    discount: 10,
  },
  {
    id: "9",
    name: "Alto Table",
    price: 45.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/alto-table.jpg",
    category: "table",
    brand: "Alto",
    color: "brown",
    discount: 20,
  },
  {
    id: "10",
    name: "Haiku Table",
    price: 38.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/haiku-table.jpg",
    category: "table",
    brand: "Union",
    color: "brown",
    discount: 30,
  },
  {
    id: "11",
    name: "Serif Table",
    price: 74.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/serif-table.jpg",
    category: "table",
    brand: "Union",
    color: "green",
    discount: 20,
  },
  {
    id: "12",
    name: "Set Table",
    price: 42.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/set-table.jpg",
    category: "table",
    brand: "Alto",
    color: "grey",
    discount: 10,
  },
  {
    id: "13",
    name: "Chorus Bed",
    price: 32.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/chorus-bed.jpg",
    category: "bed",
    brand: "Union",
    color: "white",
    discount: 20,
  },
  {
    id: "14",
    name: "Chorus Bed",
    price: 56.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/chorus-bed-yellow.jpg",
    category: "bed",
    brand: "Nomad",
    color: "yellow",
    discount: 30,
  },
  {
    id: "15",
    name: "Chorus Bed",
    price: 46.0,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/chorus-bed-brown.jpg",
    category: "bed",
    brand: "Canon",
    color: "brown",
    discount: 40,
  },
  {
    id: "16",
    name: "Feature Rugs",
    price: 22.5,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/feature-rugs.jpg",
    category: "rugs",
    brand: "Union",
    color: "yellow",
    discount: 10,
  },
  {
    id: "17",
    name: "Grid Rugs",
    price: 28,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/grid-rugs.jpg",
    category: "rugs",
    brand: "Alto",
    color: "grey",
    discount: 20,
  },
  {
    id: "18",
    name: "Lines Rugs",
    price: 19,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/lines-rugs.jpg",
    category: "rugs",
    brand: "Canon",
    color: "blue",
    discount: 10,
  },
  {
    id: "19",
    name: "Banks Outdoor Chair",
    price: 64,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/banks-outdoor-chair.jpg",
    category: "chair",
    brand: "Union",
    color: "yellow",
    discount: 10,
  },
  {
    id: "20",
    name: "Chair",
    price: 55,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/chair-white.jpg",
    category: "chair",
    brand: "Nomad",
    color: "white",
    discount: 20,
  },
  {
    id: "21",
    name: "Relay Chair",
    price: 34,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/relay-chair.jpg",
    category: "chair",
    brand: "Alto",
    color: "grey",
    discount: 10,
  },
  {
    id: "22",
    name: "Canon Shelves",
    price: 100,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/canon-shelves.jpg",
    category: "shelves",
    brand: "Union",
    color: "brown",
    discount: 10,
  },
  {
    id: "23",
    name: "Canon Double Shelves",
    price: 180,
    details: "Product details: Lorem ipsum dolar sit amet",
    featured: true,
    productImage: "uploads/canon-double-shelves.jpg",
    category: "shelves",
    brand: "Nomad",
    color: "brown",
    discount: 30,
  },
];

/***********************************************************/
/********* GET: ALL PRODUCTS **********/
/***********************************************************/

app.get("/api/products", (req, res) => {
  res.send(products);
});

/***********************************************************/
/********* GET: SINGLE PRODUCT **********/
/***********************************************************/

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }
  res.send(product);
});

/***********************************************************/
/********* POST: ADD PRODUCT **********/
/***********************************************************/

app.post("/api/products", upload.single("productImage"), (req, res) => {
  //validate product
  const { error } = validateProduct({
    ...req.body,
    productImage: req.file?.path,
  });

  if (error) return res.status(400).send(error);

  const product = {
    id: uuidv4(),
    name: req.body.name,
    details: req.body.details,
    price: req.body.price,
    discount: req.body.discount || 0,
    featured: req.body.featured,
    productImage: req.file.path,
  };

  products.push(product);
  res.send(product);
});

/***********************************************************/
/********* PUT: UPDATE PRODUCT **********/
/***********************************************************/

app.put("/api/products/:id", upload.single("productImage"), (req, res) => {
  //Find product
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }

  const { error } = validateUpdateProduct({
    ...req.body,
  });

  if (error) return res.status(400).send(error);

  product.name = req.body.name;
  product.details = req.body.details;
  product.price = req.body.price;
  product.discount = req.body.discount;
  product.featured = req.body.featured;
  if (req.file) {
    product.productImage = req.file.path;
  }

  res.send(product);
});

/***********************************************************/
/********* DELETE: DELETE PRODUCT **********/
/***********************************************************/

app.delete("/api/products/:id", (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  if (!product) {
    return res.status(404).send("Product with given id was not found");
  }
  const index = products.indexOf(product);
  products.splice(index, 1);

  res.send(products);
});

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    details: Joi.string().min(3).max(200).required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    featured: Joi.boolean().required(),
    productImage: Joi.string().required(),
  });

  return schema.validate(product);
}

function validateUpdateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    details: Joi.string().min(3).max(200).required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
    featured: Joi.boolean().required(),
    productImage: Joi.string(),
  });

  return schema.validate(product);
}

/********* PORT **********/
//To set PORT run set/export PORT=YOUR_VALUE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
