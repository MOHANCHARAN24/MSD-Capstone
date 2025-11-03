import React, { useEffect, useMemo, useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./home.css";

const SAMPLE_CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"]
const SAMPLE_ITEMS = [
  { id: 1, title: "Truffle Fries", cat: "Starters", price: 450, img: "https://images.unsplash.com/photo-1544025162-d76694265947" },
  { id: 2, title: "Caprese Salad", cat: "Starters", price: 350, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8" },
  { id: 3, title: "Panner Tikka", cat: "Starters", price: 220, img: "https://www.indianveggiedelight.com/wp-content/uploads/2021/08/air-fryer-paneer-tikka-featured.jpg" },
  { id: 4, title: "Chilli Chicken", cat: "Starters", price: 320, img: "https://i.pinimg.com/736x/c9/75/65/c975650c0d281ca915ebffd91578b26e.jpg" },
  { id: 5, title: "Gobi Manchuria", cat: "Starters", price: 120, img: "https://www.robinage.com/wp-content/uploads/2022/01/GOBI-MANCHURIAN.jpg" },
  { id: 6, title: "Chicken wings", cat: "Starters", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXqOcQCJoWlzKlaei-XXcrHzsy_uZNW6NgmA&s" },
  { id: 7, title: "Spring rolls", cat: "Starters", price: 120, img: "https://www.sushiya.in/cdn/shop/files/IMG_0853_6b04d8d6-13ca-43d9-aa97-79abf2bca9eb.jpg?v=1689759492&width=1946" },
  { id: 8, title: "Dragon chicken", cat: "Starters", price: 300, img: "https://c.ndtvimg.com/2022-06/5p5jfmj8_chicken_120x90_22_June_22.png" },
  { id: 9, title: "Mutton kebab", cat: "Starters", price: 320, img: "https://i.ytimg.com/vi/QRqno1pTpKk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC9lCJRpY9pe-E_GkMbRSsNMGGS7w" },
  { id: 10, title: "Ribeye Steak", cat: "Mains", price: 1150, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141" },
  { id: 11, title: "Margherita Pizza", cat: "Mains", price: 600, img: "https://www.foodandwine.com/thmb/7BpSJWDh1s-2M2ooRPHoy07apq4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.jpg" },
  { id: 12, title: "Chicken Biriyani", cat: "Mains", price: 150, img: "https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__1200_0_0_0_auto.jpg" },
  { id: 13, title: "Butter Chicken", cat: "Mains", price: 280, img:"https://images.immediate.co.uk/production/volatile/sites/30/2021/02/butter-chicken-ac2ff98.jpg?quality=90&resize=440,400" },
  { id: 14, title: "Paneer Butter Masala", cat: "Mains", price: 250, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg" },
  { id: 15, title: "Prawns biriyani", cat: "Mains", price: 180, img: "https://images.archanaskitchen.com/images/recipes/indian/main-course/indian-rice-recipes/biryani-recipes/Prawns_Biryani_e0669b2cbd.jpg" },
  { id: 16, title: "Vegetable Biryani", cat: "Mains", price: 200, img: "https://media.istockphoto.com/id/179085494/photo/indian-biryani.jpg?s=612x612&w=0&k=20&c=VJAUfiuavFYB7PXwisvUhLqWFJ20-9m087-czUJp9Fs=" },
  { id: 17, title: "Fish Tawa", cat: "Mains", price: 320, img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQ1YEnWUOdt128zUAKRAKHKoCLI3xGQbRwKaow4K9VwWta4tiFvXse_QAOdBV_8yw57lZzyKFLbKJ_MIM0M7sTUcMBmRSQyEzBg156-SZVNC2_rdQqmQ9Upsgr1V0I3s9PP4lTzBcyGd0/s1600/0000000000000000000000A+%25281%2529.jpg" },
  { id: 18, title: "Tandoori", cat: "Mains", price: 440, img: "https://blog.swiggy.com/wp-content/uploads/2024/10/Image1_-Tandoori-Chicken-1024x538.jpg" },
  { id: 19, title: "Tiramisu", cat: "Desserts", price: 325, img: "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2024/09/THUMB-VIDEO-2_rev1-56.jpeg" },
  { id: 20, title: "Crème Brûlée", cat: "Desserts", price: 350, img: "https://www.nestleprofessional.in/sites/default/files/2022-07/Vanilla-Creme-Brulee-420x330.webp" },
  { id: 21, title: "Choclate Lava", cat: "Desserts", price: 200, img: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes7.jpg" },
  { id: 22, title: "Semifreddo", cat: "Desserts", price: 400, img: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Semifreddo_nocciola.jpg" },
  { id: 23, title: "Sorbet", cat: "Desserts", price: 500, img: "https://www.allrecipes.com/thmb/UlTqqNxnFugjt0ARL9ec3mr8Rng=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/233892-watermelon-sorbet-VAT-001-4x3-a1fe23b276e4496aabc2e9a41897f829.jpg" },
  { id: 24, title: "Baked Alaska", cat: "Desserts", price: 600, img: "https://i0.wp.com/smittenkitchen.com/wp-content/uploads//2016/09/baked-alaska.jpg?fit=1200%2C800&ssl=1&w=640" },
  { id: 25, title: "Frozen Custartd", cat: "Desserts", price: 550, img: "https://images.immediate.co.uk/production/volatile/sites/30/2023/10/Frozen-custard-sundae-2528127.jpg?resize=768,713" },
  { id: 26, title: "Gelato", cat: "Desserts", price: 650, img: "https://www.biggerbolderbaking.com/wp-content/uploads/2020/07/The-Easiest-Homemade-Gelato-WS-Thumbnail.jpeg" },
  { id: 27, title: "Choclate Brownie", cat: "Desserts", price: 300, img: "https://i.ytimg.com/vi/qdxqip0Bgt8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCPjO2A80XRgLsPVseoe9Q8KzCccA" },
  { id: 28, title: "House Lemonade", cat: "Drinks", price: 175, img: "https://images.unsplash.com/photo-1497534446932-c925b458314e" },
  { id: 29, title: "Iced Latte", cat: "Drinks", price: 200, img: "https://myeverydaytable.com/wp-content/uploads/ICEDLATTE_0_4.jpg" },
  { id: 30, title: "Fruit coolers", cat: "Drinks", price: 200, img: "https://thumbs.dreamstime.com/b/fruit-infused-strawberry-mint-cooler-drink-served-glass-ice-fresh-strawberries-leaves-wooden-table-364548580.jpg" },
  { id: 31, title: "Blue curacco", cat: "Drinks", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3XJGePqF7sIjXG5rfjlzIt8m0MeTZDhQtCQ&s" },
  { id: 32, title: "Diabolo grenadine", cat: "Drinks", price: 200, img: "https://www.1001cocktails.com/wp-content/uploads/1001cocktails/2023/03/118429_origin-2048x1370.jpg" },
  { id: 33, title: "Strawberry Lemonade", cat: "Drinks", price: 280, img: "https://tastesbetterfromscratch.com/wp-content/uploads/2019/03/Strawberry-Lemonade-8.jpg" },
  { id: 34, title: "Fizzy berry Fusion", cat: "Drinks", price: 300, img: "https://heybairtender.s3.amazonaws.com/recipes/berry-fusion-fizz.png" },
  { id: 35, title: "coco-cola", cat: "Drinks", price: 100, img: "https://www.sugarandsoul.co/wp-content/uploads/2017/01/roy-rogers-mocktail-drink-recipe-1.jpg" },
  { id: 36, title: "pepsi", cat: "Drinks", price: 100, img: "https://www.pepsicopartners.com/medias/Article-Preview.jpg?context=bWFzdGVyfHJvb3R8MjA1MzY1fGltYWdlL2pwZWd8YURBM0wyZzVaQzh4TURBNE1qRTFORGd3TnpNeU5pOUJjblJwWTJ4bElGQnlaWFpwWlhjdWFuQm58NWFlOGI5YWFmNjY2OGViZGY2NmIwYmFiMzczMGZjNDdlODM5M2QyMmEwNDJiYjY3ZmVhOTkwNmY3NDRhYThkNA" },
];

const SAMPLE_SUITES = [
  { id: 1, name: "Executive Suite", price: 7500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", description: "Spacious suite with king bed and city view" },
  { id: 2, name: "Deluxe Room", price: 5500, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a", description: "Comfortable room with all modern amenities" },
  { id: 3, name: "Presidential Suite", price: 12500, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304", description: "Luxurious suite with separate living area and premium amenities" },
  { id: 4, name: "Garden View Room", price: 6000, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945", description: "Peaceful room overlooking our garden" },
];

const SAMPLE_EVENTS = [
  { 
    id: 1, 
    name: "Grand Ballroom", 
    price: 25000, 
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", 
    description: "Elegant space for up to 200 guests with full catering services",
    capacity: 200,
    type: "Wedding",
    amenities: ["Stage", "Dance Floor", "Sound System", "Projector"]
  },
  { 
    id: 2, 
    name: "Executive Conference Hall", 
    price: 15000, 
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2", 
    description: "Professional setting for corporate events and meetings",
    capacity: 80,
    type: "Corporate",
    amenities: ["Projector", "WiFi", "Whiteboards", "Catering"]
  },
  { 
    id: 3, 
    name: "Garden Pavilion", 
    price: 18000, 
    img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", 
    description: "Outdoor venue surrounded by nature, perfect for celebrations",
    capacity: 120,
    type: "Celebration",
    amenities: ["Outdoor Space", "Decoration", "Sound System", "Lighting"]
  },
  { 
    id: 4, 
    name: "Intimate Dining Room", 
    price: 10000, 
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0", 
    description: "Cozy private room for small gatherings and family events",
    capacity: 30,
    type: "Family",
    amenities: ["Private Chef", "Exclusive Menu", "Audio System"]
  }
];

const EVENT_TYPES = ["All", "Wedding", "Corporate", "Celebration", "Family"];
const LS_USERS = "tt_users_v1";
const LS_SESSION = "tt_session_v1";

const Auth = {
  signup({ name, email, password }) {
    const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    if (users.find((u) => u.email === email)) {
      return { ok: false, message: "Email already registered." };
    }
    users.push({ name, email, password });
    localStorage.setItem(LS_USERS, JSON.stringify(users));
    return { ok: true };
  },
  login(email, password) {
    const users = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) return { ok: false, message: "Invalid credentials." };
    localStorage.setItem(LS_SESSION, JSON.stringify({ email: match.email, name: match.name }));
    return { ok: true };
  },
  logout() {
    localStorage.removeItem(LS_SESSION);
  },
  me() {
    try {
      return JSON.parse(localStorage.getItem(LS_SESSION) || "null");
    } catch {
      return null;
    }
  },
};

const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function Navbar({ cartCount }) {
  const auth = useAuth();
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="brand" aria-label="Tasty Bite home">
          <h1>Tasty Bite</h1>
        </Link>
        <ul className="nav-links">
          <li><NavLink to="/"> Home</NavLink></li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/menu#order"> Order</NavLink></li>
          {auth.user ? (
            <>
              <li><NavLink to="/dashboard"> Dashboard</NavLink></li>
              <li><button className="btn" onClick={() => { Auth.logout(); auth.setUser(null); }}>🚪 Logout</button></li>
            </>
          ) : (
            <li><NavLink to="/login" className="cta">🔑 Login</NavLink></li>
          )}
          
          <li className="cart-link">
            <NavLink to="/cart" className="cta">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartCount}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
  <div className="container">
  <div>© {new Date().getFullYear()} Tasty Bite</div>
        <div style={{display:'flex', gap:12}}>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="X">X</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="inner">
          <h2>Welcome to Tasty Bite</h2>
          <p>Where fine dining meets cozy stays. Taste the craft, feel the comfort.</p>
          <div className="actions">
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/menu#order" className="btn btn-outline">Pre-order Now</Link>
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h3>Why Guests Love Us</h3>
          <p className="helper">Farm-to-table ingredients, seasonal menus, and suites designed for unwinding.</p>
          <div className="menu-grid" style={{marginTop:24}}>
            {["Seasonal Cuisine","Artisan Cocktails","Luxury Suites","Private Events"].map((t,i)=>(
              <div className="card" key={i}>
                <img alt="" src={
                  i===0? "https://images.unsplash.com/photo-1504674900247-0877df9cc836":
                  i===1? "https://images.unsplash.com/photo-1544145945-f90425340c7e":
                  i===2? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb":
                  "https://event360.co.in/wp-content/uploads/2017/02/IMG_5343.jpg"
                } style={{height: '320px', objectFit: 'cover'}}/>
                <div className="p">
                  <h4 style={{margin:'12px 0 16px', fontSize: '1.6rem'}}>{t}</h4>
                  <p className="helper" style={{fontSize: '1.2rem', lineHeight: '1.6'}}>Delightful experiences crafted by chefs and hospitality experts.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section" style={{backgroundColor: '#f9f9f9'}}>
        <div className="container">
          <h3>Our Luxury Suites</h3>
          <p className="helper">Experience comfort and luxury in our carefully designed accommodations.</p>
          <div className="menu-grid" style={{marginTop:24}}>
            {SAMPLE_SUITES.map(suite => (
              <div className="card" key={suite.id}>
                <img src={suite.img} alt={suite.name} style={{height: '320px', objectFit: 'cover'}} />
                <div className="p">
                  <h4 style={{margin:'12px 0 8px', fontSize: '1.6rem'}}>{suite.name}</h4>
                  <p className="helper" style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#e65c00'}}>₹{suite.price.toFixed(2)} per night</p>
                  <p className="helper" style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px'}}>{suite.description}</p>
                  <Link to="/menu" className="btn btn-primary" style={{marginTop:8, width:"100%", padding: '16px', fontSize: '1.3rem'}}>View Menu</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <h3>Private Events & Celebrations</h3>
          <p className="helper">Host your special moments in our elegant event spaces.</p>
          <div className="menu-grid" style={{marginTop:24}}>
            {SAMPLE_EVENTS.map(event => (
              <div className="card" key={event.id}>
                <img src={event.img} alt={event.name} style={{height: '320px', objectFit: 'cover'}} />
                <div className="p">
                  <h4 style={{margin:'12px 0 8px', fontSize: '1.6rem'}}>{event.name}</h4>
                  <p className="helper" style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#e65c00'}}>₹{event.price.toFixed(2)} starting price</p>
                  <p className="helper" style={{fontSize: '1.2rem', lineHeight: '1.6'}}>Capacity: {event.capacity} guests</p>
                  <p className="helper" style={{fontSize: '1.1rem', marginBottom: '20px'}}>{event.description}</p>
                  <Link to="/menu" className="btn btn-primary" style={{marginTop:8, width:"100%", padding: '16px', fontSize: '1.3rem'}}>View Menu</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Menu({ onAdd }) {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return SAMPLE_ITEMS.filter((it) =>
      (active === "All" || it.cat === active) &&
      (q.trim() === "" || it.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [active, q]);

  return (
    <section className="section" id="order">
      <div className="container">
        <h3>Chef's Menu</h3>
        <p className="helper">Filter by category or search your favorite dish.</p>

        <div style={{display:'flex', gap:16, alignItems:'center', marginTop:20, flexWrap:'wrap'}}>
          <input className="input" style={{flex:'1 1 300px', fontSize: '1.2rem', padding: '16px'}} placeholder="Search dishes..." value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="menu-filters" aria-label="menu categories" style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            {SAMPLE_CATEGORIES.map((c) => (
              <button key={c} className={"chip"+(active===c?" active":"")} onClick={()=>setActive(c)} style={{fontSize: '1.2rem', padding: '14px 24px'}}>{c}</button>
            ))}
          </div>
        </div>
        
        <div className="menu-grid" style={{marginTop:28}}>
          {filtered.map((it) => (
            <div className="card" key={it.id} role="article" aria-label={it.title}>
              <img src={it.img} alt={it.title} style={{height: '320px', objectFit: 'cover'}}/>
              <div className="p">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '16px'}}>
                  <h4 style={{margin:'8px 0', fontSize: '1.6rem', lineHeight: '1.3'}}>{it.title}</h4>
                  <div className="price" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#e65c00'}}>₹{it.price.toFixed(2)}</div>
                </div>
                <p className="helper" style={{fontSize: '1.3rem', marginBottom: '20px', padding: '8px 12px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>{it.cat}</p>
                <button className="btn btn-primary" style={{marginTop:12, width:"100%", padding: '18px', fontSize: '1.3rem'}} onClick={()=>onAdd(it)}>
                  🛒 Add to order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reserve() {
  const [selectedArea, setSelectedArea] = useState("A/C");
  const [selectedTable, setSelectedTable] = useState(null);
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    date: "", 
    time: "", 
    guests: 2, 
    notes: "",
    location: ""
  });
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [ok, setOk] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const getBookedTables = () => {
    try {
      const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
      const bookedTables = {};
      
      bookings.forEach(booking => {
        if (booking.table && booking.area && booking.date && booking.time) {
          const key = `${booking.area}-${booking.table}-${booking.date}-${booking.time}`;
          bookedTables[key] = {
            booked: true,
            by: booking.email || booking.name || 'Another customer',
            bookingId: booking.bookingId
          };
        }
      });
      
      return bookedTables;
    } catch (error) {
      console.error("Error reading bookings:", error);
      return {};
    }
  };

  const isTableBooked = (area, tableName, date, time) => {
    if (!date || !time) return false;
    
    const bookedTables = getBookedTables();
    const key = `${area}-${tableName}-${date}-${time}`;
    return bookedTables[key] ? true : false;
  };

  const getBookingDetails = (area, tableName, date, time) => {
    if (!date || !time) return null;
    
    const bookedTables = getBookedTables();
    const key = `${area}-${tableName}-${date}-${time}`;
    return bookedTables[key] || null;
  };

  const tableAreas = {
    "A/C": [
      { id: 1, name: "A1", available: true },
      { id: 2, name: "A2", available: true },
      { id: 3, name: "A3", available: true },
      { id: 4, name: "A4", available: true },
      { id: 5, name: "A5", available: true },
      { id: 6, name: "A6", available: true },
      { id: 7, name: "A7", available: true },
      { id: 8, name: "A8", available: true },
      { id: 9, name: "A9", available: true },
    ],
    "Non A/C": [
      { id: 10, name: "B1", available: true },
      { id: 11, name: "B2", available: true },
      { id: 12, name: "B3", available: true },
      { id: 13, name: "B4", available: true },
      { id: 14, name: "B5", available: true },
      { id: 15, name: "B6", available: true },
      { id: 16, name: "B7", available: true },
      { id: 17, name: "B8", available: true },
      { id: 18, name: "B9", available: true },
    ]
  };

  const getAvailableTables = () => {
    const updatedTables = {};
    
    Object.keys(tableAreas).forEach(area => {
      updatedTables[area] = tableAreas[area].map(table => {
        const isBooked = isTableBooked(area, table.name, form.date, form.time);
        const bookingDetails = isBooked ? getBookingDetails(area, table.name, form.date, form.time) : null;
        
        return {
          ...table,
          available: !isBooked,
          booked: isBooked,
          bookingDetails: bookingDetails
        };
      });
    });
    
    return updatedTables;
  };

  const availableTables = getAvailableTables();

  const availableCount = availableTables[selectedArea]?.filter(table => table.available).length || 0;
  const totalCount = availableTables[selectedArea]?.length || 0;
  const bookedCount = availableTables[selectedArea]?.filter(table => table.booked).length || 0;

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setOk("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
            setForm(prev => ({ ...prev, location: address }));
            setLocationLoading(false);
          })
          .catch(() => {
            setForm(prev => ({ ...prev, location: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}` }));
            setLocationLoading(false);
          });
      },
      (error) => {
        setLocationLoading(false);
        setOk("Unable to retrieve your location. Please enable location services.");
      }
    );
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const isNowBooked = isTableBooked(selectedArea, selectedTable.name, form.date, form.time);
      if (isNowBooked) {
        setSelectedTable(null);
        setOk("Previously selected table has been booked by another customer. Please select another table.");
      }
    }
  }, [form.date, form.time, selectedArea]);

  function handleTableSelect(table) {
    if (!form.date || !form.time) {
      setOk("Please select date and time first to check table availability.");
      return;
    }
    
    const isBooked = isTableBooked(selectedArea, table.name, form.date, form.time);
    if (isBooked) {
      const bookingDetails = getBookingDetails(selectedArea, table.name, form.date, form.time);
      setOk(`This table is already booked by ${bookingDetails?.by || 'another customer'}. Please select another table.`);
      return;
    }
    
    setSelectedTable(table);
    setOk(`Table ${table.name} selected! Complete your reservation below.`);
  }

  function addDishToReservation(dish) {
    setSelectedDishes(prev => {
      const existing = prev.find(d => d.id === dish.id);
      if (existing) {
        return prev.map(d => 
          d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  }

  function updateDishQuantity(id, quantity) {
    if (quantity === 0) {
      setSelectedDishes(prev => prev.filter(d => d.id !== id));
    } else {
      setSelectedDishes(prev => prev.map(d => 
        d.id === id ? { ...d, quantity } : d
      ));
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!selectedTable) {
      setOk("Please select a table first.");
      return;
    }
    if (!form.name || !form.email || !form.date || !form.time) {
      setOk("Please fill all required fields.");
      return;
    }
    
    const isBooked = isTableBooked(selectedArea, selectedTable.name, form.date, form.time);
    if (isBooked) {
      const bookingDetails = getBookingDetails(selectedArea, selectedTable.name, form.date, form.time);
      setOk(`Sorry, table ${selectedTable.name} was just booked by ${bookingDetails?.by || 'another customer'}. Please select another table.`);
      setSelectedTable(null);
      return;
    }
    
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    const newBooking = { 
      ...form, 
      table: selectedTable.name,
      area: selectedArea,
      dishes: selectedDishes,
      total: selectedDishes.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0),
      createdAt: Date.now(),
      bookingId: `BK${Date.now()}`,
      paid: false,
      status: 'confirmed'
    };
    
    bookings.push(newBooking);
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    
    setOk(`Table ${selectedTable.name} in ${selectedArea} area reserved successfully for ${form.date} at ${form.time}!`);
    
    setForm({ name: "", email: "", date: "", time: "", guests: 2, notes: "", location: "" });
    setSelectedDishes([]);
    setSelectedTable(null);
    
    setTimeout(() => setOk(""), 5000);
  }

  const dishesTotal = selectedDishes.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0);

  return (
    <section className="section">
      <div className="container">
        <h3>Book a Table</h3>
        <p className="helper">Select your preferred table and complete your reservation. Booked tables are unavailable for others.</p>
        
        {ok && (
          <div className={ok.includes("successfully") ? "success" : "error"} style={{margin:"16px 0", fontSize: '1.3rem', padding: '20px'}}>
            {ok}
          </div>
        )}
        
        <div className="card" style={{padding: '32px', marginBottom: '32px'}}>
          <h4 style={{marginBottom: '28px', fontSize: '1.8rem'}}>Reservation Details</h4>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid2" style={{gap: '20px'}}>
              <input 
                className="input" 
                placeholder="Full name *" 
                value={form.name} 
                onChange={(e)=>setForm({...form, name:e.target.value})} 
                required
                style={{fontSize: '1.3rem', padding: '18px'}}
              />
              <input 
                className="input" 
                placeholder="Email *" 
                type="email" 
                value={form.email} 
                onChange={(e)=>setForm({...form, email:e.target.value})} 
                required
                style={{fontSize: '1.3rem', padding: '18px'}}
              />
            </div>
            
            <div className="grid2" style={{gap: '20px', marginTop: '20px'}}>
              <input 
                className="input" 
                placeholder="Date *" 
                type="date" 
                value={form.date} 
                onChange={(e)=>setForm({...form, date:e.target.value})} 
                min={new Date().toISOString().split('T')[0]}
                required
                style={{
                  fontSize: '1.3rem', 
                  padding: '18px',
                  height: '60px',
                  minHeight: '60px'
                }}
              />
              <input 
                className="input" 
                placeholder="Time *" 
                type="time" 
                value={form.time} 
                onChange={(e)=>setForm({...form, time:e.target.value})} 
                required
                style={{
                  fontSize: '1.3rem', 
                  padding: '18px',
                  height: '60px',
                  minHeight: '60px'
                }}
              />
            </div>
            
            <select 
              className="select" 
              value={form.guests} 
              onChange={(e)=>setForm({...form, guests:Number(e.target.value)})}
              style={{fontSize: '1.3rem', padding: '18px', marginTop: '20px'}}
            >
              {[...Array(10)].map((_,i)=>
                <option key={i+1} value={i+1}>
                  {i+1} guest{i !== 0 ? "s" : ""}
                </option>
              )}
            </select>

            <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginTop: '20px'}}>
              <input 
                className="input" 
                placeholder="Your location" 
                value={form.location} 
                onChange={(e)=>setForm({...form, location:e.target.value})} 
                disabled
                style={{flex: 1, fontSize: '1.3rem', padding: '18px'}}
              />
              <button 
                type="button" 
                className="btn" 
                onClick={getLiveLocation}
                disabled={locationLoading}
                title="Get current location"
                style={{fontSize: '1.5rem', padding: '18px 24px'}}
              >
                {locationLoading ? '⏳' : '📍'}
              </button>
            </div>
          </form>
        </div>

        {form.date && form.time ? (
          <div className="card" style={{padding: '32px', marginBottom: '32px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px'}}>
              <h4 style={{fontSize: '1.8rem'}}>Select Table for {form.date} at {form.time}</h4>
              <div className="helper" style={{fontSize: '1.3rem'}}>
                {availableCount} available • {bookedCount} booked • {totalCount} total
              </div>
            </div>
            
            <div className="menu-filters" style={{marginBottom: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
              {Object.keys(availableTables).map(area => (
                <button 
                  key={area}
                  className={`chip ${selectedArea === area ? "active" : ""}`}
                  onClick={() => {
                    setSelectedArea(area);
                    setSelectedTable(null);
                  }}
                  style={{fontSize: '1.3rem', padding: '16px 28px'}}
                >
                  {area} ({availableTables[area].filter(t => t.available).length} available)
                </button>
              ))}
            </div>

            <h5 style={{marginBottom: '28px', fontSize: '1.5rem'}}>
              {selectedArea} Tables
              {selectedTable && (
                <span style={{marginLeft: '20px', color: '#28a745', fontSize: '1.4rem'}}>
                  Selected: {selectedTable.name}
                </span>
              )}
            </h5>
            
            <div className="table-grid" style={{gap: '20px'}}>
              {availableTables[selectedArea].map(table => (
                <div 
                  key={table.id}
                  className={`table-card ${selectedTable?.id === table.id ? "selected" : ""} ${
                    table.booked ? "unavailable" : ""
                  }`}
                  onClick={() => !table.booked && handleTableSelect(table)}
                  title={table.booked ? `Booked by ${table.bookingDetails?.by || 'another customer'}` : `Available - ${table.name}`}
                  style={{padding: '24px', minHeight: '140px'}}
                >
                  <div className="table-number" style={{fontSize: '1.6rem', marginBottom: '12px'}}>{table.name}</div>
                  <div className={`table-status ${
                    table.booked ? "status-booked" : 
                    selectedTable?.id === table.id ? "status-selected" : "status-available"
                  }`} style={{fontSize: '1.2rem', padding: '10px 16px'}}>
                    {table.booked ? "Booked" : 
                     selectedTable?.id === table.id ? "Selected" : "Available"}
                  </div>
                  {table.booked && table.bookingDetails && (
                    <div className="table-booked-by" style={{
                      fontSize: '1rem',
                      marginTop: '12px',
                      color: '#666',
                      fontStyle: 'italic'
                    }}>
                      by {table.bookingDetails.by}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{display: 'flex', gap: '28px', marginTop: '28px', fontSize: '1.2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '20px', height: '20px', background: '#28a745', borderRadius: '6px'}}></div>
                <span>Available</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '20px', height: '20px', background: '#007bff', borderRadius: '6px'}}></div>
                <span>Selected</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '20px', height: '20px', background: '#dc3545', borderRadius: '6px'}}></div>
                <span>Booked</span>
              </div>
            </div>

            {/* Important Notice */}
            <div style={{
              marginTop: '28px',
              padding: '20px',
              background: '#e7f3ff',
              border: '1px solid #b3d9ff',
              borderRadius: '16px',
              fontSize: '1.3rem'
            }}>
              <strong>💡 Important:</strong> Once a table is booked for a specific date and time, 
              it becomes unavailable for all other customers. Booked tables cannot be double-booked.
            </div>
          </div>
        ) : (
          <div className="card" style={{padding: '32px', textAlign: 'center', backgroundColor: '#f8f9fa'}}>
            <p className="helper" style={{fontSize: '1.3rem'}}>Please select date and time above to see available tables.</p>
          </div>
        )}

        {selectedTable && (
          <div className="card" style={{padding: '32px', marginBottom: '32px'}}>
            <h4 style={{marginBottom: '28px', fontSize: '1.8rem'}}>
              Complete Reservation for Table {selectedTable.name}
            </h4>
         
            <div style={{margin: '28px 0'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <h5 style={{fontSize: '1.5rem'}}>Pre-order Dishes (Optional)</h5>
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={() => setShowMenu(!showMenu)}
                  style={{fontSize: '1.3rem', padding: '16px 28px'}}
                >
                  {showMenu ? '📋 Hide Menu' : '📋 Browse Menu'}
                </button>
              </div>

              {showMenu && (
                <div className="menu-grid" style={{marginTop: '24px', marginBottom: '32px'}}>
                  {SAMPLE_ITEMS.map((dish) => (
                    <div className="card" key={dish.id}>
                      <img src={dish.img} alt={dish.title} style={{height: '240px', objectFit: 'cover'}} />
                      <div className="p">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <h6 style={{margin: '8px 0', fontSize: '1.4rem'}}>{dish.title}</h6>
                          <div className="price" style={{fontSize: '1.4rem'}}>₹{dish.price.toFixed(2)}</div>
                        </div>
                        <p className="helper" style={{fontSize: '1.2rem'}}>{dish.cat}</p>
                        <button 
                          type="button" 
                          className="btn btn-primary" 
                          style={{width: '100%', padding: '16px', fontSize: '1.3rem'}}
                          onClick={() => addDishToReservation(dish)}
                        >
                          🛒 Add to Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedDishes.length > 0 && (
                <div className="card" style={{padding: '28px', marginTop: '24px'}}>
                  <h6 style={{margin: '0 0 24px 0', fontSize: '1.5rem'}}>Selected Dishes</h6>
                  {selectedDishes.map(dish => (
                    <div key={dish.id} style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '16px 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: 'bold', fontSize: '1.3rem'}}>{dish.title}</div>
                        <div className="helper" style={{fontSize: '1.2rem'}}>₹{dish.price.toFixed(2)} each</div>
                      </div>
                      
                      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <button 
                          type="button" 
                          className="btn" 
                          style={{padding: '12px 16px', fontSize: '1.4rem'}}
                          onClick={() => updateDishQuantity(dish.id, dish.quantity - 1)}
                        >
                          -
                        </button>
                        <span style={{minWidth: '50px', textAlign: 'center', fontSize: '1.4rem', fontWeight: 'bold'}}>
                          {dish.quantity}
                        </span>
                        <button 
                          type="button" 
                          className="btn" 
                          style={{padding: '12px 16px', fontSize: '1.4rem'}}
                          onClick={() => updateDishQuantity(dish.id, dish.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div style={{minWidth: '120px', textAlign: 'right', fontWeight: 'bold', fontSize: '1.4rem'}}>
                        ₹{(dish.price * dish.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  {selectedDishes.length > 0 && (
                    <div style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '24px',
                      paddingTop: '24px',
                      borderTop: '2px solid #eee',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}>
                      <span>Dishes Total:</span>
                      <span>₹{dishesTotal.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <textarea 
              className="textarea" 
              rows="4" 
              placeholder="Special requests or notes (optional)" 
              value={form.notes} 
              onChange={(e)=>setForm({...form, notes:e.target.value})}
              style={{fontSize: '1.3rem', padding: '18px'}}
            ></textarea>
            
            <button className="btn btn-primary" type="button" onClick={submit} style={{fontSize: '1.4rem', padding: '20px', marginTop: '24px'}}>
              ✅ Confirm Reservation for Table {selectedTable.name}
            </button>

            <div style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '12px',
              fontSize: '1.2rem',
              textAlign: 'center'
            }}>
              🔒 This table will be exclusively reserved for you and unavailable to others
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Suites() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    checkIn: "", 
    checkOut: "", 
    suite: "", 
    guests: 1, 
    notes: "",
    location: ""
  });
  const [ok, setOk] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setOk("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
            setForm(prev => ({ ...prev, location: address }));
            setLocationLoading(false);
          })
          .catch(() => {
            setForm(prev => ({ ...prev, location: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}` }));
            setLocationLoading(false);
          });
      },
      (error) => {
        setLocationLoading(false);
        setOk("Unable to retrieve your location. Please enable location services.");
      }
    );
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.checkIn || !form.checkOut || !form.suite) {
      setOk("Please fill all required fields.");
      return;
    }
    
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    const selectedSuite = SAMPLE_SUITES.find(s => s.id === parseInt(form.suite));
    
    bookings.push({ 
      ...form, 
      type: "suite",
      suiteName: selectedSuite?.name || "",
      suitePrice: selectedSuite?.price || 0,
      createdAt: Date.now() 
    });
    
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    setOk("Suite reservation confirmed! We'll email you shortly.");
    setForm({ name: "", email: "", checkIn: "", checkOut: "", suite: "", guests: 1, notes: "", location: "" });
    setTimeout(()=>setOk(""), 5000);
  }

  const nights = form.checkIn && form.checkOut ? 
    Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)) : 0;
  
  const selectedSuite = SAMPLE_SUITES.find(s => s.id === parseInt(form.suite));
  const totalPrice = selectedSuite ? selectedSuite.price * nights : 0;

  return (
    <section className="section">
      <div className="container">
        <h3>Book a Suite</h3>
        <p className="helper">Reserve your stay in our luxurious accommodations.</p>
        
        <div className="menu-grid" style={{marginBottom: '32px'}}>
          {SAMPLE_SUITES.map(suite => (
            <div className="card" key={suite.id}>
              <img src={suite.img} alt={suite.name} style={{height: '320px', objectFit: 'cover'}} />
              <div className="p">
                <h4 style={{margin:'12px 0 8px', fontSize: '1.6rem'}}>{suite.name}</h4>
                <p className="helper" style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#e65c00'}}>₹{suite.price.toFixed(2)} per night</p>
                <p className="helper" style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px'}}>{suite.description}</p>
              </div>
            </div>
          ))}
        </div>

        {ok && <div className="success" style={{margin:"16px 0", fontSize: '1.3rem', padding: '20px'}}>{ok}</div>}
        <form className="form" onSubmit={submit} noValidate style={{gap: '20px'}}>
          <div className="grid2" style={{gap: '20px'}}>
            <input className="input" placeholder="Full name *" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}} />
            <input className="input" placeholder="Email *" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}} />
          </div>
          
          <div className="grid2" style={{gap: '20px'}}>
            <input 
              className="input" 
              placeholder="Check-in Date *" 
              type="date" 
              value={form.checkIn} 
              onChange={(e)=>setForm({...form, checkIn:e.target.value})} 
              style={{
                fontSize: '1.3rem', 
                padding: '18px',
                height: '60px',
                minHeight: '60px'
              }} 
            />
            <input 
              className="input" 
              placeholder="Check-out Date *" 
              type="date" 
              value={form.checkOut} 
              onChange={(e)=>setForm({...form, checkOut:e.target.value})} 
              style={{
                fontSize: '1.3rem', 
                padding: '18px',
                height: '60px',
                minHeight: '60px'
              }} 
            />
          </div>
          
          <select className="select" value={form.suite} onChange={(e)=>setForm({...form, suite:e.target.value})} required style={{fontSize: '1.3rem', padding: '18px'}}>
            <option value="">Select a Suite *</option>
            {SAMPLE_SUITES.map(suite => (
              <option key={suite.id} value={suite.id}>{suite.name} - ₹{suite.price.toFixed(2)}/night</option>
            ))}
          </select>
          
          <select className="select" value={form.guests} onChange={(e)=>setForm({...form, guests:Number(e.target.value)})} style={{fontSize: '1.3rem', padding: '18px'}}>
            {[...Array(4)].map((_,i)=><option key={i+1} value={i+1}>{i+1} guest{i? "s":""}</option>)}
          </select>
          
          <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
            <input 
              className="input" 
              placeholder="Your location" 
              value={form.location} 
              onChange={(e)=>setForm({...form, location:e.target.value})} 
              disabled
              style={{flex: 1, fontSize: '1.3rem', padding: '18px'}}
            />
            <button 
              type="button" 
              className="btn" 
              onClick={getLiveLocation}
              disabled={locationLoading}
              style={{fontSize: '1.5rem', padding: '18px 24px'}}
            >
              {locationLoading ? '⏳' : '📍'}
            </button>
          </div>
          
          <textarea className="textarea" rows="4" placeholder="Special requests (optional)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}></textarea>
          
          {nights > 0 && selectedSuite && (
            <div style={{padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '16px', marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', marginBottom: '12px'}}>
                <span>Nights:</span>
                <span>{nights}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', marginBottom: '12px'}}>
                <span>Price per night:</span>
                <span>₹{selectedSuite.price.toFixed(2)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '16px', fontSize: '1.5rem', paddingTop: '16px', borderTop: '2px solid #ddd'}}>
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          <button className="btn btn-primary" type="submit" style={{fontSize: '1.4rem', padding: '20px'}}>✅ Confirm Reservation</button>
        </form>
      </div>
    </section>
  );
}

function Events() {
  const [active, setActive] = useState("All");
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    eventDate: "", 
    eventType: "", 
    guests: 50, 
    venue: "", 
    notes: "",
    location: ""
  });
  const [ok, setOk] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setOk("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
            setForm(prev => ({ ...prev, location: address }));
            setLocationLoading(false);
          })
          .catch(() => {
            setForm(prev => ({ ...prev, location: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}` }));
            setLocationLoading(false);
          });
      },
      (error) => {
        setLocationLoading(false);
        setOk("Unable to retrieve your location. Please enable location services.");
      }
    );
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  const filtered = useMemo(() => {
    return SAMPLE_EVENTS.filter((ev) =>
      (active === "All" || ev.type === active)
    );
  }, [active]);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventDate || !form.venue) {
      setOk("Please fill all required fields.");
      return;
    }
    
    const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]");
    const selectedEvent = SAMPLE_EVENTS.find(ev => ev.id === parseInt(form.venue));
    
    bookings.push({ 
      ...form, 
      type: "event",
      eventName: selectedEvent?.name || "",
      eventPrice: selectedEvent?.price || 0,
      createdAt: Date.now() 
    });
    
    localStorage.setItem("tt_bookings", JSON.stringify(bookings));
    setOk("Event inquiry submitted! We'll contact you shortly to finalize details.");
    setForm({ name: "", email: "", eventDate: "", eventType: "", guests: 50, venue: "", notes: "", location: "" });
    setTimeout(()=>setOk(""), 5000);
  }

  return (
    <section className="section">
      <div className="container">
        <h3>Private Events & Celebrations</h3>
        <p className="helper">Host your special moments in our elegant event spaces.</p>

        <div style={{marginBottom: '32px'}}>
          <h4>Our Event Spaces</h4>
          <div className="menu-filters" aria-label="event types" style={{marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
            {EVENT_TYPES.map((type) => (
              <button key={type} className={"chip"+(active===type?" active":"")} onClick={()=>setActive(type)} style={{fontSize: '1.3rem', padding: '16px 28px'}}>{type}</button>
            ))}
          </div>
          
          <div className="menu-grid" style={{marginTop: '28px'}}>
            {filtered.map(event => (
              <div className="card" key={event.id}>
                <img src={event.img} alt={event.name} style={{height: '320px', objectFit: 'cover'}} />
                <div className="p">
                  <h4 style={{margin:'12px 0 8px', fontSize: '1.6rem'}}>{event.name}</h4>
                  <p className="helper" style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#e65c00'}}>₹{event.price.toFixed(2)} starting price</p>
                  <p className="helper" style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '16px'}}>{event.description}</p>
                  <div style={{marginTop: '16px'}}>
                    <p className="helper" style={{margin: '8px 0', fontSize: '1.2rem'}}><strong>Capacity:</strong> {event.capacity} guests</p>
                    <p className="helper" style={{margin: '8px 0', fontSize: '1.2rem'}}><strong>Type:</strong> {event.type}</p>
                    <div style={{marginTop: '16px'}}>
                      <strong style={{fontSize: '1.3rem'}}>Amenities:</strong>
                      <ul style={{paddingLeft: '24px', margin: '12px 0'}}>
                        {event.amenities.map((amenity, i) => (
                          <li key={i} className="helper" style={{fontSize: '1.2rem', marginBottom: '8px'}}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {ok && <div className="success" style={{margin:"16px 0", fontSize: '1.3rem', padding: '20px'}}>{ok}</div>}
        <div className="card" style={{padding: '32px'}}>
          <h4 style={{fontSize: '1.8rem'}}>Inquire About Event Booking</h4>
          <p className="helper" style={{fontSize: '1.3rem'}}>Provide details about your event and we'll contact you to discuss options.</p>
          
          <form className="form" onSubmit={submit} noValidate style={{gap: '20px'}}>
            <div className="grid2" style={{gap: '20px'}}>
              <input className="input" placeholder="Full name *" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}} />
              <input className="input" placeholder="Email *" type="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}} />
            </div>
            
            <div className="grid2" style={{gap: '20px'}}>
              <input 
                className="input" 
                placeholder="Event Date *" 
                type="date" 
                value={form.eventDate} 
                onChange={(e)=>setForm({...form, eventDate:e.target.value})} 
                style={{
                  fontSize: '1.3rem', 
                  padding: '18px',
                  height: '60px',
                  minHeight: '60px'
                }} 
              />
              <select className="select" value={form.eventType} onChange={(e)=>setForm({...form, eventType:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}>
                <option value="">Event Type</option>
                {EVENT_TYPES.filter(type => type !== "All").map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="grid2" style={{gap: '20px'}}>
              <select className="select" value={form.venue} onChange={(e)=>setForm({...form, venue:e.target.value})} required style={{fontSize: '1.3rem', padding: '18px'}}>
                <option value="">Select a Venue *</option>
                {SAMPLE_EVENTS.map(event => (
                  <option key={event.id} value={event.id}>{event.name} - up to {event.capacity} guests</option>
                ))}
              </select>
              <select className="select" value={form.guests} onChange={(e)=>setForm({...form, guests:Number(e.target.value)})} style={{fontSize: '1.3rem', padding: '18px'}}>
                <option value="">Expected Guests</option>
                {[...Array(20)].map((_,i)=><option key={(i+1)*10} value={(i+1)*10}>{(i+1)*10} guests</option>)}
              </select>
            </div>
            
            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
              <input 
                className="input" 
                placeholder="Your location" 
                value={form.location} 
                onChange={(e)=>setForm({...form, location:e.target.value})} 
                disabled
                style={{flex: 1, fontSize: '1.3rem', padding: '18px'}}
              />
              <button 
                type="button" 
                className="btn" 
                onClick={getLiveLocation}
                disabled={locationLoading}
                style={{fontSize: '1.5rem', padding: '18px 24px'}}
              >
                {locationLoading ? '⏳' : '📍'}
              </button>
            </div>
            
            <textarea className="textarea" rows="4" placeholder="Tell us about your event (theme, special requirements, etc.)" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}></textarea>
            
            <button className="btn btn-primary" type="submit" style={{fontSize: '1.4rem', padding: '20px'}}>📧 Submit Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Cart({ cart, onUpdate, onClear }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((s, it) => s + it.price * it.qty, 0);

  function checkout() {
    const orders = JSON.parse(localStorage.getItem("tt_orders") || "[]");
    const session = Auth.me();
    orders.push({ id: Date.now(), items: cart, total: subtotal, email: session?.email || "guest", createdAt: Date.now() });
    localStorage.setItem("tt_orders", JSON.stringify(orders));
    onClear();
    navigate("/dashboard");
    alert("Order placed! Check Dashboard for details.");
  }

  if (cart.length === 0) return (
    <section className="section">
      <div className="container">
        <h3>Your cart is empty</h3>
        <p className="helper">Browse the menu and add tasty items.</p>
        <Link to="/menu" className="btn btn-primary">Explore menu</Link>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="container">
        <h3>Your Order</h3>
        <div style={{display:'grid', gap:20}}>
          {cart.map(it => (
            <div key={it.id} className="card" style={{display:'flex', alignItems:'center', gap:20, padding: '24px'}}>
              <img src={it.img} alt={it.title} style={{width:140, height:100, objectFit:'cover', borderRadius: '12px'}}/>
              <div style={{flex:1}}>
                <strong style={{fontSize: '1.4rem'}}>{it.title}</strong>
                <div className="helper" style={{fontSize: '1.3rem'}}>₹{it.price.toFixed(2)} x {it.qty}</div>
              </div>
              <div style={{display:'flex', gap:12, alignItems: 'center'}}>
                <button className="btn" onClick={()=>onUpdate(it.id, Math.max(1, it.qty - 1))} style={{fontSize: '1.4rem', padding: '12px 16px'}}>-</button>
                <span style={{fontSize: '1.4rem', fontWeight: 'bold', minWidth: '40px', textAlign: 'center'}}>{it.qty}</span>
                <button className="btn" onClick={()=>onUpdate(it.id, it.qty + 1)} style={{fontSize: '1.4rem', padding: '12px 16px'}}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:32, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="helper" style={{fontSize: '1.3rem'}}>Subtotal</div>
            <h3 style={{fontSize: '2rem'}}>₹{subtotal.toFixed(2)}</h3>
          </div>
          <div style={{display:'flex', gap:16}}>
            <button className="btn" onClick={onClear} style={{fontSize: '1.3rem', padding: '16px 24px'}}>🗑️ Clear</button>
            <button className="btn btn-primary" onClick={checkout} style={{fontSize: '1.4rem', padding: '16px 32px'}}>💳 Checkout</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthBackground() {
  return (
    <div className="auth-background">
      <div className="background-overlay"></div>
    </div>
  );
}

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  function submit(e) {
    e.preventDefault();
    const res = Auth.login(email, password);
    if (!res.ok) {
      setErr(res.message);
      return;
    }
    auth.setUser(Auth.me());
    navigate(from, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="background-overlay"></div>
      </div>
      
      <section className="section">
        <div className="container">
          <div className="card auth-card" style={{padding:40, position: 'relative', zIndex: 2}}>
            <h3 style={{fontSize: '2.2rem'}}>Login</h3>
            <p className="helper" style={{fontSize: '1.4rem'}}>Welcome back! Please sign in to continue.</p>
            {err && <div className="error" style={{marginTop:16, fontSize: '1.3rem', padding: '16px'}}>{err}</div>}
            <form className="form" onSubmit={submit} style={{gap: '20px'}}>
              <input className="input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{fontSize: '1.3rem', padding: '18px'}} />
              <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{fontSize: '1.3rem', padding: '18px'}} />
              <button className="btn cta" type="submit" style={{fontSize: '1.4rem', padding: '20px'}}>🔑 Sign in</button>
            </form>
            <p className="helper" style={{marginTop:20, fontSize: '1.3rem'}}>No account? <Link to="/signup">Signup</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Signup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.email || !form.password) { setErr("All fields required."); return; }
    if (form.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm) { setErr("Passwords do not match."); return; }
    const res = Auth.signup({ name: form.name, email: form.email, password: form.password });
    if (!res.ok) { setErr(res.message); return; }
    alert("Account created. Please login.");
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <AuthBackground />
      <section className="section">
        <div className="container">
          <div className="card auth-card" style={{padding:40, position: 'relative', zIndex: 2}}>
            <h3 style={{fontSize: '2.2rem'}}>Create account</h3>
            <p className="helper" style={{fontSize: '1.4rem'}}>Join our restaurant for perks & updates.</p>
            {err && <div className="error" style={{marginTop:16, fontSize: '1.3rem', padding: '16px'}}>{err}</div>}
            <form className="form" onSubmit={submit} style={{gap: '20px'}}>
              <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}/>
              <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}/>
              <input className="input" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}/>
              <input className="input" placeholder="Confirm password" type="password" value={form.confirm} onChange={e=>setForm({...form, confirm:e.target.value})} style={{fontSize: '1.3rem', padding: '18px'}}/>
              <button className="btn cta" type="submit" style={{fontSize: '1.4rem', padding: '20px'}}>👤 Create account</button>
            </form>
            <p className="helper" style={{marginTop:20, fontSize: '1.3rem'}}>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Dashboard() {
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = Auth.me();
    if (!u) { navigate("/login"); return; }
    setMe(u);
  }, [navigate]);

  if (!me) return null;

  const orders = JSON.parse(localStorage.getItem("tt_orders") || "[]")
    .filter(o => o.email === me.email)
    .sort((a,b) => b.createdAt - a.createdAt);

  const bookings = JSON.parse(localStorage.getItem("tt_bookings") || "[]")
    .filter(b => b.email === me.email)
    .sort((a,b) => b.createdAt - a.createdAt);

  const tableBookings = bookings.filter(b => !b.type || b.type === "table");
  const suiteBookings = bookings.filter(b => b.type === "suite");
  const eventBookings = bookings.filter(b => b.type === "event");

  const allActivities = [
    ...orders.map(o => ({ ...o, activityType: 'order' })),
    ...bookings.map(b => ({ ...b, activityType: 'booking' }))
  ].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{padding:32}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3 style={{fontSize: '2rem'}}>Welcome, {me.name || me.email}</h3>
            <button className="btn" onClick={() => { Auth.logout(); navigate("/"); }} style={{fontSize: '1.3rem', padding: '16px 24px'}}>🚪 Logout</button>
          </div>
          <div style={{marginTop:40}}>
            <h4 style={{fontSize: '1.8rem'}}>Recent Activity</h4>
            {allActivities.length === 0 ? (
              <p className="helper" style={{fontSize: '1.3rem'}}>No recent activity yet.</p>
            ) : (
              <div style={{display: 'grid', gap: '28px', marginTop: '28px'}}>
                {allActivities.map((activity, index) => {
                  if (activity.activityType === 'order') {
                    return (
                      <div key={activity.id} className="card" style={{padding:28, borderLeft: '6px solid #007bff'}}>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24}}>
                          <div>
                            <strong style={{fontSize: '1.5rem'}}>🛒 Order #{activity.id.toString().slice(-6)}</strong> 
                            <div className="helper" style={{fontSize: '1.3rem'}}>{new Date(activity.createdAt).toLocaleString()}</div>
                          </div>
                          <div><strong style={{fontSize: '1.5rem'}}>₹{activity.total.toFixed(2)}</strong></div>
                        </div>
                        
                        <div style={{borderTop: '2px solid #eee', paddingTop: 24}}>
                          <strong style={{fontSize: '1.4rem'}}>Items:</strong>
                          <div style={{marginTop: 20}}>
                            {activity.items.map((item, itemIndex) => (
                              <div key={itemIndex} style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 20}}>
                                <img 
                                  src={item.img} 
                                  alt={item.title} 
                                  style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px'}}
                                />
                                <div style={{flex: 1}}>
                                  <div style={{fontWeight: 'bold', fontSize: '1.3rem'}}>{item.title}</div>
                                  <div className="helper" style={{fontSize: '1.2rem'}}>₹{item.price.toFixed(2)} each</div>
                                </div>
                                <div style={{minWidth: '120px', textAlign: 'right'}}>
                                  <div style={{fontSize: '1.3rem'}}>× {item.qty}</div>
                                  <div style={{fontWeight: 'bold', fontSize: '1.4rem'}}>₹{(item.price * item.qty).toFixed(2)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    if (!activity.type || activity.type === "table") {
                      return (
                        <div key={activity.createdAt} className="card" style={{padding:28, borderLeft: '6px solid #28a745'}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                            <div>
                              <strong style={{fontSize: '1.5rem'}}>🍽️ Table Reservation</strong> 
                              <div className="helper" style={{fontSize: '1.3rem'}}>{activity.name} • {activity.email}</div>
                              <div className="helper" style={{fontSize: '1.3rem'}}>Location: {activity.location}</div>
                            </div>
                            <div style={{textAlign: 'right'}}>
                              {activity.table && (
                                <div style={{fontWeight: 'bold', color: '#28a745', marginBottom: '16px', fontSize: '1.4rem'}}>
                                  Table: {activity.table} ({activity.area || 'A/C'})
                                </div>
                              )}
                              <div className="helper" style={{fontSize: '1.3rem'}}>{activity.date} at {activity.time}</div>
                              <div className="helper" style={{fontSize: '1.3rem'}}>{activity.guests} guest{activity.guests !== 1 ? 's' : ''}</div>
                              {activity.total > 0 && <div className="helper" style={{fontSize: '1.3rem'}}>Dishes: ₹{activity.total?.toFixed(2)}</div>}
                            </div>
                          </div>
                          
                          {activity.dishes && activity.dishes.length > 0 && (
                            <div style={{marginTop: 24, paddingTop: 24, borderTop: '2px solid #eee'}}>
                              <strong style={{fontSize: '1.4rem'}}>Ordered Dishes:</strong>
                              <div style={{marginTop: 20}}>
                                {activity.dishes.map((dish, dishIndex) => {
                                  const menuItem = SAMPLE_ITEMS.find(item => item.id === dish.id);
                                  return (
                                    <div key={dishIndex} style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 20}}>
                                      {menuItem && (
                                        <img 
                                          src={menuItem.img} 
                                          alt={dish.title} 
                                          style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px'}}
                                        />
                                      )}
                                      <div style={{flex: 1}}>
                                        <div style={{fontWeight: 'bold', fontSize: '1.3rem'}}>{dish.title}</div>
                                        <div className="helper" style={{fontSize: '1.2rem'}}>₹{dish.price.toFixed(2)} each</div>
                                      </div>
                                      <div style={{minWidth: '120px', textAlign: 'right'}}>
                                        <div style={{fontSize: '1.3rem'}}>× {dish.quantity}</div>
                                        <div style={{fontWeight: 'bold', fontSize: '1.4rem'}}>₹{(dish.price * dish.quantity).toFixed(2)}</div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          
                          {activity.notes && (
                            <div style={{marginTop: 24, paddingTop: 24, borderTop: '2px solid #eee'}}>
                              <strong style={{fontSize: '1.4rem'}}>Notes:</strong> <span style={{fontSize: '1.3rem'}}>{activity.notes}</span>
                            </div>
                          )}
                        </div>
                      );
                    } else if (activity.type === "suite") {
                      const suite = SAMPLE_SUITES.find(s => s.id === parseInt(activity.suite));
                      const nights = activity.checkIn && activity.checkOut ? 
                        Math.ceil((new Date(activity.checkOut) - new Date(activity.checkIn)) / (1000 * 60 * 60 * 24)) : 0;
                      
                      return (
                        <div key={activity.createdAt} className="card" style={{padding:28, borderLeft: '6px solid #ffc107'}}>
                          <div style={{display: 'flex', gap: '24px', marginBottom: '24px'}}>
                            {suite && (
                              <img 
                                src={suite.img} 
                                alt={suite.name} 
                                style={{width: '160px', height: '120px', objectFit: 'cover', borderRadius: '12px'}}
                              />
                            )}
                            <div style={{flex: 1}}>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                                <div>
                                  <strong style={{fontSize: '1.5rem'}}>🏨 {suite?.name || activity.suiteName}</strong> 
                                  <div className="helper" style={{fontSize: '1.3rem'}}>{activity.name} • {activity.email}</div>
                                  <div className="helper" style={{fontSize: '1.3rem'}}>Location: {activity.location}</div>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                  <strong style={{fontSize: '1.5rem'}}>₹{((suite?.price || activity.suitePrice) * nights).toFixed(2)}</strong>
                                </div>
                              </div>
                              <div className="helper" style={{marginTop: 16, fontSize: '1.3rem'}}>
                                {activity.checkIn} to {activity.checkOut} ({nights} nights)
                              </div>
                              <div className="helper" style={{fontSize: '1.3rem'}}>{activity.guests} guest{activity.guests !== 1 ? 's' : ''}</div>
                            </div>
                          </div>
                          
                          {activity.notes && (
                            <div style={{marginTop: 24, paddingTop: 24, borderTop: '2px solid #eee'}}>
                              <strong style={{fontSize: '1.4rem'}}>Special requests:</strong> <span style={{fontSize: '1.3rem'}}>{activity.notes}</span>
                            </div>
                          )}
                        </div>
                      );
                    } else if (activity.type === "event") {
                      const event = SAMPLE_EVENTS.find(e => e.id === parseInt(activity.venue));
                      
                      return (
                        <div key={activity.createdAt} className="card" style={{padding:28, borderLeft: '6px solid #dc3545'}}>
                          <div style={{display: 'flex', gap: '24px', marginBottom: '24px'}}>
                            {event && (
                              <img 
                                src={event.img} 
                                alt={event.name} 
                                style={{width: '160px', height: '120px', objectFit: 'cover', borderRadius: '12px'}}
                              />
                            )}
                            <div style={{flex: 1}}>
                              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                                <div>
                                  <strong style={{fontSize: '1.5rem'}}>🎉 {event?.name || activity.eventName}</strong> 
                                  <div className="helper" style={{fontSize: '1.3rem'}}>{activity.name} • {activity.email}</div>
                                  <div className="helper" style={{fontSize: '1.3rem'}}>Location: {activity.location}</div>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                  <strong style={{fontSize: '1.5rem'}}>₹{(event?.price || activity.eventPrice).toFixed(2)} starting price</strong>
                                </div>
                              </div>
                              <div style={{marginTop: 16}}>
                                <div className="helper" style={{fontSize: '1.3rem'}}><strong>Event Date:</strong> {activity.eventDate}</div>
                                <div className="helper" style={{fontSize: '1.3rem'}}><strong>Event Type:</strong> {activity.eventType}</div>
                                <div className="helper" style={{fontSize: '1.3rem'}}><strong>Guests:</strong> {activity.guests}</div>
                              </div>
                            </div>
                          </div>
                          
                          {activity.notes && (
                            <div style={{marginTop: 24, paddingTop: 24, borderTop: '2px solid #eee'}}>
                              <strong style={{fontSize: '1.4rem'}}>Event details:</strong> <span style={{fontSize: '1.3rem'}}>{activity.notes}</span>
                            </div>
                          )}
                        </div>
                      );
                    }
                  }
                })}
              </div>
            )}
          </div>

          <div style={{marginTop:48}}>
            <h4 style={{fontSize: '1.8rem'}}>All Orders</h4>
            {orders.length === 0 ? (
              <p className="helper" style={{fontSize: '1.3rem'}}>No orders yet.</p>
            ) : (
              <div style={{display: 'grid', gap: '20px', marginTop: '20px'}}>
                {orders.map(o => (
                  <div key={o.id} className="card" style={{padding:20}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div>
                        <strong style={{fontSize: '1.4rem'}}>Order #{o.id.toString().slice(-6)}</strong> 
                        <div className="helper" style={{fontSize: '1.3rem'}}>{new Date(o.createdAt).toLocaleString()}</div>
                      </div>
                      <div><strong style={{fontSize: '1.5rem'}}>₹{o.total.toFixed(2)}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Table reservation feature removed - Dashboard now shows orders only */}
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{textAlign:'center'}}>
        <h2 style={{fontSize: '3.5rem'}}>404</h2>
        <p className="helper" style={{fontSize: '1.4rem'}}>That page doesn't exist.</p>
        <Link to="/" className="btn cta" style={{fontSize: '1.4rem', padding: '18px 32px'}}>🏠 Back home</Link>
      </div>
    </section>
  );
}

export default function AppRoot() {
  const [user, setUser] = useState(Auth.me());
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("tt_cart") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("tt_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    function handler(e) {
      if (e.key === "tt_cart") {
        try { setCart(JSON.parse(e.newValue || "[]")); } catch {}
      }
      if (e.key === LS_SESSION) {
        setUser(Auth.me());
      }
    }
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  function addToCart(item) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateCartItem(id, qty) {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0));
  }

  function clearCart() {
    setCart([]);
  }

  const value = { user, setUser };
  
  return (
    <AuthContext.Provider value={value}>
      <Router>
        <Navbar cartCount={cart.reduce((s, it) => s + it.qty, 0)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu onAdd={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdate={updateCartItem} onClear={clearCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}
