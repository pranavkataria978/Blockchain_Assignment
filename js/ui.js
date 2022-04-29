// =============================================================================
//                                      UI 
// =============================================================================
function timeConverter(UNIX_timestamp){
  if (UNIX_timestamp === null) return "none, no pending debits";
  var a = new Date(UNIX_timestamp * 1000);
  return a.toLocaleString("en-US");
}

// function updateWhoOwes(){

//     var temp;
//     id_user = $('#myaccount').val();
//     temp = getAssociatedTransfers(id_user);

//     // console.log("transfers")
//     //console.log(data(temp[0]["c"][0]))


// }

/**
 * helper methods
 */
// this section rewrittes project starter code, but sustains core functionality
function updateUserInfo(){
    $("#total_owed").html("$"+getTotalOwed(web3.eth.defaultAccount));
    $("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)))
}


// This code updates the 'Users' list in the UI with the results of your function
function updateActiveUsers(){
    $("#all_users").html(getUsers().map(function (u,i) { return "<tr><td>"+u+"</td></tr>" }));
}

function updateHistory(){
  $("#history").empty();
  id_user = $('#myaccount').val();
  transaction_list = getAssociatedTransfers(id_user)
  var table = document.getElementById("history");
    var heading_row = table.insertRow(0);
    var cell1_h = heading_row.insertCell(0);
    var cell2_h = heading_row.insertCell(1);
    var cell3_h = heading_row.insertCell(2);
    cell1_h.innerHTML = "Debitor"
    cell2_h.innerHTML = "Creditor"
    cell3_h.innerHTML =  "Amount"
  for(i = 0; i<transaction_list.length;i++){

    var answer = data(transaction_list[i]["c"][0])

   // console.log(data(transaction_list[i]["c"][0]))
    


    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = answer[0]
    cell2.innerHTML = answer[1];
    cell3.innerHTML = answer[2]["c"][0]


    //$("#history").html(data(transaction_list[i]["c"][0]).map(function (a,b,c) { return '<tr><td>'+a+b+c+'</td></tr>' }))

  }

  
}

/**
 * event listeners
 */
$("#myaccount").change(function() {
    web3.eth.defaultAccount = $(this).val();
    //updateWhoOwes();
    updateUserInfo();
    updateHistory();
});


$("#addiou").click(function() {
  add_IOU($("#creditor").val(), $("#amount").val());
  updateUserInfo();
  updateHistory();
  updateActiveUsers();
});

/**
 * execution
 */

// Allows switching between accounts in 'My Account' 
// and the 'fast-copy' in 'Address of person you owe
var opts = web3.eth.accounts.map(function (a) { return '<option value="'+a+'">'+a+'</option>' })
var addresses = web3.eth.accounts.map(function(a){
  return a
})
// console.log(addresses)
$(".account").html(opts);
$("#wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<tr><td>'+a+'</td></tr>' }))

updateUserInfo();
updateActiveUsers();
