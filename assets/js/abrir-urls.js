const defaultHTML =
`
<div class="box-container">
            <div class="title-container">
                <h1 span="pageTitle">Abrir Todas as URLs</h1>
                </div>
        <span class="textareaTitle">
            Insira todas as URLs abaixo:
        </span>

        <div class="textarea-container form-group">
            <textarea name="urls" id="textareaLinks" class="form-control textarea" cols="80" rows="15"></textarea>
        </div>

        <div class="check-container">
            <input type="checkbox" id="transformHtml" class="check">
            <label for="transformHtml" class="check">Transformar todos as linhas em links</label>
        </div>
        
        <div class="btn-container">
        <button class="submitButton btns" onclick="validateUrls()"> <b>&nbsp;Validar URLs&nbsp;</b> </button>
        <button class="resetButton btns" onclick="resetLinks()"> &nbsp;Apagar tudo&nbsp; </button>
        </div>
        
        </div>
`
const linkInsertSection = document.getElementById('linkInsert')
let finalUrlArray = [];

function validateUrls(){
    let urlArray = (document.getElementById("textareaLinks").value).split('\n');
    
    for (let i = 0; i < urlArray.length; i++) {
        const linha = i+1;
        const url = urlArray[i];
        let isLink = false;
        
        const checkBox = document.getElementById('transformHtml');

        if (checkBox.checked == true){
            if ((url.startsWith('http://') == true) || (url.startsWith('https://') == true)) {
                isLink = true;
                finalUrlArray.push(url)
                }

            else{
                isLink = false;
                newUrl = `http://`+`${url}`
                if (newUrl == `http://`){
                }

                else{
                finalUrlArray.push(newUrl)
                }
            }
        }



        else{

        if ((url.startsWith('http://') == true) || (url.startsWith('https://') == true)) {
        isLink = true;
        finalUrlArray.push(url)
        }
        else{
        isLink = false;
        }
    }
        
        console.log(`Linha ${linha}: ${url} - ${isLink}`)
    }

    let tableHTML = ''

    for (let i = 0; i < finalUrlArray.length; i++) {
        
        let URLtoTable = 
        `
        <tr>
        <td width="80">${(i)+1})</td>
        <td><a href="${finalUrlArray[i]}" target="_blank" title="${finalUrlArray[i]}">${finalUrlArray[i]}</a></td>
        </tr>
        `

        tableHTML = tableHTML.concat("\n",URLtoTable);
        
    }

    linkInsertSection.innerHTML = 
    `
    <div class="box-container">
                <div class="title-container">
                    <h1 span="pageTitle">Abrir Todas as URLs</h1>
                    </div>
            <span class="textareaTitle">
                URLs inseridas:
            </span>
            <br/>
    
            <div class="table-responsive">
				
            <table class="table table-bordered">
            
            <tbody>
            
            ${tableHTML}
            
            </tbody>
            
            </table>
        
            </div>
            
            <div class="btn-container">
            <button class="openButton btns" onclick="openUrls()"> <b>&nbsp;Abrir URLs&nbsp;(${finalUrlArray.length} abas) </b></button>
            <button class="resetButton btns" onclick="resetLinks()"> &nbsp;Inserir outros links&nbsp; </button>
            </div>
            </div>
    `

}

function resetLinks(){
    finalUrlArray = [];
    linkInsertSection.innerHTML = defaultHTML
}

function openUrls(){
    for (let i = 0; i < finalUrlArray.length; i++) {
        let parsedURL = finalUrlArray[i].replace(/&amp;/g, '&');
        window.open(parsedURL,`${parsedURL}`)
    }
    

}