import React from "react";
import { Grid } from "@material-ui/core";
import { Header, FeaturedPost } from "../../components";

const mainFeaturedPost = {
  title: "Empresa sin nombre",
  description: "Eslógan de la empresa ",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
};

const featuredPosts = [
  {
    title: "Nueva función",
    date: "Nov 12",
    description:
      "Con las plantillas puedes crear una factura automáticamente, desde Crear factura y activando la opción de Guardar como plantilla.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
  {
    title: "Consejo",
    date: "Nov 11",
    description:
      "Si requieres enviar una factura a tu cliente o proveedor, puedes hacerlo desde Listado de documentos.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
];

const Home = () => {
  return (
    <React.Fragment>
      <Header post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default Home;
