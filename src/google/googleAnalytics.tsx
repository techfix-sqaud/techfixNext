// // GoogleAnalytics.tsx

// import React from "react";
// import Script from "next/script";

// const GoogleAnalytics = () => {
//   return (
//     <>
//       <Script
//         strategy="lazyOnload"
//         src={`async src="https://www.googletagmanager.com/gtag/js?id=G-7CX0HWB9JS"`}
//       />

//       <Script id="" strategy="lazyOnload">
//         {`
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
//               page_path: window.location.pathname,
//               });
//           `}
//       </Script>
//     </>
//   );
// };

// export default GoogleAnalytics;
