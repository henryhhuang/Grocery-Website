var shoppingCart = []; //Global variable for shopping cart items
var shoppingCartPrice = []; //Global variable for shopping cart prices
var clickforPrices = 0; 
var click = 0; //Desginating each item / price to the the specific element in shoppingCart
var totalPrice = 0; //Variable to add all the item's prices together.
var NumberDollar = [];
var globalItem = [];
var globalItemClicks = 0;


function showSlides() { //Automatic slideshow 
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3500); // Change image every 2 seconds
}
			

function myFunction() { // Search Bar
	// Declare variables 
	var input, filter, table, tr, td, i;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	table = document.getElementById("Invtable");
	tr = table.getElementsByTagName("tr");

	// Loop through all of the table columns at 1, 3 and 4 (1 = name, 3 = company, 4 = description
	for (i = 0; i < tr.length; i++) { //
		td = tr[i].getElementsByTagName("td")[1]; 
		td1 = tr[i].getElementsByTagName("td")[3];
		td2 = tr[i].getElementsByTagName("td")[4];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1 || td1.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1){ 
				//to check not only name, but description and company
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none"; 
			}
		} 
	}
}


function PullCSVInfo() { 
	var oFrame = document.getElementById("frmFile"); //iframe is used to open the csv file and extract info
	var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
	//extracting the the txtfile into a 1D array
	while (strRawContents.indexOf("\r") >= 0)
	strRawContents = strRawContents.replace("\r", "");
	var arrLines = strRawContents.split(","); //splitting it by commas
	var array2 = [];
	//Below is used to convert the 1D array to 2D
	for (var i = 0; i < 97; i++) { //97 Rows
		var arr = [];
		for (var j = 0; j < 7; j++) { //6 Columns in each Row
			arr.push(arrLines[(i * 7) + j]); 
		}
		array2.push(arr);
	}
	return array2;
}

function clickMe(item) {
	globalItem[globalItemClicks] = item; //used to display the item in shopping cart 
	globalItemClicks += 1;
	var itemSplit = item.split(",");
	alert(" " + item + " has been added to your cart!");
	shoppingCart[click] = itemSplit[0]; //starts click at 0, stores the item element with increasing array
	click += 1; //next element / columns
	shoppingCartPrice[clickforPrices] = itemSplit[1];
	NumberDollar[clickforPrices] = itemSplit[1].replace(/\$/g,''); //Removing the $ from the price 
	clickforPrices += 1;
}

function shoppinCart() {
	if(globalItem.length > 0){   
		for (var i = 0; i < shoppingCartPrice.length; i++) {
			totalPrice += parseFloat(NumberDollar[i]); //getting the total price of the items 
		}
		
		if (confirm("Your Shopping Cart :\n"  + globalItem.join('\n') + "\nTotal:\n" + "$" + totalPrice.toFixed(2) + //globalItem.join('\n') is used to add all the elements in the array
		"\nClick ok to continue to the checkout page, cancel to continue shopping!") == true) {
			window.location = 'CheckoutPage.html';
		} else {
			//nothing really :P
		}
	} else {
		alert("You have not bought anything yet!");
	}
}

function GenerateTable() {
	var array = PullCSVInfo();//array is 2D
	var table = "<tr>";
	for (var i = 0; i < array.length; i++) {
		table += "<tr>";
		for (var j = 0; j < array[i].length; j++) {
			if (j == 6) {
				table += "<td> <img src='CSV_Photos/" + array[i][j] + "' style ='width:250px;height:250px'>" + "<br>" //every 6th column is a picture 
				+ "<center> " + '<button id="btn" onClick="clickMe(\''+ array[i][1] + ',' + array[i][5] + '\')"> Buy / Add To Cart </button> </td>' + "</center>"; //button onclick takes (name+price)
			} else {
				table += "<td>" + array[i][j] + "</td>";
			}
		}
	  table += "</tr>";
	}
	document.getElementById("Invtable").innerHTML = table;
}

function CheckOut() { //Checkout Page Info 
	var x = document.getElementById("frm1");
	var fname = x.elements[0].value;
	var lname = x.elements[1].value;
	var street = x.elements[2].value;	
	var province = x.elements[3].value;
	var city = x.elements[4].value;
	var email = x.elements[5].value;
	
	alert("Thank you, " + fname + " " + lname + " for shopping with us. Your order will be delivered to " + street + " " + city + " " + province + " in 1-5 days!");
}

function clearTable(a, b) { //Function to clear table and sort by the category or company 
	GenerateTable();
	b = b.toLowerCase();
			
	var table, tr, td, i, yes;
			
	table = document.getElementById("Invtable");
	switching = true;
	tr = table.getElementsByTagName("tr");
	while (switching){
		switching = false;
		for (i = 0; i < (tr.length); i++) {
			shouldSwitch = false;
			td = tr[i].getElementsByTagName("td")[a];
			if (td) {
				if (td.innerHTML.toLowerCase() !=  b) { //check if table has the variable b, if it does not that row gets deleted. 
					shouldSwitch= true;
					break;
				}
			}
        }
		if (shouldSwitch) {
			table.deleteRow(i);
			switching = true;
		}
	}
	sortTable(a);
}
	
function sortTable(a) {
	var table, rows, switching, i, w, x, y, z, shouldSwitch;
	table = document.getElementById("Invtable");
	switching = true;

	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.getElementsByTagName("tr");
		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			w = rows[i].getElementsByTagName("td")[a];
			x = rows[i + 1].getElementsByTagName("td")[a];
			y = rows[i].getElementsByTagName("td")[1];
			z = rows[i + 1].getElementsByTagName("td")[1];
			//check if the two rows should switch place:
			if (w.innerHTML.toLowerCase() > x.innerHTML.toLowerCase()){
				//if so, mark as a switch and break the loop:
				shouldSwitch= true;
				break;
			} else if (w.innerHTML.toLowerCase() == x.innerHTML.toLowerCase()) {
				if (y.innerHTML.toLowerCase() > z.innerHTML.toLowerCase()){
					shouldSwitch= true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}

function confirmation(){
	var x = document.getElementById("cateCompany").value;
	clearTable(3, " " + x);
}




			

			