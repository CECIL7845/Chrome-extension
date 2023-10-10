let myLeads = []
let oldLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        render(myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    })
   
})
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href= '${leads[i]}'> 
                ${leads[i]}
            </a>
        </li>`
    }
    
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)

})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    render(myLeads)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    console.log(localStorage.getItem("myLeads"))
})


