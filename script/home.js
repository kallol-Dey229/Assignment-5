const loadIssue = () =>{
    manageSpinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((response) => response.json())
    .then((json) => {
        displayIssue(json.data);
    });
}


const loadCardDetail = (id) =>{
    manageSpinner(true);
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((response) => response.json())
    .then((json) => {
        displayWordDetails(json.data);  
    });
}



const manageSpinner = (status) =>{
    if(status== true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('issue-container').classList.add('hidden');
    }
    else{
        document.getElementById('issue-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}




const displayWordDetails = (issue) =>{

    const detailsBox = document.getElementById('details-container');

    detailsBox.innerHTML = `
    <div class="p-5 bg-slate-50 rounded-lg space-y-7">

        <h1 class="text-xl font-bold">${issue.title}</h1>

        <div class="flex gap-3 items-center">
            <button class="btn ${issue.status === "open" ? "btn-success" : "btn-info"} btn-md mr-4">${issue.status}
            </button>

            <p class = "text-gray-500">Opened by ${issue.author}</p>
            <p class = "text-gray-500">${issue.createdAt}</p>
        </div>

        <div class="flex gap-2 flex-wrap">${createLabels(issue.labels)}</div>

        <p class = "text-gray-600">${issue.description}</p>

        <div class="flex gap-70">
            <div>
                <p class="text-gray-500">Assignee:</p>
                <h2>${issue.author}</h2>
            </div>

            <div>
                <p class="text-gray-500">Priority:</p>
                <button class="btn ${issue.priority === 'high' ? 'btn-error': issue.priority === 'medium'? 'btn-warning' : 'btn-btn-secondary text-gray-600'} rounded-md px-7 py-0">${issue.priority} </button>
            </div>
        </div>

    </div>
    `;

    manageSpinner(false);

    document.getElementById('word_modal').showModal();

}





allButton = document.getElementById('all-btn');
openButton = document.getElementById('open-btn');
closeButton = document.getElementById('closed-btn');
const toggleStyle = (id) => {
    
    //remove style from all button, if have
    allButton.classList.remove('bg-blue-800', 'text-white');
    openButton.classList.remove('bg-blue-800', 'text-white');
    closeButton.classList.remove('bg-blue-800', 'text-white');


    //adding new classes to all button
    allButton.classList.add('btn', 'btn-primary', 'btn-soft');
    openButton.classList.add('btn', 'btn-primary', 'btn-soft');
    closeButton.classList.add('btn', 'btn-primary', 'btn-soft');


    const selected = document.getElementById(id);
    currentStatus = id;

    // removing and then adding styles in the clicked button
    selected.classList.remove('btn', 'btn-primary', 'btn-soft');
    selected.classList.add('bg-blue-800', 'text-white', 'btn');




manageSpinner(true);

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(json => {

        const issues = json.data;

        if(id === "all-btn"){
            displayIssue(issues);
            document.getElementById('issue-count').innerText = `${issues.length} Issues`;
        }

        else if(id === "open-btn"){

            const openIssues = issues.filter(issue => issue.status === "open");
            displayIssue(openIssues);
            document.getElementById('issue-count').innerText = `${openIssues.length} Issues`;

        }

        else if(id === "closed-btn"){

            const closedIssues = issues.filter(issue => issue.status === "closed");
            displayIssue(closedIssues);
            document.getElementById('issue-count').innerText = `${closedIssues.length} Issues`;

        }
        
        manageSpinner(false);

    });


}



const displayIssue = (issues) => {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = "";

    issues.forEach(issue => {
        const card = document.createElement('div');
        card.innerHTML = `

        <div class="pt-[5px] rounded-md ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"} ">

        <div class="card bg-white shadow-sm space-y-6 p-5 h-full">
        
        <div class="card-header flex items-center justify-between">
            <img class="" src="${issue.status ==='open' ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}" alt="">
            <button onclick ="loadCardDetail(${issue.id})" class="btn ${
            issue.priority === 'high' ? 'btn-error': issue.priority === 'medium'? 'btn-warning' : 'btn-btn-secondary btn-outline text-gray-500'} btn-soft rounded-full px-7 py-0">${issue.priority}
        </button>
        </div>
        <div class="card-text space-y-2">
            <h2 class="text-xl font-bold">${issue.title}</h2>
            <p class="text-gray-600">${issue.description}</p>
        </div>

        <div class="bug-help-btn flex gap-2 flex-wrap">
            ${createLabels(issue.labels)}
        </div>
        <hr class="bg-gray-200">
        <div class="card-bottom space-y-2">
            <p class="text-gray-600">#1 by ${issue.author}</p>
            <p class="text-gray-600">${issue.createdAt}</p>
        </div>
    </div>
        `;
        issueContainer.append(card);
    });
manageSpinner(false);
};


const createLabels = (levels) => {

    const labels = levels.map(level => {

        if(level === "bug"){
            return `<button class="btn btn-error btn-outline rounded-full"><i class="fa-solid fa-bug"></i>BUG</button>`;
        }

        else if(level === "help wanted"){
            return `<button class="btn btn-warning btn-outline rounded-full"><i class="fa-regular fa-life-ring"></i>HELP WANTED</button>`;
        }


        else if(level === "enhancement"){
            return `<button class="btn btn-success btn-outline rounded-full"><i class="fa-brands fa-galactic-republic"></i>ENHANCEMENT</button>`;
        }


        else if(level === "good first issue"){
            return `<button class="btn btn-primary btn-outline rounded-full"><i class="fa-solid fa-check"></i>Good First Issue</button>`;
        }

        else if(level === "documentation"){
            return `<button class="btn btn-accent btn-outline rounded-full"><i class="fa-solid fa-file"></i>Documentation</button>`;
        }


        return `<button class="btn btn-outline rounded-full">${level}</button>`;

    });

    return labels.join(" ");
}


loadIssue();




// search

document.getElementById('btn-search').addEventListener('click', () => {

    const inputSearch = document.getElementById('input-search');
    const searchValue = inputSearch.value.trim().toLowerCase();
manageSpinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response => response.json())
    .then(json => {

        const allIssues = json.data;

        const filteredIssues = allIssues.filter(issue =>issue.title.toLowerCase().includes(searchValue));

        displayIssue(filteredIssues);

        document.getElementById('issue-count').innerText =
            `${filteredIssues.length} Issues`;

            manageSpinner(false);
    });
});