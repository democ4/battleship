import gamepharse2 from './js.js'


function game(){
    const container1 = document.querySelector(".playercontain");
    let k=10;
    createSketch(container1,k);
    function createSketch(container,k){
        container.style.gridTemplateColumns= `repeat(${k},10%)` ;
        container.style.gridTemplateRows=  `repeat(${k},10%)` ;
        for(let i=0 ;i<k;i++){
            for (let j = 0 ; j<k; j++){

                let  div = document.createElement("div");
                div.classList =`girdnode node-${i}-${j}`
                container.appendChild(div);
            }
        }
    }
    let settingMap = []
    for (let i=0 ;i<14 ; i++ ){
        settingMap[i]  =  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    let choosedShip ="non"
    function shiplength(shipname){
        if (shipname == "ship1")return 5
        if (shipname == "ship2")return 4
        if (shipname == "ship3")return 3
        if (shipname == "ship4")return 2
        if (shipname == "ship5")return 2
    }
    const allShipbody = document.querySelectorAll(".ship")
    allShipbody.forEach(x => x.addEventListener("click",changeChooseship))
    function changeChooseship(){
        console.log(this.classList[1])
        choosedShip = this.classList[1]
    }
    let shiplocatelog = { 
        "ship1" : [],
        "ship2" : [],
        "ship3" : [],
        "ship4" : [],
        "ship5" : []
    }
    const girdnode = document.querySelectorAll(".playercontain >.girdnode")
    girdnode.forEach(x => x.addEventListener("click",setShiponborad))
    function setShiponborad(){
        
        if(choosedShip != "non"){
            let k = this.classList[1].split("-")
            let pointer = [parseInt (k[1]),parseInt(k[2])]
            
            
            
            if (settingMap [pointer[0] ][ pointer[1]] == 0){
                
                let keep = []
                
                for ( let i = 0 ; i < shiplength(choosedShip)  ; i++){
                    if(pointer[1]+i>9)return 0
                    if (settingMap  [pointer[0] ][pointer[1]+i] !=0 && settingMap  [pointer[0] ][pointer[1]+i] != choosedShip  ) return 0
                    keep.push([pointer[0] , pointer[1]+i] )
                    
                }

                if(shiplocatelog[choosedShip]!= [] ) shiplocatelog[choosedShip].forEach(x   =>    { settingMap[x[0]][x[1]] =0  })
                keep.forEach(x => {settingMap[x[0]][x[1]]= choosedShip })
                shiplocatelog[choosedShip]=keep 

                
                
            }
            else if (settingMap [pointer[0] ][pointer[1]] == choosedShip){
                let keep = []
                if (settingMap [pointer[0]][pointer[1]+1] == choosedShip||settingMap [pointer[0]][pointer[1]-1] == choosedShip ){
                    
                    for ( let i = 0 ; i < shiplength(choosedShip)  ; i++){
                        if(  pointer[0]+i > 9 ) return 0;
                        if (settingMap[pointer[0]+i ][pointer[1]] !==0 &&  settingMap[pointer[0]+i ][pointer[1]] != choosedShip ) {console.log('end hortal 1 '); return 0}
                        keep.push([pointer[0]+i , pointer[1]] )
                    }
                }else{
                    for ( let i = 0 ; i < shiplength(choosedShip)  ; i++){
                        if(  pointer[1]+i > 9 ) return 0;
                        if (settingMap[pointer[0] ][pointer[1]+i] !=0&&  settingMap[pointer[0]+i ][pointer[1]] != choosedShip  ) {console.log('end'); return 0}
                        keep.push([pointer[0] , pointer[1]+i] )      
                    }
                }

                shiplocatelog[choosedShip].forEach(x   =>    { settingMap[x[0]][x[1]] =0  })
                keep.forEach(x => {settingMap[x[0]][x[1]]= choosedShip })
                shiplocatelog[choosedShip]=keep


            }
            
            flashcoloronmap();
        }
        
    }
    function flashcoloronmap(){
        
        document.querySelectorAll(".girdnode").forEach(x => x.style.backgroundColor = "")
        
        if (shiplocatelog.ship1  != []){
            let nodelist = []
            shiplocatelog.ship1.forEach(x =>   nodelist.push( document.querySelector(`.node-${x[0]}-${x[1]}`) )    )
            changeColer("ship1",nodelist)
        }
        if (shiplocatelog.ship2  != []){
            let nodelist = []
            shiplocatelog.ship2.forEach(x =>   nodelist.push( document.querySelector(`.node-${x[0]}-${x[1]}`) )    )
            changeColer("ship2",nodelist)
        }
        if (shiplocatelog.ship3  != []){
            let nodelist = []
            shiplocatelog.ship3.forEach(x =>   nodelist.push( document.querySelector(`.node-${x[0]}-${x[1]}`) )    )
            changeColer("ship3",nodelist)
        }

        if (shiplocatelog.ship4  != []){
            let nodelist = []
            shiplocatelog.ship4.forEach(x =>   nodelist.push( document.querySelector(`.node-${x[0]}-${x[1]}`) )    )
            changeColer("ship4",nodelist)
        }
        
        if (shiplocatelog.ship5  != []){
            let nodelist = []
            shiplocatelog.ship5.forEach(x =>   nodelist.push( document.querySelector(`.node-${x[0]}-${x[1]}`) )    )
            changeColer("ship5",nodelist)
        }
        
        

    }
    function changeColer(shipname, nodeaddress){
        nodeaddress.forEach(x => x.style.backgroundColor = `${shipcolor[shipname]}`)
        shipcolor[shipname]
    }
    const shipcolor = {
        "ship1" : "red",
        "ship2" : "blue",
        "ship3" : "green",
        "ship4" : "aqua",
        "ship5" : "gray"
    }
    document.querySelector("#donebutton").addEventListener("click",nextPharse)
    function nextPharse(){
        let ans =  Object.values( shiplocatelog)
        if(   ans.every(x => x .length !=0)){
            // change to next pharse
        document.querySelector(".cpcontain ").classList.remove("hide")
            document.querySelector(".setshipcontain").classList.add("hide")
            cleancontain()
            gamepharse2(ans)
        }   
    }
}

function cleancontain(){
    const container1 = document.querySelector(".playercontain");
    const container2 =  document.querySelector(".cpcontain ");
    while(container1.lastChild){
      container1.removeChild(container1.lastChild)
  }

  while(container2.lastChild){
    container2.removeChild(container2.lastChild)
}
}

game()

document.querySelector(".restartbutton").addEventListener("click",undogameset)

function undogameset(){
    cleancontain();
    document.querySelector(".cpcontain ").classList.add("hide")
    document.querySelector(".setshipcontain").classList.remove("hide")
    document.querySelector(".float").classList.add("hide")

    document.querySelector(".youwin").classList.add("hide")
    document.querySelector(".youlose").classList.add("hide")
    
    game()
}


function gamepoint(winner){
    document.querySelector(".float").classList.remove("hide")
    if(winner==1){
        document.querySelector(".youwin").classList.remove("hide")
    }
    else{
        document.querySelector(".youlose").classList.remove("hide")

    }
}