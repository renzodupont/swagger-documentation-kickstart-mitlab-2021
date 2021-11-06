const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation.json");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let restaurants = [];
for (let i = 0; i < 10; i++) {
  restaurants.push({ id: i + 1, name: "Test Restaurant " + (i + 1) });
}

app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});

app.delete("/restaurant/:id", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === +req.params.id);
  if (restaurant) {
    restaurants = restaurants.filter((r) => r.id !== restaurant.id);
    res.send("OK");
  } else res.send("Not found");
});

app.post("/restaurant", (req, res) => {
  restaurants.push({ ...req.body });
  res.send("Restaurand added");
});

app.get("/", (req, res) => {
  res.send("Running");
});

/**
 * Listen to PORT 3000 and start the App
 */
app.listen(3000, () => {
  console.log("Running on 3000");
});
