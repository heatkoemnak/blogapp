// import React from 'react';
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from '@material-tailwind/react';
// import { LuImagePlus } from 'react-icons/lu';
// import parse from 'html-react-parser';

// export function PreviewModal({ ...props }) {
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => setOpen(!open);

//   return (
//     <div>
//       <Button onClick={handleOpen} variant="gradient">
//         Preview your post
//       </Button>
//       <Dialog
//         className="my-14 max-h-screen max-w-full overflow-y-auto"
//         open={open}
//         handler={handleOpen}
//       >
//         {props.imageSrc && props.imageSrc.length > 0 ? (
//           <div className="grid bg-white p-5 rounded-xl grid-cols-4 gap-6">
//             {props.imageSrc.map((src, index) => (
//               <div key={index}>
//                 <img src={src} alt="Image preview" />
//               </div>
//             ))}
//             <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
//               <div className="grid gap-2">
//                 <div className="flex items-center justify-center">
//                   <label className="cursor-pointer">
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={props.handleFileChange}
//                       hidden
//                     />
//                     <h4 className="flex flex-col items-center justify-center text-center text-gray-500 text-sm font-medium leading-snug">
//                       <LuImagePlus className="text-gray-500" size={50} />
//                       Add more images
//                     </h4>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
//             <div className="grid gap-2">
//               <div className="flex items-center justify-center">
//                 <label className="cursor-pointer">
//                   <input type="file" multiple accept="image/*" hidden />
//                   <h4 className="flex flex-col items-center justify-center text-center text-gray-500 text-sm font-medium leading-snug">
//                     <LuImagePlus className="text-gray-500" size={50} />
//                     Add more images
//                   </h4>
//                 </label>
//               </div>
//             </div>
//           </div>
//         )}

//         <DialogHeader>{props.position}</DialogHeader>

//         <DialogBody>
//           <h3>Job Description</h3>
//         </DialogBody>
//         <DialogBody>
//           {!props?.description ? (
//             <p className="text-gray-400">No Description added yet</p>
//           ) : (
//             <div>{parse(props.description)}</div>
//           )}
//         </DialogBody>
//         {/* <DialogBody>
//           {props.jobResponsibilities.length === 0 ? (
//             <p className="text-gray-400">No responsibilities added yet</p>
//           ) : (
//             <div className=" pl-5 space-y-1">
//               {props.jobResponsibilities.map((responsibility, index) => (
//                 <div key={index}>{parse(responsibility.content)}</div>
//               ))}
//             </div>
//           )}
//         </DialogBody> */}
//         {/* <DialogBody>
//           {props.jobRequirements.length === 0 ? (
//             <p className="text-gray-400">No responsibilities added yet</p>
//           ) : (
//             <div className=" pl-5 space-y-1">
//               {props.jobRequirements.map((requirement, index) => (
//                 <div key={index}>{parse(requirement.content)}</div>
//               ))}
//             </div>
//           )}
//         </DialogBody> */}
//         <DialogFooter>
//           <Button
//             variant="text"
//             color="red"
//             onClick={handleOpen}
//             className="mr-1"
//           >
//             <span>Cancel</span>
//           </Button>
//           <Button variant="gradient" color="green" onClick={handleOpen}>
//             <span>Confirm</span>
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }
