// import {client} from "../sanity.js";
// import imageUrlBuilder from '@sanity/image-url';
//
// const builder = imageUrlBuilder(client);
//
// function urlFor(source) {
//     return builder.image(source);
// }
//
// export async function fetchAboutImage() {
//     const query = `*[_type == "aboutImage" && !(_id in path("drafts.**"))][0]`;
//     const data = await client.fetch(query);
//
//     if (data?.photo) {
//         const imgEl = document.querySelector('.hello-image');
//         if (imgEl) {
//             imgEl.src = urlFor(data.photo).width(400).height(400).url();
//         }
//     }
// }