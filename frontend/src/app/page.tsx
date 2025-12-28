// src/app/page.tsx
//import '../styles/globals.css';
// export default function HomePage() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Welcome to the Form Builder App</h1>
//       <p className="mb-6">Choose an option below:</p>
//       <ul className="space-y-4">
//         <li>
//           <a href="/create-form" className="text-blue-500 hover:underline">
//             ➕ Create a New Form
//           </a>
//         </li>
//         <li>
//           <a href="/forms/1" className="text-blue-500 hover:underline">
//             🔍 View Form with ID 1 (Example)
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

//old
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// type FormItem = {
//   id: number;
//   title: string;
//   description?: string;
//   created_at?: string;
// };

// export default function HomePage() {
//   const [recentForms, setRecentForms] = useState<FormItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRecentForms();
//   }, []);

//   const fetchRecentForms = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/forms?limit=5');
//       const data = await res.json();
//       setRecentForms(data.forms || []);
//     } catch (err) {
//       console.error('Failed to fetch forms:', err);
//       // Fallback to demo data if API fails
//       setRecentForms([
//         { id: 1, title: 'Customer Feedback Survey', description: 'Share your experience' },
//         { id: 2, title: 'Event Registration Form', description: 'Sign up for upcoming events' },
//         { id: 3, title: 'Contact Us Form', description: 'Get in touch with our team' },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}
//       >
//         {/* Gradient Overlay for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-teal-900/60 to-green-900/70"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex flex-col">
//         {/* Header/Navigation */}
//         <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-bold text-white">FormBuilder</h2>
//             </div>
//             <Link
//               href="/create-form"
//               className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-200 border border-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Create Form
//             </Link>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
//           <div className="max-w-6xl w-full">
//             <div className="text-center mb-12">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                 Build Beautiful Forms
//                 <br />
//                 <span className="text-emerald-300">In Minutes</span>
//               </h1>
//               <p className="text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
//                 Create, customize, and share forms with ease. No coding required.
//               </p>
              
//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                 <Link
//                   href="/create-form"
//                   className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                   Create New Form
//                 </Link>
                
//                 <button
//                   onClick={() => document.getElementById('recent-forms')?.scrollIntoView({ behavior: 'smooth' })}
//                   className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-bold text-lg border-2 border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                   Browse Forms
//                 </button>
//               </div>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
//                 <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
//                 <p className="text-emerald-100">Create forms in minutes with our intuitive drag-and-drop builder.</p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
//                 <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">Fully Responsive</h3>
//                 <p className="text-emerald-100">Your forms look perfect on any device, from mobile to desktop.</p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
//                 <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
//                 <p className="text-emerald-100">No technical skills needed. Anyone can create beautiful forms.</p>
//               </div>
//             </div>

//             {/* Recent Forms Section */}
//             <div id="recent-forms" className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                   Recent Forms
//                 </h2>
//                 <Link
//                   href="/create-form"
//                   className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
//                 >
//                   View All
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </div>

//               {loading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
//                 </div>
//               ) : recentForms.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {recentForms.map((form) => (
//                     <Link
//                       key={form.id}
//                       href={`/forms/${form.id}`}
//                       className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
//                           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                         </div>
//                         <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
//                           #{form.id}
//                         </span>
//                       </div>
//                       <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
//                         {form.title}
//                       </h3>
//                       {form.description && (
//                         <p className="text-sm text-slate-600 line-clamp-2">
//                           {form.description}
//                         </p>
//                       )}
//                       <div className="mt-4 flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
//                         View Form
//                         <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <h3 className="text-xl font-semibold text-slate-700 mb-2">No forms yet</h3>
//                   <p className="text-slate-500 mb-6">Create your first form to get started</p>
//                   <Link
//                     href="/create-form"
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200"
//                   >
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                     Create First Form
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10">
//           <div className="max-w-7xl mx-auto text-center text-emerald-100 text-sm">
//             <p>© 2024 FormBuilder. Built with care for better forms.</p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }


//main code -

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// type FormItem = {
//   id: number;
//   title: string;
//   description?: string;
//   created_at?: string;
// };

// export default function HomePage() {
//   const [recentForms, setRecentForms] = useState<FormItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRecentForms();
//   }, []);

//   const fetchRecentForms = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/forms?limit=5');
//       const data = await res.json();
//       setRecentForms(data.forms || []);
//     } catch (err) {
//       console.error('Failed to fetch forms:', err);
//       // Fallback to demo data if API fails
//       setRecentForms([
//         { id: 1, title: 'Customer Feedback Survey', description: 'Share your experience' },
//         { id: 2, title: 'Event Registration Form', description: 'Sign up for upcoming events' },
//         { id: 3, title: 'Contact Us Form', description: 'Get in touch with our team' },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Optimized Background - CSS Gradient Only (Instant Load) */}
//       <div className="absolute inset-0 z-0">
//         {/* Multi-layer gradient for nature effect */}
//         <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900"></div>
//         <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800/50 via-transparent to-teal-700/30"></div>
//         {/* Subtle texture pattern */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//           }}
//         ></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex flex-col">
//         {/* Header/Navigation */}
//         <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
//                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h2 className="text-xl font-bold text-white">FormBuilder</h2>
//             </div>
//             <Link
//               href="/create-form"
//               className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-200 border border-white/20"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Create Form
//             </Link>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
//           <div className="max-w-6xl w-full">
//             <div className="text-center mb-12">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//                 Build Beautiful Forms
//                 <br />
//                 <span className="text-emerald-300">In Minutes</span>
//               </h1>
//               <p className="text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
//                 Create, customize, and share forms with ease.
//               </p>
              
//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//                 <Link
//                   href="/create-form"
//                   className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                   Create New Form
//                 </Link>
                
//                 <button
//                   onClick={() => document.getElementById('recent-forms')?.scrollIntoView({ behavior: 'smooth' })}
//                   className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-bold text-lg border-2 border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                   Browse Forms
//                 </button>
//               </div>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
//                 <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
//                 <p className="text-emerald-100">Create forms in minutes with our intuitive drag-and-drop builder.</p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
//                 <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">Fully Responsive</h3>
//                 <p className="text-emerald-100">Your forms look perfect on any device, from mobile to desktop.</p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
//                 <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
//                   <svg className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
//                 <p className="text-emerald-100">No technical skills needed. Anyone can create beautiful forms.</p>
//               </div>
//             </div>

//             {/* Recent Forms Section */}
//             <div id="recent-forms" className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//                   Recent Forms
//                 </h2>
//                 <Link
//                   href="/create-form"
//                   className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
//                 >
//                   View All
//                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </Link>
//               </div>

//               {loading ? (
//                 <div className="flex items-center justify-center py-12">
//                   <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
//                 </div>
//               ) : recentForms.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {recentForms.map((form) => (
//                     <Link
//                       key={form.id}
//                       href={`/forms/${form.id}`}
//                       className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
//                           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                         </div>
//                         <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
//                           #{form.id}
//                         </span>
//                       </div>
//                       <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
//                         {form.title}
//                       </h3>
//                       {form.description && (
//                         <p className="text-sm text-slate-600 line-clamp-2">
//                           {form.description}
//                         </p>
//                       )}
//                       <div className="mt-4 flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
//                         View Form
//                         <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   <h3 className="text-xl font-semibold text-slate-700 mb-2">No forms yet</h3>
//                   <p className="text-slate-500 mb-6">Create your first form to get started</p>
//                   <Link
//                     href="/create-form"
//                     className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200"
//                   >
//                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                     Create First Form
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </main>

//         {/* Footer */}
//         {/* <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10">
//           <div className="max-w-7xl mx-auto text-center text-emerald-100 text-sm">
//             <p>© 2024 FormBuilder. Built with care for better forms.</p>
//           </div>
//         </footer> */}
//       </div>
//     </div>
//   );
// }

// src/app/page.tsx

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
//import LoginPage from './LoginPage'; // Adjust the path if necessary

type FormItem = {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  response_count?: string;
};

export default function HomePage() {
  const [recentForms, setRecentForms] = useState<FormItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Check if the user is logged in
  //const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('user');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = typeof window !== 'undefined' && sessionStorage.getItem('user');
    
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    fetchRecentForms();
  }, [router]); // Fixed: Added router to dependencies
  //current
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push('/login'); // Redirect to login if not logged in
  //   } else {
  //     fetchRecentForms();
  //   }
  // }, [isLoggedIn,router]);

  // useEffect(() => {
  //   fetchRecentForms();
  // }, []);

    const fetchRecentForms = async () => {
        try {
                const res = await fetch('http://localhost:5000/api/forms?limit=6', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            //setRecentForms(data.forms || []);
            if (data.success && data.forms) {
                setRecentForms(data.forms);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            console.error('Failed to fetch forms:', err);
            setError(err instanceof Error ? err.message : 'Failed to load forms');
        // Fallback to demo data if API fails
        setRecentForms([
            { id: 1, title: 'Customer Feedback Survey', description: 'Share your experience' },
            { id: 2, title: 'Event Registration Form', description: 'Sign up for upcoming events' },
            { id: 3, title: 'Contact Us Form', description: 'Get in touch with our team' },
        ]);
        } finally {
        setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchRecentForms();
    };

    
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized Background - CSS Gradient Only (Instant Load) */}
      <div className="absolute inset-0 z-0">
        {/* Multi-layer gradient for nature effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800/50 via-transparent to-teal-700/30"></div>
        {/* Subtle texture pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header/Navigation */}
        <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white">FormBuilder</h2>
            </div>
            <Link 
              href="/create-form"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg font-semibold transition-all duration-200 border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Form
            </Link>

            {/* Link to Login if not logged in */}
                {/* {!isLoggedIn && (
                  <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95">
                    Go to Login
                  </Link>
                )} */}
            {/* {!isLoggedIn && (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 border border-white/20"
              >
                Login
              </Link>
            )} */}
            {/* check for only user  */}
            <Link 
              href="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Build Beautiful Forms
                <br />
                <span className="text-emerald-300">In Minutes</span>
              </h1>
              <p className="text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
                Create, customize, and share forms with ease.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/create-form"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Form
                </Link>
                
                <button
                  onClick={() => document.getElementById('recent-forms')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl font-bold text-lg border-2 border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Browse Forms
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-emerald-100">Create forms in minutes with our intuitive drag-and-drop builder.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Fully Responsive</h3>
                <p className="text-emerald-100">Your forms look perfect on any device, from mobile to desktop.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Easy to Use</h3>
                <p className="text-emerald-100">No technical skills needed. Anyone can create beautiful forms.</p>
              </div>
            </div>

            {/* Recent Forms Section */}
            <div id="recent-forms" className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Recent Forms
                </h2>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 text-sm sm:text-base transition-all disabled:opacity-50"
                        title="Refresh forms"
                    >
                        <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    <Link 
                        href="/create-form"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
                    >
                        Create New
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>
                {/* <Link 
                  href="/create-form"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 text-sm sm:text-base"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link> */}
              </div>
               
                {error && !loading && (
                    <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <p className="text-sm text-yellow-800">
                        Unable to connect to server. Showing sample data.
                        </p>
                    </div>
                    </div>
                )}
                          
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                </div>
              ) : recentForms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentForms.map((form) => (
                    <Link
                      key={form.id}
                      href={`/forms/${form.id}`}
                      className="group bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-200 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
                          #{form.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {form.title}
                      </h3>
                      {form.description && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {form.description}
                        </p>
                      )}
                      {form.response_count && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {form.response_count} responses
                        </div>
                       )}
                      <div className="mt-4 flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        View Form
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No forms yet</h3>
                  <p className="text-slate-500 mb-6">Create your first form to get started</p>
                  <Link
                    href="/create-form"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create First Form
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        {/* <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-emerald-100 text-sm">
            <p>© 2024 FormBuilder. Built with care for better forms.</p>
          </div>
        </footer> */}
      </div>
    </div>
  );
}