// "use client";
// import { Book } from "@/app/admin/order-product-management/types";
// // import Link from "next/link";
// import Image from "next/image";

// interface BookCardProps {
//   book: Book;
// }

// const BookCard: React.FC<BookCardProps> = ({ book }) => {
//   const hasDiscount = book.discountedPrice <  book.price;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md w-full h-full flex flex-col justify-between">
//       <div className="w-full h-[200px] overflow-hidden">
//         <Image
//           src={book.imageUrl}
//           alt={book.title}
//           width={200}
//           height={200}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-2 text-center flex-grow">
//         <p className="text-sm text-black line-clamp-2">{book.title}</p>
//         {hasDiscount ? (
//           <>
//             <p className="text-red-500 line-through">
//               ₹{book.price.toFixed(2)}
//             </p>
//             <p className="text-green-600 font-bold">
//               ₹{book.discountedPrice.toFixed(2)}
//             </p>
//           </>
//         ) : (
//           <p className="text-green-600 font-bold">₹{book.price.toFixed(2)}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookCard;




// app/components/herosection/BookCard.tsx
"use client";
import { Book } from "@/app/admin/order-product-management/types";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const hasDiscount = book.discountedPrice < book.price;

  return (
    // Added hover transition for a subtle lift
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm w-full h-full flex flex-col bg-white hover:shadow-xl transition-all duration-300 group">
      
      {/* Image container: Use aspect-ratio and object-contain */}
      <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden relative">
        <Image
          src={book.imageUrl}
          alt={book.title}
          fill // Use fill to respect aspect ratio container
          sizes="(max-width: 640px) 192px, 224px" // Optimize image loading
          // object-contain is better for book covers
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content container */}
      <div className="p-3 text-left flex-grow flex flex-col">
        {/* Fixed height for title to prevent layout shifts */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 h-10">
          {book.title}
        </h3>
        {/* Pushes prices to the bottom */}
        <div className="mt-auto">
          {hasDiscount ? (
            <>
              <p className="text-sm text-gray-500 line-through">
                ₹{book.price.toFixed(2)}
              </p>
              <p className="text-lg text-green-700 font-bold">
                ₹{book.discountedPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-lg text-green-700 font-bold">
              ₹{book.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;