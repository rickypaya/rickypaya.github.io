let playbtn;
let sVol;
let Th1;
let Th2;
let Th3;
let Th1Btn;
let Th2Btn;
let Th3Btn;
let WatchInput1;
let WatchInput2;
let WatchInput3;
let vSelect;
let w;
let avgw;
let fftBands;
let avgsCount;

let song;
let fft;
let controlW = 512;
let controlH = 256;
let displayW = 512;
let displayH = 512;

let state = {
    T1: false,
    T2: false,
    T3: false,
    enableWaveform: false,
    displayfill : [0,0,0],
};

function preload() {
    song = loadSound("party.mp3", loaded);
}

function setup() {
    //vars
    fftBands = 64;
    avgBands = 8;
    // create
    let cnv = createCanvas(controlW, controlH + displayH);
    w = controlW/2/fftBands;
    avgw = controlW/2/avgBands;

    sVol = createSlider(0, 1, 0.5, 0.01);
    Th1 = createSlider(0, 256, 150, 1);
    Th2 = createSlider(0, 256, 100, 1);
    Th3 = createSlider(0, 256, 50, 1);
    Th1Btn = createButton("On");
    Th2Btn = createButton("Off");
    Th3Btn = createButton("Off");
    enableWaveform = createButton("WF Off");
    watchInput1 = createInput();
    watchInput2 = createInput();
    watchInput3 = createInput();
    fft = new p5.FFT(0.5, fftBands);
    vSelect = createSelect();

    //pos
    sVol.position(100, 10);
    Th1.position(100, 35);
    Th2.position(100, 60);
    Th3.position(100, 85);
    Th1Btn.position(50,30);
    Th2Btn.position(50, 55);
    Th3Btn.position(50, 80);
    watchInput1.position(80, 30);
    watchInput2.position(80, 55);
    watchInput3.position(80, 80);
    enableWaveform.position(controlW/2 - 75, controlH-25);
    playbtn.position(25,controlH-25);
    vSelect.position(controlW/4-65, controlH-25);
    vSelect.option('DJVJ - S1');
    vSelect.selected('DJVJ - S1');
    
    //callbacks
    enableWaveform.mousePressed(() => {
        if(!state.enableWaveform){
            enableWaveform.html("WF On");
            state.enableWaveform = false;
        }else{
            enableWaveform.html("WF Off");
            state.enableWaveform = true;
        }
    });
    Th1Btn.mousePressed(() => {
        if(Th1Btn.html() == "On"){
            Th1Btn.html("Off");
        }else{
            Th1Btn.html("On");
        }
    });
    Th2Btn.mousePressed(() => {
        if(Th2Btn.html() == "On"){
            Th2Btn.html("Off");
        }else{
            Th2Btn.html("On");
        }
    });
    Th3Btn.mousePressed(() => {
        if(Th3Btn.html() == "On"){
            Th3Btn.html("Off");
        }else{
            Th3Btn.html("On");
        }
    });

    //size
    watchInput1.size(20);
    watchInput2.size(20);
    watchInput3.size(20);

    //val
    watchInput1.value('1');
    watchInput2.value('5');
    watchInput3.value('8');
}

function togglePlay() {
    if(song.isPlaying()){
        song.pause();
        playbtn.html("Play");
    }else{
        song.play();
        song.setVolume(0.5);
        playbtn.html("Pause");
    }
}
function loaded(){
    console.log("loaded");
    playbtn = createButton("Play");
    playbtn.mousePressed(togglePlay);
}

function triggerTH1() {
    state.displayfill[0] = random(255);
    state.displayfill[1] = random(255);
    state.displayfill[2] = random(255);
}

function draw() {
    let sums = Array(avgBands).fill(0);
    let Th1Y = map(Th1.value(), 0, 256, 256, 0);
    let Th2Y = map(Th2.value(), 0, 256, 256, 0);
    let Th3Y = map(Th3.value(), 0, 256, 256, 0);
    let Avg1Pos = int(watchInput1.value()) - 1;
    let Avg2Pos = int(watchInput2.value()) - 1;
    let Avg3Pos = int(watchInput3.value()) - 1;
    let spectrum = fft.analyze();
    song.setVolume(sVol.value());
    background(255);
    
    for(let i = 0; i < spectrum.length; i++){
        let j = spectrum[i];
        
        let sumsInd = Math.floor(i / avgBands);
        sums[sumsInd] += int(j);
    }
    
    let avgs = sums.map((sum) => {
        let bandsPerAvg = spectrum.length / avgBands;
        return sum/bandsPerAvg;
    });

    //red averages graph
    strokeWeight(3);
    for(let a = 0; a < avgs.length; a++){
        q = avgs[a];
        let avgy = map(q, 0, 255, controlH, 0);
        fill(255, 24, 100);
        stroke(255, 24, 100);
        switch(a){
            case Avg1Pos:
                if(Th1Btn.html() == "On"){
                    fill(135, 100, 0);
                    stroke(135, 100, 0);
                    if(avgy < Th1Y){
                        triggerTH1();
                    }
                }
                break;
            case Avg2Pos:
                if(Th2Btn.html() == "On"){
                    fill(135, 150, 40);
                    stroke(135, 150, 40);
                }
                break;
            case Avg3Pos:
                if(Th3Btn.html() == "On"){
                    fill(205, 100, 0);
                    stroke(205, 100, 0);
                }
                break;
        }
        rect(a*avgw + 256, avgy, avgw, controlH-avgy);
    }

    // //yellow spectrum graph
    if(state.enableWaveform){
        stroke(255, 204, 0); //yellow fft graph
        fill(255, 204, 0); //yellow fft graph
        strokeWeight(1);
        for(let i = 0; i < spectrum.length; i++){
            let j = spectrum[i];
            let y = map(j, 0, 256, controlH, 0);
            rect(i*w+256, y, w, controlH-y);
        }
    }

    switch(vSelect.value()){
        case 'DJVJ - S1':
            ellipseMode(RADIUS);
            fill(state.displayfill[0], state.displayfill[1], state.displayfill[2]);
            ellipse(displayW/2,controlH+(displayH/2), displayW/2, avgs[Avg1Pos]);
            break;
    }
    

    noFill();
    if(Th1Btn.html() == "On"){
        stroke(135, 100, 0);
        line(256, Th1Y , 512, Th1Y);
    }
    if(Th2Btn.html() == "On"){
        stroke(135, 150, 40);
        line(256, Th2Y , 512, Th2Y);
    }
    if(Th3Btn.html() == "On"){
        stroke(205, 100, 0);
        line(256, Th3Y , 512, Th3Y);
    }
    
    strokeWeight(3);
    stroke(0);
    rect(0,0, controlW/2, controlH);
    rect(255, 0, controlW/2, controlH);
    rect(0, controlH, displayW, displayH);
}