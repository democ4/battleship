function gamepharse2(locateLog){
    class ship{
    constructor(length,position){
        this.length=length;   //  4
        let k = []
        for(let i =0 ;i<length ;i++)k[i]=0
        this.hited=k                                        // [0,0,0,0]
        this.position=position    // [[1,1],[1,2],[1,3],[1,4]]
    }
    hit(locate){   // locate : [x,y]
        for(let i =0 ; i<this.length;i++){
            if(this.position[i][0]==locate[0]  && this.position[i][1] == locate[1]){
                this.hited[i]=1;
                break;
            } 
        }   
    }
    isSunk(){ 
        return this.hited.every(x=>x==1) 
        // if  all of position is 1(hited) return true  else return false
    }
}
class gameBoard{
    constructor(){
        this.holemap =  []
        for (let i = 0; i < 10; i++) {
            this.holemap[i] = [];
        }
        this.ships = [];
        this.downship=[];
    }
    addship(ship){
        // if ship .position in holemap == 0
        if (  ship.position.every (  spot  =>    this.holemap[    spot[0]   ][    spot[1]     ]  === undefined )){
            
            
            // add ship to ships
            this.ships.push(ship);
            //make holemap in ship position  = that ship
            ship.position.forEach(spot => {
                this.holemap[spot[0]][spot[1]]  = ship
            });
        }   // if position already have ship alert
        else{ console.log("ship place overwrite")
    }
}
receiveAttack(locate){
       // if   locate has ship    locate.ship.hited()
       if (this.holemap[locate[0]][locate[1]] != undefined ) {

            console.log(this.holemap[locate[0]][locate[1]])
            
            this.holemap[locate[0]][locate[1]].hit(locate)
            
            
            if( this.holemap[locate[0]][locate[1]].isSunk()){
                this.downship.push(this.holemap[locate[0]][locate[1]])
                
                console.log("boom") ////////// ship down point
            }
            return true
        }
        return false
    }
    reportLose(){
        if(this.downship.length == this.ships.length){
            return true
            console.log("game")////////   game point
        } 
        return false
    }
}
class player{
    constructor(name,board,){
        this.name = name;
        this.board = board;
        this.showboard = new Array;
        for (let i = 0; i < 10; i++) {
            ///   0 for unknow   1 for hit    2 for miss 
            this.showboard[i] = [0,0,0,0,0,0,0,0,0,0];
        }
    }
}


const  board1  =new gameBoard();

for(let i = 0 ; i< locateLog.length ; i++){
       board1.addship(new ship(locateLog[i].length,locateLog[i]))
}
const player1 = new player("p1",board1)

let comships = createRamdonships()
const board2 = new gameBoard();

for(let i = 0 ; i<comships.length ; i++){
    board2.addship(new ship(comships[i].length,comships[i]))
}
const player2 = new player("com",board2)


function createRamdonships(){
    let map = []
    for(let i =  0; i < 14 ; i ++){
        map[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    let Comshiplog = []
    for(let ii =  0; ii <5 ; ii ++){
        Comshiplog[ii] = []
    }

    
    let quize = [ 5,4,3,2,2]
    let done = [0,0,0,0,0]
    for (let j = 0 ; j < 5 ; j++){

        while (done[j] == 0 ){
            let x=  Math.floor( Math.random() * (10))  ;
            let y=  Math.floor( Math.random() * (10))  ;
            if(map[x][y] == 0 ){
                let temp ;
                if(temp=checkRightEmpty(quize[j],x,y)){
                    done[j] = 1
                    Comshiplog[j]=temp
                    break;
                }
                if(temp= checkDownEmpty(quize[j],x,y)){
                    done[j] = 1
                    Comshiplog[j]=temp
                    break;
                }   
                  if(temp= checkLeftEmpty(quize[j],x,y)){
                    done[j] = 1
                    Comshiplog[j]=temp
                    break;
                }     
                if( temp= checkTopEmpty(quize[j],x,y)){
                    done[j] = 1
                    Comshiplog[j]=temp
                    break;
                }


            }

        }
    }
    return Comshiplog

      //  ans.forEach(x =>  map [x[0]][x[1]] = 1  )
    function checkRightEmpty(length,x,y){
        let ans = []
        for(let i = 0 ;i < length ; i ++){
            if(map[x][y+i]!= 0 || y+i >9 ) return false
            ans.push([x,y+i])
        }
        ans.forEach(x =>  map [x[0]][x[1]] = 1  )
        return ans
    }
    function checkDownEmpty(length,x,y){
        let ans = []
        for(let i = 0 ;i < length ; i ++){
            if(map[x+i][y]!= 0 || x+i >9 ) return false
            ans.push([x+i,y])
        }
        ans.forEach(x =>  map [x[0]][x[1]] = 1  )
        return ans
    }
    function checkLeftEmpty(length,x,y){
        let ans = []
        for(let i = 0 ;i < length ; i ++){
            if(map[x][y-i]!= 0 || y-i <0 ) return false
            ans.push([x,y-i])
        }
        ans.forEach(x =>  map [x[0]][x[1]] = 1  )
        return ans
    }
    function checkTopEmpty(length,x,y){
        let ans = []
        for(let i = 0 ;i < length ; i ++){
            if(map[x-i][y]!= 0 || x-i <0 ) return false
            ans.push([x-i,y])
        }
        ans.forEach(x =>  map [x[0]][x[1]] = 1  )
        return ans
    }

}



function attacked (player,bulltelocate){    
    
    if( player.showboard[bulltelocate[0]][bulltelocate[1]]!=0) return false
    
    if(player.board.receiveAttack(bulltelocate)){
        //   markHit(bulltelocate) //** */
        player.showboard[bulltelocate[0]][bulltelocate[1]]=1
    }
    else{
        // markMIss(bulltelocate)/** */
        player.showboard[bulltelocate[0]][bulltelocate[1]]=2
    }
    return true
}
// get   locate       if  locate in players showmap isnt  0(not attarked)    get locate again


///xx <i  style="font-size: 48px" class="fas fa-times"></i>
///   fire     <i style="font-size: 48px" class="fas fa-fire-alt"></i>
/////////////////////////  /////////////// grid
const container1 = document.querySelector(".cpcontain ");
const container2 = document.querySelector(".playercontain");
let k=10;
createSketch(container1,k);
createSketch(container2,k);
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
const shipcolor = {
    "ship1" : "red",
    "ship2" : "blue",
    "ship3" : "green",
    "ship4" : "aqua",
    "ship5" : "gray"
}
colorit()
function colorit (){

        let nodelist = []
        let  ann = Object.values(locateLog)
        for ( let i = 0 ; i < ann.length ; i ++ ){
            ann[i].forEach( x =>  nodelist.push( document.querySelector(`.node-${x[0]}-${x[1]}`) ))
            changeColer("ship"+(i+1),nodelist)
            nodelist = []
        }
    
}

function changeColer(shipname, nodeaddress){
    nodeaddress.forEach(x => x.style.backgroundColor = `${shipcolor[shipname]}`)
    shipcolor[shipname]
}

//////////////////////////
const girdnode = document.querySelectorAll(".cpcontain  >.girdnode")
girdnode.forEach(x => x.addEventListener("click",returnLocate))
function returnLocate(){
    let t = this.classList[1].split("-")
    let ans = [    parseInt(t[1],10)    ,    parseInt( t[2],10)   ]
    oneGameTurn(ans);
}
function flashShowMap(player,container){
    
    for(let  i  =  0 ; i<10 ; i++ ){
        for(let j = 0 ; j < 10 ; j++ ){
            if(player.showboard[i][j] == 1){
                container.querySelector(`.node-${i}-${j}`).innerHTML = `<i style="font-size: 48px" class="fas fa-fire-alt"></i>`
            }
            
            if(player.showboard[i][j] == 2){
                container.querySelector(`.node-${i}-${j}`).innerHTML = `<i  style="font-size: 48px" class="fas fa-times"></i>`
            }
        }
    }
}
function changeOneShowMap(player,container,locate){
    let i = locate[0]
    let j = locate[1]
    if(player.showboard[i][j] == 1){
        container.querySelector(`.node-${i}-${j}`).innerHTML = `<i style="font-size: 48px" class="fas fa-fire-alt"></i>`
    }
    
    if(player.showboard[i][j] == 2){
        container.querySelector(`.node-${i}-${j}`).innerHTML = `<i  style="font-size: 48px" class="fas fa-times"></i>`
    }
}
/////////////////////////


function get0to99(quzez,botmap){
    //get random from map[]   then pop it out
     if (quzez.length ==0){
    
         let index = Math.floor(Math.random()*botmap.length)
         let getter = botmap[index ]
         botmap.splice(index ,1)


    
         return getter
        }
        //set getter nesw in quzez
        let checknesw =quzez.pop()
        while(checknesw <0 || botmap.indexOf(checknesw) == -1){
            checknesw =quzez.pop()
        }
        botmap.splice( botmap.indexOf(checknesw) ,1)
        return checknesw

}    
function trans99toxy(number){
    return  [Math.floor( number/10),number%10]
}


function botlocate(){


    for(let i = 0; i<10;i++){
        for(let j = 0 ; j<10;j++){
            if(player1.showboard[i][j] == 0   ) return [i,j]
            
        }
    }
    
}


let quzez = [] //     out  var
let botmap = []  //   out var
for(let i = 0 ; i < 100 ;i ++ ) botmap[i] = i

let gameend = 0
function oneGameTurn(plocate){
    if (gameend == 0 ){

        if(player2.showboard[plocate[0]][plocate[1]]!=0 )return 0;
        let locate = plocate;
        attacked(player2,locate) 
        changeOneShowMap(player2,container1,locate)
        if(player2.board.reportLose()){   console.log("game") ; gamepoint (1) ;gameend=1  }    // game point

        let getter =  get0to99(quzez,botmap)
        locate = trans99toxy (getter)  

        attacked(player1,locate)     

       if( player1.showboard[locate[0]][locate[1]] ==1 ){
        if(botmap.indexOf(getter -10) !=-1) quzez.push(getter-10)
        if(botmap.indexOf(getter +1) !=-1) quzez.push(getter+1)
        if(botmap.indexOf(getter +10) !=-1)quzez.push(getter+10)
        if(botmap.indexOf(getter -1) !=-1)quzez.push(getter-1)
       } 
        changeOneShowMap(player1,container2,locate)
        if(player1.board.reportLose()){    console.log("game")  ; gamepoint (2)  ;gameend=1}   // game point*/
    }
    
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

}

export default gamepharse2