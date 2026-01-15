export const customerSeed = { id:'CUST-1001', name:'Yagneswar Mitta', tier:'Gold' }
export const transactionsSeed = [
 { id:'TXN-251225-01', type:'PURCHASE', amount:12000, points:1200, date:'2025-12-25', expiry:'2026-03-25', note:'Jeans & Jacket', store:'Pune Fashion Mall' },
 { id:'TXN-111225-01', type:'PURCHASE', amount:8000, points:800, date:'2025-12-11', expiry:'2026-02-23', note:'Home Decor', store:'Lifestyle Store – Koregaon Park' },
 { id:'TXN-151125-RED', type:'REDEMPTION', amount:0, points:-500, date:'2025-11-15', expiry:null, note:'₹500 Gift Card', store:'Online' },
 { id:'TXN-251225-02', type:'PURCHASE', amount:12000, points:1200, date:'2025-12-25', expiry:'2026-03-25', note:'Shoes', store:'Pune Fashion Mall' },
 { id:'TXN-251225-03', type:'PURCHASE', amount:12000, points:1200, date:'2025-12-25', expiry:'2026-03-25', note:'Accessories', store:'Pune Fashion Mall' },
]

export const promotionsSeed = [
  // --- existing ---
  
  { id:'PROMO-FEST15', title:'Festive 15% Off', cost:900, tierOnly:false, image:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop', description:'Seasonal sale voucher for lifestyle category.' },
  { id:'PROMO-GROC', title:'₹300 Grocery Wallet', cost:350, tierOnly:false, image:'https://images.unsplash.com/photo-1628102491629-778571d893a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww', description:'Stock your pantry with essentials.' },
  { id:'PROMO-TRAVEL', title:'Travel Cab ₹150 Off', cost:200, tierOnly:false, image:'https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FifGVufDB8fDB8fHww', description:'Comfortable rides at a discount.' },
  { id:'PROMO-SPORT', title:'Sportswear 12% Off', cost:450, tierOnly:false, image:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', description:'Gear up for workouts.' },
  { id:'PROMO-BOOKS', title:'Books ₹250 Coupon', cost:300, tierOnly:false, image:'https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3N8ZW58MHx8MHx8fDA%3D', description:'Grab your next read.' },

  // --- new: Electronics ---
  { id:'PROMO-ELX1', title:'Electronics 10% Off', cost:600, category:'Electronics', tierOnly:false, image:'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop', description:'Valid on gadgets above ₹5,000.' },
  { id:'PROMO-ELX2', title:'₹800 Electronics Wallet', cost:800, category:'Electronics', tierOnly:false, image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop', description:'Use on headphones, smartwatches.' },

  // --- new: Travel ---
  { id:'PROMO-TRV1', title:'Domestic Flight ₹500 Off', cost:700, category:'Travel', tierOnly:false, image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', description:'Applicable on returns above ₹7,000.' },
  { id:'PROMO-TRV2', title:'Hotel 12% Off', cost:650, category:'Travel', tierOnly:false, image:'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop', description:'Weekend stay deal.' },

  // --- new: Cooking ---
  { id:'PROMO-CK1', title:'Cookware 15% Off', cost:500, category:'Cooking', tierOnly:false, image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', description:'For pans & pots sets.' },
  { id:'PROMO-CK2', title:'₹400 Kitchen Wallet', cost:400, category:'Cooking', tierOnly:false, image:'https://plus.unsplash.com/premium_photo-1678375722686-c7ea507c3003?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D', description:'Appliances & tools.' },

  // --- new: Fashion ---
  { id:'PROMO-FSH1', title:'Fashion Extra 10% Off', cost:550, category:'Fashion', tierOnly:false, image:'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop', description:'On cart above ₹2,000.' },
  { id:'PROMO-FSH2', title:'₹600 Apparel Wallet', cost:600, category:'Fashion', tierOnly:false, image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop', description:'Shoes & accessories.' },

  // --- new: Grocery ---
  { id:'PROMO-GRC1', title:'Groceries 8% Off', cost:300, category:'Grocery', tierOnly:false, image:'https://plus.unsplash.com/premium_photo-1683122069489-4771f2a82ce2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8', description:'Daily essentials.' },
  { id:'PROMO-GRC2', title:'₹500 Cart Wallet', cost:500, category:'Grocery', tierOnly:false, image:'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop', description:'Fresh items & packaged foods.' },

  // --- new: Books ---
  { id:'PROMO-BK1', title:'Books 15% Off', cost:350, category:'Books', tierOnly:false, image:'https://images.unsplash.com/photo-1565116175806-3f65cb369381?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D', description:'Best sellers & new arrivals.' },
  { id:'PROMO-BK2', title:'₹300 Books Wallet', cost:300, category:'Books', tierOnly:false, image:'https://plus.unsplash.com/premium_photo-1750053353097-4c6373a308a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8', description:'Novels & study material.' },

  // --- new: Sports ---
  { id:'PROMO-SP1', title:'Sports Gear 10% Off', cost:450, category:'Sports', tierOnly:false, image:'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop', description:'Footwear & gym wear.' },
  { id:'PROMO-SP2', title:'₹400 Fitness Wallet', cost:400, category:'Sports', tierOnly:false, image:'https://plus.unsplash.com/premium_photo-1666736569798-421076607ba7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D', description:'Accessories, mats, bottles.' },

  // --- new: Cabs ---
  { id:'PROMO-CAB1', title:'Intercity Cab ₹200 Off', cost:250, category:'Cabs', tierOnly:false, image:'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop', description:'Weekends & holidays.' },
  { id:'PROMO-CAB2', title:'Daily Ride 12% Off', cost:220, category:'Cabs', tierOnly:false, image:'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop', description:'Applicable across city.' },
];

