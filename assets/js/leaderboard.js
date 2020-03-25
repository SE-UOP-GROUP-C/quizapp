async function loadLeaderboard(){
    const url = '/';
    const res = await fetch(url);
    console.log(res)
    const result = await res.json();
    console.log(result)
    console.log("Cat")
    
    document.getElementById("leaderboard").innerHTML = result;
    
}



loadLeaderboard()

