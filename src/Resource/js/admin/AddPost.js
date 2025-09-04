ClassicEditor
    .create(document.getElementById('description'))
    .catch(error => {
            console.error(error);
        });

renderFile();

function renderFile(){
    try {
         document.getElementById('file').addEventListener('change',(e)=>{
            console.log()
            
            const file = e.target.files[0];
            document.getElementById('imagess').src = ""

            const Reader = new FileReader();
            if(file){
                Reader.onload =(event)=>{
                    
                    document.getElementById('imagess').src =event.target.result;
                    // document.getElementById('imagess').with = "100%";
                    // document.getElementById('imagess').height = "550px";
                }
            }
            Reader.readAsDataURL(file)
         })
        
    } catch (error) {
        console.log(error);
    }
}
