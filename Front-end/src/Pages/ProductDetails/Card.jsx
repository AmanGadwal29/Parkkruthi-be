// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Card = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     axios.get('[https://api.example.com/data')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
//       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
//         <img
//           src={data.image}
//           alt="card-image"
//           className="h-full w-full rounded-md md:rounded-lg object-cover"
//         />
//       </div>
//       <div className="p-6">
//         <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
//           {data.category}
//         </div>
//         <h4 className="mb-2 text-slate-800 text-xl font-semibold">
//           {data.title}
//         </h4>
//         <p className="mb-8 text-slate-600 leading-normal font-light">
//           {data.description}
//         </p>
//         <div>
//           <a href="#" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
//             Learn More
//             <svg xmlns="[http://www.w3.org/2000/svg]"className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;



// import React from 'react';

// const Card = ({ image, title, description, price, stocks, category, tag = "Product", link = "#" }) => {
//   return (
//     <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
//       <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
//         <img
//           src={image}
//           alt={title}
//           className="h-full w-full rounded-md md:rounded-lg object-cover"
//         />
//       </div>

//       <div className="p-6 flex flex-col justify-between">
//         <div>
//           <div className="mb-3 rounded-full bg-teal-600 py-0.5 px-2.5 text-xs text-white w-fit shadow-sm">
//             {tag.toUpperCase()}
//           </div>

//           <h4 className="mb-2 text-slate-800 text-xl font-semibold">{title}</h4>

//           <p className="mb-4 text-slate-600 font-light leading-relaxed">{description}</p>

//           <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-slate-700">
//             <div><span className="font-semibold">Price:</span> ${price}</div>
//             <div><span className="font-semibold">Stocks:</span> {stocks}</div>
//             <div><span className="font-semibold">Category:</span> {category}</div>
//           </div>
//         </div>

//         <div>
//           <a href={link} className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
//             Learn More
//             <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;












import React from 'react';

const product = {
  id: 1,
  name: "Aloe Vera",
  price: "₹80",
  image: "/plant_images/1.avif",
  description: "Aloe Vera is known for its medicinal properties and easy maintenance.",
  stocks: "25",
  category: "Indoor Plant",
  tag: "Plant",
  link: "/product/aloe-vera"
};

const Card = ({ image, name, description, price, stocks, category, tag = "Product", link = "#" }) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full my-6 rounded-xl border border-green-100 bg-[#e6f5e9] shadow-[8px_8px_16px_#cce0d2,-8px_-8px_16px_#ffffff] transition-transform duration-300 hover:scale-[1.01]">
      <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-md md:rounded-lg object-cover shadow-inner"
        />
      </div>

      <div className="p-6 flex flex-col justify-between">
        <div>
          <div className="mb-3 rounded-full bg-green-500/90 py-0.5 px-3 text-xs text-white w-fit shadow-sm">
            {tag.toUpperCase()}
          </div>

          <h4 className="mb-2 text-[#1f4037] text-xl font-semibold">{name}</h4>

          <p className="mb-4 text-green-800 font-light leading-relaxed">{description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-green-700">
            <div><span className="font-semibold">Price:</span> {price}</div>
            <div><span className="font-semibold">Stocks:</span> {stocks}</div>
            <div><span className="font-semibold">Category:</span> {category}</div>
          </div>
        </div>

        <div>
          <a href={link} className="text-green-700 font-semibold text-sm hover:underline flex items-center">
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const CardWrapper = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card {...product} />
    </div>
  );
};

export default CardWrapper;
