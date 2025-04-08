// // app/centro-de-conocimiento/page.js
// import { fetchFAQs, fetchBlogPosts } from '/lib/api'
// import Link from 'next/link'
// import Image from 'next/image'

// export const metadata = {
//   title: 'Centro de Conocimiento | My Drive Academy',
//   description: 'Recursos, guías, y consejos para conductores principiantes y avanzados. Aprende sobre seguridad vial, reglas de tránsito y más.',
// }

// export default async function KnowledgeCenterPage() {
//   const [faqs, blogPosts] = await Promise.all([
//     fetchFAQs(),
//     fetchBlogPosts()
//   ])
  
//   // Group FAQs by category
//   const faqsByCategory = faqs.reduce((acc, faq) => {
//     if (!acc[faq.category]) {
//       acc[faq.category] = []
//     }
//     acc[faq.category].push(faq)
//     return acc
//   }, {})
  
//   const categories = Object.keys(faqsByCategory)
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Centro de Conocimiento</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
          
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               {categories.map((category) => (
//                 <div key={category} className="mb-8">
//                   <h3 className="text-xl font-semibold mb-4">{category}</h3>
                  
//                   <div className="space-y-4">
//                     {faqsByCategory[category].map((faq) => (
//                       <div key={faq.id} className="border-b border-gray-200 pb-4">
//                         <h4 className="font-medium mb-2">{faq.question}</h4>
//                         <p className="text-gray-600">{faq.answer}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Artículos Recientes</h2>
          
//           <div className="space-y-6">
//             {blogPosts.slice(0, 5).map((post) => (
//               <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 {post.featured_image && (
//                   <div className="relative h-48">
//                     <Image
//                       src={`http://localhost:8000${post.featured_image}`}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 )}
                
//                 <div className="p-4">
//                   <h3 className="font-bold text-lg mb-2">{post.title}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-3">
//                     {post.excerpt || post.content.substring(0, 150) + '...'}
//                   </p>
                  
//                   <div className="flex justify-between items-center text-sm">
//                     <span className="text-gray-500">{new Date(post.published_date).toLocaleDateString()}</span>
                    
//                     <Link
//                       href={`/centro-de-conocimiento/blog/${post.slug}`}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       Leer más
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-6 text-center">
//             <Link
//               href="/centro-de-conocimiento/blog"
//               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               Ver todos los artículos
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }