
function buildGET(){
    let datas=new Array()
    let params=window.location.search
    params=params.replace('?','');
    let paramsTab=params.split('&');
    for(let i=0;i<paramsTab.length;i++){
        let param=paramsTab[i].split('=')
        datas[param[0]]=param[1]
    }
    return datas
}
export default buildGET
