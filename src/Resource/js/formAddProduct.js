
// document.addEventListener('DOMContentLoaded', () => {
//     formAdd();
// })
// console.log("hi")
// function formAdd() {
//     try {
//         document.getElementById('addProduct').addEventListener('click', () => {
//             const render = document.getElementById('mt');
//             const list = `
//                         <form id="formAddproduct"  method="post",>
//                             <div class="mt-8 flex items-center">
//                                 <h2 class="mr-auto text-lg font-medium">Thêm bài đăng</h2>
//                             </div>
//                             <div class="mt-5 grid grid-cols-12 gap-6">
//                                 <div class="col-span-12 lg:col-span-7">
//                                     <!-- BEGIN: Form Layout -->
//                                     <div class="box relative p-5 before:absolute before:inset-0 before:mx-3 before:-mb-3 before:border before:border-foreground/10 before:bg-background/30 before:shadow-[0px_3px_5px_#0000000b] before:z-[-1] before:rounded-xl after:absolute after:inset-0 after:border after:border-foreground/10 after:bg-background after:shadow-[0px_3px_5px_#0000000b] after:rounded-xl after:z-[-1] after:backdrop-blur-md">
//                                         <div class="flex flex-col gap-2.5"><label for="crud-form-1" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Product Name</label>
//                                             <input class="h-10 rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full" id="crud-form-1" type="text" placeholder="Input text">
//                                         </div>
//                                         <div class="flex flex-col gap-2.5 mt-3">
//                                         <label for="crud-form-2" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
//                                             <select data-config="{}" class="h-10 rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed  w-full" id="crud-form-2">
//                                                 <option value="1" selected="">Sport & Outdoor</option>
//                                                 <option value="2">PC & Laptop</option>
//                                                 <option value="3" selected="">Smartphone & Tablet</option>
//                                                 <option value="4">Photography</option>
//                                             </select>
//                                         </div>
//                                         <div class="flex flex-col gap-2.5 mt-3"><label for="crud-form-3" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Quantity</label>
//                                             <div class="flex">
//                                                 <input class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-e-none border-e-0" type="text" placeholder="Quantity">
//                                                 <div class="bg-(--color)/[.03] border-(--color)/[.08] text-(--color)/70 flex w-16 items-center justify-center rounded-e-lg border [--color:var(--color-foreground)]">
//                                                     pcs</div>
//                                             </div>
//                                         </div>
//                                         <div class="flex flex-col gap-2.5 mt-3"><label for="crud-form-4" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Weight</label>
//                                             <div class="flex">
//                                                 <input class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-e-none border-e-0" type="text" placeholder="Weight">
//                                                 <div class="bg-(--color)/[.03] border-(--color)/[.08] text-(--color)/70 flex w-16 items-center justify-center rounded-e-lg border [--color:var(--color-foreground)]">
//                                                     grams</div>
//                                             </div>
//                                         </div>
//                                         <div class="flex flex-col gap-2.5 mt-3"><label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Price</label>
//                                             <div class="grid-cols-3 gap-2 sm:grid">
//                                                 <div class="flex">
//                                                     <div class="bg-(--color)/[.03] border-(--color)/[.08] text-(--color)/70 flex items-center justify-center rounded-s-lg border px-3 [--color:var(--color-foreground)]">
//                                                         Unit</div>
//                                                     <input class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-s-none border-s-0" type="text" placeholder="Unit">
//                                                 </div>
//                                                 <div class="mt-2 flex sm:mt-0">
//                                                     <div class="bg-(--color)/[.03] border-(--color)/[.08] text-(--color)/70 flex items-center justify-center rounded-s-lg border px-3 [--color:var(--color-foreground)]">
//                                                         Wholesale</div>
//                                                     <input class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-s-none border-s-0" type="text" placeholder="Wholesale">
//                                                 </div>
//                                                 <div class="mt-2 flex sm:mt-0">
//                                                     <div class="bg-(--color)/[.03] border-(--color)/[.08] text-(--color)/70 flex items-center justify-center rounded-s-lg border px-3 [--color:var(--color-foreground)]">
//                                                         Bulk</div>
//                                                     <input class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-s-none border-s-0" type="text" placeholder="Bulk">
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="flex flex-col gap-2.5 mt-3"><label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Active Status</label>
//                                             <div class="relative h-6 w-11">
//                                                 <input class="peer relative z-10 size-full cursor-pointer opacity-0" type="checkbox">
//                                                 <div class="bg-foreground/15 peer-checked:bg-foreground absolute inset-0 rounded-full transition-all">
//                                                 </div>
//                                                 <div class="z-4 bg-background absolute inset-0 inset-y-0 my-auto ml-0.5 size-5 rounded-full shadow transition-[margin] ease-linear peer-checked:ml-[1.35rem]">
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="flex flex-col gap-2.5 mt-3"><label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
//                                             <div class="editor">
//                                                 <p>Content of the editor.</p>
//                                             </div>
//                                         </div>
//                                         <div class="mt-5 text-right">
//                                             <button class="[--color:var(--color-foreground)] cursor-pointer inline-flex border items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-(--color) hover:bg-(--color)/5 bg-background border-(--color)/20 h-10 px-4 py-2 mr-1 w-24" type="button">
//                                                 Cancel
//                                             </button>
//                                             <button class="cursor-pointer inline-flex border items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-(--color)/20 border-(--color)/60 text-(--color) hover:bg-(--color)/5 [--color:var(--color-primary)] h-10 px-4 py-2 w-24" type="button">
//                                                 Save
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <!-- END: Form Layout -->
//                                 </div>
//                                 <div class="col-span-12 lg:col-span-3">
//                                     <div class="box relative p-5 before:absolute before:inset-0 before:mx-3 before:-mb-3 before:border before:border-foreground/10 before:bg-background/30 before:shadow-[0px_3px_5px_#0000000b] before:z-[-1] before:rounded-xl after:absolute after:inset-0 after:border after:border-foreground/10 after:bg-background after:shadow-[0px_3px_5px_#0000000b] after:rounded-xl after:z-[-1] after:backdrop-blur-md">
//                                         <div class="flex flex-col gap-2.5 mt-3"><label for="crud-form-2" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
//                                                 <select data-config="{}" class="tom-select w-full" id="crud-form-2" multiple="multiple">
//                                                     <option value="1" selected="">Sport & Outdoor</option>
//                                                     <option value="2">PC & Laptop</option>
//                                                     <option value="3" selected="">Smartphone & Tablet</option>
//                                                     <option value="4">Photography</option>
//                                                 </select>
//                                             </div>
//                                         <div class="flex flex-col gap-2.5 mt-3"><label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
//                                                 <div class="editor">
//                                                     <p>Content of the editor.</p>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                         </form>
        
//         `

//             render.innerHTML = list
//         })

//     } catch (error) {

//     }
// }