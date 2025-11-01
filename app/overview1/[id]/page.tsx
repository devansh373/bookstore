// "use client";

// import dynamic from "next/dynamic";
// import Footer from "../../components/footer/page";
// import Image from "next/image";
// import { FaStar } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { API_BASE_URL } from "../../../utils/api";
// import Link from "next/link";
// import axios from "axios";

// import useCheckIsLoggedIn from "@/app/hooks/useCheckIsLoggedIn";

// const Header = dynamic(() => import("../../components/header/page"), {
//   ssr: false,
// });
// const defaultImageUrl =
//   "https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg";

// interface Item {
//   _id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   description: string;
//   estimatedDelivery: string;
//   tags: string[];
//   condition: string;
//   subCategory: string;
//   author: string;
//   publisher: string;
//   quantityNew: number;
//   quantityOld: number;
//   discountNew: number;
//   discountOld: number;
//   effectiveDiscount: number;
//   discountedPrice: number;
// }

// interface BookstoreReview {
//   _id: string;
//   name: string;
//   email: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
//   bookId: { _id: string; title: string };
//   status: "pending" | "approved" | "disapproved";
// }

// export default function Overview() {
//   const { id } = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const category = searchParams.get("category") || "Non-Academics";
//   const [item, setItem] = useState<Item>({
//     _id: "",
//     name: "Loading...",
//     price: 0,
//     imageUrl: defaultImageUrl,
//     description: "",
//     estimatedDelivery: "",
//     tags: [],
//     condition: "New",
//     subCategory: "",
//     author: "",
//     publisher: "",
//     quantityNew: 0,
//     quantityOld: 0,
//     discountNew: 0,
//     discountOld: 0,
//     effectiveDiscount: 0,
//     discountedPrice: 0,
//   });
//   const [condition, setCondition] = useState("New");
//   const [discountedPrice, setDiscountedPrice] = useState(0);
//   const [isOutOfStock, setIsOutOfStock] = useState(false);
//   const [availableConditions, setAvailableConditions] = useState<string[]>([]);
//   const [viewers] = useState(Math.floor(Math.random() * 50) + 1);
//   const [rating, setRating] = useState(0);
//   const [reviewDescription, setReviewDescription] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [reviewError, setReviewError] = useState<string | null>(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [reviews, setReviews] = useState<BookstoreReview[]>([]);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const {isLoggedIn} = useCheckIsLoggedIn(true)
  

//   useEffect(() => {
//     const fetchItemDetails = async () => {
//       if (id) {
//         try {
//           const response = await fetch(
//             `${API_BASE_URL}/books/${id}?t=${new Date().getTime()}`,
//             { cache: "no-store" }
//           );
//           if (!response.ok) {
//             const errorData = await response.json().catch(() => ({}));
//             throw new Error(
//               errorData.error || `HTTP error! Status: ${response.status}`
//             );
//           }
//           const data = await response.json();
//           console.log(data.condition)
//           const newItem = {
//             _id: data._id || "",
//             name: data.bookName || data.title || "Unknown Title",
//             price: data.price || 0,
//             imageUrl: data.imageUrl || defaultImageUrl,
//             description: data.description || "",
//             estimatedDelivery: data.estimatedDelivery || "",
//             tags: data.tags || [],
//             condition: data.condition || "new",
//             subCategory: data.categoryPath
//               ? data.categoryPath.split("/").pop() || "Non-Academics"
//               : "Non-Academics",
//             author: data.author || "",
//             publisher: data.publisher || "",
//             quantityNew: data.quantityNew ?? 0,
//             quantityOld: data.quantityOld ?? 0,
//             discountNew: data.discountNew ?? 0,
//             discountOld: data.discountOld ?? 0,
//             effectiveDiscount: data.effectiveDiscount ?? 0,
//             discountedPrice: (data.discountedPrice ?? data.price) || 0,
//           };
//           setItem(newItem);
//           const selectedCondition =
//             newItem.condition === "BOTH"
//               ? "New"
//               : newItem.condition === "new"
//               ? "New"
//               : newItem.quantityNew > 0
//               ? "New"
//               : "Old";
//               console.log(selectedCondition)
//           setCondition(selectedCondition);
//           // Calculate initial discounted price based on selected condition
//           const initialDiscount =
//             selectedCondition === "New"
//               ? newItem.discountNew
//               : newItem.discountOld;
//           const initialDiscountedPrice =
//             newItem.price * (1 - initialDiscount / 100);
//           setDiscountedPrice(initialDiscountedPrice);
//           setIsOutOfStock(
//             newItem.quantityNew === 0 && newItem.quantityOld === 0
//           );
//           const conditions = [];
//           if (newItem.quantityNew > 0) conditions.push("New");
//           if (newItem.quantityOld > 0) conditions.push("Old");
//           setAvailableConditions(conditions);
//           setError(null);
//         } catch (err) {
//           if (err instanceof Error)
//             setError(
//               `Item not found. Please check the item ID (${id}) or try a different one.`
//             );
//           setItem({
//             _id: "",
//             name: "Not Found",
//             price: 0,
//             imageUrl: defaultImageUrl,
//             description: "",
//             estimatedDelivery: "",
//             tags: [],
//             condition: "New",
//             subCategory: "",
//             author: "",
//             publisher: "",
//             quantityNew: 0,
//             quantityOld: 0,
//             discountNew: 0,
//             discountOld: 0,
//             effectiveDiscount: 0,
//             discountedPrice: 0,
//           });
//           setCondition("New");
//           setDiscountedPrice(0);
//           setIsOutOfStock(true);
//           setAvailableConditions([]);
//         }
//       }
//     };
//     fetchItemDetails();
//   }, [id]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/reviews/book/${id}?t=${new Date().getTime()}`,
//           { cache: "no-store" }
//         );
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({}));

//           throw new Error(
//             errorData.error || `HTTP error! Status: ${response.status}`
//           );
//         }
//         const data = await response.json();
//         const reviews: BookstoreReview[] = data.map(
//           (review: BookstoreReview) => ({
//             _id: review._id,
//             name: review.name,
//             email: review.email,
//             rating: review.rating,
//             comment: review.comment,
//             createdAt: review.createdAt,
//             bookId: {
//               _id: review.bookId?._id || review.bookId,
//               title: review.bookId?.title || item.name || "Unknown Book",
//             },
//             status: review.status,
//           })
//         );
//         setReviews(reviews);
//         setReviewError(null);
//       } catch (err) {
//         if (err instanceof Error)
//           setReviewError(
//             err.message || "Failed to load reviews. Please try again later."
//           );
//       }
//     };
//     if (id) {
//       fetchReviews();
//     }
//   }, [id, item.name]);

//   const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCondition = e.target.value;
//     setCondition(selectedCondition);
//     // Calculate discounted price based on selected condition
//     const discount =
//       selectedCondition === "New" ? item.discountNew : item.discountOld;
//     const newDiscountedPrice = item.price * (1 - discount / 100);
//     setDiscountedPrice(newDiscountedPrice);
//   };

//   const handleRating = (rate: number) => {
//     setRating(rate);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!error && item._id) {
//       if (rating === 0) {
//         setReviewError("Please select a rating.");
//         return;
//       }
//       if (!name.trim()) {
//         setReviewError("Please enter your name.");
//         return;
//       }
//       if (!reviewDescription.trim()) {
//         setReviewError("Please enter a review description.");
//         return;
//       }
//       try {
//         const payload = {
//           bookId: item._id,
//           name,
//           email,
//           rating,
//           comment: reviewDescription,
//           categoryName: category,
//         };
//         const response = await fetch(`${API_BASE_URL}/reviews`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//           credentials:"include"
//         });
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({}));

//           throw new Error(
//             errorData.error || `HTTP error! Status: ${response.status}`
//           );
//         }
//         // const newReview = await response.json();

//         setShowSuccessMessage(true);
//         setRating(0);
//         setReviewDescription("");
//         setName("");
//         setEmail("");
//         setReviewError(null);
//         setTimeout(() => {
//           setShowSuccessMessage(false);
//         }, 5000);
//       } catch (err) {
//         if (err instanceof Error)
//           setReviewError(
//             err.message || "Failed to submit review. Please try again later."
//           );
//       }
//     }
//   };

//   const handleAddToCart = async () => {
//     try {
//       if (isLoggedIn) {
//         if (!error && item._id && !isOutOfStock) {
//           const query = new URLSearchParams({
//             _id: item._id,
//             name: item.name,
//             price: item.price.toFixed(2),
//             imageUrl: item.imageUrl || defaultImageUrl,
//             condition,
//             discountedPrice: discountedPrice.toFixed(2),
//             category,
//           }).toString();
//           const stock = isOutOfStock
//             ? 0
//             : item.condition.includes("New")
//             ? item.quantityNew
//             : item.quantityOld;
//           await axios.post(
//             `${API_BASE_URL}/addCart`,
//             {
//               bookId: item._id,
//               title: item.name,
//               price: item.price.toFixed(2),
//               quantity: 1,
//               stock,
//               condition
//             },
//             {
//               withCredentials: true,
//             }
//           );
//           router.push(`/cart?${query}`);
//         }
//       } else setError("Please log in");
//     } catch (error) {
//       if (error instanceof Error) console.log(error.message);
//     }
//   };

//   const handleBuyNow = () => {
//     if (!error && item._id && !isOutOfStock) {
//       const query = new URLSearchParams({
//         _id: item._id,
//         name: item.name,
//         price: item.price.toFixed(2),
//         imageUrl: item.imageUrl || defaultImageUrl,
//         condition,
//         discountedPrice: discountedPrice.toFixed(2),
//         category,
//       }).toString();

//       if (isLoggedIn) router.push(`/cart?${query}`);
//       else setError("Please log in");
//     }
//   };

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
//         <Header />
//         <main className="flex-grow px-6 sm:px-8 md:px-12 py-6 flex-col items-center justify-center">
//           <p className="text-center text-red-500 text-xl">{error}</p>
//           {error === "Please log in" && (
//             <>
//               <Link
//                 href="/login"
//                 className="text-black mx-auto text-center block w-fit p-2 rounded-lg mt-3 bg-amber-200  hover:bg-amber-300"
//               >
//                 Go to Login
//               </Link>
//             </>
//           )}
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (isOutOfStock) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
//         <Header />
//         <main className="flex-grow px-6 sm:px-8 md:px-12 py-6 flex items-center justify-center">
//           <p className="text-center text-red-500 text-xl">
//             This item is out of stock.
//           </p>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full flex flex-col bg-white">
//       <Header />
//       <main className="flex-grow px-6 sm:px-8 md:px-12 py-6">
//         <div className="flex flex-col lg:flex-row items-start">
//           <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
//             <Image
//               src={item.imageUrl || defaultImageUrl}
//               alt={item.name}
//               width={300}
//               height={400}
//               className="w-full h-auto object-cover rounded-lg shadow-md"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = defaultImageUrl;
//               }}
//             />
//           </div>
//           <div className="w-full lg:w-1/2 lg:pl-6">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-900">
//               {item.name}
//             </h2>
//             <div className="text-xl font-bold mb-4 flex items-center space-x-2">
//               {condition === "Old" && item.discountOld > 0 ? (
//                 <>
//                   <span className="text-sm text-gray-500 line-through">
//                     ₹{item.price.toFixed(2)}
//                   </span>
//                   <span className="text-2xl text-green-500">
//                     ₹{discountedPrice.toFixed(2)}
//                   </span>
//                   <span className="text-sm text-gray-600">
//                     ({item.discountOld}% off)
//                   </span>
//                 </>
//               ) : condition === "New" && item.discountNew > 0 ? (
//                 <>
//                   <span className="text-sm text-gray-500 line-through">
//                     ₹{item.price.toFixed(2)}
//                   </span>
//                   <span className="text-2xl text-green-500">
//                     ₹{discountedPrice.toFixed(2)}
//                   </span>
//                   <span className="text-sm text-gray-600">
//                     ({item.discountNew}% off)
//                   </span>
//                 </>
//               ) : (
//                 <span className="text-orange-500">
//                   ₹{item.price.toFixed(2)}
//                 </span>
//               )}
//             </div>
//             <p className="text-sm text-gray-600 mb-4">
//               {viewers} people are viewing this product right now
//             </p>
//             <div className="mb-4">
//               <label
//                 htmlFor="condition"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Choose Item Condition
//               </label>
//               <select
//                 id="condition"
//                 value={condition}
//                 onChange={handleConditionChange}
//                 className="w-full p-2 border rounded-lg text-gray-800"
//                 disabled={availableConditions.length === 0}
//               >
//                 {availableConditions.map((cond) => {
//                   const isNewOutOfStock =
//                     cond === "New" && item.quantityNew === 0;
//                   const isOldOutOfStock =
//                     cond === "Old" && item.quantityOld === 0;
//                   const label = `${cond}${
//                     isNewOutOfStock || isOldOutOfStock ? " (Out of Stock)" : ""
//                   }`;
//                   return (
//                     <option
//                       key={cond}
//                       value={cond}
//                       disabled={isNewOutOfStock || isOldOutOfStock}
//                     >
//                       {label}
//                     </option>
//                   );
//                 })}
//                 {availableConditions.length === 0 && (
//                   <option value="" disabled>
//                     No conditions available
//                   </option>
//                 )}
//               </select>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="w-full bg-blue-500 text-white p-2 rounded-lg mb-2 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={
//                 isOutOfStock ||
//                 (condition === "New" && item.quantityNew === 0) ||
//                 (condition === "Old" && item.quantityOld === 0)
//               }
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={
//                 isOutOfStock ||
//                 (condition === "New" && item.quantityNew === 0) ||
//                 (condition === "Old" && item.quantityOld === 0)
//               }
//             >
//               Buy Now
//             </button>
//             <p className="mt-4 text-sm text-gray-600">
//               Estimated delivery: {item.estimatedDelivery || "5 days"}
//             </p>
//             <div className="mt-4">
//               <h3 className="text-md font-medium text-gray-900">Tags:</h3>
//               <p className="text-sm text-gray-600">
//                 {item.tags.join(", ") || "No tags available"}
//               </p>
//             </div>
//             <div className="mt-2">
//               <h3 className="text-md font-medium text-gray-900">Category:</h3>
//               <p className="text-sm text-gray-600">
//                 {item.subCategory || "Non-Academics"}
//               </p>
//             </div>
//             <div className="mt-2">
//               <h3 className="text-md font-medium text-gray-900">Author:</h3>
//               <p className="text-sm text-gray-600">
//                 {item.author || "Unknown"}
//               </p>
//             </div>
//             <div className="mt-2">
//               <h3 className="text-md font-medium text-gray-900">Publisher:</h3>
//               <p className="text-sm text-gray-600">
//                 {item.publisher || "Unknown"}
//               </p>
//             </div>
//             <div className="mt-4">
//               <h3 className="text-md font-medium text-gray-900">Description</h3>
//               <p className="text-sm text-gray-600">
//                 {item.description || "No description available."}
//               </p>
//             </div>
//             <div className="mt-4">
//               <h3 className="text-md font-medium text-gray-900">
//                 Stock Availability:
//               </h3>
//               <p className="text-sm text-gray-600">
//                 New: {item.quantityNew}{" "}
//                 {item.quantityNew === 0 ? "(Out of Stock)" : ""}, Old:{" "}
//                 {item.quantityOld}{" "}
//                 {item.quantityOld === 0 ? "(Out of Stock)" : ""}
//               </p>
//             </div>
//             <div className="mt-4">
//               <h3 className="text-md font-medium text-gray-900">
//                 Reviews ({reviews.length})
//               </h3>
//               {showSuccessMessage ? (
//                 <p className="text-green-500 text-md mt-4 font-semibold">
//                   Thanks for your feedback. Your review is pending approval.
//                 </p>
//               ) : (
//                 <>
//                   {reviewError && (
//                     <p className="text-red-500 text-sm mt-2">{reviewError}</p>
//                   )}
//                   {isLoggedIn && (
//                     <form onSubmit={handleSubmit} className="mt-2 space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                           Your Rating
//                         </label>
//                         <div className="flex mt-1">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <FaStar
//                               key={star}
//                               className={`cursor-pointer ${
//                                 star <= rating
//                                   ? "text-yellow-500"
//                                   : "text-gray-300"
//                               }`}
//                               size={24}
//                               onClick={() => handleRating(star)}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="review"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Your Description
//                         </label>
//                         <textarea
//                           id="review"
//                           value={reviewDescription}
//                           onChange={(e) => setReviewDescription(e.target.value)}
//                           className="w-full p-2 border rounded-lg text-gray-800 mt-1"
//                           rows={4}
//                           placeholder="Write your review here..."
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="name"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Name
//                         </label>
//                         <input
//                           type="text"
//                           id="name"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           className="w-full p-2 border rounded-lg text-gray-800 mt-1"
//                           placeholder="Enter your name"
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           className="w-full p-2 border rounded-lg text-gray-800 mt-1"
//                           placeholder="Enter your email"
//                         />
//                       </div>
//                       <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                         disabled={!!error || isOutOfStock}
//                       >
//                         Submit
//                       </button>
//                     </form>
//                   )}
//                   <div className="mt-6">
//                     {reviews.length > 0 ? (
//                       reviews.map((review) => (
//                         <div key={review._id} className="border-t pt-4 mt-4">
//                           <p className="text-md font-semibold text-gray-900">
//                             {item.name}
//                           </p>
//                           <div className="flex items-center mt-1">
//                             {[...Array(5)].map((_, i) => (
//                               <FaStar
//                                 key={i}
//                                 className={
//                                   i < review.rating
//                                     ? "text-yellow-500"
//                                     : "text-gray-300"
//                                 }
//                                 size={18}
//                               />
//                             ))}
//                           </div>
//                           <p className="text-sm text-gray-600 mt-1">
//                             {review.comment}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             By {review.name} on{" "}
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-600 mt-2">
//                         No approved reviews yet. Be the first to review this
//                         item!
//                       </p>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }





// app/overview1/[id]/page.tsx
"use client";

import dynamic from "next/dynamic";
import Footer from "../../components/footer/page";
import Image from "next/image";
import { FaStar, FaRegEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Added new icons
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "../../../utils/api";
import Link from "next/link";
import axios from "axios";

import useCheckIsLoggedIn from "@/app/hooks/useCheckIsLoggedIn";

// UI IMPROVEMENT: Dynamically import header
const Header = dynamic(() => import("../../components/header/page"), {
  ssr: false,
});
const defaultImageUrl =
  "https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg";

// ... (Interfaces Item and BookstoreReview remain the same)
interface Item {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  estimatedDelivery: string;
  tags: string[];
  condition: string;
  subCategory: string;
  author: string;
  publisher: string;
  quantityNew: number;
  quantityOld: number;
  discountNew: number;
  discountOld: number;
  effectiveDiscount: number;
  discountedPrice: number;
}

interface BookstoreReview {
  _id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
  bookId: { _id: string; title: string };
  status: "pending" | "approved" | "disapproved";
}

export default function Overview() {
  // ... (All state, hooks, and data fetching logic remain the same)
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "Non-Academics";
  const [item, setItem] = useState<Item>({
    _id: "",
    name: "Loading...",
    price: 0,
    imageUrl: defaultImageUrl,
    description: "",
    estimatedDelivery: "",
    tags: [],
    condition: "New",
    subCategory: "",
    author: "",
    publisher: "",
    quantityNew: 0,
    quantityOld: 0,
    discountNew: 0,
    discountOld: 0,
    effectiveDiscount: 0,
    discountedPrice: 0,
  });
  const [condition, setCondition] = useState("New");
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [availableConditions, setAvailableConditions] = useState<string[]>([]);
  const [viewers] = useState(Math.floor(Math.random() * 50) + 1);
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [reviews, setReviews] = useState<BookstoreReview[]>([]);
  const { isLoggedIn } = useCheckIsLoggedIn(true);

  useEffect(() => {
    // ... (fetchItemDetails logic is unchanged)
    const fetchItemDetails = async () => {
      if (id) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/books/${id}?t=${new Date().getTime()}`,
            { cache: "no-store" }
          );
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              errorData.error || `HTTP error! Status: ${response.status}`
            );
          }
          const data = await response.json();
          console.log(data.condition);
          const newItem = {
            _id: data._id || "",
            name: data.bookName || data.title || "Unknown Title",
            price: data.price || 0,
            imageUrl: data.imageUrl || defaultImageUrl,
            description: data.description || "",
            estimatedDelivery: data.estimatedDelivery || "",
            tags: data.tags || [],
            condition: data.condition || "new",
            subCategory: data.categoryPath
              ? data.categoryPath.split("/").pop() || "Non-Academics"
              : "Non-Academics",
            author: data.author || "",
            publisher: data.publisher || "",
            quantityNew: data.quantityNew ?? 0,
            quantityOld: data.quantityOld ?? 0,
            discountNew: data.discountNew ?? 0,
            discountOld: data.discountOld ?? 0,
            effectiveDiscount: data.effectiveDiscount ?? 0,
            discountedPrice: (data.discountedPrice ?? data.price) || 0,
          };
          setItem(newItem);
          const selectedCondition =
            newItem.condition === "BOTH"
              ? "New"
              : newItem.condition === "new"
              ? "New"
              : newItem.quantityNew > 0
              ? "New"
              : "Old";
          console.log(selectedCondition);
          setCondition(selectedCondition);
          // Calculate initial discounted price based on selected condition
          const initialDiscount =
            selectedCondition === "New"
              ? newItem.discountNew
              : newItem.discountOld;
          const initialDiscountedPrice =
            newItem.price * (1 - initialDiscount / 100);
          setDiscountedPrice(initialDiscountedPrice);
          setIsOutOfStock(
            newItem.quantityNew === 0 && newItem.quantityOld === 0
          );
          const conditions = [];
          if (newItem.quantityNew > 0) conditions.push("New");
          if (newItem.quantityOld > 0) conditions.push("Old");
          setAvailableConditions(conditions);
          setError(null);
        } catch (err) {
          if (err instanceof Error)
            setError(
              `Item not found. Please check the item ID (${id}) or try a different one.`
            );
          setItem({
            _id: "",
            name: "Not Found",
            price: 0,
            imageUrl: defaultImageUrl,
            description: "",
            estimatedDelivery: "",
            tags: [],
            condition: "New",
            subCategory: "",
            author: "",
            publisher: "",
            quantityNew: 0,
            quantityOld: 0,
            discountNew: 0,
            discountOld: 0,
            effectiveDiscount: 0,
            discountedPrice: 0,
          });
          setCondition("New");
          setDiscountedPrice(0);
          setIsOutOfStock(true);
          setAvailableConditions([]);
        }
      }
    };
    fetchItemDetails();
  }, [id]);

  useEffect(() => {
    // ... (fetchReviews logic is unchanged)
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/reviews/book/${id}?t=${new Date().getTime()}`,
          { cache: "no-store" }
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          throw new Error(
            errorData.error || `HTTP error! Status: ${response.status}`
          );
        }
        const data = await response.json();
        const reviews: BookstoreReview[] = data.map(
          (review: BookstoreReview) => ({
            _id: review._id,
            name: review.name,
            email: review.email,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            bookId: {
              _id: review.bookId?._id || review.bookId,
              title: review.bookId?.title || item.name || "Unknown Book",
            },
            status: review.status,
          })
        );
        setReviews(reviews);
        setReviewError(null);
      } catch (err) {
        if (err instanceof Error)
          setReviewError(
            err.message || "Failed to load reviews. Please try again later."
          );
      }
    };
    if (id) {
      fetchReviews();
    }
  }, [id, item.name]);

  // ... (All handlers: handleConditionChange, handleRating, handleSubmit, handleAddToCart, handleBuyNow are unchanged)
  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCondition = e.target.value;
    setCondition(selectedCondition);
    // Calculate discounted price based on selected condition
    const discount =
      selectedCondition === "New" ? item.discountNew : item.discountOld;
    const newDiscountedPrice = item.price * (1 - discount / 100);
    setDiscountedPrice(newDiscountedPrice);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && item._id) {
      if (rating === 0) {
        setReviewError("Please select a rating.");
        return;
      }
      if (!name.trim()) {
        setReviewError("Please enter your name.");
        return;
      }
      if (!reviewDescription.trim()) {
        setReviewError("Please enter a review description.");
        return;
      }
      try {
        const payload = {
          bookId: item._id,
          name,
          email,
          rating,
          comment: reviewDescription,
          categoryName: category,
        };
        const response = await fetch(`${API_BASE_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          throw new Error(
            errorData.error || `HTTP error! Status: ${response.status}`
          );
        }
        // const newReview = await response.json();

        setShowSuccessMessage(true);
        setRating(0);
        setReviewDescription("");
        setName("");
        setEmail("");
        setReviewError(null);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } catch (err) {
        if (err instanceof Error)
          setReviewError(
            err.message || "Failed to submit review. Please try again later."
          );
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      if (isLoggedIn) {
        if (!error && item._id && !isOutOfStock) {
          const query = new URLSearchParams({
            _id: item._id,
            name: item.name,
            price: item.price.toFixed(2),
            imageUrl: item.imageUrl || defaultImageUrl,
            condition,
            discountedPrice: discountedPrice.toFixed(2),
            category,
          }).toString();
          const stock = isOutOfStock
            ? 0
            : item.condition.includes("New")
            ? item.quantityNew
            : item.quantityOld;
          await axios.post(
            `${API_BASE_URL}/addCart`,
            {
              bookId: item._id,
              title: item.name,
              price: item.price.toFixed(2),
              quantity: 1,
              stock,
              condition,
            },
            {
              withCredentials: true,
            }
          );
          router.push(`/cart?${query}`);
        }
      } else setError("Please log in");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const handleBuyNow = () => {
    if (!error && item._id && !isOutOfStock) {
      const query = new URLSearchParams({
        _id: item._id,
        name: item.name,
        price: item.price.toFixed(2),
        imageUrl: item.imageUrl || defaultImageUrl,
        condition,
        discountedPrice: discountedPrice.toFixed(2),
        category,
      }).toString();

      if (isLoggedIn) router.push(`/cart?${query}`);
      else setError("Please log in");
    }
  };

  // UI IMPROVEMENT: Standardized container and padding
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
          <p className="text-center text-red-600 text-xl font-semibold">
            {error}
          </p>
          {error === "Please log in" && (
            <Link
              href="/login"
              className="mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
            >
              Go to Login
            </Link>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // UI IMPROVEMENT: Standardized container and padding
  if (isOutOfStock) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <p className="text-center text-red-600 text-2xl font-semibold">
            This item is currently out of stock.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    // UI IMPROVEMENT: Use light gray background for the page
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <Header />
      {/* UI IMPROVEMENT: Standardized container and responsive padding */}
      <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* UI IMPROVEMENT: Main product grid with responsive gap */}
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* --- Image Column --- */}
          {/* UI IMPROVEMENT: Sticky image column on desktop */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-28 h-full">
            {/* UI IMPROVEMENT: Aspect ratio container for clean image display */}
            <div className="relative aspect-[3/4] w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <Image
                src={item.imageUrl || defaultImageUrl}
                alt={item.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4" // Use object-contain for book covers
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImageUrl;
                }}
              />
            </div>
          </div>

          {/* --- Details Column --- */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            {/* UI IMPROVEMENT: Larger, bolder title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {item.name}
            </h1>
            {/* UI IMPROVEMENT: Author/Publisher info moved up */}
            <p className="text-lg text-gray-600 mt-2">
              by <span className="font-medium text-gray-800">{item.author}</span>
              {item.publisher && (
                <>
                  {" "}
                  | Publisher:{" "}
                  <span className="font-medium text-gray-800">
                    {item.publisher}
                  </span>
                </>
              )}
            </p>

            {/* UI IMPROVEMENT: Larger, clearer price block */}
            <div className="text-3xl font-bold my-4 flex items-center space-x-3">
              {condition === "Old" && item.discountOld > 0 ? (
                <>
                  <span className="text-green-600">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <span className="text-base font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                    {item.discountOld}% off
                  </span>
                </>
              ) : condition === "New" && item.discountNew > 0 ? (
                <>
                  <span className="text-green-600">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <span className="text-base font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-md">
                    {item.discountNew}% off
                  </span>
                </>
              ) : (
                <span className="text-gray-900">₹{item.price.toFixed(2)}</span>
              )}
            </div>

            {/* UI IMPROVEMENT: Social proof with icon */}
            <p className="text-sm text-orange-600 mb-6 flex items-center gap-2">
              <FaRegEye />
              {viewers} people are viewing this product right now
            </p>

            {/* --- Action Block --- */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="mb-4">
                <label
                  htmlFor="condition"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Choose Item Condition
                </label>
                {/* UI IMPROVEMENT: Styled select dropdown */}
                <select
                  id="condition"
                  value={condition}
                  onChange={handleConditionChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  disabled={availableConditions.length === 0}
                >
                  {availableConditions.map((cond) => {
                    const isNewOutOfStock =
                      cond === "New" && item.quantityNew === 0;
                    const isOldOutOfStock =
                      cond === "Old" && item.quantityOld === 0;
                    const label = `${cond}${
                      isNewOutOfStock || isOldOutOfStock
                        ? " (Out of Stock)"
                        : ""
                    }`;
                    return (
                      <option
                        key={cond}
                        value={cond}
                        disabled={isNewOutOfStock || isOldOutOfStock}
                      >
                        {label}
                      </option>
                    );
                  })}
                  {availableConditions.length === 0 && (
                    <option value="" disabled>
                      No conditions available
                    </option>
                  )}
                </select>
              </div>

              {/* UI IMPROVEMENT: Button grid for better responsive layout */}
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  // UI IMPROVEMENT: Styled primary button (orange)
                  className="w-full bg-orange-500 text-white p-3 font-semibold rounded-lg shadow-sm hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    isOutOfStock ||
                    (condition === "New" && item.quantityNew === 0) ||
                    (condition === "Old" && item.quantityOld === 0)
                  }
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  // UI IMPROVEMENT: Styled secondary button (dark)
                  className="w-full bg-gray-800 text-white p-3 font-semibold rounded-lg shadow-sm hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={
                    isOutOfStock ||
                    (condition === "New" && item.quantityNew === 0) ||
                    (condition === "Old" && item.quantityOld === 0)
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* --- Details Block --- */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Product Details
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900 w-24 inline-block">
                    Description:
                  </span>
                  {item.description || "No description available."}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900 w-24 inline-block">
                    Tags:
                  </span>
                  {item.tags.join(", ") || "No tags available"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900 w-24 inline-block">
                    Category:
                  </span>
                  {item.subCategory || "Non-Academics"}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-900 w-24 inline-block">
                    Delivery:
                  </span>
                  Est. {item.estimatedDelivery || "5 days"}
                </p>
              </div>

              {/* UI IMPROVEMENT: Clearer stock display */}
              <div className="mt-4 space-y-2">
                <h3 className="text-md font-medium text-gray-900">
                  Stock Availability:
                </h3>
                <div className="flex gap-4">
                  <span
                    className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
                      item.quantityNew > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.quantityNew > 0 ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )}
                    New: {item.quantityNew}
                  </span>
                  <span
                    className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
                      item.quantityOld > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.quantityOld > 0 ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )}
                    Old: {item.quantityOld}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Reviews Section --- */}
        {/* UI IMPROVEMENT: Clearer separation and better form styling */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">
            Reviews ({reviews.length})
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Form */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Write a Review
              </h3>
              {showSuccessMessage ? (
                <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                  <p className="font-semibold text-green-800">
                    Thanks for your feedback!
                  </p>
                  <p className="text-sm text-green-700">
                    Your review is pending approval.
                  </p>
                </div>
              ) : (
                <>
                  {reviewError && (
                    <p className="text-red-600 text-sm mb-4">{reviewError}</p>
                  )}
                  {isLoggedIn ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Rating
                        </label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`cursor-pointer ${
                                star <= rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } hover:text-yellow-400 transition-colors`}
                              size={28}
                              onClick={() => handleRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="review"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="review"
                          value={reviewDescription}
                          onChange={(e) => setReviewDescription(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          rows={4}
                          placeholder="Write your review here..."
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email (Optional)
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white p-3 font-semibold rounded-lg shadow-sm hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!!error || isOutOfStock}
                      >
                        Submit Review
                      </button>
                    </form>
                  ) : (
                    <p className="text-gray-600">
                      Please{" "}
                      <Link
                        href="/login"
                        className="text-orange-600 font-medium hover:underline"
                      >
                        log in
                      </Link>{" "}
                      to write a review.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  // UI IMPROVEMENT: Review card for better separation
                  <div
                    key={review._id}
                    className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
                  >
                    <p className="text-md font-semibold text-gray-900">
                      {review.bookId.title}
                    </p>
                    <div className="flex items-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                          size={18}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {review.comment}
                    </p>
                    <p className="text-xs text-gray-500">
                      By <span className="font-medium">{review.name}</span> on{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
                  <p className="text-gray-600">
                    No approved reviews yet.
                    <br />
                    Be the first to review this item!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}