export default{
    install: (App, options)=>{
        App.config.globalProperties.$message = (html)=>{
            M.toast({html});
        }
        App.config.globalProperties.$messageErr = (html)=>{
            M.toast({html: `Ошибка: ${html}`});
        }
    }
}