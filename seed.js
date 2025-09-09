const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Food = require("./models/Food");

dotenv.config();

const dishes = [
  {
    title: 'Margherita Pizza',
    category: 'pizza',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    desc: 'Classic pizza with tomato, mozzarella, and basil.',
    rating: 3.9
  },
  {
    title: 'Cheeseburger',
    category: 'burger',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    desc: 'Juicy beef patty with cheddar, lettuce, and tomato.',
    rating: 2.7
  },
  {
    title: 'Chocolate Cake',
    category: 'dessert',
    img: '/images/image1.jpeg',  // ✅
    desc: 'Rich and moist chocolate cake with ganache.',
    rating: 4.9
  },
  {
    title: 'Pepperoni Pizza',
    category: 'pizza',
    img: '/images/image6.jpeg',  // ✅
    desc: 'Pepperoni, mozzarella, and tomato sauce.',
    rating: 4.6
  },
  {
    title: 'Veggie Burger',
    category: 'burger',
    img: '/images/image2.jpeg',  // ✅
    desc: 'Grilled veggie patty with fresh greens.',
    rating: 4.3
  },
  {
    title: 'Tiramisu',
    category: 'dessert',
    img: '/images/image9.jpg',  // ✅
    desc: 'Classic Italian dessert with coffee and mascarpone.',
    rating: 4.8
  },
  {
    title: 'BBQ Bacon Burger',
    category: 'burger',
    img: '/images/image3.jpeg',  // ✅
    desc: 'Smoky BBQ sauce, crispy bacon, cheddar, and onion rings.',
    rating: 4.5
  },
  {
    title: 'Spicy Jalapeño Burger',
    category: 'burger',
    img: '/images/image4.jpeg',  // ✅
    desc: 'Beef patty, jalapeños, pepper jack cheese, and spicy mayo.',
    rating: 4.2
  },
  {
    title: 'Mushroom Swiss Burger',
    category: 'burger',
    img: '/images/image5.jpeg',  // ✅
    desc: 'Sautéed mushrooms, Swiss cheese, and garlic aioli.',
    rating: 4.4
  },
  {
    title: 'Double Decker Burger',
    category: 'burger',
    img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80',
    desc: 'Two juicy beef patties, American cheese, lettuce, and tomato.',
    rating: 4.6
  },
  {
    title: 'Hawaiian Burger',
    category: 'burger',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'Grilled pineapple, teriyaki sauce, ham, and Swiss cheese.',
    rating: 4.1
  },
  {
    title: 'BBQ Chicken Pizza',
    category: 'pizza',
    img: '/images/image7.jpeg',  // ✅
    desc: 'Tangy BBQ sauce, grilled chicken, red onions, and cilantro.',
    rating: 4.5
  },
  {
    title: 'Four Cheese Pizza',
    category: 'pizza',
    img: '/images/image8.jpeg',  // ✅
    desc: 'A blend of mozzarella, cheddar, parmesan, and gorgonzola.',
    rating: 4.7
  },
  {
    title: 'Strawberry Cheesecake',
    category: 'dessert',
    img: '/images/image10.jpg',  // ✅
    desc: 'Creamy cheesecake topped with fresh strawberries and sauce.',
    rating: 4.6
  },
  {
    title: 'Classic Apple Pie',
    category: 'dessert',
    img: '/images/image11.jpg',  // ✅
    desc: 'Warm apple pie with a flaky crust and cinnamon.',
    rating: 4.5
  }
];


async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Food.deleteMany(); // clear old data
    await Food.insertMany(dishes);
    console.log("✅ Sample foods inserted");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedData();
