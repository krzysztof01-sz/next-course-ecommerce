import { Main } from "../components/Main";
import { FullProduct } from "../components/Product";

const DATA = [
  {
    image: "https://picsum.photos/1200/700",
    title: "First photo",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
      magnam, eligendi, numquam aspernatur nostrum ducimus aliquam incidunt
      id doloribus fugiat iure consequatur eaque dolorum perferendis beatae
      ipsa laborum quibusdam accusantium! Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Soluta magnam, eligendi, numquam
      aspernatur nostrum ducimus aliquam incidunt id doloribus fugiat iure
      consequatur eaque dolorum perferendis beatae ipsa laborum quibusdam
      accusantium! Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Soluta magnam, eligendi, numquam aspernatur nostrum ducimus aliquam
      incidunt id doloribus fugiat iure consequatur eaque dolorum
      perferendis beatae ipsa laborum quibusdam accusantium!`,
    rating: 3.9,
  },
  {
    image: "https://picsum.photos/600/300",
    title: "Second photo",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta magnam, eligendi, numquam aspernatur nostrum ducimus aliquam incidunt id doloribus fugiat iure consequatur eaque dolorum perferendis beatae ipsa laborum quibusdam accusantium!`,
    rating: 4,
  },
];

const Home = () => {
  return (
    <Main>
      <ul className='grid md:grid-cols-2 gap-6'>
        {DATA.map((product) => {
          return (
            <FullProduct
              key={product.title}
              data={{ ...product, longDescription: undefined }}
            />
          );
        })}
      </ul>
    </Main>
  );
};

export default Home;
