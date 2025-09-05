document.addEventListener('DOMContentLoaded', () => {
    renderview()
    
})

async function API(api,method,body =null) {
    const res = await fetch(`/admin/${api}`, {
        method :method,
        body : body,
        headers:{
            "Content-Type" : "application/json"
        }
    });
    const data = await res.json();
    // console.log(data)
    return data
}

function renderview() {
    document.getElementById('ViewProfile').addEventListener('click', async (e) => {
        e.preventDefault()

        const id = e.target.dataset.id
        // console.log(id)

        try {   
            const api = `DetailAccount/${id}`
            const detail = await API(api,"GET");

            console.log("dữ liệu" + detail.data.username);

            let renderForm = `
            <div class="pt-8 pb-12 px-7 z-10 relative xl:mt-8 before:absolute before:inset-0 before:opacity-[.07] before:bg-foreground before:rounded-4xl after:absolute after:inset-0 after:bg-[color-mix(in_oklch,_var(--color-background),_var(--color-foreground)_2%)] after:rounded-4xl after:border after:border-foreground/[.15] dark:after:opacity-[.59]">
                <div class="relative z-20">
                    <div class="flex items-center mt-8">
                        <h2 class="mr-auto text-lg font-medium">Chi tiết tài khoản</h2>
                    </div>
                    <div class="tabs relative w-full">
                        <!-- BEGIN: Profile Info -->
                        <div class="box relative before:absolute before:inset-0 before:mx-3 before:-mb-3 before:border before:border-foreground/10 before:bg-background/30 before:shadow-[0px_3px_5px_#0000000b] before:z-[-1] before:rounded-xl after:absolute after:inset-0 after:border after:border-foreground/10 after:bg-background after:shadow-[0px_3px_5px_#0000000b] after:rounded-xl after:z-[-1] after:backdrop-blur-md p-0 mt-5">
                            <div class="flex flex-col p-5 border-b lg:flex-row">
                                <div class="flex items-center justify-center flex-1 px-5 lg:justify-start">
                                    <div class="relative">
                                        <span data-content="" class="tooltip border-(--color)/5 block relative flex-none overflow-hidden rounded-full ring-1 ring-(--color)/25 [--color:var(--color-primary)] border-5 size-20 sm:size-24 lg:size-32" alt="Midone - Tailwind Admin Dashboard Template">
                                            <img class="absolute top-0 size-full object-cover" src="${detail.data.image}">
                                        </span>
                                        <div class="bg-(--color)/70 border-3 border-background absolute bottom-0 right-0 mb-1 mr-1 flex items-center justify-center rounded-full p-2 text-white [--color:var(--color-primary)]">
                                            <i data-lucide="camera" class="stroke-[1.5] [--color:currentColor] stroke-(--color) fill-(--color)/25 size-4"></i>
                                        </div>
                                    </div>
                                    <div class="ml-5">
                                        <div class="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                                            ${detail.data.username}
                                        </div>
                                        <div class="opacity-70">${detail.data.role_id === 1 ? 'Người dùng' : 'Doanh nghiệp'}</div>
                                    </div>
                                </div>
                                <div class="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 lg:border-t-0 lg:pt-0">
                                    <div class="font-medium text-center lg:mt-3 lg:text-left">
                                        chi tiết
                                    </div>
                                    <div class="flex flex-col items-center justify-center mt-4 lg:items-start">
                                        <div class="flex items-center truncate sm:whitespace-normal">
                                            <i data-lucide="mail" class="stroke-[1.5] [--color:currentColor] stroke-(--color) fill-(--color)/25 mr-2 size-4"></i>
                                            Email :${detail.data.email}
                                        </div>
                                        <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                                            <i data-lucide="instagram" class="stroke-[1.5] [--color:currentColor] stroke-(--color) fill-(--color)/25 mr-2 size-4"></i>
                                            Instagram :
                                            Không có
                                        </div>
                                        <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                                            <i data-lucide="twitter" class="stroke-[1.5] [--color:currentColor] stroke-(--color) fill-(--color)/25 mr-2 size-4"></i>
                                            Twitter :
                                            Không có
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END: Profile Info -->
                             <div class="box relative p-5 before:absolute before:inset-0 before:mx-3 before:-mb-3 before:border before:border-foreground/10 before:bg-background/30 before:shadow-[0px_3px_5px_#0000000b] before:z-[-1] before:rounded-xl after:absolute after:inset-0 after:border after:border-foreground/10 after:bg-background after:shadow-[0px_3px_5px_#0000000b] after:rounded-xl after:z-[-1] after:backdrop-blur-md mt-2">
                                    <form id="edit">
                                            <div class="flex flex-col gap-2.5"><label for="crud-form-1" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Số điện thoại</label>
                                                <input value="${detail.data.phone}" disabled class="h-10 rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full" id="crud-form-1" type="text" placeholder="Số điện thoại">
                                            </div>
                                            
                                            <div class="flex flex-col gap-2.5 mt-3">
                                            <label for="crud-form-3" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tỉnh</label>
                                                <div class="flex">
                                                    <input value="" disabled class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-e-none border-e-0" type="text" placeholder="Tên tỉnh">

                                                </div>
                                            </div>
                                            <div class="flex flex-col gap-2.5 mt-3"><label for="crud-form-4" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Huyện</label>
                                                <div class="flex">
                                                    <input disabled class="h-10 w-full rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-e-none border-e-0" type="text" placeholder="Tên huyện">

                                                </div>
                                            </div>
                                             <div class="flex flex-col gap-2.5 mt-3">
                                                <label for="crud-form-2" class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Trạng thái</label>
                                                <select name="status" id="status" class="h-10 rounded-md border bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full" id="crud-form-2">
                                                    <option value="active" ${detail.data.status === 'active' ? 'select' : ''} ${detail.data.status === 'active' ? 'checked' : ''}  >Mở</option>
                                                    <option value="inactive" ${detail.data.status === 'inactive' ? 'select' : ''} ${detail.data.status === 'inactive' ? 'checked' : ''}>Khóa</option>
                                                </select>
                                            </div>
                                            <div class="mt-5 text-right">
                                                <button id="cancel"class="[--color:var(--color-foreground)] cursor-pointer inline-flex border items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-(--color) hover:bg-(--color)/5 bg-background border-(--color)/20 h-10 px-4 py-2 mr-1 w-24" type="button">
                                                   Quay lại
                                                </button>
                                                <button id="save" data-id="${detail.data.id}" class="cursor-pointer inline-flex border items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-(--color)/20 border-(--color)/60 text-(--color) hover:bg-(--color)/5 [--color:var(--color-primary)] h-10 px-4 py-2 w-24" type="button">
                                                    Lưu
                                                </button>
                                            </div>
                                           
                                        </form>
                                        </div>
                    </div>
                </div>
            </div>
            `
            document.getElementById('mt').innerHTML = renderForm
            updateStatus()
        } catch (error) {
            console.log("lỗi" + error)
        }

    })
}

function updateStatus(){
    document.getElementById('save').addEventListener('click',async (e)=>{
        try {

            const status1 = document.getElementById('status').value;

            const id = e.target.dataset.id;

            const url = `UpdateAccount/${id}`
            
            const res = await API(url,"POST",JSON.stringify({status:status1}));
            
            console.log(res);

            if(res.status === 200){
            
                    alert("chỉnh sửa thành công")
                    window.location.reload();

            }
        } catch (error) {
            console.log("lỗi"+error+status1)
        }
    })
}