function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

try {

var drop2html = '<div class="dropdown"><button class="dropbtn" id="drop2">Loading...</button><div class="dropdown-content" id="drop2content"><button>Loading...</button></div></div>';

var drop3html = '<div class="dropdown"><button class="dropbtn" id="drop3">Loading...</button><div class="dropdown-content" id="drop3content"><button>Loading...</button></div></div>';

// Goes inside id "links-table"

// Link buttons
// Only the ones needed will be shown.
// Replace %s with link
var link1html = '<tr><td id="link1-td" class="lbutton"><a target="_blank" href="%s">Quick guide</a></td></tr>';
var link2html = '<tr><td id="link2-td" class="lbutton"><a target="_blank" href="%s">Clinican manual</a></td></tr>';
var link3html = '<tr><td id="link3-td" class="lbutton"><a target="_blank" href="%s">Training videos</a></td></tr>';
var link4html = '<tr><td id="link4-td" class="lbutton"><a target="_blank" href="%s">Full manual</a></td></tr>';
var link5html = '<tr><td id="link5-td" class="lbutton"><a target="_blank" href="%s">Technical / advanced</a></td></tr>';
var link6html = '<tr><td id="link6-td" class="lbutton"><a target="_blank" href="%s">Other training</a></td></tr>';

console.log("o hello");
console.log("why you looking at the console?");

function arrayContains(needle, arrhaystack) {
  return (arrhaystack.indexOf(needle) > -1);
}

// Function for editing elements. Will be run on button click.
function editElement(id,text) {
  document.getElementById(id).innerHTML = text;
}

// Convert the raw text into a JavaScript Object
console.log("\nGetting JSON data from file...");
var rawData = loadFile("data.json");
console.log("TypeOf rawData: "+typeof(rawData));
console.log("Contents of rawData: "+rawData);

console.log("Attempting to parse JSON (rawData)");
var data = JSON.parse(rawData);
console.log("Success! :D");

var drop1val = "Please select type";
var drop2val = "Please select manufacturer";
var drop3val = "Please select model";
var used = [];

function getDropdownData2() {
  console.log("\nGetting data for dropdown menu 2");
  console.log(" -Clearing 'used'");
  used = [];
  console.log(" -Clearing dropdown");
  document.getElementById("drop2").innerHTML = "Please select manufacturer";
  console.log(" -Clearing dropdown content");
  document.getElementById("drop2content").innerHTML = "";
  for (n=0; n < Object.keys(data.equipment).length; n++) {
    console.log(" RUN "+n.toString());
    if (data.equipment[n].type == drop1val) {
      if (used.indexOf(data.equipment[n].manufacturer) > -1) {
        console.log("   -Data found in used, moving on");
      } else {
        console.log("   -Data not in used");
        console.log("   -Adding to used");
        used.push(data.equipment[n].manufacturer);
        console.log("   -Adding option to dropdown");
        let add = '<button onclick="changeVal(\'drop2\', \''+data.equipment[n].manufacturer+
        '\')">'+data.equipment[n].manufacturer+'</button>';
        document.getElementById("drop2content").innerHTML = document.getElementById("drop2content").innerHTML+add;
      }
    } else {
      console.log("   -Didn't find a item of the correct type, moving on");
    }
  }
  console.log("Done!");
}

function getDropdownData3() {
  console.log("\nGetting data for dropdown menu 3");
  console.log(" -Clearing 'used'");
  used = [];
  console.log(" -Clearing dropdown");
  document.getElementById("drop3").innerHTML = "Please select model";
  console.log(" -Clearing dropdown content");
  document.getElementById("drop3content").innerHTML = "";
  for (n=0; n < Object.keys(data.equipment).length; n++) {
    console.log(" RUN "+n.toString());
    if (data.equipment[n].type == drop1val && data.equipment[n].manufacturer == drop2val) {
      if (used.indexOf(data.equipment[n].model) > -1) {
        console.log("   -Data found in used, moving on");
      } else {
        console.log("   -Data not in used");
        console.log("   -Adding to used");
        used.push(data.equipment[n].manufacturer);
        console.log("   -Adding option to dropdown");
        let add = '<button onclick="changeVal(\'drop3\', \''+data.equipment[n].model+
        '\')">'+data.equipment[n].model+'</button>';
        document.getElementById("drop3content").innerHTML = document.getElementById("drop3content").innerHTML+add;
      }
    } else {
      console.log("   -Didn't find a item of the correct type, moving on");
    }
  }
  console.log("Done!");
}

function getLinkData() {
  console.log("\nGetting data for links...");
  console.log(" -Clearing table");
  document.getElementById("links-table").innerHTML = "";
  for (n=0; n < Object.keys(data.equipment).length; n++) {
    console.log(" RUN "+n.toString());
    if (data.equipment[n].type == drop1val && data.equipment[n].manufacturer == drop2val && data.equipment[n].model == drop3val) {


      if (typeof(data.equipment[n].quick_guide) != 'undefined') {
        let add = '<tr><td id="link1-td" class="lbutton"><a target="_blank" href="'+ data.equipment[n].quick_guide +'">Quick guide</a></td></tr>';
        document.getElementById("links-table").innerHTML = document.getElementById("links-table").innerHTML+add;
      } else {
        console.log("\nUnable to find quick guide data for requested item.");
      }
      
      if (typeof(data.equipment[n].clinican_manual) != 'undefined') {
        let add = '<tr><td id="link2-td" class="lbutton"><a target="_blank" href="'+data.equipment[n].clinican_manual+'">Clinican manual</a></td></tr>';
        document.getElementById("links-table").innerHTML = document.getElementById("links-table").innerHTML + add;
      } else {
        console.log("\nUnable to find clinican manual data for requested item.");
      }

      if (typeof(data.equipment[n].training_videos) != 'undefined') {
        let add = '<tr><td id="link3-td" class="lbutton"><a target="_blank" href="'+data.equipment[n].training_videos+'">Training videos</a></td></tr>';
        document.getElementById("links-table").innerHTML = document.getElementById("links-table").innerHTML + add;
      } else {
        console.log("\nUnable to find training videos data for requested item.");
      }

      if (typeof(data.equipment[n].full_manual) != 'undefined') {
        let add = '<tr><td id="link4-td" class="lbutton"><a target="_blank" href="'+data.equipment[n].full_manual+'">Full manual</a></td></tr>';
        document.getElementById("links-table").innerHTML = document.getElementById("links-table").innerHTML + add;
      } else {
        console.log("\nUnable to find full manual data for requested item.");
      }

      if (typeof(data.equipment[n].technical_advanced) != 'undefined') {
        let add = '<tr><td id="link5-td" class="lbutton"><a target="_blank" href="'+data.equipment[n].technical_advanced+'">Technical / Advanced</a></td></tr>';
        document.getElementById("links-table").innerHTML = document.getElementById("links-table").innerHTML + add;
      } else {
        console.log("\nUnable to find technical / advanced data for requested item.");
      }

      if (typeof(data.equipment[n].other_training) != 'undefined') {
        let add = '<tr><td id="link6-td" class="lbutton"><a target="_blank" href="'+data.equipment[n].other_training+'">Other training</a></td></tr>';
        document.getElementById("links-table").innerHTML = document.getElementById("links-table").innerHTML + add;
      } else {
        console.log("\nUnable to find other training data for requested item.");
      }

      if (
        typeof(data.equipment[n].quick_guide) == "undefined" &&
        typeof(data.equipment[n].clinican_manual) == "undefined" &&
        typeof(data.equipment[n].training_videos) == "undefined" &&
        typeof(data.equipment[n].full_manual) == "undefined" &&
        typeof(data.equipment[n].technical_advanced) == "undefined" &&
        typeof(data.equipment[n].other_training) == "undefined"
      ) {
        console.warn("No link data was found at all for the requested item!");
        document.getElementById("nolinks").innerHTML = "No links were found for the requested item. Sorry :(";
      }


    }
  }
  console.log("Done!");
}


function changeVal(dropdown, tochange) {
  if (dropdown == "drop1") {
    document.getElementById("nolinks").innerHTML="";
    document.getElementById("links-table").innerHTML = "";
    drop1val = tochange;
    document.getElementById("drop1").innerHTML = tochange;

    if (document.getElementById("drop2col").innerHTML == "") {
      console.log("\nDropdown 2 does not exist, creating it.");
      document.getElementById("drop2col").innerHTML = drop2html;
      getDropdownData2();
    } else {
      document.getElementById("drop2").innerHTML = "Please select manufacturer";
      getDropdownData2();
    }

    document.getElementById("drop3col").innerHTML = "";

  } else if (dropdown == "drop2") {
    document.getElementById("nolinks").innerHTML="";
    document.getElementById("links-table").innerHTML = "";
    drop2val = tochange;
    document.getElementById("drop2").innerHTML = tochange;

    if (document.getElementById("drop3col").innerHTML == "") {
      console.log("\nDropdown 3 does not exist, creating it.");
      document.getElementById("drop3col").innerHTML = drop3html;
      getDropdownData3();
    } else {
      document.getElementById("drop3").innerHTML = "Please select model";
      getDropdownData3();
    }

  } else if (dropdown == "drop3") {
    document.getElementById("nolinks").innerHTML="";
    document.getElementById("links-table").innerHTML = "";
    drop3val = tochange;
    document.getElementById("drop3").innerHTML = tochange;
    // Also add create links
    getLinkData();

  } else {
    console.warn("\nAttempted to switch dropdown "+dropdown+" to "+tochange+", but it does not exist.");
  }
}

window.onload = function() {
  console.log("\nClearing links table...");
  document.getElementById("links-table").innerHTML = "";

  var drop1 = document.getElementById("drop1");
  var drop1content = document.getElementById("drop1content");

  drop1val = "Please select type";
  drop1.innerHTML = drop1val;

  
  console.log("\nRunning check to create list for drop1...");
  drop1content.innerHTML = '';
  console.log("Cleared drop1 options.");
  used = [];
  console.log("Cleared used.");
//}

  for (n=0; n < Object.keys(data.equipment).length; n++) {
    //let used = [];
    console.log(" RUN "+n.toString());

    if (used.indexOf(data.equipment[n].type) > -1) {
      console.log("   -Type was found in 'used', moving on...");
    } else {
      console.log("   -'used' does not contain type");

      used.push(data.equipment[n].type);
      console.log("   -Pushed type to front of 'used'");

      let add = '<button onclick="changeVal(\'drop1\', \''+data.equipment[n].type+
      '\')">'+data.equipment[n].type+'</button>';
      drop1content.innerHTML = drop1content.innerHTML+ add;
      console.log("   -Generated button");
      console.log("     Button content:");
      console.log("     "+add);
    }
  }

  document.getElementById("status").innerHTML = "Web app appears to be working correctly! :D";
  document.getElementById("subheader").style.backgroundColor = "rgb(130, 223, 94)";
  document.getElementById("subheader").style.color = "rgb(61, 124, 35)";
}

} catch(e){
  window.onload=function() {
    document.getElementById("subheader").style.backgroundColor = "rgb(235, 80, 80)";
    document.getElementById("subheader").style.color = "rgb(114, 27, 27)";
    document.getElementById("status").innerHTML="An error occured. Please check the console log for more info.";
    console.error("\nA error occured which caused the program to stop unexpectedly.\nError info:");
    console.error(e);
  }

}